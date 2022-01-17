class CommentsController < ApplicationController
  include ApiKeyAuthenticatable
  before_action :set_question, only: %i[ show update destroy ]
  before_action :authenticate_with_api_key!, only: %i[ create update destroy ]

  # GET /comments
  def index
    @comments = @question.comments.order('created_at DESC')
    render json: @comments.map { |comment|
    { content: comment.content,
      updated_at: comment.updated_at,
      author: comment.user.email,
      id: comment.id }
    }
  end

  # GET /comments/1
  def show
    render json: @comment
  end

  def create
    @comment = @question.comments.new(comment_params) if current_bearer.present?
    if @comment.save
      render json: @comment.attributes.except('created_at')
                          .merge(author: @comment.user.email),
             status: :created
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  def update
    @comment = user_comment

    if @comment.update(comment_params)
      render json: @comment.attributes.except('created_at')
                          .merge(author: @comment.user.email),
             status: :ok
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @comment = user_comment
    if @comment.destroy
      render json: { message: 'Comment deleted' }, status: :ok
    else
      render json: { errors: 'You can\'t delete other users comments' }, status: :unauthorized
    end
  end

  private

  def user_comment
    comment = if current_bearer.admin?
               Comment.find(params[:id])
             else
               current_bearer.comments.find(params[:id])
             end
    comment
  end

  def set_comment
    @comment = @question.answers.find(params[:id])
  end

  def set_question
    @question = Question.find params[:question_id]
  end

  def comment_params
    params.require(:comment).permit(:body, :question_id, :user_id)
  end
end
class Api::V1::QuestionsController < ApplicationController
  include ApiKeyAuthenticatable
  before_action :set_question, only: %i[ show update destroy ]
  before_action :authenticate_with_api_key!, only: %i[ create update destroy ]

  def index
    @questions = Question.order('updated_at DESC')
    render json: @questions.map { |question| question.attributes.merge( {author: question.user.email, comments_count: question.comments.count })}
  end

  def show
    render json: @question.attributes.merge({author: @question.user.email, comments: @question.comments.order('created_at ASC').map { |comment| comment.attributes.merge({author: comment.user.email}) }})
  end

  def create
    @question = current_bearer.questions.new(question_params)
    if @question.save
      render json: @question, status: :created
    else
      render json: @question.errors, status: :unprocessable_entity
    end
  end

  def update
    if current_bearer.present? && current_bearer.admin? || current_bearer.present? && current_bearer.id == @question.user_id
      @question =  Question.find(params[:id])
    else
      @question = current_bearer.questions.find(params[:id])
    end

    if @question.update(question_params)
      render json: @question
    else
      render json: @question.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @question = current_bearer.admin? ? Question.find(params[:id]) : current_bearer.questions.find(params[:id])
      @question.destroy
      render json: { message: 'Question deleted' }, status: :accepted
    end
  end

  private
  def set_question
    @question = Question.find(params[:id])
  end

  def question_params
    params.require(:question).permit(:title, :body)
  end
end

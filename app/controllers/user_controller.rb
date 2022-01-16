class UserController < ApplicationController
    include ApiKeyAuthenticatable
    prepend_before_action :authenticate_with_api_key!, only: %i[update destroy]

    def create
        user = User.create(user_params)
        if user.valid?
            token = SecureRandom.hex
            api_key = user.api_keys.create! token: token
            render json: { user: user, token: api_key }, status: :created
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
        user = User.find_by id: params[:id]
            if user&.authenticate(user_params[:password])
              user.update(user_params)
              render json: user, status: :accepted and return
            end
          render json: { errors: "Invalid password"}, status: :unauthorized
    end

    def destroy
        user = User.find_by id: params[:id]
        if current_bearer.id == user.id
            user.destroy
            render json: { message: "User deleted" }, status: :ok
        else
            render json: { errors: "You can't delete other users" }, status: :unauthorized
        end
    end

    private

    def user_params
        params.require(:user).permit(:email, :password, :github_username)
    end
  end
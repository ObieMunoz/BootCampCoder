class UserController < ApplicationController
    prepend_before_action :authenticate_with_api_key!, only: %i[destroy]

    def create
        user = User.create(user_params)
        if user.valid?
            user.api_keys.create! token: SecureRandom.hex
            render json: { user: user, token: user.api_keys.first }, status: :created
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
    end

    private

    def user_params
        params.require(:user).permit(:email, :password, :github_username)
    end
  end
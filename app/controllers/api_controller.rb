# app/controllers/api_controller.rb
require 'zxcvbn'

class ApiController < ApplicationController
  skip_before_action :verify_authenticity_token

  def password_strength
    password = params[:password]
    result = Zxcvbn.test(password)
    render json: { score: result.score }
  end

  def create_account
    user_params = params.permit(:username, :password)

    if user_params[:username].blank?
      render json: { errors: "param is missing or the value is empty: username" }, status: :unprocessable_entity
      return
    end

    if user_params[:password].blank?
      render json: { errors: "param is missing or the value is empty: password" }, status: :unprocessable_entity
      return
    end

    strength_score = check_password_strength(user_params[:password])

    if strength_score < 2
      render json: { errors: "Weak password" }, status: :unprocessable_entity
      return
    end

    user = User.new(user_params)
    if user.valid?
      if user.save
        render json: { success: true, message: 'success' }, status: :created
      else
        render json: { success: false, errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { success: false, errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def check_password_strength(password)
    result = Zxcvbn.test(password)
    result.score
  end
end
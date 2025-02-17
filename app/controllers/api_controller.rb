require 'zxcvbn'

class ApiController < ApplicationController
  skip_before_action :verify_authenticity_token

  def password_strength
    password = params[:password]
    result = Zxcvbn.test(password)
    render json: { score: result.score }
  end

  def check_session
    if current_user
      render json: {
        logged_in: true,
        user: current_user.as_json(except: [:password_digest])
    }
    else 
      render json: { logged_in: false}
    end
  end

  def create_account
    Rails.logger.info("create_account: Params: #{params.inspect}")

    # Simulating network latency in production
    sleep(0.5) if Rails.env.development?

    # TODO: not sure why :api is wrapping the username/password here when submitting via json instead of form.
    user_params = params.permit(:username, :password,)

    if user_params[:username].blank?
      render json: { errors: "param is missing or the value is empty: username" }, status: :bad_request
      return
    end

    if user_params[:password].blank?
      render json: { errors: "param is missing or the value is empty: password" }, status: :bad_request
      return
    end

    if not password_contains_letter_and_number?(user_params[:password])
      render json: { errors: "Password must include at least one letter and one number" }, status: :unprocessable_entity
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
        session[:user_id] = user.id
        render json: { 
          success: true, 
          message: 'success',
          user: user.as_json(except: [:password_digest])
          }, status: :created
      else
        render json: { success: false, errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { success: false, errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def logout
    Rails.logger.info("logout: user_id: #{session[:user_id]}")
    session[:user_id] = nil
    Current.user = nil
    
    redirect_to root_path, notice: 'Successfully logged out.'
  end

  private

  def check_password_strength(password)
    result = Zxcvbn.test(password)
    result.score
  end

  def password_contains_letter_and_number?(password)
    password.match?(/[a-zA-Z]/) && password.match?(/\d/)
  end
end
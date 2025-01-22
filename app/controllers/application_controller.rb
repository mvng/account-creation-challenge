class ApplicationController < ActionController::Base
  before_action :set_current_user

  def render_react
    react
  end

  private

  def react
    render layout: 'application', template: 'vite/index'
  end

  def set_current_user
    if session[:user_id]
      Current.user = User.find_by(id: session[:user_id])
    end
  end

  def current_user
    Current.user
  end

end
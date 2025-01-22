Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  get '/', to: 'application#render_react', as: :root
  get 'signup/*all', to: 'application#render_react', as: :signup
  get 'create-account', to: 'application#render_react', as: :create_account
  post 'api/create-account', to: 'api#create_account'

  # Temp exposing this to show password strength from UI
  post 'api/password-strength', to: 'api#password_strength'
  
  # Useful for checking if current session is valid
  get 'api/check_session', to: 'api#check_session'

  # Handles both visiting the logout page and post call for forced session clears
  get 'logout', to: 'api#logout'
  post 'api/logout', to: 'api#logout'

end

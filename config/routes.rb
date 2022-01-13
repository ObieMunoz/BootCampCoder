Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  resources :api_keys, path: 'api-keys', only: %i[index create destroy]

  post 'users', to: 'user#create'
  delete 'users', to: 'user#destroy'
  get 'users', to: 'user#index'
end

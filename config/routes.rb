Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :comments
      resources :questions
      # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
      # Defines the root path route ("/")
      # root "articles#index"
      resources :api_keys, path: 'api-keys', only: %i[index create destroy]

      post 'users', to: 'user#create'
      delete 'users/:id', to: 'user#destroy'
      get 'users', to: 'user#index'
      patch 'users/:id', to: 'user#update'
    end
  end
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end

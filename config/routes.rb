Rails.application.routes.draw do
  get 'gifs/new'

  get 'gifs/create'

  root to: 'static_pages#root'

  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create]
end

Rails.application.routes.draw do


  get 'static_pages/root'

  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create, :show]

  namespace :api, defaults: {format: :json} do
    resources :gifs, only: [:index, :create, :show, :destroy]
    resources :albums, only: [:index, :create, :show, :destroy]
  end

  root to: 'static_pages#root'
  get 'guest_login', to: 'sessions#guest_login'
end

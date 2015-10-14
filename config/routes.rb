Rails.application.routes.draw do


  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create]

  namespace :api, defaults: {format: :json} do
    resources :gifs, only: [:index, :new, :create, :show, :destroy]
  end


  root to: 'static_pages#root'
end

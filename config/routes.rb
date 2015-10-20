Rails.application.routes.draw do


  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create, :show]

  namespace :api, defaults: {format: :json} do
    resources :gifs, only: [:index, :create, :show, :destroy]
    resources :albums, only: [:index, :create, :update, :destroy]
  end


  root to: 'static_pages#root'
end

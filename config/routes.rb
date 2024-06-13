Rails.application.routes.draw do
  get '/home', to: 'home#index'
  get '/contact', to: 'contact#index'

  resources :projects

  root 'home#index'
end

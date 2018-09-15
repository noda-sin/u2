Rails.application.routes.draw do
  root to: 'home#index'

  get 'about', :to => 'home#about'
  get 'help', :to => 'home#help'
  get 'inquiry', :to => 'home#inquiry'

  devise_for :users, skip: :all
  devise_scope :user do
    # ユーザ登録
    get 'sign_up', :to => 'users/registrations#new'
    post 'sign_up', :to => 'users/registrations#create'
    # ログイン
    get 'login', :to => 'users/sessions#new'
    post 'login', :to => 'users/sessions#create'
    # ログアウト
    delete 'logout', :to => 'users/sessions#destroy'
    # ユーザ編集
    get 'user' => 'users/registrations#edit'
    patch 'user' => 'users/registrations#update'
    put 'user' => 'users/registrations#update'
    delete 'user' => 'users/registrations#destroy'
  end
  resources :users, only: :show
  get 'users/:id/unsubscribe' => 'users#unsubscribe', as: 'user_unsubscribe'
end

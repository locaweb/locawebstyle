Boostrap::Application.routes.draw do
  namespace :example do
    root :to => 'home#index'
  end
  root :to => 'home#index'
end

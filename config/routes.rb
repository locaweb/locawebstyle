Boostrap::Application.routes.draw do

  namespace :example do
    root :to => 'home#index'
  end

  match ':id' => 'manual#show'
  root :to => 'manual#show'

end

Boostrap::Application.routes.draw do

  namespace :example do
    root :to => 'home#index'
    match 'home/show' => 'home#show'
  end

  match ':id' => 'manual#show'
  root :to => 'manual#show'

end

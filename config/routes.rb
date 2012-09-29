Violination::Application.routes.draw do

	match 'current_user' => 'sessions#current_user'
	match 'login' => 'sessions#login'
	match 'logout' => 'sessions#logout'
	resources :users

	resources :users do
		resources :accounts do
			resources :transactions
		end
	end


	root :to => "users#index"

end

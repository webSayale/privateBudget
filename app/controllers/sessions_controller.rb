class SessionsController < ApplicationController

	def login
		@user = User.authenticate(params[:email], params[:password])
		if @user
			session[:user_id] = @user.id
			cookies[:auth_key] = session[:user_id].to_s
		end 
		respond_to do |format|
			format.json { render json: session[:user_id] }
		end
	end

	def logout
		session[:user_id] = nil
		cookies[:auth_key] = nil
		respond_to do |format|
			format.json { render json: nil }
		end
	end
	
end

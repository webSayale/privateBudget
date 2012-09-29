class AccountsController < ApplicationController

	before_filter :authenticate

	def index
		@accounts = User.find(params[:user_id]).accounts

		respond_to do |format|
			format.json { render json: @accounts }
		end
	end
	

	def create
		user = User.find(params[:user_id])
		@account = user.accounts.create(params[:account])
		respond_to do |format|
			format.json { render json: @account }
		end
	end
	

	def update
		@account = User.find(params[:user_id]).accounts.find(params[:id])
			
		respond_to do |format|
			if @account.update_attributes(params[:account])
				format.json { render json: @account }
			else
				format.json { render json: @account.errors, status: :unprocessable_entity }
			end
		end
	end
	
	def destroy
		@account = User.find(params[:user_id]).accounts.find(params[:id])
		@account.destroy

		respond_to do |format|
			format.json { head :ok }
		end
	end
	
	
	private

	def authenticate
		unless authenticated?
			render :file => "public/422.html", :status => 401
		end
	end
end

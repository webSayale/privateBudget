class TransactionsController < ApplicationController

	before_filter :authenticate, :find_user_and_account

	def index
		@transactions = @account.transactions

		respond_to do |format|
			format.json { render json: @transactions }
		end
	end
	
	def create
		@transaction = @account.transactions.create(params[:transaction])
		respond_to do |format|
			format.json { render json: @transaction }
		end
	end
	

	def update
		@transaction = @account.transactions.find(params[:id])
			
		respond_to do |format|
			puts params[:transaction]
			if @transaction.update_attributes(params[:transaction])
							puts @transaction.name
				format.json { render json: @transaction }
			else
				format.json { render json: @transaction.errors, status: :unprocessable_entity }
			end
		end
	end
	
	def destroy
		transaction = @account.transactions.find(params[:id])
		transaction.destroy

		respond_to do |format|
			format.json { head :ok }
		end
	end
	
	private
	
	def find_user_and_account
			user = User.find(params[:user_id])
      @account = user.accounts.find(params[:account_id])
	end

	def authenticate
		unless authenticated?
			render :file => "public/422.html", :status => 401
		end
	end
end
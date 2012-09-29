class UsersController < ApplicationController
	
	before_filter :authenticate
	
	def index
		@users = User.all

		respond_to do |format|
			format.html # index.html.erb
			format.json { render json: @users }
		end
	end

	def show
		begin
			@user = User.find(params[:id])
		rescue
			@User = User.new
		end
		respond_to do |format|
			format.json { render json: @user }
		end
	end

	def create
		@user = User.new(params[:user])

		respond_to do |format|
			if @user.save
				format.json { render json: @user, status: :created, location: @user }
			else
				format.json { render json: @user.errors, status: :unprocessable_entity }
			end
		end
	end

	def update
		@user = User.find(params[:id])

		respond_to do |format|
			if @user.update_attributes(params[:user])
				format.json { render json: @user, status: :created, location: @user }
			else
				format.json { render json: @user.errors, status: :unprocessable_entity }
			end
		end
	end

	def destroy
		@user = User.find(params[:id])
		@user.destroy

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

class ApplicationController < ActionController::Base
	protect_from_forgery

	before_filter :intercept_html_requests

	layout nil

	helper_method :current_user
	helper_method :authenticated?

	private

	def current_user
		@current_user ||= User.find(session[:user_id]) if session[:user_id]
	end
	
	def authenticated?
		if session[:user_id].nil?
			return false
		else
			return session[:user_id].to_s == cookies[:auth_key]
		end
	end

	def intercept_html_requests
		render('layouts/dynamic') if request.format == Mime::HTML
	end

	def handle_unverified_request
		reset_session
		render "#{Rails.root}/public/500.html", :status => 500, :layout => nil
	end
	
end

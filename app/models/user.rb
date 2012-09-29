require 'carrierwave/orm/activerecord'

class User
  include Mongoid::Document
  field :firstname, type: String
  field :lastname, type: String
  field :email, type: String
	field :avatar, type: String
	field :password_hash, type: String 
	field :password_salt, type: String
  embeds_many :accounts
	
	validates_presence_of :firstname, :lastname, :email
	validates_uniqueness_of :email
	validates_format_of :email, with: /^([^@\s]+)@((?:[-a-z0-9]+.)+[a-z]{2,})$/i 

	attr_accessible :firstname, :lastname, :email, :avatar
	
	before_save :encrypt_password
	
	def self.authenticate(email, password)
    user = User.where(email: email).first
    if user && user.password_hash == BCrypt::Engine.hash_secret(password, user.password_salt)
      user
    else
      nil
    end
  end
  
  def encrypt_password
    if password.present?
      self.password_salt = BCrypt::Engine.generate_salt
      self.password_hash = BCrypt::Engine.hash_secret(password, password_salt)
    end
  end
	
end

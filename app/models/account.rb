class Account
  include Mongoid::Document
  field :name, type: String
  embedded_in :user	
  embeds_many :transactions
	
end
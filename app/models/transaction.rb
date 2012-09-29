class Transaction	
  include Mongoid::Document
  field :name, type: String
  field :amount, type: Float
  embedded_in :account	
	
end
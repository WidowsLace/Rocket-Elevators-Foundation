class Intervention < ApplicationRecord
    belongs_to :customer
    belongs_to :employee, optional: true
    belongs_to :author, class_name: "Employee"
    belongs_to :building
    belongs_to :battery
    belongs_to :column, optional: true
    belongs_to :elevator, optional: true
    
    devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end 
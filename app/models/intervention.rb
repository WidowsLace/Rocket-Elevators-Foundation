class Intervention < ApplicationRecord
    belongs_to :customer, optional: true
    belongs_to :employee, optional: true
    belongs_to :author, class_name: "Employee", optional: true
    belongs_to :building, optional: true
    belongs_to :battery, optional: true
    belongs_to :column, optional: true
    belongs_to :elevator, optional: true
end 
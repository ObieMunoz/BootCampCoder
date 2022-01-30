class Comment < ApplicationRecord
    validates :body, presence: true, length: { in: 3..1000 }
    validates :body
    belongs_to :question
    belongs_to :user
end

class Comment < ApplicationRecord
    validates :body, presence: true, length: { in: 3..1000 }
    belongs_to :question
    belongs_to :user
end

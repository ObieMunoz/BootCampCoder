class Question < ApplicationRecord
    validates :title, presence: true, length: { in: 3..60 }
    validates :body, presence: true, length: { in: 3..1000 }
    before_save :capitalize_title
    belongs_to :user
    has_many :comments, dependent: :destroy

    def capitalize_title
        self.title.capitalize!
    end
end

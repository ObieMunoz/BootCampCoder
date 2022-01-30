class Question < ApplicationRecord
    validates :title, presence: true, length: { in: 2..60 }, obscenity: true
    validates :body, presence: true, length: { in: 0..1000 }, obscenity: true
    before_save :capitalize_title
    belongs_to :user
    has_many :comments, dependent: :destroy

    def capitalize_title
        self.title.capitalize!
    end
end

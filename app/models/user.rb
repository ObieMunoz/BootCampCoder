class User < ApplicationRecord
    has_secure_password
    has_many :api_keys, as: :bearer, dependent: :delete_all
    validates :email, presence: true, uniqueness: true
    validates :password, presence: true
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
    has_many :questions, dependent: :destroy
    has_many :comments, dependent: :delete_all
    before_save :downcase_email

    def downcase_email
        self.email.downcase!
    end

end
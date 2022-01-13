class User < ApplicationRecord
    has_many :api_keys, as: :bearer, dependent: :delete_all
    has_secure_password
    validates :email, presence: true, uniqueness: true
end
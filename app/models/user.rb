class User < ApplicationRecord
  validates :username, presence: true, length: { minimum: 10, maximum: 50 }
  validates :password, presence: true, length: { minimum: 12, maximum: 50 }

  def self.validates_username(username)
    username.length >= 10 && username.length <= 50
  end
  def self.validates_password(password)
    password.length >= 20 && password.length <= 50
  end
end

# need to figure out why explicitely defined these functions
# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  username        :string           not null
#

FactoryGirl.define do
  factory :user do
    email { |n| Faker::Internet.email }
    username {|i| Faker::Hacker.noun }
    password { |p| Faker::Internet.password }
  end
end

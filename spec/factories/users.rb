FactoryGirl.define do
  factory :user do
    email { |n| Faker::Internet.email }
    password { |p| Faker::Internet.password }
  end
end

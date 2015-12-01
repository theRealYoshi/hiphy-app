require 'Faker'

FactoryGirl.define do
  factory :tag do
    tag_title {|n| Faker::Hacker.adjective}
  end
end

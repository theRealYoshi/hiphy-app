require 'faker'

FactoryGirl.define do
  factory :gif do
    title {|n| Faker::Hacker.adjective}
    submitter_id {|n| Faker::Number.number(10)}
    url {|n| Faker::Internet.url}
    secure_url {|n| Faker::Internet.url}
  end
end

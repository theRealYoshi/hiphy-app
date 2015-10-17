# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'net/http'
require 'json'
def getUrl
  keywords = ['san-francisco', 'bay-area', 'silicon-valley', 'oakland', 'hyphy', 'san-jose', 'cats']
  url = 'http://api.giphy.com/v1/gifs/translate?s=' + keywords.sample.to_s + '&api_key=dc6zaTOxFJmzC'
  resp = Net::HTTP.get_response(URI.parse(url))
  buffer = resp.body
  result = JSON.parse(buffer)
  result['data']['images']['fixed_height']['url'].to_s
end

10.times do |n|
  User.create(email: "user#{n + 1}@user.com", password: "user#{n + 1}user#{n + 1}")
end

50.times do |n|
  fake_title = Faker::Book.title
  cloudinary_hash = Cloudinary::Uploader.upload(getUrl)
  fake_gif = Gif.create(
    title: fake_title,
    submitter_id: ((n + 1) % 5),
    url: cloudinary_hash["url"],
    shortened_url: "http://hip.hy/#{SecureRandom.urlsafe_base64(6)}"
  )
  fake_tag1 = Tag.create( tag_title: Faker::Hacker.adjective)
  fake_tag2 = Tag.create( tag_title: Faker::Hacker.adjective)
  Tagging.create(gif_id: fake_gif.id, tag_id: fake_tag1.id)
  Tagging.create(gif_id: fake_gif.id, tag_id: fake_tag2.id)
end

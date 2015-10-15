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

20.times do |n|
  fake_title = Faker::Book.title
  cloudinary_hash = Cloudinary::Uploader.upload(getUrl)
  fake_gif = Gif.create(
    title: fake_title,
    submitter_id: n,
    url: cloudinary_hash["url"]
  )
  fake_tag = Tag.create( tag_title: Faker::Hacker.adjective)
  Tagging.create(gif_id: fake_gif.id, tag_id: fake_tag.id)
  User.create(email: "user#{n}@user.com", password: "user#{n}user#{n}")
end

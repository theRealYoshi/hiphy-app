# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'net/http'
require 'json'

case Rails.env
  when "development"
    cloudinary_tag = "development_seed_data"
  when "production"
    cloudinary_tag = "production_seed_data"
end

Cloudinary::Api.delete_resources_by_tag(cloudinary_tag)
Cloudinary::Api.delete_resources_by_tag('test_data')

def getUrl
  keywords = ['san-francisco', 'bay-area', 'silicon-valley',
    'oakland', 'hyphy', 'san-jose', 'cats', 'warriors', '49ers', 'sf-giants', 'oakland-as',
   'golden-gate-bridge']
  url = 'http://api.giphy.com/v1/gifs/translate?s=' + keywords.sample.to_s + '&api_key=dc6zaTOxFJmzC'
  resp = Net::HTTP.get_response(URI.parse(url))
  buffer = resp.body
  result = JSON.parse(buffer)
  result['data']['images']['fixed_height']['url'].to_s
end

10.times do |n|
  User.create(email: "user#{n + 1}@user.com", username: "user#{n + 1}", password: "user#{n + 1}user#{n + 1}")
  Album.create(album_title: "album#{n+1}", user_id: (n+1))
end

50.times do |n|
  fake_title = Faker::Book.title
  cloudinary_hash = Cloudinary::Uploader.upload(getUrl, :tags => cloudinary_tag)
  fake_gif = Gif.create(
    title: fake_title,
    submitter_id: ((n % 10) + 1),
    url: cloudinary_hash["url"],
    secure_url: cloudinary_hash["secure_url"],
    gif_tag: cloudinary_hash["public_id"],
    shortened_url: "http://hip.hy/#{SecureRandom.urlsafe_base64(6)}"
  )
  Albuming.create(gif_id: fake_gif.id, album_id: ((n % 10) + 1))
  fake_tag1 = Tag.create( tag_title: Faker::Hacker.adjective)
  fake_tag2 = Tag.create( tag_title: Faker::Hacker.adjective)
  Tagging.create(gif_id: fake_gif.id, tag_id: fake_tag1.id)
  Tagging.create(gif_id: fake_gif.id, tag_id: fake_tag2.id)
end

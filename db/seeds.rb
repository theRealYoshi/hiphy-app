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


def getUrl(keyword)
  url = 'http://api.giphy.com/v1/gifs/translate?s=' + keyword + '&api_key=dc6zaTOxFJmzC'
  resp = Net::HTTP.get_response(URI.parse(url))
  buffer = resp.body
  result = JSON.parse(buffer)
  res = result['data']['images']['fixed_height']['url'].to_s
  return res, result['data']['url'], result['data']['id']
end

User.create(email: "guest@guest.com", username: "guest", password: "guestguest")
10.times do |n|
  User.create(email: "user@user#{ n + 1}.com", username: "user#{n+1}", password: "user#{n+1}user#{n+1}")
end

200.times do |n|
  keywords = [
      'san-francisco', 'bay-area', 'silicon-valley', 'stephen-curry',
      'san-jose-sharks', 'oakland', 'hyphy', 'san-jose',
      'cats', 'warriors', '49ers', 'sf-giants', 'oakland-as', 'raiders',
      'golden-gate-bridge', 'alcatraz', 'thizz',
      'steve-jobs', 'berkeley', 'stanford', 'palo-alto',
      'fishermans-wharf', 'earthquake', 'california', 'man-francisco',
      'colin-kaepernick', 'tech', 'barry-bonds', 'jerry-rice',
      'gold-rush', 'startup', 'bay-area', 'grateful-dead', 'jim-harbaugh',
      'full-house', 'funny-cat', 'chinatown', 'the-rock-nicolas-cage',
      'escape-alcatraz', 'godzilla-2014', 'vertigo-hitchcock', 'foggy']
  keyword = keywords.sample.to_s
  url, title, public_id = getUrl(keyword)
  title = title.gsub("http://giphy.com/gifs/","")
  title = title.gsub("-#{public_id}", "")
  begin
    cloudinary_hash= Cloudinary::Uploader.upload(url,
                          :tags => cloudinary_tag)
    fake_gif = Gif.create(
      title: title,
      submitter_id: ((n % 10) + 1),
      url: cloudinary_hash["url"],
      secure_url: cloudinary_hash["secure_url"],
      gif_tag: cloudinary_hash["public_id"],
      shortened_url: "http://hip.hy/#{SecureRandom.urlsafe_base64(6)}"
    )
    fake_tag1 = Tag.create( tag_title: keyword)
    Tagging.create(gif_id: fake_gif.id, tag_id: fake_tag1.id)
  rescue
    puts "file too large or error occurred"
  end
end

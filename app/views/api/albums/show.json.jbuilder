json.extract!(@album, :id, :album_title, :user_id)
json.user @album.user
json.gifs @album.gifs do |gif|
  json.extract!(gif, :id, :title, :submitter_id, :url)
  json.submitter gif.user.username
  json.tags gif.tags
end

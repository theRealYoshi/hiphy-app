json.extract!(@user, :id, :email, :username)
json.gifs do
  json.array!(@user.gifs) do |gif|
    json.extract!(gif, :id, :title, :submitter_id, :url, :shortened_url)
    json.submitter gif.user.username
    json.tags gif.tags
  end
end
json.albums do
  json.array!(@user.albums) do |album|
    json.extract!(album, :id, :user_id, :album_title)
    json.gifs album.gifs
  end
end

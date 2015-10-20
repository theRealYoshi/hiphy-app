json.array!(@albums) do |album|
  json.extract!(album, :id, :user_id, :album_title)
  json.user album.users
  json.gifs album.gifs
end

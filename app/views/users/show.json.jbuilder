json.extract!(@user, :id, :email, :username)
json.albums do
  json.array!(@user.albums) do |album|
    json.extract!(album, :id, :user_id, :album_title)
    json.gifs album.gifs
  end
end

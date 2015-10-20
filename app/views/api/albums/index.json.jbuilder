json.array!(@albums) do |album|
  json.extract!(album, :id, :user_id, :gif_id, :album_tag)
end

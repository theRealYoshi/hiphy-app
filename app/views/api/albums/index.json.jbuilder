json.array!(@albums) do |album|
  json.extract!(album, :id, :user_id, :album_title)
  json.user album.user
  json.gifs album.gifs do |gif|
    json.extract!(gif, :id, :title, :submitter_id, :url)
    json.tags gif.tags
  end
end

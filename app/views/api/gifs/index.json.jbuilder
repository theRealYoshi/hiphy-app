json.array!(@gifs) do |gif|
  json.extract!(gif, :id, :title, :submitter_id, :url, :shortened_url)
  json.submitter gif.user.username
  json.tags gif.tags
end

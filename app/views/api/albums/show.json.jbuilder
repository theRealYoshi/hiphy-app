json.extract!(@album, :id, :album_title, :user_id)
json.gifs @album.gifs
json.user @album.user

json.extract!(@user, :id, :email)
json.gifs @user.gifs
json.albums @user.albums

ApiUtil = {
  fetchGifs: function(param, tagSearch){
    $.ajax({
      url: '/api/gifs',
      type: 'GET',
      data: param,
      success: function(gifs){
        if (tagSearch){
          ApiActions.receiveTagSearch(gifs);
        } else {
          ApiActions.receiveAll(gifs);
        }
      }
    });
  },
  createGif: function(data, callback){
    $.ajax({
      url: '/api/gifs',
      type: 'post',
      data: { gif: data },
      success: function (gif) {
        ApiActions.receiveSingleGif(gif);
        callback(gif.id);
      },
      error: function () {
        console.log("You Must Be logged In to perform this action");
        window.location = "/session/new";
      }
    });
  },
  fetchSingleGif: function(id){
    $.ajax({
        url: '/api/gifs/' + id,
        type: 'GET',
        success: function(gif){
          ApiActions.receiveSingleGif(gif);
        }
    });
  },
  deleteSingleGif: function(id, callback){
    $.ajax({
      url: '/api/gifs/' + id,
      type: 'DELETE',
      success: function(gif){
        ApiActions.removeSingleGif(gif);
        ApiUtil.fetchAlbums({}, callback);
      },
      error: function(){
        console.log('error');
      }
    });
  },
  fetchAlbums: function(param, callback){
    $.ajax({
      url: '/api/albums',
      type: 'GET',
      data: param,
      success: function(albums){
        ApiActions.receiveAllAlbums(albums);
        callback && callback();
      }
    });
  },
  createAlbum: function(data){
    $.ajax({
      url: '/api/albums',
      type: 'POST',
      data: { album: data },
      success: function (album) {
        ApiActions.receiveSingleAlbum(album);
        console.log("album created!");
      },
      error: function () {
        console.log("this is the error");
      }
    });
  },
  fetchSingleAlbum: function(albumId, callback){
    $.ajax({
      url: '/api/albums/' + albumId,
      type: 'GET',
      success: function(album){
        ApiActions.receiveSingleAlbum(album);
        ApiActions.receiveAll(album.gifs);
      }
    });
  },
  fetchUserAlbums: function(userId){
    $.ajax({
      url: '/users/' + userId,
      type: 'GET',
      success: function(user){
        ApiActions.receiveAllAlbums(user.albums);
      }
    });
  },
  addToAlbum: function(data){
    $.ajax({
      url: '/api/albums',
      type: 'POST',
      data: { album: data },
      success: function (album) {
        ApiActions.updateSingleAlbum(album);
        console.log("added to Album");
      },
      error: function () {
        console.log("this is the error");
      }
    });
  },
  deleteSingleAlbum: function(albumId, callback){
    $.ajax({
      url: '/api/albums/' + albumId,
      type: 'DELETE',
      success: function (album) {
        ApiActions.removeSingleAlbum(album);
        callback();
        console.log("deleted Album");
      },
      error: function () {
        console.log("this is the error");
      }
    });
  },
  fetchSingleUser: function(userId){
    $.ajax({
      url: '/users/' + userId,
      type: 'GET',
      success: function (user) {
        ApiActions.receiveSingleUser(user);
      },
      error: function () {
        console.log("this is the error");
      }
    });
  },
  removeSingleUser: function(callback){
    $.ajax({
      url: '/session/',
      type: 'DELETE',
      success: function (user) {
        ApiActions.removeSingleUser(user);
        callback && callback();
      },
      error: function () {
        console.log("logout error");
      }
    });
  }
};

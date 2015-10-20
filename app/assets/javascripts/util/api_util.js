ApiUtil = {
  fetchGifs: function(param){
    $.ajax({
      url: '/api/gifs',
      type: 'GET',
      data: param,
      success: function(gifs){
        ApiActions.receiveAll(gifs);
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
        console.log("this is the error");
      }
    });
  },
  fetchSingleGif: function(id){
    $.get('/api/gifs/' + id, function(gif){
      ApiActions.receiveSingleGif(gif);
    });
  },
  deleteSingleGif: function(id, callback){
    $.ajax({
      url: '/api/gifs/' + id,
      type: 'DELETE',
      success: function(gif){
        ApiActions.removeSingleGif(gif);
        if (callback){
          callback();
        }
      },
      error: function(){
        console.log('error');
      }
    });
  },
  fetchAlbums: function(param){
    $.ajax({
      url: '/api/albums',
      type: 'GET',
      data: param,
      success: function(albums){
        ApiActions.receiveAllAlbums(albums);
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
  }
};

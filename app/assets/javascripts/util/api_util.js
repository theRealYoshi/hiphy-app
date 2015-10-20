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
  addToAlbum: function(data){
    $.ajax({
      url: '/api/albums',
      type: 'POST',
      data: { album: data },
      success: function (album) {
        ApiActions.removeSingleAlbum(album);
        ApiActions.receiveSingleAlbum(album);
        console.log("added to Album");
      },
      error: function () {
        console.log("this is the error");
      }
    });
  }
};

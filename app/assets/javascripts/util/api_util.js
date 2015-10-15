ApiUtil = {
  fetchGifs: function(){
    // var filter = FilterParamsStore.params();
    $.get('/api/gifs', function(gifs){
      ApiActions.receiveAll(gifs);
    });
  },
  createGif: function(data, callback){
    // $.post('/api/gifs', { gif: data }, function(gif) {
    //   ApiActions.receiveSingleGif(gif);
    //   callback(gif.id);
    // });
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
      success: function(){
        callback();
      }
    });
  }
};

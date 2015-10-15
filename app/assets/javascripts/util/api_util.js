ApiUtil = {
  fetchGifs: function(){
    // var filter = FilterParamsStore.params();
    $.get('api/gifs', function(gifs){
      ApiActions.receiveAll(gifs);
    });
  },
  createGif: function(data, callback){
    $.post('/api/gifs', { gif: data }, function(gif) {
      ApiActions.receiveSingleGif(gif);
      debugger;
      callback(gif.id);
    });
  },
  fetchSingleGif: function(id){
    $.get('/api/gifs/' + id, function(gif){
      ApiActions.receiveSingleGif(gif);
    });
  }
};

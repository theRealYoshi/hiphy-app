ApiUtil = {
  fetchGifs: function(){
    // var filter = FilterParamsStore.params();
    $.get('api/gifs', function(gifs){
      ApiActions.receiveAll(gifs);
    });
  },
  createGif: function(data){
    $.post('/api/gifs', { gif: data }, function(responseData) {
      console.log(responseData);
      // ApiActions.receiveAll([bench]);
    });
  }
};

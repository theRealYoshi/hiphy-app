ApiUtil = {
  // fetchGifs: function(){
  //   // var filter = FilterParamsStore.params();
  //   $.get('api/gifs', filter, function(benches){
  //     ApiActions.receiveAll(benches);
  //   });
  // },
  createGif: function(data){
    $.post('/api/gifs', { gif: data }, function(responseData) {
      console.log(responseData);
      // ApiActions.receiveAll([bench]);
    });
  }
};

ApiActions = {
  receiveAll: function(gifs){
    AppDispatcher.dispatch({
      actionType: GifConstants.GIFS_RECEIVED,
      gifs: gifs
    });
  }
};

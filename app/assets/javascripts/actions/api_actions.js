ApiActions = {
  receiveAll: function(gifs){
    AppDispatcher.dispatch({
      actionType: GifConstants.GIFS_RECEIVED,
      gifs: gifs
    });
  },
  receiveSingleGif: function(gif){
    AppDispatcher.dispatch({
      actionType: GifConstants.GIF_RECEIVED,
      gif: gif
    });
  },
  removeSingleGif: function(gif){
    AppDispatcher.dispatch({
      actionType: GifConstants.GIF_REMOVED,
      gif: gif
    });
  },
  updateTag: function(tag){
    AppDispatcher.dispatch({
      actionType: GifConstants.UPDATE_TAG,
      tag: tag
    });
  }
};

(function(root) {
  var _gifs = [];
  var CHANGE_EVENT = "CHANGE";

  var resetGifs = function(gifs){
    _gifs = gifs.slice(0);
  };

  var GifStore = root.GifStore = $.extend({}, EventEmitter.prototype, {
    all: function(){
      return _gifs.slice(0);
    },
    addChangeListener: function(callback){
      this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback){
      this.removeListener(CHANGE_EVENT, callback);
    },
    dispatcherID: AppDispatcher.register(function(payload){
      switch(payload.actionType){
        case GifConstants.GIFS_RECEIVED:
          var result = resetGifs(payload.gifs);
          GifStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });

}(this));

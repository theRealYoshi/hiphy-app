(function(root) {
  var _gifs = [];
  var CHANGE_EVENT = "CHANGE";
  var SINGLE_CHANGE_EVENT = "SINGLE_CHANGE_EVENT";

  var resetGifs = function(gifs){
    _gifs = gifs.slice(0);
  };
  var resetGif = function(gif){
    if (_gifs.indexOf(gif) === -1){
      _gifs.push(gif);
    }
  };


  var GifStore = root.GifStore = $.extend({}, EventEmitter.prototype, {
    all: function(){
      return _gifs.slice(0);
    },
    find: function(id){
      var gif;
     _gifs.forEach(function(g) {
       if(g.id === id) { gif = g; }
     });
     return gif;
    },
    addChangeListener: function(callback){
      this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback){
      this.removeListener(CHANGE_EVENT, callback);
    },
    addSingleChangeListener: function(callback){
      this.on(SINGLE_CHANGE_EVENT, callback);
    },
    removeSingleChangeListener: function(callback){
      this.removeListener(SINGLE_CHANGE_EVENT, callback);
    },
    dispatcherID: AppDispatcher.register(function(payload){
      switch(payload.actionType){
        case GifConstants.GIFS_RECEIVED:
          var result = resetGifs(payload.gifs);
          GifStore.emit(CHANGE_EVENT);
          break;
        case GifConstants.GIF_RECEIVED:
          var singleResult = resetGif(payload.gif);
          GifStore.emit(SINGLE_CHANGE_EVENT);
          break;
      }
    })
  });

}(this));

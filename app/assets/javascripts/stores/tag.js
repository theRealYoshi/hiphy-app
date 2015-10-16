(function(root) {
  var _tag = { tag: '' };
  var CHANGE_EVENT = "CHANGE";

  var TagStore = root.TagStore = $.extend({}, EventEmitter.prototype, {
    params: function(){
      return $.extend({}, _tag);
    },
    addChangeListener: function(callback){
      this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback){
      this.removeListener(CHANGE_EVENT, callback);
    },
    dispatcherID: AppDispatcher.register(function(payload){
      switch(payload.actionType){
        case GifConstants.UPDATE_TAG:
          _tag.tag = payload.tag;
          TagStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });

}(this));

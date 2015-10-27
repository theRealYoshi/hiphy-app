(function(root) {
  var _tags = [];
  var CHANGE_EVENT = "TAG_CHANGE";

  var resetTags = function(tags){
    _tags = tags.slice(0);
  };

  var addTag = function(tag){
    var idx;
    for (var i = 0; i < _tags.length; i++) {
     if (_tags[i].id === tag.id) {
       idx = i;
     }
    }
    if (!idx){
      _tags.push(tag);
    }
  };

  var removeTag = function(tag){
    var idx;
    for (var i = 0; i < _tags.length; i++) {
     if (_tags[i].id === tag.id) {
       idx = i;
     }
    }
    if (idx !== -1){
      _tags.splice(idx, 1);
    }
  };

  var TagStore = root.TagStore = $.extend({}, EventEmitter.prototype, {
    all: function(){
      return _tags.slice(0);
    },
    addChangeListener: function(callback){
      this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback){
      this.removeListener(CHANGE_EVENT, callback);
    },
    dispatcherID: AppDispatcher.register(function(payload){
      switch(payload.actionType){
        case TagConstants.RECEIVE_TAG:
          var resetTag = resetTags(payload.tag);
          TagStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });

}(this));

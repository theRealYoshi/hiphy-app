(function(root) {
  var _albums = [];
  var CHANGE_EVENT = "CHANGE";
  var SINGLE_CHANGE_EVENT = "SINGLE_CHANGE_EVENT";

  var resetAlbums = function(albums){
    _albums = albums.slice(0);
  };

  var addAlbum = function(album){
    var idx;
    for (var i = 0; i < _albums.length; i++) {
     if (_albums[i].id === album.id) {
       idx = i;
     }
    }
    if (!idx){
      _albums.push(album);
    }
  };

  var removeAlbum = function(album){
    var idx;
    for (var i = 0; i < _albums.length; i++) {
     if (_albums[i].id === album.id) {
       idx = i;
     }
    }
    if (idx !== -1){
      _albums.splice(idx, 1);
    }
  };

  var AlbumStore = root.AlbumStore = $.extend({}, EventEmitter.prototype, {
    all: function(){
      return _albums.slice(0);
    },
    find: function(id){
      var album;
     _albums.forEach(function(a) {
       if(a.id === id) { album = a; }
     });
     return album;
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
        case AlbumConstants.ALBUMS_RECEIVED:
          var result = resetAlbums(payload.albums);
          AlbumStore.emit(CHANGE_EVENT);
          break;
        case AlbumConstants.ALBUM_RECEIVED:
          var singleResult = addAlbum(payload.album);
          AlbumStore.emit(SINGLE_CHANGE_EVENT);
          break;
        case AlbumConstants.ALBUM_REMOVED:
          var singleRemove = removeAlbum(payload.album);
          AlbumStore.emit(SINGLE_CHANGE_EVENT);
          break;
      }
    })
  });

}(this));

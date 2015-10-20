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

  var updateAlbum = function(album){
    var found;
    _albums.forEach(function(a){
      if(a.id === album.id){
        found = true;
      }
    });
    if (found){
      var ids = _albums.map(function (album) {
        return album.id;
      });
      var albumId = ids.indexOf(album.id);
      _albums[albumId] = album;
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
    findByTitle: function(title){
      var album;
      _albums.forEach(function(a){
        var albumStoreTitle = a.album_title.split().concat("-");
        if (albumStoreTitle === title){ album = a;}
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
        case AlbumConstants.ALBUM_UPDATED:
          var singleUpdate = updateAlbum(payload.album);
          AlbumStore.emit(SINGLE_CHANGE_EVENT);
          break;
      }
    })
  });

}(this));

(function(root) {
  var _users = [];
  var CHANGE_EVENT = "CHANGE";
  var SINGLE_CHANGE_EVENT = "SINGLE_CHANGE_EVENT";

  var resetUsers = function(users){
    _users = users.slice(0);
  };

  var addUser = function(user){
    var idx;
    for (var i = 0; i < _users.length; i++) {
     if (_users[i].id === user.id) {
       idx = i;
     }
    }
    if (!idx){
      _users.push(user);
    }
  };

  var removeUser = function(user){
    var idx;
    for (var i = 0; i < _users.length; i++) {
     if (_users[i].id === user.id) {
       idx = i;
     }
    }
    if (idx !== -1){
      _users.splice(idx, 1);
    }
  };

  var updateUser = function(user){
    var found;
    _users.forEach(function(u){
      if(u.id === user.id){
        found = true;
      }
    });
    if (found){
      var ids = _users.map(function (user) {
        return user.id;
      });
      var userId = ids.indexOf(user.id);
      _users[userId] = user;
    }

  };

  var UserStore = root.UserStore = $.extend({}, EventEmitter.prototype, {
    all: function(){
      return _users.slice(0);
    },
    find: function(id){
      var user;
     _users.forEach(function(a) {
       if(a.id === id) { user = a; }
     });
     return user;
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
        case UserConstants.UserS_RECEIVED:
          var result = resetUsers(payload.users);
          UserStore.emit(CHANGE_EVENT);
          break;
        case UserConstants.User_RECEIVED:
          var singleResult = addUser(payload.user);
          UserStore.emit(SINGLE_CHANGE_EVENT);
          break;
        case UserConstants.User_REMOVED:
          var singleRemove = removeUser(payload.user);
          UserStore.emit(SINGLE_CHANGE_EVENT);
          break;
        case UserConstants.User_UPDATED:
          var singleUpdate = updateUser(payload.user);
          UserStore.emit(SINGLE_CHANGE_EVENT);
          break;
      }
    })
  });

}(this));

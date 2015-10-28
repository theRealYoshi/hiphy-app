function getRandomColCount(){
  var intArr = [2,5,8]; // add 5
  return intArr[Math.floor(Math.random() * intArr.length)];
}

var AlbumItem = React.createClass({
  mixins: [ReactRouter.History],
  getStateFromStore: function () {
    return AlbumStore.find(parseInt(this.props.params.albumId));
  },
  getUserFromStore: function(userId){
    return UserStore.find(parseInt(userId));
  },
  getInitialState: function(){
    return { album: this.getStateFromStore()};
  },
  _onChange: function(){
    var newAlbum = this.getStateFromStore();
    this.setState({album: newAlbum});
  },
  componentDidMount: function () {
    AlbumStore.addSingleChangeListener(this._onChange);
    UserStore.addSingleChangeListener(this._onChange);
    ApiUtil.fetchSingleAlbum(parseInt(this.props.params.albumId));
  },
  componentWillUnmount: function(){
    AlbumStore.removeChangeListener(this._onChange);
    AlbumStore.removeSingleChangeListener(this._onChange);
  },
  _deleteAlbum: function(event){
    ApiUtil.deleteSingleAlbum(event.currentTarget.value, function(){
      this.history.pushState(null, "/", {});
    }.bind(this));
  },
  _getGifsRows: function(gifs){
    var randNum, rowContainer, GifIndexItem, tempGif;
    var rowContainArr = [];
    var gifCount = 0;
    var tempGifs = this.state.album.gifs.slice(0);
    while (gifCount < this.state.album.gifs.length){
      var tempRow = [];
      currentRowBlockCount = getRandomColCount();
      for (var i = 0; i < currentRowBlockCount; i++) {
        if (gifCount >= gifs.length){
          break;
        }
        tempRow.push(tempGifs.shift());
        gifCount += 1;
      }
      rowContainArr.push(tempRow);
    }
    return rowContainArr;
  },
  render: function(){
    var album = this.state.album;
    var albumTitle, albumGifs, deleteAlbum, username, gifHeader, gifContainer;
    if (album){
      albumTitle = album.album_title;
      albumGifs = album.gifs.map(function(gif){
        return <li>{gif.title}</li>;
      });
      if (albumGifs.length > 0){
        gifHeader = <h3>Gifs</h3>;
        gifContainer = this._getGifsRows(albumGifs);
      } else {
        gifHeader = <div></div>;
      }
      if (album.user_id === CURRENT_USER_ID){
        deleteAlbum =
                      <h5>Delete album?
                      <button type="button"
                              className="btn btn-default btn-xs"
                              onClick={this._deleteAlbum}
                              value={album.id}>
                              <span className='glyphicon glyphicon-remove'
                                    aria-hidden="true"></span>
                      </button>
                      </h5>;
      }
      if (album.user){
        username = album.user.username;
      }
    } else {
      gifHeader = <div></div>;
      gifContainer = [[]];
    }
    return (
      <div className="album-item">
        <h3>Album: {albumTitle}</h3>
        <h4>By: {username}</h4>
        <div className="delete-container">
          {deleteAlbum}
        </div>
        <div className='container'>
          {
            gifContainer.map(function(row){
              return row.length > 0 ? <GifRow rowGifs={row} /> : <div></div>;
            })
          }
        </div>
      </div>
    );
  }
});

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
      albumTitle = <li>{album.album_title}</li>;
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
        deleteAlbum = <button className="album-delete-button"
                              onClick={this._deleteAlbum}
                              value={album.id}>Delete</button>;
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
        <h3>Album</h3>
        <h6>{username}</h6>
        <h6>{albumTitle}</h6>
        <div className='container'>
          {gifHeader}
          {
            gifContainer.map(function(row){
              return row.length > 0 ? <GifRow rowGifs={row} /> : <div></div>;
            })
          }
        </div>
        {deleteAlbum}
      </div>
    );
  }
});

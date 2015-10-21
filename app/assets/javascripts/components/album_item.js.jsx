var AlbumItem = React.createClass({
  mixins: [ReactRouter.History],
  getStateFromStore: function () {
    return AlbumStore.find(parseInt(this.props.params.albumId));
  },
  getUserFromStore: function(userId){
    return UserStore.find(parseInt(userId));
  },
  getInitialState: function(){
    return {
            album: this.getStateFromStore(),
          };
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
  render: function(){
    var album = this.state.album;
    var albumTitle, albumGifs, deleteAlbum, username;
    if (album){
      albumTitle = <li>{album.album_title}</li>;
      albumGifs = album.gifs.map(function(gif){
        return <li>{gif.title}</li>;
      });
      if (album.user_id === CURRENT_USER_ID){
        deleteAlbum = <button className="album-delete-button"
                              onClick={this._deleteAlbum}
                              value={album.id}>Delete</button>;
      }
      username = album.user.username;
    }
    return (
      <div className="album-item">
        <h3>Album</h3>
        <h6>{username}</h6>
        <h6>{albumTitle}</h6>
        <ul>{albumGifs}</ul>
        {deleteAlbum}
      </div>
    );
  }
});

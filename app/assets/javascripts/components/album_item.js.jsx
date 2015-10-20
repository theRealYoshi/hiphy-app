var AlbumItem = React.createClass({
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
  render: function(){
    var album = this.state.album;
    var user = this.state.album.user;
    var albumTitle, albumGifs, username;
    if (album){
      albumTitle = <li>{album.album_title}</li>;
      albumGifs = album.gifs.map(function(gif){
        return <li>{gif.title}</li>;
      });
    }
    if (user){
      username = user.username;
    }
    return (
      <div className="album-item">
        <h3>Album</h3>
        <h6>{username}</h6>
        <h6>{albumTitle}</h6>
        <ul>{albumGifs}</ul>
      </div>
    );
  }
});

var UserProfile = React.createClass({
  _getUser: function(){
    return UserStore.find(parseInt(this.props.params.userId));
  },
  getInitialState: function(){
    return {user: this._getUser()};
  },
  componentDidMount: function(){
    UserStore.addSingleChangeListener(this._userChanged);
    AlbumStore.addSingleChangeListener(this._userChanged);
    ApiUtil.fetchSingleUser(parseInt(this.props.params.userId));
  },
  componentWillUnmount: function(){
    UserStore.removeSingleChangeListener(this._userChanged);
    AlbumStore.removeSingleChangeListener(this._userChanged);
  },
  _userChanged: function(){
    this.setState({user: this._getUser()});
  },
  _navigateAlbum: function(event){
    event.preventDefault();
    this.props.history.pushState(null, 'album/' + event.currentTarget.value, {} );
  },
  render: function(){
    var user = this.state.user;
    var gifs, albums;
    if (user){
      email = user.email;
      albums = user.albums.map(function(album){
        return (
          <button onClick={this._navigateAlbum} value={album.id} >{album.album_title}</button>
        );
      }.bind(this));
      gifs = user.albums.map(function(album){
        album.gifs.map(function(gif){
          return <li>{gif.title}</li>;
        });
      });
    } else {
      email = "";
      gifs = <div></div>;
      albums = <div></div>;
    }
    return (
      <div className='profile-container'>
        <h2>email: {email}</h2>
        <h3>Submitted</h3>
        <ul>
          {gifs}
        </ul>
        <h3>Albums</h3>
        <ul>
          {albums}
        </ul>
      </div>
    );
  }
});

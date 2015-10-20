var UserProfile = React.createClass({
  _getUser: function(){
    return UserStore.find(parseInt(this.props.params.userId));
  },
  getInitialState: function(){
    return {user: this._getUser()};
  },
  componentDidMount: function(){
    UserStore.addSingleChangeListener(this._userChanged);
    ApiUtil.fetchSingleUser(parseInt(this.props.params.userId));
  },
  componentWillUnmount: function(){
    UserStore.removeSingleChangeListener(this._userChanged);
  },
  _userChanged: function(){
    this.setState({user: this._getUser()});
  },
  render: function(){
    var user = this.state.user;
    var gifs, albums;
    if (user){
      email = user.email;
      gifs = user.gifs.map(function(gif){
        return <li>{gif.title}</li>;
      });
      albums = user.albums.map(function(album){
        return <li>{album.album_title}</li>;
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

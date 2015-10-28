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
  _getGifsRows: function(gifs){
    var randNum, rowContainer, GifIndexItem, tempGif;
    var rowContainArr = [];
    var gifCount = 0;
    var tempGifs = gifs.slice(0);
    while (gifCount < gifs.length){
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
    var gifContainer = [];
    var user = this.state.user;
    var gifs, albums, albumHeader, albumContainer;
    if (user){
      username = user.username;
      albums = user.albums;
      if (albums.length > 0){
        albumHeader = <h3>Albums</h3>;
        albumContainer = albums.map(function(album){
            return <AlbumIndexItem album={album} key={album.id} />;
        });
      } else {
        albumHeader = <div></div>;
        albumContainer = <div></div>;
      }
      gifs = albums.map(function(album){
        album.gifs.map(function(gif){
          return <li>{gif.title}</li>;
        });
      });
      gifContainer = this._getGifsRows(user.gifs);
    } else {
      username="";
      email = "";
      gifContainer = [[]];
    }
    return (
      <div className='profile-container'>
        <h3>{username}</h3>
        <div className='index-albums-container'>
          <div className='container'>
            {albumHeader}
            <div className="row">
              {albumContainer}
            </div>
          </div>
        </div>
        <h3>Submitted</h3>
          {
            gifContainer.map(function(row){
              return(
                <GifRow rowGifs={row} />
              );
            })
          }
      </div>
    );
  }
});

var AlbumForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  _getAllAlbums: function(){
    return AlbumStore.all();
  },
  getInitialState: function(){
    return {
      albumTitle: "",
      albums: this._getAllAlbums()
    };
  },
  componentDidMount: function(){
    AlbumStore.addChangeListener(this._albumsChanged);
    ApiUtil.fetchAlbums({user_id: CURRENT_USER_ID});
  },
  componentWillUnmount: function(){
    AlbumStore.removeChangeListener(this._albumsChanged);
  },
  _albumsChanged: function(){
    this.setState({ albums: this._getAllAlbums()});
  },
  _addAlbum: function(event){
    event.preventDefault();
    var data = {
      gif_id: this.props.gifId,
      album_title: this.state.albumTitle
    };
    ApiUtil.createAlbum(data);
  },
  render: function(){
    return (
      <div className="album-container">
        <ul>
            {
              this.state.albums.map(function(album){
                return (
                  <ul>
                    <li>{album.id}</li>
                    <li>{album.album_title}</li>
                  </ul>
                );
              })
            }
        </ul>
        <form className="upload-form" onSubmit={this._addAlbum}>
          <input type='text' valueLink={this.linkState("albumTitle")} />
        </form>
        <button className="add-to-album-button" onClick={this._addToAlbum}>Add to Album</button>
      </div>
    );
  }
});

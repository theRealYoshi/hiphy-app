var AlbumForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  _getUserAlbums: function(){
    return AlbumStore.all();
  },
  getInitialState: function(){
    return {
      albumTitle: "",
      albumId: 0,
      albums: this._getUserAlbums()
    };
  },
  componentDidMount: function(){
    AlbumStore.addChangeListener(this._albumsChanged);
    AlbumStore.addSingleChangeListener(this._albumsChanged);
    ApiUtil.fetchUserAlbums(CURRENT_USER_ID);
  },
  componentWillUnmount: function(){
    AlbumStore.removeChangeListener(this._albumsChanged);
    AlbumStore.removeSingleChangeListener(this._albumsChanged);
  },
  _albumsChanged: function(){
    this.setState({
      albums: this._getUserAlbums(),
      albumTitle: ""
    });
  },
  _addAlbum: function(event){
    event.preventDefault();
    var data = {
      gif_id: this.props.gifId,
      album_title: this.state.albumTitle
    };
    ApiUtil.createAlbum(data);
  },
  _addToAlbum: function(event){
    event.preventDefault();
    var albumId = event.currentTarget.value;
    var data = {
      gif_id: this.props.gifId,
      album_id: albumId
    };
    ApiUtil.addToAlbum(data);
  },
  _returnAddButtonOrDiv: function(album){
    var added = false;
    var gifId = parseInt(this.props.gifId);
    album.gifs.forEach(function(gif){
      if (gif.id === gifId){
        added = true;
      }
    });
    if (added){
      return <div className='added-icon'>Added+</div>;
    } else {
      return <button className="add-to-album-button"
                    onClick={this._addToAlbum}
                    value={album.id}>
                    Add to Album</button>;
    }
  },
  render: function(){
    return (
      <div className="album-container">
        <ul>
            {
              this.state.albums.map(function(album){
                return (
                  <ul>
                    <li>{album.album_title}</li>
                    {this._returnAddButtonOrDiv(album)}
                  </ul>
                );
              }.bind(this))
            }
        </ul>
        <form className="upload-form" onSubmit={this._addAlbum}>
          <input type='text' valueLink={this.linkState("albumTitle")} />
        </form>
      </div>
    );
  }
});

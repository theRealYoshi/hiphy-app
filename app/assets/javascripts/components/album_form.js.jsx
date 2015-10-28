var AlbumForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  _getUserAlbums: function(){
    return AlbumStore.all();
  },
  getInitialState: function(){
    return {
      albumTitle: "",
      albumId: 0,
      albums: []
    };
  },
  componentWillMount: function(){
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
      return <button type="button"
                    className="btn btn-default btn-lg">
                {album.album_title + " "}
                <span className='glyphicon glyphicon-ok'></span>
              </button>;
    } else {
      return <button type="button"
                    className="btn btn-default btn-lg"
                    onClick={this._addToAlbum}
                    value={album.id}>
                    {album.album_title + " "}
                    <span className='glyphicon glyphicon-plus'
                          aria-hidden="true"></span>
            </button>;
    }
  },
  render: function(){
    return (
      <div className="album-container">
        <h4>Add to Album: </h4>
          {
            this.state.albums.map(function(album){
              return this._returnAddButtonOrDiv(album);
            }.bind(this))
          }
        <div className="album-container-form">
          <h4>Create an Album: </h4>
            <form className="form-inline" role="form" onSubmit={this._addAlbum}>
              <div class="form-group">
                  <input type='text'
                         className="form-control"
                         valueLink={this.linkState("albumTitle")}
                         placeholder="Album Name"
                         aria-describedby="sizing-addon1"/>
              </div>
            </form>
        </div>
      </div>
    );
  }
});

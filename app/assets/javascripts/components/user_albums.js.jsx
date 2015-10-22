var UserAlbums = React.createClass({
  mixins: [ReactRouter.History],
  _navigateAlbum: function(event){
    event.preventDefault();
    this.history.pushState(null, 'album/' + event.currentTarget.value, {} );
  },
  render: function(){
    var albums;
    if (this.props.albums){
      albums = this.props.albums.map(function(album){
        return <a onClick={this._navigateAlbum} value={album.id} >{album.album_title}</a>;
      }.bind(this));
    } else {
      albums = <div></div>;
    }
    return (
      <div className="user-albums">
        <h3>Albums</h3>
        <ul>
          {albums}
        </ul>
      </div>
    );
  }
});

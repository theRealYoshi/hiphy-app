function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var AlbumIndexItem = React.createClass({
  mixins: [ReactRouter.History],
  _getRandomGif: function(){
    var max = this.props.album.gifs.length - 1;
    return this.props.album.gifs[getRandomInt(0, max)];
  },
  getInitialState: function(){
    return {
      hovered: false,
      gif: this._getRandomGif()
    };
  },
  _onHover: function(){
    this.setState({hovered: true});
  },
  _onHoverOut: function(){
    this.setState({hovered: false});
  },
  _navigateShow:function(){
    var userId = this.props.album.user_id;
    var albumTitle = this.props.album.album_title.split(" ").concat("-");
    var albumId = this.props.album.id;
    this.history.pushState(null,
                  '/album/' + albumId,
                  {});
  },
  render: function(){
    var album = this.props.album;
    var gif = this.state.gif;
    var imgSrc = '';
    if (this.state.hovered){
      imgSrc = gif.url;
    } else {
      imgSrc = gif.url.slice(0, -3) + 'png';
    }
    return (
      <div className='album-index-item'>
        {album.album_title}
        <br />
        Url: {imgSrc}
        <br />
        <img src={imgSrc}
             onMouseEnter={this._onHover}
             onMouseOut={this._onHoverOut}
             onClick={this._navigateShow}/>
        <br />
      </div>
    );
  }
});

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
    if (this.state.hovered && this.state.gif){
      imgSrc = gif.url;
    } else if (!this.state.hovered && this.state.gif){
      imgSrc = gif.url.slice(0, -3) + 'png';
    } else if ( this.state.hovered && !this.state.gif){
      //hovered and no gifs in album
      imgSrc =  "https://res.cloudinary.com/dpbquh1uj/image/upload/v1445537574/tumblr_n85k6gA6TG1tzyfmgo1_500_wzgtfn.gif";
    } else {
      // not hovered and no gifs
      imgSrc = "https://res.cloudinary.com/dpbquh1uj/image/upload/v1445537574/tumblr_n85k6gA6TG1tzyfmgo1_500_wzgtfn.png";
    }
    return (
      <div className="col-sm-4">
        <div className='album-index-item' >
          <img src={imgSrc}
               onMouseEnter={this._onHover}
               onMouseOut={this._onHoverOut}
               onClick={this._navigateShow}
               className="album-index-item-image"/>
          <br />
        </div>
      </div>
    );
  }
});

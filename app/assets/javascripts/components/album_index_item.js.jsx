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
  _concatImgSrc: function(imgSrc){
      var splitArr = imgSrc.split("/image/upload");
      splitArr.splice(1,0,"/image/upload");
      splitArr.splice(2,0,"/w_292,h_200,c_fill");
      return splitArr.join("");
  },
  render: function(){
    var className = "album-index-item";
    var album = this.props.album;
    var gif = this.state.gif;
    var imgSrc = '';
    if (this.state.hovered && this.state.gif){
      imgSrc = gif.url;
    } else if (!this.state.hovered && this.state.gif){
      imgSrc = gif.url.slice(0, -3) + 'png';
    } else if ( this.state.hovered && !this.state.gif){
      //hovered and no gifs in album
      imgSrc =  "http://res.cloudinary.com/dpbquh1uj/image/upload/v1445537574/tumblr_n85k6gA6TG1tzyfmgo1_500_wzgtfn.gif";
    } else {
      // not hovered and no gifs
      imgSrc = "http://res.cloudinary.com/dpbquh1uj/image/upload/v1445537574/tumblr_n85k6gA6TG1tzyfmgo1_500_wzgtfn.png";
    }
    fittedImg = this._concatImgSrc(imgSrc);
    return (
      <div className="col-sm-4">
        <div className='album-index-item' >
          <img src={fittedImg}
               onMouseEnter={this._onHover}
               onMouseOut={this._onHoverOut}
               onClick={this._navigateShow}
               className="album-index-item-image" />
           <h6>
             <span className='album-index-item-title'>
               {this.props.album.album_title}
             </span>
           </h6>
        </div>
      </div>
    );
  }
});

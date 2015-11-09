
var GifIndexItem = React.createClass({
  mixins: [ReactRouter.History],
  getInitialState: function(){
    return {
      hovered: false,
    };
  },
  _onHover: function(){
    this.setState({
      hovered: true
    });
  },
  _onHoverOut: function(){
    this.setState({
      hovered: false
    });
  },
  _navigateShow: function(){
    this.history.pushState(null, '/gifs/' + this.props.gif.id, {});
  },
  _concatImgSrc: function(imgSrc){
      var splitArr = imgSrc.split("/image/upload");
      var widthHeight;
      splitArr.splice(1,0,"/image/upload");
      switch(this.props.bootStrap){
        case "col-sm-12 only-nested":
          widthHeight = "/w_482,h_270,c_fill";
          break;
        case "col-sm-6":
          widthHeight = "/w_482,h_270,c_fill";
          break;
        case "col-sm-6 middle":
          widthHeight = "/w_482,h_266,c_fill";
          break;
        case "col-sm-3":
          widthHeight = "/w_240,h_132,c_fill";
          break;
        case "col-sm-6 nested":
          widthHeight = "/w_240,h_132,c_fill";
          break;
        case "col-sm-12 nested":
          widthHeight = "/w_240,h_132,c_fill";
          break;
      }
      splitArr.splice(2,0,widthHeight);
      return splitArr.join("");
  },
  _getImageSrc: function(){
    if (this.state.hovered){
      return this._concatImgSrc(this.props.gif.url);
    } else {
      return this._concatImgSrc(this.props.gif.url.slice(0, -3) + 'png');
    }
  },
  render: function(){
    return (
      <div>
        <TagGifIndexItem tags={this.props.tags} />
        <div className={this.props.bootStrap}>
          <div className="gif-index-item" id={this.props.middle}>
            <img src={this._getImageSrc()}
                 onMouseEnter={this._onHover}
                 onMouseOut={this._onHoverOut}
                 onClick={this._navigateShow}
                 className="gif-index-item-image"/>
          </div>
        </div>
      </div>
    );
  }
});

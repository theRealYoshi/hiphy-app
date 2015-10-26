
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
  render: function(){
    var className = "gif-index-item";
    var imageClassName = "gif-index-item-image";
    var imgSrc, nyanLoad;
    if (this.state.hovered){
      imgSrc = this.props.gif.url;
    } else {
      imgSrc = this.props.gif.url.slice(0, -3) + 'png';
    }
    fittedImg = this._concatImgSrc(imgSrc);
    return (
      <div className={this.props.bootStrap}>
        <div className={className} id={this.props.middle}>
          <img src={fittedImg}
               onMouseEnter={this._onHover}
               onMouseOut={this._onHoverOut}
               onClick={this._navigateShow}
               className={imageClassName}>
               {this.props.gif.gif_tag}
          </img>
        </div>
      </div>
    );
  }
});

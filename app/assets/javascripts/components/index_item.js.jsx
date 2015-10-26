
var GifIndexItem = React.createClass({
  mixins: [ReactRouter.History],
  getInitialState: function(){
    return {
      hovered: false,
      loading: false,
      gif: this.props.gif,
      gif_url: this.props.gif.url
    };
  },
  _onImageLoad: function() {
    console.log("loaded");
    console.log(Date.now());
    this.setState({loading: false});
    console.log(this.refs.img.getDOMNode().className);
  },
  _onHover: function(){
    this.setState({hovered: true});
    this.setState({loading: true});
    console.log(this.refs.img.getDOMNode().className);
    console.log(Date.now());
    console.log("hovering");
    // You may want to rename the component if the <Image> definition
    // overrides window.Image
    var img = new window.Image();
    img.src = this.state.gif_url;
    img.onload = this._onImageLoad;
  },
  _onHoverOut: function(){
    this.setState({hovered: false});
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
    if (this.state.loading){
      nyanLoad = <img src="assets/nyan_cat.gif" className="loading"/>;
    }
    if (this.state.hovered){
      imgSrc = this.state.gif_url;
    } else {
      imgSrc = this.state.gif_url.slice(0, -3) + 'png';
    }
    fittedImg = this._concatImgSrc(imgSrc);
    return (
      <div className={this.props.bootStrap}>
        <div className={className} id={this.props.middle}>
          {nyanLoad}
          <img src={fittedImg}
               ref="img"
               onMouseEnter={this._onHover}
               onMouseOut={this._onHoverOut}
               onClick={this._navigateShow}
               className={imageClassName}/>
        </div>
      </div>
    );
  }
});

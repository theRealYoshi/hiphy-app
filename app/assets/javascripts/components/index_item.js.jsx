var GifIndexItem = React.createClass({
  mixins: [ReactRouter.History],
  getInitialState: function(){
    return {hovered: false};
  },
  _onHover: function(){
    this.setState({hovered: true});
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
        case "col-sm-6":
          widthHeight = "/w_481,h_271,c_fill";
          break;
        case "col-sm-3":
          widthHeight = "/w_240,h_133,c_fill";
          break;
        case "col-sm-6 nested":
          widthHeight = "/w_240,h_133,c_fill";
          break;
        case "col-sm-12 nested":
          widthHeight = "/w_240,h_133,c_fill";
          break;
      }
      splitArr.splice(2,0,widthHeight);
      return splitArr.join("");
  },
  render: function(){
    var gif = this.props.gif;
    var imgSrc = '';
    if (this.state.hovered){
      imgSrc = gif.url;
    } else {
      imgSrc = gif.url.slice(0, -3) + 'png';
    }
    fittedImg = this._concatImgSrc(imgSrc);
    return (
      <div className={this.props.bootStrap}>
        <div className='gif-index-item'>
          {gif.title}
          <br />
          <img src={fittedImg}
               onMouseEnter={this._onHover}
               onMouseOut={this._onHoverOut}
               onClick={this._navigateShow}
               className="gif-index-item-image"/>
          <br />
          {
            gif.tags.map(function(tag){
              return "#" + tag.tag_title;
            })
          }
        </div>
      </div>
    );
  }
});

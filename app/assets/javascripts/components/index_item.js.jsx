var IndexItem = React.createClass({
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
  _navigateShow:function(){
    console.log("clicked");
    this.history.pushState(null, '/gifs/' + this.props.gif.id, {});
  },
  render: function(){
    var gif = this.props.gif;
    var imgSrc = '';
    if (this.state.hovered){
      imgSrc = gif.url;
    } else {
      imgSrc = gif.url.slice(0, -3) + 'png';
    }
    // // set gif based on whether it's hovering
    return (
      <div className='gif-index-item'>
        {gif.title}
        <br />
        Url: {imgSrc}
        <br />
        <img src={imgSrc}
             onMouseEnter={this._onHover}
             onMouseOut={this._onHoverOut}
             onClick={this._navigateShow}/>
        <br />
        {
          gif.tags.map(function(tag){
            return "#" + tag.tag_title;
          })
        }
      </div>
    );
  }
});

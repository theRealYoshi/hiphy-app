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
    this.history.pushState(null, '/gifs/' + this.props.gif.id, {});
  },
  _deleteLink: function(id){
    ApiUtil.deleteSingleGif(parseInt(id), function(){
      this.history.pushState(null, '/', {});
    }.bind(this));
  },
  render: function(){
    var gif = this.props.gif;
    var imgSrc = '';
    if (this.state.hovered){
      imgSrc = gif.url;
    } else {
      imgSrc = gif.url.slice(0, -3) + 'png';
    }
    if(gif.submitter_id === CURRENT_USER_ID) {
      var delete_link = <button onClick={this._deleteLink.bind(null, gif.id)}>Delete</button>;
    }
    return (
      <div className='index-item'>
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
        <br />
        {
          {delete_link}
        }
      </div>
    );
  }
});

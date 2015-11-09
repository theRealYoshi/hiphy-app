var TagGifIndexItem = React.createClass({
  render: function(){
      return (
        <div className={this.props.bootStrap}>
          <div className="gif-index-item-tag" id={this.props.middle}>
            {
              this.props.tags.map(function(tag){
                return "#" + tag.tag_title + " ";
              })
            }
          </div>
        </div>
      )
  }
});

var TagGifIndexItem = React.createClass({
  render: function(){
      return (
        <div>
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

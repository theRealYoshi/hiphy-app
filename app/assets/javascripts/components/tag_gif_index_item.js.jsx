var TagGifIndexItem = React.createClass({
  render: function(){
      return (
        <div className="gif-index-item-tag">
          {
            this.props.tags.map(function(tag){
              return "#" + tag.tag_title + " ";
            })
          }
        </div>
      )
  }
});

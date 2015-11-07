var TagGifIndexItem = React.createClass({
  render: function(){
      return (
        <div>
          {
            this.props.tags.map(function(tag){
              return tag.tag_title;
            })
          }
        </div>
      )
  }
});

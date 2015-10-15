var gifItem = React.createClass({
  mixins: [ReactRouter.History],
  getStateFromStore: function () {
    return { gif: GifStore.find(parseInt(this.props.params.gifId)) };
  },
  getInitialState: function(){
    return this.getStateFromStore();
  },
  _onChange: function(){
    this.setState(this.getStateFromStore());
  },
  componentWillMount: function(){
    ApiUtil.fetchSingleGif(parseInt(this.props.params.gifId));
  },
  componentDidMount: function () {
    GifStore.addSingleChangeListener(this._onChange);
    ApiUtil.fetchSingleGif(parseInt(this.props.params.gifId));
  },
  componentWillUnmount: function(){
    GifStore.removeChangeListener(this._onChange);
  },
  _deleteLink: function(id){
    ApiUtil.deleteSingleGif(id, function(){
      this.history.pushState(null, '/', {});
    }.bind(this));
  },
  render: function(){
    if(this.state.gif === undefined) { return <div></div>; }
    if(this.state.gif.submitter_id === CURRENT_USER_ID) {
      var delete_link = <button onClick={this._deleteLink.bind(null, this.state.gif.id)}>Delete</button>;
    } // use this .props for index?
    var gif = this.state.gif;
    return (
      <div>
        {gif.title}
        <img src={gif.url} />
        Url: {gif.url},
        Submitter: {gif.submitter},
        shortened_url: {gif.shortened_url},
        {delete_link}
        <br />
        {
          gif.tags.map(function(tag){
            return "#" + tag.tag_title;
          })
        }
        <br />
      </div>
    );
  }
});

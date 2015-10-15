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
  render: function(){
    if(this.state.gif === undefined) { return <div></div>; }
      var gif = this.state.gif;
    return (
      <div>
        {gif.title}
        <img src={gif.url} />
        Url: {gif.url}, 
        Submitter: {gif.submitter}
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

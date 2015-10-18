var Index = React.createClass({
  mixins: [ReactRouter.History],
  _getAllGifs: function(){
    return GifStore.all();
  },
  getInitialState: function(){
    return {
      gifs: this._getAllGifs(),
      query: ""
    };
  },
  _gifsChanged: function(){
    this.setState({ gifs: this._getAllGifs()});
  },
  componentWillMount: function(){
    ApiUtil.fetchGifs({tag: this.state.query});
  },
  componentDidMount: function(){
    GifStore.addChangeListener(this._gifsChanged);
    GifStore.addSingleChangeListener(this._gifsChanged);
    ApiUtil.fetchGifs({tag: this.state.query});
  },
  componentWillUnmount: function(){
    GifStore.removeChangeListener(this._gifsChanged);
    GifStore.removeSingleChangeListener(this._gifsChanged);
  },
  componentWillReceiveProps: function(nextProps){
    console.log(nextProps);
    this.setState({query: nextProps.params.query});
    ApiUtil.fetchGifs({tag: nextProps.params.query});
  },
  render: function(){
    return (
      <div className='index'>
        {
          this.state.gifs.map(function(gif){
            return <IndexItem gif={gif} key={gif.id} />;
          })
        }
      </div>
    );
  }
});

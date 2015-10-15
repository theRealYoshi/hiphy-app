var Index = React.createClass({
  _getAllGifs: function(){
    return GifStore.all();
  },
  getInitialState: function(){
    return {
      gifs: this._getAllGifs()
    };
  },
  _gifsChanged: function(){
    this.setState({ gifs: this._getAllGifs()});
  },
  componentDidMount: function(){
    GifStore.addChangeListener(this._gifsChanged);
    GifStore.addSingleChangeListener(this._gifsChanged);
    ApiUtil.fetchGifs();
  },
  componentWillUnmount: function(){
    GifStore.removeChangeListener(this._gifsChanged);
    GifStore.removeSingleChangeListener(this._gifsChanged);
  },
  render: function(){
    return (
      <div>
        <h1>Index</h1>
        {
          this.state.gifs.map(function(gif){
            return <IndexItem gif={gif} key={gif.id} />;
          })
        }
      </div>
    );
  }
});

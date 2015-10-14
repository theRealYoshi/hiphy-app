(function(root) {
  function _getAllGifs(){
    return GifStore.all();
  }
  root.Search = React.createClass({
    getInitialState: function(){
      return {
        gifs: _getAllGifs()
      };
    },
    _gifsChanged: function(){
      this.setState({ gifs: _getAllGifs()});
    },
    componentDidMount: function(){
      GifStore.addChangeListener(this._gifsChanged);
      ApiUtil.fetchGifs();
    },
    componentWillUnmount: function(){
      GifStore.removeChangeListener(this._gifsChanged);
    },
    render: function(){
      return (
        <div>
          <input type='text'/>
          <Index gifs={this.state.gifs} />
        </div>
      );
    }
  });
}(this));

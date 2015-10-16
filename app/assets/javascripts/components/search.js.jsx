(function(root) {
  root.Search = React.createClass({
    mixins: [React.addons.LinkedStateMixin, ReactRouter.History],
    _getAllGifs: function(){
      return GifStore.all();
    },
    getInitialState: function(){
      return {
        inputVal: '',
        gifs: this._getAllGifs()};
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
    _handleInput: function (event) {
      event.preventDefault();
      this.setState({inputVal: event.currentTarget.value});
      ApiUtil.fetchGifs({tag: event.currentTarget.value});
      this.history.pushState(null, "/search/?" + this.state.inputVal, {});
    },
    _handleSubmit: function (event) {
      event.preventDefault();
      ApiUtil.fetchGifs({tag: this.state.inputVal});
      this.history.pushState(null, "/search/?" + this.state.inputVal, {});
    },
    render: function(){
      return (
        <div>
          <form onSubmit={this._handleSubmit}>
            <input
              class='search-query'
              onChange={this._handleInput}
              value={this.state.inputVal}/>
            <input type="submit" value="change this to one of those cool looking search buttons"/>
          </form>
          <Index gifs={this.state.gifs} />
        </div>
      );
    }
  });
}(this));

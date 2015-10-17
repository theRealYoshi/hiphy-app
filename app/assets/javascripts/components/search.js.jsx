(function(root) {
  root.Search = React.createClass({
    mixins: [ReactRouter.History],
    getInitialState: function(){
      return {
        inputVal: '',
        searching: false
      };
    },
    _handleInput: function (event) {
      event.preventDefault();
      var str = event.currentTarget.value;
      // this.setState({inputVal: event.currentTarget.value});
      if (str === ""){
        this.history.pushState(null, "/", {});
      } else {
        this.history.pushState(null, "/search/" + str, {});
      }
      this.setState({ inputVal: str});
    },
    _handleSubmit: function (event) {
      event.preventDefault();
      if (this.state.inputVal){
        this.history.pushState(null, "/search/" + this.state.inputVal, {});
      } else {
        this.history.pushState(null, "/", {});
      }
      this.setState({inputVal: str});
    },
    render: function(){
      var searchTag;
      if (this.state.inputVal){
        searchTag = <h2>Searching for: {this.state.inputVal}</h2>;
      } else {
        searchTag = <h2></h2>;
      }
      return (
        <div>
          <form onSubmit={this._handleSubmit}>
            <input
              class='search-query'
              onChange={this._handleInput}
              value={this.state.inputVal}/>
            <input type="submit" value="change this to one of those cool looking search buttons"/>
          </form>
          {searchTag}
        </div>
      );
    }
  });
}(this));

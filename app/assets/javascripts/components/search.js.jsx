(function(root) {
  root.Search = React.createClass({
    mixins: [ReactRouter.History],
    getInitialState: function(){
      return {
        inputVal: '',
        searching: false
      };
    },
    componentDidMount: function(){
      $( "#search-input" ).focus(function() {
        $("#submit-button").addClass("active");
      });
    },
    _handleInput: function (event) {
      event.preventDefault();
      var str = event.currentTarget.value;
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
    },
    render: function(){
      var searchTag;
      if (this.state.inputVal){
        searchTag = <div className='searchContent'><h2>Searching for: {this.state.inputVal}</h2></div>;
      } else {
        searchTag = <div className='searchContent'><h2></h2></div>;
      }
      return (
        <div className='search'>
          <div className='searchBar'>
            <form className='searchBar-form' onSubmit={this._handleSubmit}>
              <input
                class='search-query'
                id='search-input'
                onChange={this._handleInput}
                value={this.state.inputVal}/>
              <button id='submit-button' type="submit" value="search"/>
            </form>
          </div>
          {searchTag}
          {this.props.children}
        </div>
      );
    }
  });
}(this));

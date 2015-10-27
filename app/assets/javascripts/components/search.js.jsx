function getRandomSubarray(arr, size) {
  var shuffled = arr.slice(0), i = arr.length, temp, index;
  while (i--) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
  }
  return shuffled.slice(0, size);
}

(function(root) {
  root.Search = React.createClass({
    mixins: [ReactRouter.History],
    _getSingleTag: function(){
      return TagStore.all();
    },
    getInitialState: function(){
      return {
        inputVal: '',
        tags: []
      };
    },
    componentDidMount: function(){
      $( "#search-input" ).focus(function() {
        $("#submit-button").addClass("active");
      });
      GifStore.addTagChangeListener(this._tagChanged);
    },
    componentWillUnmount: function(){
      GifStore.removeTagChangeListener(this._tagChanged);
    },
    _tagChanged: function(){
      var searchTerm = this.props.params.query;
      this.setState({inputVal: searchTerm });
      this.history.pushState(null, "/search/" + searchTerm, {});
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
      console.log(this.state.inputVal);
      return (
        <div className='search'>
          <div className='searchBar'>
            <form className='searchBar-form' onSubmit={this._handleSubmit}>
              <input
                className='search-query'
                id='search-input'
                onChange={this._handleInput}
                value={this.state.inputVal}/>
              <button id='submit-button' type="submit" value="search"/>
            </form>
          </div>
          <div className="searchContent">
          </div>
          {searchTag}
          {this.props.children}
        </div>
      );
    }
  });
}(this));

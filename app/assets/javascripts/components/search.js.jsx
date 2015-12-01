function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  }
}

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
      GifStore.addTagChangeListener(debounce(this._tagChanged, 1000));
    },
    componentWillUnmount: function(){
      GifStore.removeTagChangeListener(debounce(this._tagChanged, 1000));
    },
    componentWillReceiveProps: function(nextProps){
      var clearSearch = nextProps.location.state;
      if(clearSearch && clearSearch.params === "home"){
        this.setState({inputVal: ""});
      }
    },
    _tagChanged: function(){
      var searchTerm = this.props.params.query;
      this.setState({inputVal: searchTerm });
      debounce(function(){
        this.history.pushState(null, "/search/" + searchTerm, {});
      }.bind(this), 500);
    },
    _handleInput: function (event) {
      event.preventDefault();
      var str = event.currentTarget.value;
      this.setState({ inputVal: str});
      debounce(this._pushState(str), 500, true);
    },
    _pushState: function(str){
        if (str === ""){
          this.history.pushState(null, "/", {});
        } else {
          this.history.pushState(null, "/search/" + str, {});
        }
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
        searchTag = <div></div>;
      }
      return (
        <div className='search'>
          <div className='searchBar'>
            <form className='searchBar-form' onSubmit={this._handleSubmit}>
              <input
                className='search-query'
                id='search-input'
                onChange={this._handleInput}
                placeholder="Search Tag Name Or Album Name"
                value={this.state.inputVal}/>
            </form>
          </div>
          {searchTag}
          {this.props.children}
        </div>
      );
    }
  });
}(this));

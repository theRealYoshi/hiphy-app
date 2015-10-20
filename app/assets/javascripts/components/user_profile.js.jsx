var UserProfile = React.createClass({
  _getUser: function(){
    return ApiUtil.fetchSingleUser(this.props.params.userId);
  },
  getInitialState: function(){
    return {user: this._getUser()};
  },
  componentWillMount: function(){
    UserStore.addSingleChangeListener(this._userChanged);
    this._getUser();
  },
  componentWillUnmount: function(){
    UserStore.removeSingleChangeListener(this._userChanged);
  },
  _userChanged: function(){
    this.setState({user: this._getUser()});
  },
  render: function(){
    var user = this.state.user;
    return (
      <div className='profile-container'>
        <ul>
          <li>{user}</li>
        </ul>
      </div>
    );
  }
});

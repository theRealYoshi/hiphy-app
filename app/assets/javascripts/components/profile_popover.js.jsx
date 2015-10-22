var ProfilePopOver = React.createClass({
  mixins: [ReactRouter.History],
  _logOut: function(){
    ApiUtil.removeSingleUser(function(){
      this.history.pushState(null, '/', {});
    }.bind(this));
  },
  render: function(){
    var popover;
    if (this.props.clicked){
      popover = <ul>
        <li>Profile</li>
        <li>My Albums</li>
        <li><a onClick={this._logOut}>Logout</a></li>
      </ul>;
    } else {
      popover = <div></div>;
    }
    return (
      <div className='profile-popover'>
        {popover}
      </div>
    );
  }
});

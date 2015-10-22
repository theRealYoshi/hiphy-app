var ProfilePopOver = React.createClass({
  mixins: [ReactRouter.History],

  render: function(){
    var popover;
    if (this.props.clicked){
      popover = <ul>
        <li><a onClick={this._navigateProfile}>My Profile</a></li>
        <li><a onClick={this._navigateAlbums}>My Albums</a></li>
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

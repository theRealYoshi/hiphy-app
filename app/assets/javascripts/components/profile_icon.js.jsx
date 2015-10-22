var ProfileIcon = React.createClass({
  mixins: [ReactRouter.History],
  getInitialState: function(){
    return {
      profileHovered: false,
      clicked: false
    };
  },
  componentDidMount: function () {
    window.addEventListener('click', this._pageClick, false);
  },
  componentWillUnmount: function () {
    window.addEventListener('click', this._pageClick, false);
  },
  _pageClick: function(event){
    if (this.getDOMNode().contains(event.target)){
      return;
    }
    this.setState({clicked: false});
  },
  _handleMouseOver: function(event){
    switch(event.currentTarget.id){
      case "profile":
      this.setState({profileHovered: true});
      break;
    }
  },
  _handleMouseOut: function(event){
    switch(event.currentTarget.id){
      case "profile":
      this.setState({profileHovered: false});
      break;
    }
  },
  _popOverActivate: function(){
    if (this.state.clicked){
      this.setState({clicked: false});
    } else {
      this.setState({clicked: true});
    }
  },
  _navigateProfile: function(){
    this.history.pushState(null, '/profile/' + CURRENT_USER_ID, {});
    this.setState({clicked: false});
  },
  _navigateAlbums: function(){
    this.history.pushState(null, '/profile/' + CURRENT_USER_ID, {});
    this.setState({clicked: false});
  },
  _logOut: function(){
    ApiUtil.removeSingleUser(function(){
      window.location = '/';
    });
  },
  render: function(){
    var profileImg, popOver;
    if (this.state.profileHovered){
      profileImg = <img className='image' src='/assets/thumbs-up.gif' />;
    } else {
      profileImg = <img className='image' src='/assets/thumbs-up.png'/>;
    }
    if (this.state.clicked){
      popOver = <ul>
        <li className='profile-popover-list' onClick={this._navigateProfile}><a>My Profile</a></li>
        <li className='profile-popover-list' onClick={this._navigateAlbums}><a>My Albums</a></li>
        <li className='profile-popover-list' onClick={this._logOut}><a>Logout</a></li>
      </ul>;
    } else {
      popOver = <div></div>;
    }
    return (
      <div className='profile'>
        <div className='dropdown-toggle profile-button-container'>
          <a className='profile-button'
              onClick={this._popOverActivate}
              onMouseOver={this._handleMouseOver}
              onMouseOut={this._handleMouseOut}
              id="profile">
            {profileImg}
          </a>
        </div>
        <div className='profile-popover'>
          {popOver}
        </div>
      </div>
    );
  }
});

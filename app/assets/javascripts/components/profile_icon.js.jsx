var ProfileIcon = React.createClass({
  mixins: [ReactRouter.History],
  getInitialState: function(){
    return {
      profileHovered: false,
      clicked: false
    };
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
    //this.history.pushState(null,'/profile/' + CURRENT_USER_ID, {});
  },
  render: function(){
    var profileImg;
    if (this.state.profileHovered){
      profileImg = <img className='image' src='/assets/thumbs-up.gif' />;
    } else {
      profileImg = <img className='image' src='/assets/thumbs-up.png'/>;
    }
    return (
      <div className='profile'>
        <div className='profile-button-container'>
          <a className='profile-button'
              onClick={this._popOverActivate}
              onMouseOver={this._handleMouseOver}
              onMouseOut={this._handleMouseOut}
              id="profile">
            {profileImg}
          </a>
        </div>
        <ProfilePopOver className='profile-popover' clicked={this.state.clicked}/>
      </div>
    );
  }
});

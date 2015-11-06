(function(root) {
  root.Navbar = React.createClass({
    mixins: [ReactRouter.History],
    getInitialState: function(){
      return {
        profileHovered: false,
        uploadHovered: false,
        logoHovered: false,
        loggedIn: false
      };
    },
    _handleMouseOver: function(event){
      switch(event.currentTarget.id){
        case "profile":
        this.setState({profileHovered: true});
        break;
        case "upload":
        this.setState({uploadHovered: true});
        break;
        case "logo":
        this.setState({logoHovered: true});
        break;
      }
    },
    _handleMouseOut: function(event){
      switch(event.currentTarget.id){
        case "profile":
        this.setState({profileHovered: false});
        break;
        case "upload":
        this.setState({uploadHovered: false});
        break;
        case "logo":
        this.setState({logoHovered: false});
      }
    },
    _navigateUser: function(){
      this.history.pushState(null,'/profile/' + CURRENT_USER_ID, {});
    },
    _navigateUpload: function(){
      if (CURRENT_USER_ID === -1){
        window.location = "/session/new";
      } else {
        this.history.pushState(null, "/upload", {});
      }
    },
    _navigateHome: function(){
      this.history.pushState(null, "/", {});
    },
    render: function(){
      var uploadImg, logoImg, profileImg;
      if (this.state.logoHovered){
        logoImg = <img className='image' src="/assets/red-bridge-white.png" />;
      } else {
        logoImg = <img className='image' src="/assets/red-bridge-black.png" />;
      }
      if (CURRENT_USER_ID === -1){
        profileImg = <LoginIcon />;
      } else {
        profileImg = <ProfileIcon />;
      }
      return (
        <div className='header'>
          <div className='navbar-container'>
            <div className='logo-container'>
              <a className='logo-link'
                  onClick={this._navigateHome}
                  onMouseOver={this._handleMouseOver}
                  onMouseOut={this._handleMouseOut}
                  id="logo">
                {logoImg}
              </a>
            </div>
            <div className='nav-wrapper'>
              <div className='default-nav'>
                 <a className='upload-button'
                    onClick={this._navigateUpload}
                    onMouseOver={this._handleMouseOver}
                    onMouseOut={this._handleMouseOut}
                    id="upload">
                  Upload
                </a>
                {profileImg}
              </div>
            </div>
          </div>
        </div>
      );
    }
  });

}(this));

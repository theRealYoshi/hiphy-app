(function(root) {
  root.Navbar = React.createClass({
    mixins: [ReactRouter.History],
    getInitialState: function(){
      return {
        profileHovered: false,
        uploadHovered: false,
        logoHovered: false
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
      if (CURRENT_USER_ID !== -1){
        this.history.pushState(null, "/upload", {});
      } else {
        this.history.pushState(null, "/", {});
      }
    },
    _navigateHome: function(){
      this.history.pushState(null, "/", {});
    },
    render: function(){
      var profileImg, uploadImg;
      if (this.state.profileHovered){
        profileImg = <img className='image' src='/assets/thumbs-up.gif' />;
      } else {
        profileImg = <img className='image' src='/assets/thumbs-up.png'/>;
      }
      if (this.state.uploadHovered){
        uploadImg = <img className='image' src='/assets/plus-blue.png' />;
      } else {
        uploadImg = <img className='image' src='/assets/plus-yellow.png' />;
      }
      if (this.state.logoHovered){
        logoImg = <img className='image' src="/assets/red-bridge-white.png" />;
      } else {
        logoImg = <img className='image' src="/assets/red-bridge-black.png" />;
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
                  {uploadImg}
                </a>
                <a className='profile-button'
                    onClick={this._navigateUser}
                    onMouseOver={this._handleMouseOver}
                    onMouseOut={this._handleMouseOut}
                    id="profile">
                  {profileImg}
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }
  });

}(this));

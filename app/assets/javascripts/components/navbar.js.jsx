(function(root) {
  root.Navbar = React.createClass({
    mixins: [ReactRouter.History],
    getInitialState: function(){
      return {
        profileHovered: false,
        uploadHovered: false
      };
    },
    _handleMouseOver: function(event){
      switch(event.currentTarget.id){
        case "profile":
        this.setState({profileHovered: true});
        break;
        case "upload":
        this.setState({uploadHovered: true});
      }
    },
    _handleMouseOut: function(event){
      switch(event.currentTarget.id){
        case "profile":
        this.setState({profileHovered: false});
        break;
        case "upload":
        this.setState({uploadHovered: false});
      }
    },
    _navigateUser: function(){
      this.history.pushState(null,'/profile/' + CURRENT_USER_ID, {});
    },
    _navigateUpload: function(){
      this.history.pushState(null, "/upload", {});
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
      return (
        <div className='header'>
          <div className='navbar-container'>
            <div className='logo-container'>
              <a className='logo-link' onClick={this._navigateHome}>
                <img className='image' src="/assets/hiphy-logo-red.png" />
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

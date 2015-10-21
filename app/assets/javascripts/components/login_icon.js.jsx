var LoginIcon = React.createClass({
  mixins: [ReactRouter.History],
  getInitialState: function(){
    return {loginHovered: false};
  },
  _handleMouseOver: function(event){
    switch(event.currentTarget.id){
      case "login":
      this.setState({loginHovered: true});
      break;
    }
  },
  _handleMouseOut: function(event){
    switch(event.currentTarget.id){
      case "login":
      this.setState({loginHovered: false});
      break;
    }
  },
  _navigateLoginPage: function(){
    window.location = "/session/new";
  },
  render: function(){
    var loginImg;
    if (this.state.loginHovered){
      loginImg = <img className='image' src='/assets/login.gif' />;
    } else {
      loginImg = <img className='image' src='/assets/login.png'/>;
    }
    return (
      <a className='login-button'
          onClick={this._navigateLoginPage}
          onMouseOver={this._handleMouseOver}
          onMouseOut={this._handleMouseOut}
          id="login">
        {loginImg}
      </a>
    );
  }
});

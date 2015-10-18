(function(root) {
  root.Navbar = React.createClass({
    render: function(){
      return (
        <div className='header'>
          <div className='navbar-container'>
            <div className='logo-container'>
              <a href='/' className='logo-link'>
                <img className='image' src="/assets/hiphy-logo-red.png" />
              </a>
            </div>
            <div className='nav-wrapper'>
              <div className='default-nav'>
                <a className='collection-button'>collections</a>
                <a className='sign-button'>Sign In</a>
                <a className='upload-button'>Upload</a>
              </div>
            </div>
          </div>
        </div>
      );
    }
  });

}(this));

(function(root) {
  root.Navbar = React.createClass({
    render: function(){
      return (
        <div class='navbar'>
            <div class='logo'>
              <a href='/' class='logo-link'>
                <img className='image' src="/assets/hiphy-logo-red.png" />
              </a>
            </div>
            <ul>
              <li>collections</li>
              <li>Sign In</li>
              <li>Upload</li>
            </ul>
        </div>
      );
    }
  });

}(this));

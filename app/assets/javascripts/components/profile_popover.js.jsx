var ProfilePopOver = React.createClass({
  render: function(){
    var popover;
    if (this.props.clicked){
      popover = <ul>
        <li>first item</li>
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

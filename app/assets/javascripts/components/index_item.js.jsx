var IndexItem = React.createClass({
  render: function(){
    var gif = this.props.gif;
    return (
      <div className='gif-index-item'>
        {gif.title}
        <br />
        Url: {gif.url}
        <br />
        <img src={gif.url} />
      </div>
    );
  }
});

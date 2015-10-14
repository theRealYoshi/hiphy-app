var Index = React.createClass({
  render: function(){
    return (
      <div>
        <h1>Index</h1>
        {
          this.props.gifs.map(function(gif){
            return <IndexItem gif={gif} key={gif.id} />;
          })
        }
      </div>
    );
  }
});

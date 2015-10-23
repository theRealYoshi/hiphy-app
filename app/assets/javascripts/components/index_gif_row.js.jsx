var GifRow = React.createClass({
  getInitialState: function(){
    return {
      gifs: this.props.rowGifs,
      orderArr: []
    };
  },
  componentWillReceiveProps: function(){
    this.setState({gifs: this.props.rowGifs});
  },
  render: function(){
    var bootstrap, size;
    switch(rowGifs.length){
      case 2:
        bootstrap = "col-sm-6";
        size = 2;
        break;
      case 8:
        bootstrap = "col-sm-3";
        size = 8;
        break;
      case 5:

    }
    return (
      <div className="row">
        {
          this.props.rowGifs.map(function(gif){
          return bootstrap ? <GifIndexItem gif={gif}
                                           key={gif.id}
                                           bootStrap={bootstrap}
                                           size={size} />
                                         : <div></div>;
          })
        }
      </div>
    );
  }
});

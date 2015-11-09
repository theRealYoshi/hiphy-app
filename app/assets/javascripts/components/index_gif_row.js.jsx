function getRandomArrCount(){
  var intArr = [0,2,4];
  return intArr[Math.floor(Math.random() * intArr.length)];
}
var GifRow = React.createClass({
  getInitialState: function(){
    return {
      gifs: this.props.rowGifs
    };
  },
  componentWillReceiveProps: function(){
    this.setState({gifs: this.props.rowGifs});
  },
  _handleNestedGifs: function(nestedArr, bootstrapClass){
    var htmlNested = nestedArr.map(function(gif){
      return <div><GifIndexItem gif={gif} key={gif.id} bootStrap={bootstrapClass} tags={gif.tags}/></div>;
    });
    return htmlNested;
  },
  render: function(){
    var gifItemArr = [];
    switch(this.props.rowGifs.length){
      case 1:
        var nestedGif = this.props.rowGifs[0];
        oneNestedGif = this._handleNestedGifs([nestedGif], "col-sm-12 only-nested");
        oneNestedContainer =
          <div className='col-sm-6'>
            {
              oneNestedGif.map(function(oneNestedGif){
                return oneNestedGif;
              })
            }
          </div>;
          gifItemArr.push(oneNestedContainer);
        break;
      case 2:
        this.props.rowGifs.forEach(function(gif){
          var gifItem = {
            gif: gif,
            bootStrap: "col-sm-6"
          }
          gifItemArr.push(<div><GifIndexItem gif={gif} key={gif.id} bootStrap="col-sm-6" tags={gif.tags}/></div>);
        });
        break;
      case 5:
        var largeImageIdx = getRandomArrCount();
        var largeImageGif = this.props.rowGifs[largeImageIdx];
        // var largeImageTags = <TagGifIndexItem tags={largeImageGif.tags} />;
        var largeImageDiv = <GifIndexItem gif={largeImageGif} key={largeImageGif.id} bootStrap='col-sm-6' tags={largeImageGif.tags}/>;
        var nested, firstNested, secondNested, firstNestedContainer, secondNestedContainer;
        switch(largeImageIdx){
          case 0:
            nested = this.props.rowGifs.slice(1,5);
            nestedGifs = this._handleNestedGifs(nested, "col-sm-6 nested");
            nestedContainer =
              <div className='col-sm-6'>
              {
                nestedGifs.map(function(gif){
                  return gif;
                })
              }
            </div>;
            // gifItemArr.push(largeImageTags);
            gifItemArr.push(largeImageDiv);
            gifItemArr.push(nestedContainer);
            break;
          case 4:
            nested = this.props.rowGifs.slice(0,4);
            nestedGifs = this._handleNestedGifs(nested, "col-sm-6 nested");
            nestedContainer =
              <div className='col-sm-6'>
              {
                nestedGifs.map(function(gif){
                  return gif;
                })
              }
            </div>;
            gifItemArr.push(nestedContainer);
            // gifItemArr.push(largeImageTags);
            gifItemArr.push(largeImageDiv);
            break;
          case 2:
            // var largeMiddleImageTags = <TagGifIndexItem tags={largeImageGif.tags} />;
            var largeMiddleImageDiv = <GifIndexItem gif={largeImageGif} key={largeImageGif.id} bootStrap='col-sm-6 middle' middle="middle" tags={largeImageGif.tags}/>;
            firstNested = this.props.rowGifs.slice(0,2);
            firstNestedGifs = this._handleNestedGifs(firstNested, "col-sm-12 nested");
            firstNestedContainer =
              <div className='col-sm-3'>
                {
                  firstNestedGifs.map(function(firstNestedGif){
                    return firstNestedGif;
                  })
                }
              </div>;
            secondNested = this.props.rowGifs.slice(3,5);
            secondNestedGifs = this._handleNestedGifs(secondNested, "col-sm-12 nested");
            secondNestedContainer =
              <div className='col-sm-3'>
                {
                  secondNestedGifs.map(function(secondNestedGif){
                    return secondNestedGif;
                  })
                }
              </div>;
            gifItemArr.push(firstNestedContainer);
            // gifItemArr.push(largeMiddleImageTags);
            gifItemArr.push(largeMiddleImageDiv);
            gifItemArr.push(secondNestedContainer);
        }
        break;
      default:
        this.props.rowGifs.forEach(function(gif, idx){
          gifItemArr.push(<GifIndexItem gif={gif} key={gif.id} bootStrap="col-sm-3" tags={gif.tags}>
                            <div><TagGifIndexItem tags={gif.tags}/></div>
                          </GifIndexItem>);
        });
    }
    return (
      <div className="row">
        {
          gifItemArr.map(function(gifIndexItem){
            return {gifIndexItem};
          })
        }
      </div>
    );
  }
});

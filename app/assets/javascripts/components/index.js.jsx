function getRandomSubarray(arr, size) {
  var shuffled = arr.slice(0), i = arr.length, temp, index;
  while (i--) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
  }
  return shuffled.slice(0, size);
}

function getRandomColCount(){
  var intArr = [2,8]; // add 5
  return intArr[Math.floor(Math.random() * intArr.length)];
}

var Index = React.createClass({
  mixins: [ReactRouter.History],
  _getAllGifs: function(){
    return GifStore.all();
  },
  _getThreeAlbums: function(){
    return getRandomSubarray(AlbumStore.all(),3);
  },
  getInitialState: function(){
    return {
      gifs: this._getAllGifs(),
      albums: this._getThreeAlbums(),
      query: ""
    };
  },
  _gifsChanged: function(){
    this.setState({ gifs: this._getAllGifs()});
  },
  _albumsChanged: function(){
    this.setState({ albums: this._getThreeAlbums()});
  },
  componentWillMount: function(){
    ApiUtil.fetchGifs({tag: this.state.query});
    ApiUtil.fetchAlbums({tag: this.state.query});
  },
  componentDidMount: function(){
    AlbumStore.addChangeListener(this._albumsChanged);
    AlbumStore.addSingleChangeListener(this._albumsChanged);
    GifStore.addChangeListener(this._gifsChanged);
    GifStore.addSingleChangeListener(this._gifsChanged);
    ApiUtil.fetchAlbums({tag: this.state.query});
    ApiUtil.fetchGifs({tag: this.state.query});
  },
  componentWillUnmount: function(){
    AlbumStore.removeChangeListener(this._albumsChanged);
    AlbumStore.removeSingleChangeListener(this._albumsChanged);
    GifStore.removeChangeListener(this._gifsChanged);
    GifStore.removeSingleChangeListener(this._gifsChanged);
  },
  componentWillReceiveProps: function(nextProps){
    this.setState({query: nextProps.params.query});
    ApiUtil.fetchAlbums({tag: nextProps.params.query});
    ApiUtil.fetchGifs({tag: nextProps.params.query});
  },
  _getGifsRows: function(gifs){
    var randNum, rowContainer, GifIndexItem, tempGif;
    var rowContainArr = [];
    var gifCount = 0;
    var tempGifs = gifs.slice(0);
    while (gifCount < gifs.length){
      var tempRow = [];
      currentRowBlockCount = getRandomColCount();
      for (var i = 0; i < currentRowBlockCount; i++) {
        if (gifCount >= gifs.length){
          break;
        }
        tempRow.push(tempGifs.shift());
        gifCount += 1;
      }
      rowContainArr.push(tempRow);
    }
    return rowContainArr;
  },
  render: function(){
    var albums = this.state.albums;
    var albumContainer, gifContainer;
    var albumHeader, gifHeader, gifRows;
    if (albums.length > 0){
      albumHeader = <h3>Albums</h3>;
      albumContainer = this.state.albums.map(function(album){
          return <AlbumIndexItem album={album} key={album.id} />;
      });
    } else {
      albumHeader = <div></div>;
      albumContainer = <div></div>;
    }
    if (this.state.gifs.length > 0){
      gifHeader = <h3>Gifs</h3>;
      gifContainer = this._getGifsRows(this.state.gifs);
      // gifContainer = this.state.gifs.map(function(gif){
      //   return <IndexItem gif={gif} key={gif.id} />;
      // });
    } else {
      gifHeader = <div></div>;
      gifContainer = [[]];
    }
    return (
      <div className='index'>
        <div className='index-albums-container'>
          <div className='container'>
            {albumHeader}
            <div className="row">
              {albumContainer}
            </div>
          </div>
        </div>
        <div className='index-gifs-container'>
          <div className='container'>
            {gifHeader}
            {
              gifContainer.map(function(row){
                return(
                  <GifRow rowGifs={row} />
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
});

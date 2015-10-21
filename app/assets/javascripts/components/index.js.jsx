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
  render: function(){
    var albums = this.state.albums;
    var albumContainer, gifContainer;
    var albumHeader, gifHeader;
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
      gifContainer = this.state.gifs.map(function(gif){
        return <IndexItem gif={gif} key={gif.id} />;
      });
    } else {
      gifHeader = <div></div>;
      gifContainer = <div></div>;
    }
    return (
      <div className='index'>
        <div className='index-albums-container'>
          {albumHeader}
          {albumContainer}
        </div>
        <div className='index-gifs-container'>  
          {gifHeader}
          {gifContainer}
        </div>
      </div>
    );
  }
});

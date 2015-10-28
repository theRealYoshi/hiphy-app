var GifItem = React.createClass({
  mixins: [ReactRouter.History],
  getStateFromStore: function () {
    return { gif: GifStore.find(parseInt(this.props.params.gifId)) };
  },
  getInitialState: function(){
    return this.getStateFromStore();
  },
  _onChange: function(){
    this.setState(this.getStateFromStore());
  },
  componentWillMount: function(){
    ApiUtil.fetchSingleGif(parseInt(this.props.params.gifId));
    GifStore.addSingleChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    GifStore.removeChangeListener(this._onChange);
    GifStore.removeSingleChangeListener(this._onChange);
  },
  _deleteLink: function(id){
    ApiUtil.deleteSingleGif(id, function(){
      this.history.pushState(null, '/', {});
    }.bind(this));
  },
  _concatImgSrc: function(imgSrc){
      var splitArr = imgSrc.split("/image/upload");
      splitArr.splice(1,0,"/image/upload");
      splitArr.splice(2,0,"/w_805,h_380,c_fit");
      return splitArr.join("");
  },
  _handleTagSearch: function(searchTerm){
    ApiUtil.fetchGifs({tag: searchTerm}, true);
    this.history.pushState(null, "/search/" + searchTerm, {});
  },
  render: function(){
    var deleteLink, albumForm, imgSrc, gif, gifTitle, gifSubmitter, gifShort;
    if(this.state.gif) {
      gif = this.state.gif;
      imgSrc = this.state.gif.url;
      if(this.state.gif.submitter_id === CURRENT_USER_ID) {
        deleteLink = <h5>Delete gif?
        <button type="button"
                className="btn btn-default btn-xs"
                onClick={this._deleteLink.bind(null, this.state.gif.id)}>
                <span className='glyphicon glyphicon-remove'
                      aria-hidden="true"></span>
        </button>
        </h5>;
      } // use this .props for index?
      if (CURRENT_USER_ID !== -1){
        albumForm = <AlbumForm gifId={this.props.params.gifId} />;
      }
    } else {
      gif = {
        title: "",
        submitter: "",
        shortened_url: "",
        tags: []
      };
      imgSrc = "";
    }
    fittedImg = this._concatImgSrc(imgSrc);
    return (
      <div className='gif-index-item'>
        <h3>{gif.title}</h3>
        <h4>Submitted by: {gif.submitter}</h4>
        {deleteLink}
        <div className='gif-index-item-image-container'>
          <img src={fittedImg} />
        </div>
        <div className="share-container">
          <label>Share:</label>
          <input type="text"
                 readOnly="true"
                 value={gif.shortened_url} />
        </div>
        <div className="tags-container">
        <h4>Tags</h4>
        {
          gif.tags.map(function(tag){
            return (
              <h6 className="tag" >
                <a onClick={this._handleTagSearch.bind(null, tag.tag_title)} >#{tag.tag_title}</a>
              </h6>
            );
          }.bind(this))
        }
        <br />
        </div>
        {albumForm}
      </div>
    );
  }
});

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
  },
  componentDidMount: function () {
    GifStore.addSingleChangeListener(this._onChange);
    ApiUtil.fetchSingleGif(parseInt(this.props.params.gifId));
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
  render: function(){
    var deleteLink, albumForm, imgSrc, gif;
    if(this.state.gif === undefined) {
      imgSrc = "http://res.cloudinary.com/dpbquh1uj/image/upload/v1445537574/tumblr_n85k6gA6TG1tzyfmgo1_500_wzgtfn.gif";
    } else {
      gif = this.state.gif;
      imgSrc = this.state.gif.url;
    }
    if (CURRENT_USER_ID){
      albumForm = <AlbumForm gifId={this.props.params.gifId} />;
    }
    if(this.state.gif.submitter_id === CURRENT_USER_ID) {
      deleteLink = <button onClick={this._deleteLink.bind(null, this.state.gif.id)}>Delete</button>;
    } // use this .props for index?
    fittedImg = this._concatImgSrc(imgSrc);
    return (
      <div className='gif-index-item'>
        {gif.title}
        <img src={fittedImg} />
        Submitter: {gif.submitter},
        shortened_url: {gif.shortened_url},
        {deleteLink}
        <br />
        {
          gif.tags.map(function(tag){
            return "#" + tag.tag_title;
          })
        }
        <br />
        {albumForm}
      </div>
    );
  }
});

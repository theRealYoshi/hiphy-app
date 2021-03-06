var UploadForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin, ReactRouter.History],
    getInitialState: function(){
    return {
      title: '',
      tags: [],
      url: '',
      errors: ''
    };
  },
  componentWillMount: function(){
    if (CURRENT_USER_ID === -1){
      window.location = "session/new";
    }
  },
  _validateTags: function(){
    var tagsValid = true;
    this.state.tags.split(",").forEach(function(tag){
      if (tag.length < 3){
        this.setState({errors: 'tags must be longer than 2 characters!'});
        tagsValid = false;
      }
    }.bind(this));
    return tagsValid;
  },
  _validateTitle: function(){
    var tempTitle = this.state.title;
    if (tempTitle.length < 3){
      this.setState({errors: 'title must be longer than 2 characters!' });
      return false;
    } else {
      return true;
    }
  },
  _saveResult: function(result){
    var data = {
      tags: this.state.tags.split(','),
      title: this.state.title,
      url: result.url,
      secure_url: result.secure_url,
      public_id: result.public_id
    };
    ApiUtil.createGif(data, function(id){
      this.history.pushState(null, 'gifs/' + id, {});
    }.bind(this));
  },
  _uploadGif: function(event){
    event.preventDefault();
    if (this._validateTitle() && this._validateTags() ){
      cloudinary.openUploadWidget({ cloud_name: 'df4iquehg', upload_preset: 'oze4lhas',
                                    sources: ['local', 'url'], max_files: 1,
                                    client_allowed_formats: ['gif'],
                                    min_image_height: 200,
                                    min_image_width: 200},
      function(error, result){
        //on success
        if (result){
          this._saveResult(result[0]);
        } else {
          console.log(error.message);
          this.setState({});
        }
      }.bind(this), false);
    } else {
      this.setState({});
    }
  },
  render: function(){
    if (this.state.errors){
      var error = this.state.errors;
    }
    return (
      <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-4">
          <div className="upload-container">
            <p>{this.state.errors}</p>
            <div className="upload-content">
              <h3>Upload (Gifs Only)</h3>
               <form className="upload-form" onSubmit={this._uploadGif}>
                 <div className="form-group">
                   <label>Title</label>
                   <input type="text"
                          className="form-control"
                          placeholder="Title"
                          valueLink={this.linkState('title')}/>
                 </div>
                 <div className="form-group">
                   <label>Tags</label>
                   <input type="text"
                          className="form-control"
                          placeholder="Tags (separate by comma)"
                          valueLink={this.linkState('tags')}/>
                 </div>
                 <br />
                 <button type="submit"
                         className="btn btn-default btn-lg">
                         Upload
                         <span className="glyphicon glyphicon-upload"
                               aria-hidden="true"></span>
                 </button>
               </form>
             </div>
           </div>
        </div>
        <div class="col-md-4"></div>
      </div>
    );
  }
});

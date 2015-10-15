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
      url: result.url
    };
    ApiUtil.createGif(data, function(id){
      this.history.pushState(null, '/gifs/' + id, {});
    }.bind(this));
  },
  _uploadGif: function(event){
    event.preventDefault();
    if (this._validateTitle() && this._validateTags() ){
      cloudinary.openUploadWidget({ cloud_name: 'dpbquh1uj', upload_preset: 'mnoe1mgq',
                                    sources: ['local', 'url'], max_files: 1,
                                    client_allowed_formats: ['gif']},
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
      <div>
        <p>{this.state.errors}</p>
        <h3>Upload A Gif!</h3>
         <form onSubmit={this._uploadGif}>
           <label>Title</label>
           <input type="text" valueLink={this.linkState('title')}/>
           <br/>

           <p>Separate your tags with commas!</p>
           <br/>
           <label>Tags</label>
           <input type="text" valueLink={this.linkState('tags')}/>
           <br />
           <input type="submit" value="upload"/>
         </form>
      </div>
    );
  }
});

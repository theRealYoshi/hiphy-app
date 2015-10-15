json.extract!(@gif, :id, :title, :submitter_id, :url)
json.submitter @gif.user.email
json.tags @gif.tags

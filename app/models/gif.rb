class Gif < ActiveRecord::Base
  validates :title, :submitter_id, :url, presence: true
  has_many: tags, through: :taggings, source: :gif

end

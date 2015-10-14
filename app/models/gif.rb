class Gif < ActiveRecord::Base
  validates :title, :submitter_id, :url, presence: true
  has_many :tags, through: :taggings
  has_many :taggings

end

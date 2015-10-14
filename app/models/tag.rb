class Tag < ActiveRecord::Base
  validates :tag_title, presence: true
  has_many :taggings
  has_many :gifs, through: :taggings, source: :gif
end

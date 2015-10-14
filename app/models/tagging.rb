class Tagging < ActiveRecord::Base
  validates :gif, :tag_id, presence: true
  belongs_to :gif
  belongs_to :tag
end

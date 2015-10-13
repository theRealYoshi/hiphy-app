class Tagging < ActiveRecord::Base
  validates :gif, :tag_id, presence: true
end

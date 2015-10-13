class Tag < ActiveRecord::Base
  validates :tag_title, presence: true
end

class Gif < ActiveRecord::Base
  validates :title, :submitter_id, :url, presence: true
end

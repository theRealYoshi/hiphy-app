# == Schema Information
#
# Table name: tags
#
#  id         :integer          not null, primary key
#  tag_title  :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Tag < ActiveRecord::Base
  validates :tag_title, presence: true
  has_many :taggings
  has_many :gifs, through: :taggings

    
end

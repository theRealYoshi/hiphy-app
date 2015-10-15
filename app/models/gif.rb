# == Schema Information
#
# Table name: gifs
#
#  id           :integer          not null, primary key
#  title        :string           not null
#  submitter_id :integer          not null
#  url          :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Gif < ActiveRecord::Base
  validates :title, :submitter_id, :url, presence: true
  belongs_to :user, foreign_key: :submitter_id
  has_many :tags, through: :taggings
  has_many :taggings

end

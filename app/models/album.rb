# == Schema Information
#
# Table name: albums
#
#  id          :integer          not null, primary key
#  album_title :string           not null
#  user_id     :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Album < ActiveRecord::Base
  validates :album_title, presence: true

  belongs_to :users
  has_many :albumings
  has_many :gifs, through: :albumings

  def self.create_albuming_association(album_id, gif_id)
    album = Albuming.create(album_id: album_id, gif_id: gif_id)
    Album.includes(:gifs).where(id: album_id).first
  end

end

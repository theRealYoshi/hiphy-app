# == Schema Information
#
# Table name: albumings
#
#  id       :integer          not null, primary key
#  album_id :integer          not null
#  gif_id   :integer          not null
#

class Albuming < ActiveRecord::Base
  validates :album_id, :gif_id, presence: true

  belongs_to :album
  belongs_to :gif

end

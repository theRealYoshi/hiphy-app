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

require 'test_helper'

class GifTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

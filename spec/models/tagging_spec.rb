# == Schema Information
#
# Table name: taggings
#
#  id         :integer          not null, primary key
#  tag_id     :integer          not null
#  gif_id     :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'spec_helper'
require 'rails_helper'

describe Tagging, type: :model do
  describe 'associations' do
    it { should belong_to(:tag) }
    it { should belong_to(:gif) }
  end

  describe 'validations' do
    it { should validate_presence_of(:tag_id) }
    it { should validate_presence_of(:gif_id) }
  end

end

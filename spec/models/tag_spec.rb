# == Schema Information
#
# Table name: tags
#
#  id         :integer          not null, primary key
#  tag_title  :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'spec_helper'
require 'rails_helper'

describe Tag, type: :model do

  subject(:tag) do
    FactoryGirl.build(:tag,
      tag_title: "abcd")
  end

  describe 'associations' do
    it { should have_many(:gifs) }
    it { should have_many(:taggings) }
  end

  describe 'validations' do
    it { should validate_presence_of(:tag_title) }
    it { should validate_length_of(:tag_title).is_at_least(3) }
  end

  context "when is invalid" do
    it "should require at least 3 letters" do
      expect(FactoryGirl.build(:tag, tag_title: "ab")).not_to be_valid
    end
  end
end

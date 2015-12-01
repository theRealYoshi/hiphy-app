# == Schema Information
#
# Table name: gifs
#
#  id            :integer          not null, primary key
#  title         :string           not null
#  submitter_id  :integer          not null
#  url           :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  shortened_url :string
#  secure_url    :string           not null
#

require 'spec_helper'
require 'rails_helper'

describe Gif, type: :model do
  subject(:gif) do
    FactoryGirl.build(:gif)
  end

  describe 'associations' do
    it { should have_many(:tags) }
    it { should belong_to(:user) }
  end

  describe 'validations' do
    it { should validate_presence_of(:title) }
    it { should validate_presence_of(:submitter_id) }
    it { should validate_presence_of(:url) }
    it { should validate_presence_of(:secure_url) }
  end

  context "when is invalid" do
    it "should require at least 3 letters" do
      expect(FactoryGirl.build(:tag, tag_title: "ab")).not_to be_valid
    end
  end
end

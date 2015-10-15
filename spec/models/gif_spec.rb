require 'spec_helper'
require 'rails_helper'

describe Gif, type: :model do
  describe 'associations' do
    it { should have_many(:tags) }
    it { should belong_to(:user) }
  end

  describe 'validations' do
    it { should validate_presence_of(:title) }
    it { should validate_presence_of(:submitter_id) }
    it { should validate_presence_of(:url) }
  end
end

require 'spec_helper'
require 'rails_helper'

describe Tag, type: :model do
  describe 'associations' do
    it { should have_many(:gifs) }
  end

  describe 'validations' do
    it { should validate_presence_of(:tag_title) }
  end

end

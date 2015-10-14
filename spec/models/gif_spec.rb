require 'spec_helper'
require 'rails_helper'

describe Tagging, type: :model do
  describe 'associations' do
    it { should belong_to(:tag) }
    it { should belong_to(:gif) }
  end
end

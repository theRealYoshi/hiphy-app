require 'spec_helper'
require 'rails_helper'

describe Api::GifsController, type: :controller do
  # it do
  #     params = {
  #       gif: {
  #         title: 'John',
  #         tags: ['Doe'],
  #         url: 'johndoe@example.com'
  #       }
  #     }
  #     should permit(:title, :tags, :url).
  #      for(:create, params: params)
  # end

  it { should use_before_action(:require_login) }
end

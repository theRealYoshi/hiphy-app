require 'spec_helper'
require 'rails_helper'

describe UsersController, type: :controller do
  it do
      params = {
        user: {
          email: 'johndoe@example.com',
          password: 'Happiness'
        }
      }
      should permit(:email, :password).
       for(:create, params: params)
  end
end

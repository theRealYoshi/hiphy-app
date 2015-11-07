class StaticPagesController < ApplicationController
  before_action :check_visits, only: [:root]
  def root
  end
end

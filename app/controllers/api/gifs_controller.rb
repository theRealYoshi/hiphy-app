class Api::GifsController < ApplicationController
  before_action :require_login, only: [:create, :destroy]

  def index
    @gifs = Gif.includes(:tags)
  end

  def new
    render :new
  end

  def create
    #create a response for 302 when user is not signed in
    tags = params[:gif][:tags].map {|tag| tag.strip }
    tags.each do |tag|
      #if tag is not created in the table
      unless Tag.exists?(:tag_title => tag)
        Tag.create(tag_title: tag)
      end
    end

    @gif = Gif.create(
        title: params[:gif][:title],
        url: params[:gif][:url],
        shortened_url: create_shorten_url,
        submitter_id: current_user.id
      )
    if @gif.save
      tags.each do |tag|
        tag_id = Tag.find_by_tag_title(tag).id
        Tagging.create!(gif_id: @gif.id, tag_id: tag_id)
      end
      @gif
    end
    render :show
  end

  def show
    @gif = Gif.includes(:tags, :user).find(params[:id])
  end

  def destroy
    @gif = Gif.find(params[:id])
    @gif.destroy
    render :index
  end

  private

  def gif_params
    params.require(:gif).permit(:title, :url, :tags)
  end

  def create_shorten_url
    "http://hip.hy/#{SecureRandom::urlsafe_base64(8)}"
  end

end

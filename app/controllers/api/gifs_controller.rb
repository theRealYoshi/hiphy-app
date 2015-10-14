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
    #create a tagging table and a tag table

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
        submitter_id: current_user.id
      )
    if @gif.save
      tags.each do |tag|
        tag_id = Tag.find_by_tag_title(tag).id
        Tagging.create!(gif_id: @gif.id, tag_id: tag_id)
      end
    end
    render json: @gif
  end

  def show
    @gif = @gif.find(params[:id])
    render json: @gif
  end

  def destroy
  end

  private

  def gif_params
    params.require(:gif).permit(:title, :url, :tags)
  end

end

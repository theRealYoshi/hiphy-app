class Api::GifsController < ApplicationController
  before_action :require_login, only: [:create, :destroy]

  def index
    if params[:tag].blank?
      @gifs = Gif.includes(:tags, :user)
    else
      sql_str = "tags.tag_title LIKE ? "
      tags = params[:tag].split(" ").map {|tag| "%#{tag}%"}
      if tags.count > 1
        (1..(tags.count - 1)).each do |n|
          sql_str += " OR tags.tag_title LIKE ?"
        end
      end
      @gifs = Gif.includes(:tags, :user).references(:tags).where(sql_str, *tags)
    end
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
        secure_url: params[:gif][:secure_url],
        gif_tag: params[:gif][:public_id],
        shortened_url: create_shorten_url,
        submitter_id: current_user.id
      )
    if @gif.save
      Gif.transaction do
        tags.each do |tag|
          tag_id = Tag.find_by_tag_title(tag).id
          Tagging.create!(gif_id: @gif.id, tag_id: tag_id)
        end
        @gif.save!
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
    #check to see if the album has any gifs? If not destroy
    @gif.destroy
    render json: @gif
  end

  private

  def gif_params
    params.require(:gif).permit(:title, :url, :tags)
  end

  def create_shorten_url
    "http://hip.hy/#{SecureRandom::urlsafe_base64(8)}"
  end

end

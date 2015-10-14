class Api::GifsController < ApplicationController

  def index
    @gifs = Gif.all
    render json: @gifs
  end

  def new
    render :new
  end

  def create
    #create a tagging table and a tag table
    @tags = params[:gif][:tags]
    @gif = Gif.create(
      title: params[:gif][:title],
      url: params[:gif][:url],
      submitter_id: current_user.id
      )
    if @gif.save && @tag.save
      #create tagging association here
    end
    debugger
    #@gif.submitter_id = @current_user.id
    #else save failed
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

  def render_tags

  end
end

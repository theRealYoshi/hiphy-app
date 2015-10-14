class GifsController < ApplicationController

  def index
    @gifs = Gif.all
    render json: @gifs
  end

  def new
    render :new
  end

  def create
    puts gif_params
    @gif = Gif.new(gif_params)
    debugger
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
    params.require(:gif).permit(:title, :tags, :url)
  end
end

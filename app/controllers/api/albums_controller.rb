class Api::AlbumsController < ApplicationController
  before_action :require_login, only: [:create, :destroy, :update]

  def index
    if params[:user_id]
      @albums = Album.includes(:gifs).where(user_id: params[:user_id])
    else
      @albums = Album.includes(:gifs)
    end
  end

  def create
    if params[:album][:album_id].blank?
      @album = Album.create(
              album_title: params[:album][:album_title],
              user_id: current_user.id)
      if @album.save
        Album.transaction do
          Album.create_albuming_association(@album.id, params[:album][:gif_id])
          @album.save!
        end
        @album
        render :show
      else
        #render error message
      end
    else
      @album = Album.create_albuming_association(
                        params[:album][:album_id], params[:album][:gif_id])
      render :show
    end
  end

  def show
    @album = Album.includes(:gifs, :users).find(params[:id])
  end

  def destroy
  end

end

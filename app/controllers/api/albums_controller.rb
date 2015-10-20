class Api::AlbumsController < ApplicationController
  before_action :require_login, only: [:create, :destroy, :update]

  def index
    if params[:user_id]
      @albums = Album.includes(:gifs, :users).references(:users).where("users.id = ? ", params[:user_id])
    else
      @albums = Album.includes(:gifs, :users)
    end
  end

  def create
    album = Album.where("album_title = ? AND user_id = ? ",
                        params[:album][:album_title],
                        current_user.id)
    if album.empty?
      @album = Album.create(
              album_title: params[:album][:album_title],
              user_id: current_user.id)
      if @album.save
        Album.create_albuming_association(@album.id, params[:album][:gif_id])
        @album
        render :show
      else
        #render error message
      end
    else
      @album = Album.create_albuming_association(
                        album.first.id, params[:album][:gif_id])
      render :show
    end
  end

  def show
    @album = Album.includes(:gifs, :users).find(params[:id])
  end

  def destroy
  end

end

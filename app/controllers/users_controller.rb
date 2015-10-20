class UsersController < ApplicationController
  # before_action :require_login

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.create(user_params)

    if @user.save
      log_in(@user)
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def show
    @user = User.includes(:gifs, :albums).where(id: params[:id])
    render json: @user
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end

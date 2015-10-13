class SessionsController < ApplicationController
  # before_action :require_login

  def new
    render :new
  end

  def create
  @user = User.find_by_credentials(
    params[:email],
    params[:password]
  )

  if @user
    log_in(@user)
    #redirect_to subs_url
  else
    flash.now[:errors] = ["Invalid username or password."]
    render :new
  end

  def destroy
    log_out
    redirect_to new_session_url
  end
  
end

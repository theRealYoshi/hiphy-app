class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user, :logged_in?

  private

  def current_user
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def logged_in?
    !!current_user
  end

  def log_in(user)
    @current_user = user
    session[:session_token] = user.reset_session_token!
  end

  def log_out
    current_user.try(:reset_session_token)
    session[:session_token] = nil
  end

  def require_login
    render json: {}, status: 403 unless logged_in?
  end

  def require_log_out
    redirect_to user_url(current_user) unless logged_in?
  end

  def check_visits
    cookies[:visits] ||= 0
    cookies[:visits] = cookies[:visits].to_i + 1
    if cookies[:visits].to_i < 2
      redirect_to [new_session_url, new_user_url].sample
    end
  end

end

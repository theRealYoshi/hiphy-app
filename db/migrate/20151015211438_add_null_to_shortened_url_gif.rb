class AddNullToShortenedUrlGif < ActiveRecord::Migration
  def change
    change_column :gifs, :shortened_url, :string, null: true
  end
end

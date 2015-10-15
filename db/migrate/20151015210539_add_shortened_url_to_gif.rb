class AddShortenedUrlToGif < ActiveRecord::Migration
  def change
    add_column :gifs, :shortened_url, :string, unique: true
    add_index :gifs, [:url, :shortened_url], unique: true
  end
end

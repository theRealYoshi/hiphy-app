class AddUrlToGifs < ActiveRecord::Migration
  def change
    add_column :gifs, :secure_url, :string, null: false
    add_column :gifs, :gif_tag, :string, null: false
  end
end

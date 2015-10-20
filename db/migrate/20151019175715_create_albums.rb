class CreateAlbums < ActiveRecord::Migration
  def change
    create_table :albums do |t|
      t.string :album_title, null: false
      t.integer :user_id, null: false
      t.timestamps null: false
    end

    create_table :albumings do |t|
      t.integer :album_id, null: false
      t.integer :gif_id, null: false
    end
    add_index :albumings, :album_id
    add_index :albumings, :gif_id
    add_index :albums, [:album_title, :user_id], unique: true
  end
end

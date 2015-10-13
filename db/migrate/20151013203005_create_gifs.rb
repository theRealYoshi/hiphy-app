class CreateGifs < ActiveRecord::Migration
  def change
    create_table :gifs do |t|
      t.string :title, null: false
      t.integer :submitter_id, null: false
      t.string :url, null: false

      t.timestamps null: false
    end
      add_index :gifs, :submitter_id
  end
end

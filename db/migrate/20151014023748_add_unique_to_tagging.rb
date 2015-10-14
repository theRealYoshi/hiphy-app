class AddUniqueToTagging < ActiveRecord::Migration
  def change
    add_index :taggings, [:tag_id, :gif_id], unique: true
  end
end

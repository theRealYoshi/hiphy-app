# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151023015856) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "albumings", force: :cascade do |t|
    t.integer "album_id", null: false
    t.integer "gif_id",   null: false
  end

  add_index "albumings", ["album_id"], name: "index_albumings_on_album_id", using: :btree
  add_index "albumings", ["gif_id"], name: "index_albumings_on_gif_id", using: :btree

  create_table "albums", force: :cascade do |t|
    t.string   "album_title", null: false
    t.integer  "user_id",     null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "albums", ["album_title", "user_id"], name: "index_albums_on_album_title_and_user_id", unique: true, using: :btree

  create_table "gifs", force: :cascade do |t|
    t.string   "title",         null: false
    t.integer  "submitter_id",  null: false
    t.string   "url",           null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.string   "shortened_url"
    t.string   "secure_url",    null: false
    t.string   "gif_tag",       null: false
  end

  add_index "gifs", ["submitter_id"], name: "index_gifs_on_submitter_id", using: :btree
  add_index "gifs", ["url", "shortened_url"], name: "index_gifs_on_url_and_shortened_url", unique: true, using: :btree

  create_table "taggings", force: :cascade do |t|
    t.integer  "tag_id",     null: false
    t.integer  "gif_id",     null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "taggings", ["gif_id"], name: "index_taggings_on_gif_id", using: :btree
  add_index "taggings", ["tag_id", "gif_id"], name: "index_taggings_on_tag_id_and_gif_id", unique: true, using: :btree
  add_index "taggings", ["tag_id"], name: "index_taggings_on_tag_id", using: :btree

  create_table "tags", force: :cascade do |t|
    t.string   "tag_title",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "username",        null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree

end

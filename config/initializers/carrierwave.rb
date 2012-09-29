require 'serve_gridfs_image'

CarrierWave.configure do |config|
  config.storage = :grid_fs
  config.grid_fs_connection = Mongoid.database

  # Storage access url
  config.grid_fs_access_url = "/grid"
end
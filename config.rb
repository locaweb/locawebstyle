require 'rack/cors'
use Rack::Cors do
  allow do
    origins '*'
    resource '*', headers: :any, methods: :get
  end
end

###
# Compass
###

activate :blog do |blog|
    blog.prefix = "changelog"
    blog.permalink = ":year/:month/:day/:title"
    blog.sources = "/:year-:month-:day-:title.html"
    blog.paginate = true
    blog.per_page = 5
    blog.page_link = "page/:num"
end

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

#page "/", :layout => "home"
page "/documentacao/*", :layout => "base"

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

###
# Helpers
###

activate :syntax, :line_numbers => true

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
# activate :livereload

# Methods defined in the helpers block are available in templates
helpers do
#   def some_helper
#     "Helping"
#   end
  # Returns all pages under a certain directory.

  def sub_pages(dir)
    sitemap.resources.select do |resource|
      resource.path.start_with?(dir)
    end
  end

  def assets_files(dir)
    Dir["source/#{dir}/*"].map do |resource|
      resource
    end
  end

end

require "helpers/custom_helpers"
helpers CustomHelpers

set :base_url, ""

set :stable, "3.8.1"

set :css_dir, 'assets/stylesheets'
set :js_dir, 'assets/javascripts'
set :images_dir, 'assets/images'

activate :directory_indexes
activate :i18n

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"

  # base url for devint
  #set :base_url, "/locastyle/build"

  # base url for gh-pages
  set :base_url, "/locawebstyle"
end

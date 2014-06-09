###
# Compass
###

activate :blog do |blog|
		blog.prefix = "changelog"
		blog.permalink = ":year/:month/:day/:title"
		blog.sources = "/:year-:month-:day-:title.html"
		# blog.taglink = "tags/:tag.html"
		blog.layout = "changelog_single_layout"
		# blog.summary_separator = /(READMORE)/
		# blog.summary_length = 250
		# blog.year_link = ":year.html"
		# blog.month_link = ":year/:month.html"
		# blog.day_link = ":year/:month/:day.html"
		# blog.default_extension = ".markdown"

		blog.tag_template = "changelog/tag.html"
		blog.calendar_template = "changelog/calendar.html"

		blog.paginate = true
		blog.per_page = 10
		blog.page_link = "page/:num"
end

# Susy grids in Compass
# First: gem install susy
# require 'susy'

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

# Proxy (fake) files
# page "/this-page-has-no-template.html", :proxy => "/template-file.html" do
#   @which_fake_page = "Rendering a fake page with a variable"
# end

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

#ignore files
ignore "/v1/layouts/*.html"

####
#### Versões e URL de downloads
####
set :only_assets, "http://assets.locaweb.com.br/locastyle/edge.zip"
set :download_github, "https://github.com/locaweb/locawebstyle/archive/master.zip"
set :download_github_v1, "https://github.com/locaweb/locawebstyle/archive/v1-legacy.zip"
set :stable, "2.0.6"
set :stable_v1, "1.2.22"
set :stable_lwbar, "0.5"

set :css_dir, 'assets/stylesheets'
set :js_dir, 'assets/javascripts'
set :images_dir, 'assets/images'
set :fonts_dir, 'assets/fonts'

set :bootstrap_js, '/assets/bootstrap/js/bootstrap.js'
set :bootstrap_css, '/assets/bootstrap/css/bootstrap.css'
set :bootstrap_cdn_css, '//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css'
set :bootstrap_cdn_js, '//netdna.bootstrapcdn.com/bootstrap/3.0.3/js/bootstrap.min.js'

set :base_url, ""
set :base_url_v1, "/v1"

activate :directory_indexes
activate :relative_assets

# Automatic reload on save
activate :livereload if ENV["LIVERELOAD"]

# Define layouts
page "/manual/*", :layout => "page"
page "/manual/exemplos/*", :layout => "system-example"

# Build-specific configuration
configure :build do
		# For example, change the Compass output style for deployment
		activate :minify_css

		# Minify Javascript on build
		activate :minify_javascript

		# Enable cache buster
		# activate :cache_buster

		# Use relative URLs
		activate :relative_assets

		# Compress PNGs after build
		# First: gem install middleman-smusher
		# require "middleman-smusher"
		# activate :smusher
		set :base_url, "/locawebstyle"
		set :base_url_v1, "/locawebstyle/v1"

		# Or use a different image path
		# set :http_path, "/Content/images/"
end

require 'middleman-gh-pages'

Dir.glob('scripts/tasks/*.rake').each { |r| import r }

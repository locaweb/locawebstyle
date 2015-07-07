Dir.glob('scripts/tasks/*.rake').each { |r| import r }

# jasmine
begin
  require 'jasmine'
  load 'jasmine/tasks/jasmine.rake'
rescue LoadError
  task :jasmine do
    abort "Jasmine is not available. In order to run jasmine, you must: (sudo) gem install jasmine"
  end
end

# publisher
require 'middleman-gh-pages'

# jshint
require 'jshint/tasks'
JSHint.config_path = "spec/config_jslint.yml"

require 'middleman-gh-pages'

Dir.glob('scripts/tasks/*.rake').each { |r| import r }

#jasmine
begin
  require 'jasmine'
  load 'jasmine/tasks/jasmine.rake'
rescue LoadError
  task :jasmine do
    abort "Jasmine is not available. In order to run jasmine, you must: (sudo) gem install jasmine"
  end
end


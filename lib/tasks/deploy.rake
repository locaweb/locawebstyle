# -*- coding: UTF-8 -*-
namespace :deploy do
  @agent = "[Locastyle Robot] says:"

  task :setup, :version do |t, args|
    precompile
    package(args[:version])
  end

  def package(version)
    puts "#{@agent} Cleaning assets and creating deploy directory..."
    sh %{cp -fr public/assets/ public/deploy/ &&
         cd public/deploy &&
         rm manifest.yml &&
         rm -r manual/ &&
         rm bootstrap/customize-bootstrap.png &&
         zip -r #{version}.zip .}
    puts "#{@agent} Everything done, version #{version} of Locastyle is ready to upload."
  end

  def precompile
    puts "#{@agent} Compiling assets..."
    Rake::Task["assets:precompile:primary"].invoke
    puts "#{@agent} Assets fully compiled!"
  end

  task :clean do
    puts "#{@agent} Cleaning deployment related files from repo..."
    sh %{rm -r public/deploy/}
    puts "#{@agent} Deployment related files cleaned."
  end
end

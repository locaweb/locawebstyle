# -*- coding: UTF-8 -*-
namespace :deploy do
  task :setup, :version do |t, args|
    agent = "[Locastyle Robot] says:"
    precompile(agent)
    package(agent, args[:version])
  end

  def package(agent, version)
    puts "#{agent} Cleaning assets and creating deploy directory..."
    sh %{cp -ir public/assets/ public/deploy/ &&
         cd public/deploy &&
         rm manifest.yml &&
         rm -r manual/ &&
         rm bootstrap/customize-bootstrap.png &&
         zip -r #{version}.zip .}
    puts "#{agent} Everything done, version #{version} of Locastyle is ready to upload."
  end

  def precompile(agent)
    puts "#{agent} Compiling assets..."
    Rake::Task["assets:precompile:primary"].invoke
    puts "#{agent} Assets fully compiled!"
  end
end

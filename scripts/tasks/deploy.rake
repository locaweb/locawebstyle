# -*- coding: UTF-8 -*-

namespace :deploy do
  @agent = "[Locastyle Robot] says:"

  desc "Build Locastyle assets, generates a new version tag and commit it"
  task :setup, :version do |t, args|
    precompile
    package(args[:version])
    create_git_tag(args[:version])
  end

  def update_version(version)
    css_file = File.read("deploy/stylesheets/locastyle.css")
    File.open("deploy/stylesheets/locastyle.css", "w") do |f|
      f.puts "/*! Locastyle version: #{version}*/#{css_file}"
    end

    js_file = File.read("deploy/javascripts/locastyle.js")
    File.open("deploy/javascripts/locastyle.js", "w") do |f|
      f.puts "/*! Locastyle version: #{version}*/#{js_file}"
    end
  end

  def package(version)
    puts "#{@agent} Cleaning assets and creating deploy directory..."
    sh %{cp -fr build/assets/ deploy/ &&
        cd deploy &&
        rm -f .DS_Store &&
        rm stylesheets/manual.css &&
        rm javascripts/manual.js &&
        rm -rf prettify/ &&
        rm -rf stylesheets/manual/}
    update_version(version)
    sh %{cd deploy &&
        zip -r #{version}.zip . &&
        cp #{version}.zip edge.zip &&
        rm -rf bootstrap &&
        rm -rf fonts &&
        rm -rf images &&
        rm -rf javascripts &&
        rm -rf stylesheets}
    puts "#{@agent} Everything done, version #{version} of Locastyle is ready to upload."
  end

  def precompile
    puts "#{@agent} Building project..."
    Rake::Task["build"].invoke
    puts "#{@agent} Project builded."
  end

  def create_git_tag(version)
    puts "#{@agent} Creating git tag..."
    sh %{ git tag -a "#{version}" -m "" }
    puts "#{@agent} Done, don't forget to push the tag we just created now."
  end

  task :clean do
    puts "#{@agent} Removing all compiled assets..."
    sh %{rm -r build/*}
    puts "#{@agent} Cleaning deployment related files from repo..."
    sh %{rm -r deploy/}
    puts "#{@agent} Deployment related files cleaned, you are good to go!"
  end
end

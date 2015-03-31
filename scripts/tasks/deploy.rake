# -*- coding: UTF-8 -*-

namespace :deploy do
  @agent = "[Locastyle Robot] says:"

  desc "Build Locastyle assets, generates a new version tag and commit it"
  task :setup, :version do |t, args|
    precompile
    package(args[:version])
    copy_to_assets(args[:version])
    git_tag(args[:version])
  end

  def update_assets
    puts "Entering assets..."
    sh %{current_dir=${PWD##*/} &&
         cd ../assets-locastyle &&
         git fetch --all &&
         git rebase origin/master &&
         cd ../$current_dir }
  end

  def copy_to_assets(version)
    update_assets
    sh %{cp -fr deploy/ ../assets-locastyle/files/}
  end

  def update_version(version)
    css_content = File.open("deploy/#{version}/stylesheets/locastyle.css", "r").read
    File.open("deploy/#{version}/stylesheets/locastyle.css", "w") do |f|
      f.write "/*! Locastyle version: #{version}*/ " + css_content
    end

    js_content = File.open("deploy/#{version}/javascripts/locastyle.js", "r").read
    File.open("deploy/#{version}/javascripts/locastyle.js", "w") do |f|
      f.write "/*! Locastyle version: #{version}*/ " + js_content
    end
  end

  def package(version)
    puts "#{@agent} Cleaning assets and creating deploy directory..."
    sh %{mkdir deploy &&
        cp -fr build/assets/ deploy/#{version} &&
        cd deploy/#{version} &&
        rm -f .DS_Store &&
        rm -rf flash
        rm javascripts/busca.json
        rm javascripts/docs.js
        rm -rf javascripts/libs
        rm javascripts/templates.js
        rm stylesheets/docs.css
        rm stylesheets/fonts/selection.json
        rm -rf stylesheets/vendor}
    update_version(version)
    puts "#{@agent} Everything done, version #{version} of Locastyle is ready to upload."
    sh %{cd deploy/#{version} &&
         zip -r ../#{version}.zip . &&
         cd ../ &&
         cp #{version}.zip edge.zip &&
         cp -fr #{version} edge }
  end

  def precompile
    puts "#{@agent} Building project..."
    Rake::Task["build"].invoke
    puts "#{@agent} Project builded."
  end

  def git_tag(version)
    puts "#{@agent} Let's create de tag..."
    sh %{git tag -a "#{version}" -m "" }
    puts "#{@agent} Done, now to push the code is up to you."
  end

  task :clean do
    puts "#{@agent} Removing all compiled assets..."
    Rake::Task["assets:clean"].invoke
    puts "#{@agent} Put some Locastyle files back..."
    sh %{git checkout -f}
    puts "#{@agent} Cleaning deployment related files from repo..."
    sh %{rm -r public/deploy/}
    puts "#{@agent} Deployment related files cleaned, you are good to go!"
  end
end

# -*- coding: UTF-8 -*-
# rake deploy:setup[version]
namespace :deploy do
  @agent = "[Locastyle Robot] says:"

  desc "Build Locastyle assets, generates a new version tag and commit it"
  task :setup, :version do |t, args|
    precompile
    package(args[:version])
    copy_to_assets_and_dist(args[:version])
    update_bower_version(args[:version])
    update_version_in_config(args[:version])
    commit_and_tag_assets(args[:version])
    git_commit_and_tag_locastyle(args[:version])
  end

  def update_version_in_config(version)
    bower_json = File.open("config.rb", "r").read
    update_version = bower_json.gsub(/(set :stable, "\d.\d{1,2}.\d{1,3}")/, "set :stable, \"#{version}\"")
    File.open("config.rb", "w") {|file| file.puts update_version}
  end

  def update_bower_version(version)
    bower_json = File.open("bower.json", "r").read
    update_version = bower_json.gsub(/("version": "\d.\d{1,2}.\d{1,3})"/, "\"version\": \"#{version}\"")
    File.open("bower.json", "w") {|file| file.puts update_version}
  end

  def commit_and_tag_assets(version)
    puts "#{@agent} Let's commit, create tag and push on assets repo..."
    tag = %x{cd ../assets-locastyle && git describe --abbrev=0}
    splited_tag = tag.split(".")
    puts splited_tag
    new_digit = splited_tag.last.to_i + 1
    splited_tag.delete_at(2)
    splited_tag.push(new_digit)
    new_tag = splited_tag.join(".")

    sh %{cd ../assets-locastyle &&
         git add --all &&
         git commit -m "Update with version: #{version}" &&
         git tag -a "#{new_tag}" -m "" &&
         git push origin master --tags}

    puts "#{@agent} All done in assets repo, look at CI to see the build."
  end

  def update_assets
    sh %{current_dir=${PWD##*/} &&
         cd ../assets-locastyle &&
         git fetch --all &&
         git rebase origin/master &&
         cd ../$current_dir }
  end

  def copy_to_assets_and_dist(version)
    puts "#{@agent} Copying files to dist directory and assets repo..."
    update_assets
    sh %{cp -fr deploy/ ../assets-locastyle/files/}
    puts "#{@agent} Files copied."
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
    puts "#{@agent} Cleaning assets and creating temporary deploy directory..."
    sh %{mkdir deploy &&
        cp -fr build/assets/ deploy/#{version} &&
        cd deploy/#{version} &&
        rm -f .DS_Store &&
        rm -rf flash
        rm -rf images/docs
        rm -rf images/locastyle
        rm images/banner-example.png
        rm javascripts/busca.json
        rm javascripts/docs.js
        rm javascripts/example.js
        rm javascripts/templates.js
        rm -rf javascripts/libs
        rm -rf javascripts/docs
        rm stylesheets/docs.css
        rm stylesheets/fonts/selection.json
        rm -rf stylesheets/vendor}
    update_version(version)
    sh %{cd deploy/#{version} &&
         zip -r ../#{version}.zip . &&
         cd ../ &&
         cp -fr #{version}/* ../dist &&
         cp #{version}.zip edge.zip &&
         cp -fr #{version} edge }
    puts "#{@agent} #{version} package of Locastyle is ready. Now let's handle the assets."
  end

  def precompile
    puts "#{@agent} Building project..."
    Rake::Task["build"].invoke
    puts "#{@agent} Project builded."
  end

  def git_commit_and_tag_locastyle(version)
    puts "#{@agent} Let's commit and create the Locastyle tag..."
    sh %{git add --all &&
         git commit -m "Bump version to: #{version}" &&
         git tag -a "#{version}" -m "" }
    puts "#{@agent} Done. Now, to push the code is up to you."
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

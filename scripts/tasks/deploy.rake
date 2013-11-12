# -*- coding: UTF-8 -*-

namespace :deploy do
  @agent = "[Locastyle Robot] says:"

  desc "Build Locastyle assets, generates a new version tag and commit it"
  task :setup, :version do |t, args|
    precompile
    package(args[:version])
    git_tag(args[:version])
  end

  def update_version(version)
    css_content = File.open("deploy/stylesheets/locastyle.css", "r").read
    File.open("deploy/stylesheets/locastyle.css", "w") do |f|
      f.write "/*! Locastyle version: #{version}*/ " + css_content
    end

    js_content = File.open("deploy/javascripts/locastyle.js", "r").read
    File.open("deploy/javascripts/locastyle.js", "w") do |f|
      f.write "/*! Locastyle version: #{version}*/ " + js_content
    end
  end

  def package(version)
    puts "#{@agent} Cleaning assets and creating deploy directory..."
    sh %{cp -fr build/assets/ deploy/ &&
				cd deploy &&
				rm -f .DS_Store &&
				rm -rf google-code-prettify
				rm -rf images/manual
				rm stylesheets/manual.css
				rm javascripts/manual.js
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

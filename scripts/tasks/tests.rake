# -*- coding: UTF-8 -*-

namespace :tests do
  desc "Run all Locastyle tests"
  task :run do
    puts "Running Jasmine tests..."
    Rake::Task["jasmine:ci"].invoke

    Rake::Task["jshint"].invoke
  end
end

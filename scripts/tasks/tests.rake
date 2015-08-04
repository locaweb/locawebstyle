# -*- coding: UTF-8 -*-

namespace :tests do
  desc "Run all Locastyle tests"
  task :run do
    puts "\n\n############################# \n Starting Jasmine tests... \n#############################"
    Rake::Task["jasmine:ci"].invoke

    puts "\n\n############################# \n Starting JSHint tests... \n#############################"
    Rake::Task["jshint"].invoke

    #puts "\n\n############################# \n Starting Wraith tests... \n#############################"
    #sh %{wraith latest spec/wraith/configs/config.yaml} # Running regression test of CSS diff image
  end
end

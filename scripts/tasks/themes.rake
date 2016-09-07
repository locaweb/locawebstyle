# -*- coding: UTF-8 -*-
# rake themes:generate
namespace :themes do
  @agent = "[Locastyle Themes] says:"

  desc "Generate Locastyle themes colors"

  task :generate do
    path = 'source/assets/stylesheets/locastyle/themes/_theme'
    themes = FileList['yellow', 'red']

    themes.each do |themes|

      model = "@import 'compass/css3'
@import '../base/_mixins'
@import '../base/_variables'
@import 'variables-themes'

$name: #{themes}
$color1: $color-#{themes}
$color2: mix($color-mix, $color1, $color-mix-percent)

.ls-bg-theme-#{themes}
  background-color: $color1

.ls-theme-#{themes}
  color: mix($color-mix, $color1, 20%)!important

@import 'base'"


      if File.exists?("#{path}-#{themes}.sass")
        puts "O arquivo #{path}-#{themes}.sass já existe, não será criado um novo"
      else
        puts "Criando arquivo #{path}-#{themes}.sass..."
        f = File.new("#{path}-#{themes}.sass", "w+")
        File.write("#{path}-#{themes}.sass", model)

        f.close
        puts "finalizou"
      end
    end

  end

end

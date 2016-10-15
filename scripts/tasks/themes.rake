# -*- coding: UTF-8 -*-
# rake themes:generate
namespace :themes do
  @agent = "[Locastyle Themes] says:"

  desc "Generate Locastyle themes colors"

  task :generate do
    createConfigThemes
    createBuildThemes

  end

  def themes
    themes = FileList[
      'green'
    ]
  end

  def modelThemeSass
    model = "@import 'compass/css3'
@import '../base/_mixins'
@import '../base/_variables'
@import 'variables-themes'

$color1: $color-#{themes}
$color2: mix($color-mix, $color1, $color-mix-percent)

.ls-bg-theme-#{themes}
  background-color: $color1

.ls-theme-#{themes}
  color: mix($color-mix, $color1, 20%)!important

@import 'theme-base'"
  end

  def modelThemeCss
    model = "/*
*=require locastyle/themes/_theme-#{themes}
*/
"
  end

  def createConfigThemes
    path = 'source/assets/stylesheets/locastyle/themes/_theme'
    themes

    themes.each do |themes|

      modelThemeSass

      if File.exists?("#{path}-#{themes}.sass")
        puts "O arquivo #{path}-#{themes}.sass já existe, não será criado"
      else
        puts "Criando arquivo #{path}-#{themes}.sass..."
        f = File.new("#{path}-#{themes}.sass", "w+")
        File.write("#{path}-#{themes}.sass", modelThemeSass)

        f.close
        puts "O tema #{themes}.sass foi criado com sucesso"
      end
    end
  end

  def createBuildThemes
    path = 'source/assets/stylesheets/theme'
    themes

    themes.each do |themes|

      modelThemeCss

      if File.exists?("#{path}-#{themes}.css")
        puts "O arquivo #{path}-#{themes}.css já existe, não será criado"
      else
        puts "Criando arquivo #{path}-#{themes}.css..."
        f = File.new("#{path}-#{themes}.css", "w+")
        File.write("#{path}-#{themes}.css", modelThemeCss)

        f.close
        puts "O tema #{themes}.css foi criado com sucesso"
      end
    end
  end

end

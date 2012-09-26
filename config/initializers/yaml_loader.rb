# -*- encoding : utf-8 -*-
config_dir = File.join Rails.root, 'config'

LOCASTYLE_THEMES = YAML.load_file(File.join(config_dir, 'locastyle_themes.yml'))

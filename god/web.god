# load in all god configs

@rails_env         = ENV['RAILS_ENV']  || "production"
@rails_root        = ENV['RAILS_ROOT'] || "/var/www/locastyle"
@conf_dir          = File.dirname(__FILE__)
@server_deployment = ENV['LOCAL_DEPLOYMENT'] ? false : (%w(devintegration systemintegration production).member?(@rails_env))
@pids_root         = "#{@rails_root}/tmp/pids"
@log_root          = @server_deployment ? "/var/log/locastyle" : "#{@rails_root}/log"

require "god"
God.terminate_timeout = 60
God.pid_file_directory = @pids_root
God.log_file = "#{@log_root}/god.log"

puts <<-GOD

god configuration:
RAILS_ENV  : #{@rails_env}
RAILS_ROOT : #{@rails_root}
conf_dir   : #{@conf_dir}
log_root   : #{@log_root}
pids_root  : #{@pids_root}
server_mode: #{@server_deployment.inspect}

GOD

%w(unicorn).each {|g| God.load File.join(@conf_dir, "#{g}.god")}

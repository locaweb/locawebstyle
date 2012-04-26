working_directory "/var/www/locastyle"
pid               "/var/www/locastyle/tmp/pids/unicorn.pid"
stderr_path       "/var/www/locastyle/log/unicorn.log"
stdout_path       "/var/www/locastyle/log/unicorn.log"

preload_app true

listen 5002
worker_processes 6
timeout 30

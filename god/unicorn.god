God.watch do |w|
  w.name = "unicorn"
  w.group = "appserver"
  w.interval = 30.seconds
  w.dir = @rails_root
  w.start = "bundle exec unicorn_rails -c #{@rails_root}/config/unicorn/#{@rails_env}.rb -E #{@rails_env} -D"
  w.stop = "/bin/kill -QUIT `/bin/cat #{@pids_root}/unicorn.pid`"
  w.restart = "/bin/kill -USR2 `/bin/cat #{@pids_root}/unicorn.pid`"
  w.start_grace = 10.seconds
  w.restart_grace = 10.seconds
  w.pid_file = "#{@pids_root}/unicorn.pid"

  w.uid = w.gid = "locastyle" if @server_deployment
  w.log = "#{@log_root}/god-unicorn.log"

  w.behavior(:clean_pid_file)

  w.start_if do |start|
    start.condition :process_running do |c|
      c.interval = 5.seconds
      c.running = false
    end
  end

  w.restart_if do |restart|
    restart.condition :memory_usage do |c|
      c.above = 300.megabytes
      c.times = [3, 5] # 3 out of 5 intervals
    end

    restart.condition :cpu_usage do |c|
      c.above = 50.percent
      c.times = 5
    end
  end

  w.lifecycle do |on|
    on.condition :flapping do |c|
      c.to_state = [:start, :restart]
      c.times = 5
      c.within = 5.minute
      c.transition = :unmonitored
      c.retry_in = 10.minutes
      c.retry_times = 5
      c.retry_within = 2.hours
    end
  end
end

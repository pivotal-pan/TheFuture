#!/usr/bin/env ruby
require 'sinatra'
require 'json'


jobs = {}


def update_job(job)
  if job[:progress] < 1
    job[:progress] += 0.25
    prng = Random.new()
    job[:data] += [prng.rand(10), prng.rand(10), prng.rand(10)]
  end
end


get '/' do
  <<END
<html>
  <head>
    <title>Pivotal Analytics II</title>
  </head>
  <body style='background: url("http://la.indymedia.org/uploads/2013/09/dolphin-wall-papers.jpg") center center no-repeat'>
  </body>
</html>
END
end


get '/job/:id' do
  # increment job progress
  id = params[:id].to_i
  job = jobs[id]
  if job
    update_job job
  else
    job = { :id => id, :progress => 0, :data => [] }
    jobs[id] = job
  end
  job.to_json
end

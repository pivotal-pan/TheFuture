#!/usr/bin/env ruby
require 'sinatra'
require 'json'

jobs = {}
next_job = 0


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

get '/chart' do
  # start job
  next_job += 1
  id = next_job
  jobs[id] = { :id => id, :progress => 0, :data => [] }
  "{ jobID: #{id} }"
end

get '/job/:id' do
  # increment job progress
  id = params[:id].to_i
  job = jobs[id]
  if job
    update_job job
    job.to_json
  else
    [ 404, 'pants']
  end
end

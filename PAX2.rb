#!/usr/bin/env ruby
require 'sinatra'
require 'json'


charts = {}


def update_chart(chart)
  if chart[:progress] < 1
    chart[:progress] += 0.25
    prng = Random.new()
    chart[:data] += [prng.rand(10), prng.rand(10), prng.rand(10)]
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


get '/chart/:id' do
  # increment chart progress
  id = params[:id]
  chart = charts[id]
  if chart
    update_chart chart
  else
    chart = { :id => id, :progress => 0, :data => [] }
    charts[id] = chart
  end
  chart.to_json
end

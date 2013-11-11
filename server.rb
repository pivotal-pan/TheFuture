#!/usr/bin/env ruby
require 'sinatra'
require 'json'


charts = []


def update_chart(chart)
  if chart[:progress] < 1
    chart[:progress] += 0.25
    prng = Random.new()
    chart[:data] += [prng.rand(10), prng.rand(10), prng.rand(10)]
  end
end


get '/' do
  erb :index
end


get '/ember*' do
  erb :ember
end


get '/charts' do
  content_type 'application/json'
  charts.to_json
end


get '/charts/:id' do
  content_type 'application/json'

  # increment chart progress
  id = params[:id].to_i
  chart = charts[id]
  if chart
    update_chart chart
  else
    chart = { :id => id, :progress => 0, :data => [] }
    charts[id] = chart
  end
  chart.to_json
end

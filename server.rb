#!/usr/bin/env ruby
require 'sinatra'
require 'json'


next_chart_id = 1


charts = {
  '0' => {'id' => '0', 'name' => 'Default', 'progress' => 1.0, 'data' => []}
}


def update_chart(chart)
  if chart['progress'] < 1
    chart['progress'] += 0.25
    prng = Random.new()
    chart['data'] += [prng.rand(10), prng.rand(10), prng.rand(10)]
  end
end


get '/' do
  erb :index
end


get '/ember' do
  erb :ember
end


get '/charts' do
  content_type 'application/json'
  records = {'charts' => charts.values}
  records.to_json
end


post '/charts' do
  content_type 'application/json'

  request.body.rewind
  record = JSON.parse request.body.read
  chart = record['chart']
  id = next_chart_id.to_s
  chart['id'] = id
  next_chart_id += 1
  charts[id] = chart
  record.to_json
end


get '/charts/:id' do
  content_type 'application/json'

  # increment chart progress
  id = params[:id]
  chart = charts[id]
  if chart
    update_chart chart
  else
    chart = { 'id' => id, 'name' => 'Chart ' + id, 'progress' => 0, 'data' => [] }
    charts[id] = chart
  end
  record = {'chart' => chart}
  record.to_json
end


put '/charts/:id' do
  content_type 'application/json'

  request.body.rewind
  record = JSON.parse request.body.read
  chart = record['chart']
  id = params[:id]
  chart['id'] = id
  chart['progress'] = 0
  chart['data'] = []
  charts[id] = chart
  record.to_json
end


delete '/charts/:id' do
  content_type 'application/json'

  id = params[:id]
  charts.delete id
  200
end

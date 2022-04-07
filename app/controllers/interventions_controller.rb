require "freshdesk"
require 'json'

class InterventionsController < InheritedResources::Base
  skip_before_action :verify_authenticity_token

    def create
       
      @intervention = Intervention.create!(
          user_id: params[:user_id],
          customer_id: params[:customer],
          building_id: params[:building_id],
          battery_id: params[:battery_id],
          column_id: params[:column_id],
          elevator_id: params[:elevator_id],
          employee_id: params[:employee_id],
          # description: params[:description],
          # time_of_intervention: params[:time_of_intervention],
          result: params[:result],
          report: params[:report],
          status: params[:status],
      )
    
      freshdesk_domain = 'rocketelevators'

        # It could be either your user name or api_key.
        api_key = ENV['FRESHDESK_API']
        

          if @intervention.user_id == nil
          @intervention.user_id = "n/a"
          end
          if @intervention.customer_id == nil
          # @intervention.customer = "n/a"
          end
          if @intervention.building_id == nil
          # @intervention.building = "n/a"
          end
          if @intervention.battery_id == nil
          # @intervention.battery = "n/a"
          end
          if @intervention.column_id == nil
          # @intervention.column = "n/a"
          end
          if @intervention.elevator_id == nil
          # @intervention.elevator = "n/a"
          end
          if @intervention.employee_id == nil
          # @intervention.employee = "n/a"
          end
          # if @intervention.description == nil
          # @intervention.description = "n/a"
          # end
          # if @intervention.time_of_intervention == nil
          # @intervention.time_of_intervention = "n/a"
          # end
          if @intervention.result == nil
          # @intervention.result = "n/a"
          end
          if @intervention.report == nil
          # @intervention.report = "n/a"
          end
          if @intervention.status == nil
          # @intervention.status = "n/a"
          end

    
          json_payload = {
              status: 2,  
              priority: 1, 
              "name": @intervention.user_id.to_s,
              "email": "widowslace@rocketelevators.freshdesk.com", 
              "description": 
                "The contact " + @intervention.user_id.to_s + "and has amount of buildings " + @intervention.building_id.to_s,
              "type": "Incident",
              "subject": @intervention.report,
          }.to_json


      freshdesk_api_path = 'api/v2/tickets'

      freshdesk_api_url  = "https://#{freshdesk_domain}.freshdesk.com/#{freshdesk_api_path}"

      site = RestClient::Resource.new(freshdesk_api_url, api_key)

      begin
        response = site.post(json_payload, :content_type=>'application/json')
        puts "response_code: #{response.code} \n Location Header: #{response.headers[:location]}\n response_body: #{response.body}"
      rescue RestClient::Exception => exception
        puts 'API Error: Your request is not successful. If you are not able to debug this error properly, mail us at support@freshdesk.com with the follwing X-Request-Id'
        puts "X-Request-Id : #{exception.response.headers[:x_request_id]}"
        puts "Response Code: #{exception.response.code} Response Body: #{exception.response.body} "
      end
      redirect_to('/intervention')
    end
  end


require "freshdesk"
require 'json'

class InterventionsController < InheritedResources::Base
  before_action :authenticate_user!
  

  def get_buildings_by_customer
    @buildings = Building.where("customer_id = ?", params[:customer_id])
    respond_to do |format|
      format.json { render :json => @buildings }
    end
  end 
  
  def get_batteries_by_building
    @battery = Battery.where("building_id = ?", params[:building_id])
    respond_to do |format|
      format.json { render :json => @battery }
    end
  end 
  
  def get_columns_by_battery
    @column = Column.where("battery_id = ?", params[:battery_id])
    respond_to do |format|
      format.json { render :json => @column }
    end
  end 
  
  def get_elevators_by_column
    @elevator = Elevator.where("column_id = ?", params[:column_id])
    respond_to do |format|
      format.json { render :json => @elevator }
    end
  end 
  


    def create
      # @intervention = Intervention.create!(
      #     author: current_user.employee,
      #     customer: Customer.find(params[:customer]),
      #     building: Building.find(params[:building]),
      #     battery: Battery.find(params[:battery]),
      #     column: Column.find(params[:column]),
      #     elevator: Elevator.find(params[:elevator]),
      #     employee: Employee.find(params[:employee]),
      #     result: params[:result],
      #     report: params[:report],
      #     status: params[:status],
      # )

      @intervention = Intervention.create!(
            author: current_user.employee,
            result: params[:result],
            report: params[:report],
            status: params[:status],
            customer_id: params[:customer],
            building_id: params[:building],
            battery_id: params[:battery],
            column_id: params[:column],
            elevator_id: params[:elevator],
            employee_id: params[:employee]
        )
    
      freshdesk_domain = 'rocketelevators'

        # It could be either your user name or api_key.
        api_key = ENV['FRESHDESK_API']
    
          json_payload = {
              status: 2,  
              priority: 1, 
              "email": "widowslace@codeboxx.biz",
              "description": 
              "An intervention has been requested by " + @intervention.author.first_name + " from the customer " + @intervention.customer.company_name + " at building address number " + @intervention.building.address_id.to_s + ", battery id number " + @intervention.battery.id.to_s  + ", column id number " + @intervention.column.id.to_s + ", and elevator id number " + @intervention.elevator.id.to_s + ". The employee assigned to the task is " + @intervention.employee.first_name + ". Thanks!",
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

      redirect_to('/intervention#create')
    end
end
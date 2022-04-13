 Rocket-Elevators-Foundation











# 𝓝𝓮𝔀 𝓜𝔂𝓼𝓺𝓵 𝓣𝓪𝓫𝓵𝓮

The the tables use mysql and postgres databases and access must be added in the *database.yml* file. 

The following was added to the config/database.yml file with the inclusion of the SecondBase gem:

```bash
secondbase:
  development:
    adapter: postgresql
    database: postgres_dev
  test:
    adapter: postgresql
    database: postgres_test
```
Go ahead and create the table and model by using this line of code in the command line then proceed to the next step
```bash
rails g model Interventions
```
```bash
rails g migration AddColumnsToIntervention
```
After the creation, migration, and seeding of the database tables using the appropriate command:
```bash
rails db:create db:migrate db:seed
```
within a command line, the following line of code must be executed to extract the seeded data and inject it into the postgres data warehouse: 

```bash
rails runner lib/tasks/converter.rb
```
# 𝓕𝓻𝓮𝓼𝓱𝓭𝓮𝓼𝓴 𝓘𝓶𝓹𝓵𝓮𝓶𝓮𝓷𝓽𝓪𝓽𝓲𝓸𝓷
To make a ticket with freshdesk, you have to make sure that you have an account with an API key.

You can find the api key by going to top right> profile settings> Your API key

After copying your API key, head over to [Developers.Freshdesk](https://developer.freshdesk.com/api/v1/#introduction), and login.

Follow the documentation on how to impliment it into your code, and *make sure to have your API key private, as github WILL take it down.*

Go into your leads controller inside your admin/models folder, and configure your code to match what is needed to be submitted as a support ticket/feature request.

The gem needed for this API is
	```gem "freshdesk"```

Put the gem inside your gemfile, then run
	
``` bash
bundle install
```
```bash
#in your interventions controller
api_key = ENV['FRESHDESK_API']
        # Your freshdesk domain
        # freshdesk_domain = 'rocketelevators.freshdesk.com/helpdesk/tickets'
        freshdesk_domain = 'rocketelevators'
        # It could be either your user name or api_key.
        # api_key: ENV['FRESHDESK_API']
        # If you have given api_key, then it should be x. If you have given user name, it should be password
        if @intervention.report == nil
        @intervention.report = "n/a"
        end
        if @intervention.result == nil
        @intervention.result = "n/a"
        end
        if @intervention.status == nil
        @intervention.status = "n/a"
        end
	.
	.
	.
	etc...
        json_payload = {
            status: 2,
            priority: 1,
            "description": "the result of the intervention was " + @intervention.result blah blah blah blah here,
        }.to_json
        freshdesk_api_path = 'api/v2/tickets'
        freshdesk_api_url  = "https://#{freshdesk_domain}.freshdesk.com/#{freshdesk_api_path}"
        site = RestClient::Resource.new(freshdesk_api_url, api_key)
```
and thats all to it!




# 𝓡𝓔𝓢𝓣 𝓐𝓟𝓘

## Overview

Create a web API project

Add a model class and a database context

Scaffold a controller with CRUD methods

Configure routing, URL paths, and return values

Call the web API with Postman

## Installation

Use the [heroku](https://dashboard.heroku.com/apps) platform to deploy.

Since we used c# as our language, you will have to add the c# buildpack. 

```bash
heroku buildpacks:set jincod/dotnetcore
```

## Usage

Click on the links to view and change the statuses.

[GET](https://rocket-elevators-rest-2022.herokuapp.com/api/battery/1/status) 
 the current status of a specific Battery

[PUT](https://rocket-elevators-rest-2022.herokuapp.com/api/battery/1)
 the status of a specific Battery

[GET](https://rocket-elevators-rest-2022.herokuapp.com/api/column/1/status)
the current status of a specific Column

[PUT](https://rocket-elevators-rest-2022.herokuapp.com/api/column/1)
 the status of a specific Column

[GET](https://rocket-elevators-rest-2022.herokuapp.com/api/elevator/1/status)
the current status of a specific Elevator

[PUT](https://rocket-elevators-rest-2022.herokuapp.com/api/elevator/1)
the status of a specific Elevator

[GET](https://rocket-elevators-rest-2022.herokuapp.com/api/elevator/broken)
a list of Elevators that are not in operation at the time of the request

[GET](https://rocket-elevators-rest-2022.herokuapp.com/api/building/interventions)
a list of Buildings that contain at least one battery, column or elevator requiring intervention

[GET](https://rocket-elevators-rest-2022.herokuapp.com/api/lead/notcustomer)
 a list of Leads created in the last 30 days who have not yet become customers.

[GET](https://rocket-elevators-2022.herokuapp.com/api/intervention/)
 a list of Interventions created

[PUT](https://rocket-elevators-2022.herokuapp.com/api/interventions/InProgress)
  the status of an intervention to inprogress and change the date and time

[PUT](https://rocket-elevators-2022.herokuapp.com/api/interventions/Completed)
  the status of an intervention to completed and changed the date and time

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Documentation 
We used the following websites to build this project:

[microsoft web api docs](https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-3.1&tabs=visual-studio-code)

[heroku docs](https://devcenter.heroku.com/categories/reference)

[Microsoft LINQ Docs](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/linq/introduction-to-linq-queries)

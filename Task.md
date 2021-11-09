### Covid 19 Statistics

* [Introduction](#introduction)
* [Tasks](#tasks)
* [Resources](#resources)

#### Introduction
You need to create applicatiton for covid 19 statistics.
The application needs to have two parts:
* Backend API - Php(with Laravel)
* Frontend Client - React(Optionally with Next.js)

#### Tasks
* Backend
    * You need to create Laravel 8 Project
    * You need to use Laravel Octane for serving Backend API
    * You need to implement Authorization system with Laravel Sanctum
    * You need to implement Database Architecture with the provided diagram(there is only two tables, ofcourse in your DB there will be table for users, migrations, sanctum tokens, etc. I haven't add them into the diagram becouse they are created by the packages and laravel itself)
    * You need to create One-Time artisan command for populating countries table from the countries' api(see below resources)
    * All the routes should be Sanctum-Protected(except Sign In)
    * You need to create following APIs:
        * API for all the countries data
        * API for death, confirmed and recovered summary
    * All the APIs should have Unit Tests
    * You need to create artisan command and register it in the Laravel Scheduler. This Job should execute hourly and fetch statistics data from the country statistics' API. This API is restricted and can only give information on just one country per request! You need to take this into consideration because your task is to fetch **ALL** the countries data and synchronize them. Each country needs to have only one record each day!
* Front End
    * You need to create fresh React Application
    * App should have redux state managment
    * You need to create Autorization with the help of Sanctum tokens
    * You need to create SpreedSheet Table for all the countries and show all the information with this api
    * You should be able to sort the results by the deaths, confirmeds and recovereds value - in ascending and descending order
    * You need to have search input that's gonna search in every field of the data records and filter the results with it.
    * You need to create Cards for deaths, recoveries and confirmeds summary data
    * Client Application needs to have localization support: English and Georgian

#### Resources
[API Specification](https://devtest.ge/api)
<br>
[DB Diagram for Covid Statistics Tables](https://drawsql.app/redberry-llc/diagrams/covid-statistics)
<br>
[Laravel Octane](https://laravel.com/docs/8.x/octane)
<br>
[Laravel Sanctum](https://laravel.com/docs/8.x/sanctum)

# rate-limit-test-tool
Rate Limit Test Tool UI, built in Angular 5 with RXJS - Hits a Target API Endpoint X Amount of Times, Analyses Results Accordingly Over Time.
Useful UI for testing rate limiting and replicating brute force attacks to an extent on your application API endpoints.

One would expect when hit x amount of times within x amount of time an API endpoint would reject a request to a potentially malicious user. Sadly this is not the case with alot of today's applications not applying security against brute force attacks. 
This tool helps you to test rate limiting on your api's when using libraries like [express-brute](https://www.npmjs.com/package/express-brute) and other types of rate limiting software.

## Features
Hit endpoints using GET, POST, PUT, DELETE

Set your rate limit, ie how many times you want to hit your endpoint

Set Custom Headers in API calls

Send Custom Payloads in API calls

## Installation
`npm install`

## Run local
Once installed run from local

`ng serve`

Observe local running on
http://localhost:4200

## Online Demo
View an online demo  [Here](http://rate-limit-test-tool.mybluemix.net)

[![Build Status](https://travis-ci.org/AbonyiXavier/WayFarer.svg?branch=Develop)](https://travis-ci.org/AbonyiXavier/WayFarer)

# WayFarer

WayFarer is a public bus transportation booking server. It is built on top of NodeJS and Express. It is higly flexible because it provides users with opportunity to:

- sign up
- sign in
- Register a bus
- create trips
- get all trips
- book a seat on a trip
- view all bookings
- delete a booking
- cancel a trip

# Getting Started

To obtain a copy of this app download or clone the repository at this [url](https://git.heroku.com/wayfarer01.git)

# Prerequisites

You must have

- NodeJs Installed
- A browser Installed
- A RESTAPI client(like POSTMAN) Installed
- An Internet connection to download the dependencies.

## Installing locally

- (If the repository wasnt cloned)Extract the contents of the downloaded zip file into any suitable location on the computer
- In the command prompt, cd to the root of the directory you extracted the app into
- Run 'npm install' to install all dependencies
- Run 'npm start' to start the application
- In a browser address bar navigate to 'http://localhost:5555'

# Using Wayfarer through its Gui locally

- Input http://localhost:5555 in the address bar.
- Enter appropriate information

# Using Wayfarer through a restful client (hosted on heroku)

- Open any restful client application initially installed
- Select the appropriate http method. Either GET, POST, DELETE, PUT

### Signin

- Use the POST method
- Use this url https://wayfarer01.herokuapp.com/api/v1/auth/signin

### Signup

- Use the POST method
- Use this url https://wayfarer01.herokuapp.com/api/v1/auth/signup

### Register bus

- Use the POST method
- Use this url https://wayfarer01.herokuapp.com/api/v1/registerbus

### Create a trip

- Use the POST method
- Use this url https://wayfarer01.herokuapp.com/api/v1/trips

### Get all trips

- Use the GET method
- Use this url https://wayfarer01.herokuapp.com/api/v1/trips

### Book a seat on a trip

- Use the POST method
- Use this url https://wayfarer01.herokuapp.com/api/v1/bookings

### View all bookings

- Use the GET method
- Use this url https://wayfarer01.herokuapp.com/api/v1/bookings

### Delete a booking

- Use the DELETE method
- Use this url https://wayfarer01.herokuapp.com/api/v1/bookings/:bookingId

### Cancel a trip

- Use the PATCH method
- Use this url https://wayfarer01.herokuapp.com/api/v1/trips/:tripId

# Running Tests

If all the dependencies installed correctly run 'npm test' in the root of the installation folder in the command prompt/Terminal. Each test tests each aforementioned operation individually.

## Built With

- NodeJs
- Express

## Tested With

- Mocha
- Chai

## Author

- Abonyi Nnamdi Francis

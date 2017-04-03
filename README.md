# Poll Maker - The easy way to create polls

This project is for test and learning purpose.
It should be a service for create polls and use the polls in clients.

Today it's composed by the projects poll-maker and poll-restaurant.

## Poll Maker

A spring boot rest service that is used for create polls.

### Dependencies

It's a spring boot rest application with tomcat embedded.
You can build it with gradle and all jar dependencies will be resolved.
You can find in the project a Dockerfile to deploy in you container.
This is an Eclipse Project and uses Java 8.

The list of main dependencies are:
* [Gradle](https://gradle.org/)
* [Spring Boot](https://projects.spring.io/spring-boot/)
* [Java 8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

### Next Steps

1. Integrate the service with redis to create a storage.
2. Create a web application to easy poll creation.
3. Integrate with couchdb as an alternative and to learn more about this nosql database
4. Integrate with mongodb for learning

## Poll Restaurant

A Angular 4+ client for restaurant polls using poll-maker services.

### Dependencies

It's a angular 4+ client using jasmine, test bed and protractor tests.
You can build it with angular cli and node js, don't forget to run npm install in the root directory before.
This is an Visual Studio Code Project and uses Angular 4.

The list of main dependencies are:
* [NodeJS](https://nodejs.org/en/)
* [Angular](https://angular.io/)
* [Protractor](http://www.protractortest.org)
* [Jasmine](https://jasmine.github.io/)

### Next Steps

1. Make it store the location of restaurant.
2. Increase the tests, today we have 15 unit tests and increasing on meaningfull and quantity.
3. Increase e2e test, today we have only one
4. If you already voted in one poll go straight for the results
5. Show on screen invalidated restaurants
6. Pagination on poll list
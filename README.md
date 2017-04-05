# Poll Maker - The easy way to create polls

This project is for test and learning purpose.
It should be a service for create polls and use the polls in clients.

Today it's composed by the projects poll-maker and poll-restaurant.

## Poll Maker

A spring boot rest service that is used for create polls.

### Running

Run the server with the command java -jar build/libs/pool-maker-0.0.0.jar inside poll-maker directory.
By default it uses http://localhost:8080. You should use the http://serverURL:serverPort in the poll-restaurant config.

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

### Configuration

Be shure that the poll-maker server is runing and right in the config file in poll-restaurant/config/config.json.
If is not right you will get error on the E2E test.

1) poll-restaurant App should connect with spring boot server online
  - Expected 'Undefined Error on Server Access !
  close' not to contain 'Undefined Error on Server Access !'.

Test your server with command >curl http://<serviceURL>:<serverPort>/polls?mail=<mail2test>
The serviceURL and serverPort you should put in the poll-restaurant config.json file.

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
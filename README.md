# Stay-at-Home
![logo] (https://github.com/Zaidwerd/stay-at-home/blob/master/public/images/Screenshots/Logo.png)
###Stay Home Date Night Movie and Recipe Generator

##Requirements:
Create a full-stack Express.js application using MVC model that pulls information from an API that can be saved onto a Mongo Database with full CRUD functionality.

##Inspirations/User Stories:
* The inspiration comes from two things, date nights and lazy nights. 
* First date nights, this app was made for those times when a couple is looking to be lazy on a sunday night but still want to spend time with each other. That couple would look for a app that can help shorten the possible indecisiveness of pick a movie and what to eat. Instead, all they need to know is an actor they both enjoy and whats in the fridge. With a simple search, a decision could quickly be made for a stay home dinner and a movie date night. 
* The second inspiration comes from lazy rainy days, when it's too wet to go outside and possibly too broke to order out. This app can serve as a decision maker for a night in. Find a quick random recipe with what you have in the fridge and a movie with an actor you enjoy. 

##Technologies:
* HTML5/CSS
* JavaScript
* Node.js
* API's
* MongoDB
* Heroku
* User Authorization

##Dependencies:
![dependencies] (https://github.com/Zaidwerd/stay-at-home/blob/master/public/images/Screenshots/Dependencies.png)

##API's:
* Netfix Roulette: "http://netflixroulette.net/api/"
* Recipe Puppy: "http://www.recipepuppy.com/about/api/"

##Logic
Search framework
![framework] (https://github.com/Zaidwerd/stay-at-home/blob/master/public/images/Screenshots/SearchFramework.png)

Using a search form, I connected to two API's to grab three movies by actor:
![movieSearch] (https://github.com/Zaidwerd/stay-at-home/blob/master/public/images/Screenshots/MovieSearch.png)
and three recipes by ingredients:
![recipeSearch] (https://github.com/Zaidwerd/stay-at-home/blob/master/public/images/Screenshots/RecipeSearch.png)
after one movie and one recipe has been selected using the radio buttons, that combo can be saved to the users main page and can be nicknamed to a silly name or match the appropriate event. 
![savedScreenshot] (https://github.com/Zaidwerd/stay-at-home/blob/master/public/images/Screenshots/Saved.png)
MVC layout helped organize my full stack application. I use 2 models for my Stay-at-Home mongo database. One for my user's collection and the other for my saved collection. the saved model holds 5 functions used to task a majority of my CRUD functionality in my app. Mainly to add saved selections, get saved collection, delete a certain object, grab a certain object to be edited and save edited object all from the saved collection. The searches from my two API's are held in my services. 

##Unsolved Problems
* Grabbing data from two seperate API's using a single radio input form.
![savedFunction] (https://github.com/Zaidwerd/stay-at-home/blob/master/public/images/Screenshots/SaveFunction.png)
The saved function mixed with the radio buttons in my for loop would not allow me to grab mutiple data lines. Instead would grab all three values in every key I try to pull and save it as arrays in an object. 
![ejsRadioLoop] (https://github.com/Zaidwerd/stay-at-home/blob/master/public/images/Screenshots/RadioButton.png)

##Future Improvements
* Gain access to more reliable API's such as Netflix OSS and Spoonacular's Food-API
* Add additional API options for Drinks and Games
* Add a share and/or email button to saved combos
* Add CRUD to user database

##Thank You
* GA Instructors
* Jimmy De Los Angeles for recipe idea

##Credit
* Saved Function in Model assisted by: Bobby King
* Auth User Template by: Rafa Pacas, Bobby King and the rest of the GA Instructors
* CRUD functionality adapted from: GA Instructor examples

* Box Shadow CSS: http://www.cssmatic.com/box-shadow

* API's: Netflix Roulette and Recipe Puppy

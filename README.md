Movie info app for Laurea's Dynamic Web Apps with JavaScript course. 
The app has two main sections: the theatre list and the search.

Theatre list:
-list is hard coded, because the list changes very rarely and there is no need to fetch a fresh list every time the app is used.
-The user can select a theatre from a list located in the side bar on the left side of the screen.
-The movie information for the selected theatre is then displayed in a box in the centre of the screen.
-The information displayed includes: 
    -selected theatre
    -poster images and titles for the movies
    -start time, which has been made more readable from the XML format provided by the API
    -Age limit, genre, duration and location

Search:
-the user also has the option to search for a movie by title or part of title, the search is not case sensitive
-The movie information for the found movie is then displayed in a box in the centre of the screen.
-Displayed are a header section and the theatre info. The header displays the name of the movie, the movie's poster image as well as the age limit, genre and duration of the movie.
-The theatre info lists the theatre names and movie start times of theatres located in the Helsinki region.


General:
-The page is in Finnish as Finnkino's API provides the information in Finnish. 
-There are short instructions at the top of the page as to what the user can do.
-The search only shows the results for the Helsinki region as this is how the API is constructed, it would ofcourse have been possible to expand the search or add a dropdown menu for areas, but I feel this is enough for the scope of this exercise.
-There is yet again a nifty favicon at the top of the page.
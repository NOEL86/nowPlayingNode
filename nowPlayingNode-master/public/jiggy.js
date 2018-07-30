var config = {
    apiKey: "AIzaSyB_p0WIpiO2nbmIL2MWja2NLh9oiBaJ5d4",
    authDomain: "now-playing-test.firebaseapp.com",
    databaseURL: "https://now-playing-test.firebaseio.com",
    projectId: "now-playing-test",
    storageBucket: "now-playing-test.appspot.com",
    messagingSenderId: "22833908007"
};

firebase.initializeApp(config);

var database = firebase.database();


var apiKey = "apikey=b9c0f031"
var title = "";


function dynamic() {
    window.open("/dynamic", "_self");
};

function search() {

    $.ajax({
        url: "https://www.omdbapi.com/?t=" + title + "&y=&plot=short&type=movie&rating=&" + apiKey,
        method: "GET"
    }).then(function (response) {

        var title = response.Title;
        var rating = response.Rated;
        var runTime = response.Runtime;
        var awards = response.Awards;
        var imdbScore = response.Ratings[0].Value;
        var rottenTomatoesScore = response.Ratings[1].Value;
        var metaCrticScore = response.Ratings[2].Value;
        var cast = response.Actors;
        var synopsis = response.Plot;
        var poster = response.Poster;
        var id = response.imdbID;

        newMovie = {
            title: title,
            rating: rating,
            runTime: runTime,
            imdbScore: imdbScore,
            rottenTomatoesScore: rottenTomatoesScore,
            metaCrticScore: metaCrticScore,
            awards: awards,
            cast: cast,
            synopsis: synopsis,
            poster: poster,
            id: id,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        };

        database.ref().push(newMovie);
        dynamic();

    });

};

function movieList() {

    var queryURL = "https://api.themoviedb.org/3/movie/popular?api_key=6364491e63695bac0f912490a6a5a3d8&language=en-US&page=1&append_to_response=now_playing";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        for (i = 0; i < 15; i++) {
            var responseTitle = response.results[i].original_title;
            var id = "movie" + i;
            var listID = "<li id='" + id + "' class='movieLink' data-name='" + responseTitle + "'>" + responseTitle + "</li>";

            if (response.results[i].original_language == "en" && i < 10) {
                $(".movieList").append(listID);
            };

        };

        var queryURL2 = "https://api.themoviedb.org/3/movie/top_rated?api_key=6364491e63695bac0f912490a6a5a3d8&language=en-US&page=1";

        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function (response) {

            for (i = 0; i < 15; i++) {
                var responseTitle = response.results[i].original_title;
                var id = "movie" + i;
                var listID = "<li id='" + id + "' class='movieLink' data-name='" + responseTitle + "'>" + responseTitle + "</li>";

                if (response.results[i].original_language == "en") {
                    $(".topRated").append(listID);
                };


            };

            // List Link Function
            $(".movieLink").on("click", function (event) {
                event.preventDefault();
                title = $(this).attr("data-name");
                search();

            });

        });
    });

};


function tvList() {
    var APIKeyMovie = "6364491e63695bac0f912490a6a5a3d8";
    var queryURL = "https://api.themoviedb.org/3/tv/on_the_air?api_key=6364491e63695bac0f912490a6a5a3d8&language=en-US&page=1&append_to_response=popular";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {


        for (i = 0; i < 15; i++) {
            var responseTitle = response.results[i].original_name;
            var id = "tv" + i;
            var listID = "<li id='" + id + "' class='tvLink' data-name=''>" + responseTitle + "</li>";

            if (response.results[i].origin_country == "US" && i < 10) {
                $(".tvList").append(listID);

            };
        };

        var queryURL2 = "https://api.themoviedb.org/3/tv/top_rated?api_key=6364491e63695bac0f912490a6a5a3d8&language=en-US&page=1";

        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function (response) {

            for (i = 0; i < 15; i++) {
                var responseTitle = response.results[i].original_name;
                var id = "tv" + i;
                var listID = "<li id='" + id + "' class='tvLink' data-name=''>" + responseTitle + "</li>";

                if (response.results[i].origin_country == "US") {
                    $(".tvTopRated").append(listID);

                };


            };

            $(".tvLink").on("click", function (event) {
                event.preventDefault();
                title = $(this).attr("data-name");
                search();

            });
        });

    });
};

function expand() {
    $(".search").toggleClass("close");
    $(".input").toggleClass("square");
    if ($(".search").hasClass("close")) {
        $("input").focus();
    } else {
        $("input").blur();
    }
}


$(window).on("load", function () {
    tvList();
    movieList();
});


// Poster Function
$(".devPicks").on("click", function (event) {
    event.preventDefault();
    title = $(this).attr("data-name");
    search();
});

// Animated Search
$(".search").on("keyup", function (event) {
    event.preventDefault();
    console.log(event);
    title = $("#typeSearch").val().trim();
    search();
    $("#typeSearch").val("");
});

// Search Button Function
$("#typeSearchButton").on("click", function (event) {
    event.preventDefault();
    title = $("#typeSearch").val().trim();
    search();
});

// Search Expand
$(".search").on("click", expand);





var moviesList = ["Kalki 2898 AD", "Raayan","Thangalan","Double Ismart"];

function loadMovies(){
    document.getElementById('lstMovies').innerHTML = "";
    moviesList.map(function(movie){
        var option = document.createElement('option');
        option.value = movie;
        option.text = movie;
        document.getElementById('lstMovies').appendChild(option)
    })
    document.getElementById("moviesCount").innerText = moviesList.length;
}

function sortAsc(){
    moviesList.sort();
    loadMovies();
}

function sortDsc(){
    moviesList.sort().reverse();
    loadMovies();
}

function addMovie(){
    var movieName = document.getElementById('txtMovie').value;
    if(movieName == ''){
        alert(`Movie name is required...`)
    }
    else if(moviesList.indexOf(movieName) == -1){
        moviesList.unshift(movieName);
        loadMovies();
        document.getElementById('txtMovie').value = '';
        alert(`${movieName} is add to the list`);
    }else{
        alert(`${movieName} is already exists`);
    }
}

function removeMovie(){
    var movieName = document.getElementById('lstMovies').value;
    var movieIndex = moviesList.indexOf(movieName);
    var result = confirm(`Are you sure\nWant to delete ${movieName} ?`);
    if(result === true){
        moviesList.splice(movieIndex,1);
        loadMovies();
        alert(`${movieName} deleted Succesfully...`)
    }
}

function clearAll(){
    var result = confirm(`Are you sure\nWant to delete all movies?`);
    if(result === true){
        moviesList.length = 0;
        loadMovies();
    }
}

function editMovie(){
    movieName = document.getElementById('lstMovies').value;
    if(movieName == ''){
        alert("Please select a Movie...!")
    }
    document.getElementById('modifyMovie').value = document.getElementById('lstMovies').value;
}

function save(){
    modifiedName = document.getElementById('modifyMovie').value;
    movieIndex = moviesList.indexOf(document.getElementById('lstMovies').value);
    if(moviesList.indexOf(modifiedName) == -1){
        moviesList[movieIndex] = modifiedName;
        loadMovies();
        alert(`Movie name changed Succesfully...!`)
    }
}
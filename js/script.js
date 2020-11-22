/*Classes*/

class Movie{
    constructor(title,year,genre,director,actors,imageUrl){
        this.title=title
        this.year=year
        this.genre=genre
        this.director=director
        this.actors=actors
        this.timeToMake = getRandomBetween(200,730,false)
        this.cost = getRandomBetween(10,150,true)
        this.imageUrl = imageUrl
    }
}

class Card{
    constructor(movie){
        this.movie=movie
        this.title = movie.title
        this.year = movie.year 
    }
}

/*Functions*/

function getRandomBetween(min,max,isMilion){
    random = Math.floor(Math.random() * (max - min)) + min
    if (isMilion) {
        return random * 1000000
    }
        return random
}

function buscar(){
    fillMainContent(getMoviesAll())
}
/* Carrega index com as novidades*/
function getNewMovies(){
    console.log("hey")
    let mainContent = document.getElementById('main-content')
    mainContent.innerHTML +='<div class="row pl-5 pt-5"><div class="col-md-6 col-xl-4 mb-5 mt-n5"><div class="card movie-card h-100" onClick="getNewMovies()" style="width: 18rem;"><div class="movie-info"><p>007 - No time to Diesss</p><p class="text-detalhes">(carregue para ver mais detalhes!</p> </div><div class="card-body"><h5 class="card-title">007 - No time to Die</h5><h6 class="card-subtitle mb-2 text-muted">2021</h6><img src="img/posters/007 - No-Time-to-Die.jpg" class="card-img" alt=""></div></div></div></div>'
}

function addRow(idStr){
    let mainContent = document.getElementById('main-content')
    mainContent.innerHTML +='<div id='+idStr+' class="row pl-5 pt-5"></div>'
}
function getMoviesAll(){
    let movies =[]
    movies.push(new Movie('Eurovision','2020','Musical','David Dobkin','Will Ferrell, Rachel McAdams, Dan Stevens, Natasia Demetriou, Pierce Brosnan','img/posters/eurovision.jpg'))
    movies.push(new Movie('Sing','2016','Animação','Garth Jennings','Reese Witherspoon, Scarlett Johansson, Taron Egerton, Matthew McConaughey, Nick Offerman, Seth MacFarlane, John C. Reilly, Nick Kroll, Leslie Jones','img/posters/sing.jpg'))
    movies.push(new Movie('I Saw the Light','2016','Biografia','Marc Abraham','Tom Hiddleston, Elizabeth Olsen, David Krumholtz, Bradley Whitford','img/posters/ISawTheLight.jpg'))
    movies.push(new Movie('Step Up - All IN','2014','Musical','Trish Sie',' Ryan Guzman, Briana Evigan, Misha Gabriel, Izabella Miko','img/posters/step-up-all-in.jpg'))
    movies.push(new Movie('Metalica - Through The never','2013','Musical','Nimrod Antal','Dane DeHaan, Lars Ulrich, James Hetfield, Kirk Hammett','img/posters/metallica-through-never-pos.jpg'))
    movies.push(new Movie('Frozen II','2019','Animação','Chris Buck, Jennifer Lee','Josh Gad, Idina Menzel, Zachary Levi, Sterling K. Brown, Kristen Bell, Evan Rachel Wood','img/posters/frozen-2.jpg'))
    movies.push(new Movie('Toy Story 4','2019','Animação','John Lasseter, Josh Cooley','Tom Hanks, Tim Allen, Laurie Metcalf, Annie Potts, Joan Cusack, Patricia Arquette, Bonnie Hunt, Jeff Garlin','img/posters/ToyStory 4.jpg'))
    movies.push(new Movie('Lego Movie 2','2019','Animação','Mike Mitchell','Chris Pratt, Tiffany Haddish, Morgan Freeman, Elizabeth Banks, Charlie Day, Channing Tatum, Jonah Hill, Alison Brie, Will Arnett','img/posters/Lego-2.jpg'))
    movies.push(new Movie('Spider-man in Spider-verse','2018','Animação','Peter Ramsey, Bob Persichetti, Rodney Rothman','Shameik Moore, Mahershala Ali, Liev Schreiber, Jake Johnson, Hailee Steinfeld, Lily Tomlin, Nicolas Cage','img/posters/Spider-man in spider.verse-2.jpg'))
    movies.push(new Movie('BAD BOYS FOR LIFE','2019','ação','Adil El Arbi, Bilall Fallah','Will Smith, Martin Lawrence, Paola Nunez, Jacob Scipio, Vanessa Hudgens','img/posters/bad boys.jpg'))
    movies.push(new Movie('STAR WARS: THE RISE OF SKYWALKER','2019','ficção','J.J. Abrams','Daisy Ridley, Oscar Isaac, John Boyega, Adam Driver, Keri Russell, Lupita Nyong`o, Mark Hamill, Carrie Fisher, Richard Grant, Anthony Daniels, Domhnall Gleeson, Dominic Monaghan, Greg Grunberg','img/posters/STAR WARS - THE RISE OF SKYWALKER.jpg'))
    movies.push(new Movie('The Kings Man','2019','ação ','Matthew Vaughn','Ralph Fiennes, Gemma Arterton, Liam Neeson, Stanley Tucci, Aaron Taylor-Johnson, Matthew Goode, Charles Dance, Tom Hollander, Daniel Bruhl, Djimon Hounsou, Rhys Ifans','img/posters/The kings Man.jpg'))
    movies.push(new Movie('JUMANJI: THE NEXT LEVEL','2019','ação /ficção','Jake Kasdan',' Dwayne Johnson, Jack Black, Karen Gillan, Kevin Hart, Danny DeVito, Nick Jonas, Awkwafina , Alex Wolff, Ser’Darius Blain, Madison Iseman, Morgan Turner','img/posters/jumanji_the_next_level.jpg'))
    movies.push(new Movie('MARRIAGE STORY','2019','Drama','Noah Baumbach','Scarlett Johansson, Adam Driver, Laura Dern, Ray Liotta, Alan Alda, Wallace Shawn, Julie Hagerty','img/posters/MARRIAGE STORY.jpg'))
    movies.push(new Movie('Rambo Last Blood','2019','ação','Adrian Grunberg','Sylvester Stallone, Paz Vega','img/posters/Rambo Last Blood.jpg'))
    movies.push(new Movie('Joker','2019','Drama/ ação','Todd Phillips',' Joaquin Phoenix, Robert De Niro, Zazie Beetz, Frances Conroy, Brett Cullen, Bill Camp, Shea Whigham, Douglas Hodge','img/posters/Joker.jpg'))
    movies.push(new Movie('TopGun -Maveric','2020','Ação','Joseph Kosinski',' Tom Cruise, Val Kilmer, Miles Teller, Thomasin McKenzie, Charles Parnell, Jay Ellis, Bashir Salahuddin, Danny Ramirez, Monica Barbaro','img/posters/TopGun -Maveric.jpg'))
    movies.push(new Movie('Run','2020','Mistério/ Thriller','Aneesh Chaganty','Sarah Paulson, Pat Healy, Kiera Allen','img/posters/run-poster-main.jpg'))
    movies.push(new Movie('BORAT SUBSEQUENT MOVIEFILM','2020','Comédia','','Sacha Baron Cohen','img/posters/Borat II.jpg'))
    movies.push(new Movie('007 - NO TIME TO DIE','2021','Ação',' Cary Fukunaga','Daniel Craig, Lashana Lynch, Jeffrey Wright, Lea Seydoux, Naomie Harris, Ralph Fiennes, Rami Malek','img/posters/007 - No-Time-to-Die.jpg'))
    movies.push(new Movie('THE SECRETS WE KEEP','2020','Crime/ Drama','Yuval Adler','Noomi Rapace, Joel Kinnaman, Chris Messina','img/posters/secrets_we_keep.jpg'))
    movies.push(new Movie('The war with Grandpa','2020','Comédia','Tim Hill','Robert De Niro, Uma Thurman, Jane Seymour, Christopher Walken, Rob Riggle, Colin Ford, Cheech Marin','img/posters/The_War_With_Grandpa.jpg'))
    movies.push(new Movie('Tenet','2020','ação /ficção','Christopher Nolan','John David Washington, Elizabeth Debicki, Robert Pattinson, Aaron Taylor-Johnson, Kenneth Branagh, Clémence Poésy','img/posters/Tenet.jpg'))
    movies.push(new Movie('Radioactive','2020','Biografia','Marjane Satrapi','Rosamund Pike, Anya Taylor-Joy, Sam Riley','img/posters/radioactive.jpg'))
    movies.push(new Movie('black widow','2021','ação','Cate Shortland','Scarlett Johansson, David Harbour, Rachel Weisz, Florence Pugh, William Hurt, Ray Winstone','img/posters/black widow.jpg'))
    movies.push(new Movie('Fast 9','2021','ação /ficção','Justin Lin','Vin Diesel, Michelle Rodriguez, Nathalie Emmanuel, Tyrese Gibson, Chris \'Ludacris\' Bridges, Jordana Brewster, John Cena','img/posters/fast 9.jpg'))
    movies.push(new Movie('Horse Girl','2020','Drama','Jeff Baena','Alison Brie, Molly Shannon, Paul Reiser, Robin Tunney, Jay Duplass','img/posters/Horse-Girl.jpg'))
    return movies
}

function getMoviesByName(){}
function addMovieCardToRow(rowID,card){
    let row = document.getElementById(rowID)
    row.innerHTML +='<div class="col-md-6 col-xl-4 mb-5 mt-n5"><div class="card movie-card h-100"'
    +'onClick="{alert(\''+card.title+'\')}" style="width: 18rem;"><div class="movie-info"><p>'
    +card.title+'</p><p class="text-detalhes">(carregue para ver mais detalhes!</p></div>'
    +'<div class="card-body"><h5 class="card-title">'+card.title+'</h5><h6 class="card-subtitle mb-2 text-muted">'
    +card.year+'</h6><img src="'+card.movie.imageUrl+'" class="card-img" alt=""></div></div></div>'
}

function fillMainContent(movieList){
    rowCounter = 0
    rowId = "row"+rowCounter
    for(i=0; i < movieList.length;i++){
        if(i % 3 == 0){
            rowCounter += 1
            rowId = "row"+rowCounter
            addRow(rowId)
        }
        addMovieCardToRow(rowId,new Card(movieList[i]))
    }

}
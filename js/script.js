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
        this.nameId = title.replace(/\s/g, "-")
    }
}

class Actor{
    constructor(name, nationality,birthday,age,genre,imageUrl){
        this.name=name
        this.nationality=nationality
        this.birthday=birthday
        this.age=age
        this.genre=genre
        this.imageUrl = imageUrl
        this.nameId = name.replace(/\s/g, "-")
    }
}

class Director{
    constructor(name, nationality,birthday,age,genre,imageUrl){
        this.name=name
        this.nationality=nationality
        this.birthday=birthday
        this.age=age
        this.genre=genre
        this.imageUrl = imageUrl
        this.nameId = name.replace(/\s/g, "-")
    }
}

class Producer{
    constructor(name, nationality,birthday,age,genre,imageUrl){
        this.name=name
        this.nationality=nationality
        this.birthday=birthday
        this.age=age
        this.genre=genre
        this.imageUrl = imageUrl
        this.nameId = name.replace(/\s/g, "-")
    }
}

class Studio{
    constructor(name,creationDate,nationality,city,imageUrl){
        this.name=name
        this.creationDate=creationDate
        this.nationality=nationality
        this.city=city
        this.numberOfMovies=getRandomBetween(10,1000,true)
        this.imageUrl = imageUrl
        this.nameId = name.replace(/\s/g, "-")
    }
}
/*movies*/
class Card{ 
    constructor(movie){
        this.movie=movie
        this.title = movie.title
        this.year = movie.year 
    }
}

class CardActor{ 
    constructor(actor){
        this.actor=actor
        this.title = actor.name
        if(actor.genre=='Masculino'){
            this.description='Ator'
        }else{
            this.description='Atriz'
        }
    }
}

class CardDirector{ 
    constructor(director){
        this.actor=director
        this.title = director.name
        if(director.genre=='Masculino'){
            this.description='Diretor'
        }else{
            this.description='Diretora'
        }
    }
}

class CardProducer{ 
    constructor(producer){
        this.actor=producer
        this.title = producer.name
        if(producer.genre=='Masculino'){
            this.description='Produtor'
        }else{
            this.description='Produtora'
        }
    }
}

class CardStudio{ 
    constructor(studio){
        this.studio=studio
        this.title = studio.name
        this.description='Estúdio'
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
function setBuscaOnFocus(){
    let busca = document.getElementById("inp-busca")
    busca.focus()
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

function getFavoriteMovies(){
    let favMovies =[]
    favMovies.push(new Movie('Toy Story 4','2019','Animação','John Lasseter, Josh Cooley','Tom Hanks, Tim Allen, Laurie Metcalf, Annie Potts, Joan Cusack, Patricia Arquette, Bonnie Hunt, Jeff Garlin','img/posters/ToyStory 4.jpg'))
    favMovies.push(new Movie('Lego Movie 2','2019','Animação','Mike Mitchell','Chris Pratt, Tiffany Haddish, Morgan Freeman, Elizabeth Banks, Charlie Day, Channing Tatum, Jonah Hill, Alison Brie, Will Arnett','img/posters/Lego-2.jpg'))
    favMovies.push(new Movie('BAD BOYS FOR LIFE','2019','ação','Adil El Arbi, Bilall Fallah','Will Smith, Martin Lawrence, Paola Nunez, Jacob Scipio, Vanessa Hudgens','img/posters/bad boys.jpg'))
    favMovies.push(new Movie('STAR WARS: THE RISE OF SKYWALKER','2019','ficção','J.J. Abrams','Daisy Ridley, Oscar Isaac, John Boyega, Adam Driver, Keri Russell, Lupita Nyong`o, Mark Hamill, Carrie Fisher, Richard Grant, Anthony Daniels, Domhnall Gleeson, Dominic Monaghan, Greg Grunberg','img/posters/STAR WARS - THE RISE OF SKYWALKER.jpg'))
    favMovies.push(new Movie('JUMANJI: THE NEXT LEVEL','2019','ação /ficção','Jake Kasdan',' Dwayne Johnson, Jack Black, Karen Gillan, Kevin Hart, Danny DeVito, Nick Jonas, Awkwafina , Alex Wolff, Ser’Darius Blain, Madison Iseman, Morgan Turner','img/posters/jumanji_the_next_level.jpg'))
    favMovies.push(new Movie('MARRIAGE STORY','2019','Drama','Noah Baumbach','Scarlett Johansson, Adam Driver, Laura Dern, Ray Liotta, Alan Alda, Wallace Shawn, Julie Hagerty','img/posters/MARRIAGE STORY.jpg'))
    favMovies.push(new Movie('Joker','2019','Drama/ ação','Todd Phillips',' Joaquin Phoenix, Robert De Niro, Zazie Beetz, Frances Conroy, Brett Cullen, Bill Camp, Shea Whigham, Douglas Hodge','img/posters/Joker.jpg'))
    return favMovies
}

function getFavoriteActors(){
    let favActors =[]
    favActors.push(new Actor("Bradley Cooper","EUA","5 de janeiro de 1975",45,"Masculino","img/Actors/BradleyCooper.jpg"))
    favActors.push(new Actor("Chris Hemsworth","Austrália","11 de agosto de 1983",37,"Masculino","img/Actors/ChrisHemsworth.jpg"))
    favActors.push(new Actor("Kevin Hart","EUA","6 de julho de 1979",41,"Masculino","img/Actors/KevinHart.jpg"))
    favActors.push(new Actor("Fernanda Montenegro","Brasil","19 de outubro de 1929",91,"Feminino","img/Actors/FernandaMontenegro.jpg"))
    favActors.push(new Actor("Margot Robbie","Austrália","02 de julho de 1990",30,"Feminino","img/Actors/MargotRobbie.jpg"))
    favActors.push(new Actor("Viola Davis","EUA","11 de agosto de 1965",55,"Feminino","img/Actors/ViolaDavis.jpg"))
    return favActors
}

function getFavoriteDirectors(){
    let favDirector =[]
    favDirector.push(new Director("Bradley Cooper","EUA","5 de janeiro de 1975",45,"Masculino","img/Actors/BradleyCooper.jpg"))
    favDirector.push(new Director("Chris Hemsworth","Austrália","11 de agosto de 1983",37,"Masculino","img/Actors/ChrisHemsworth.jpg"))
    favDirector.push(new Director("Kevin Hart","EUA","6 de julho de 1979",41,"Masculino","img/Actors/KevinHart.jpg"))
    favDirector.push(new Director("Fernanda Montenegro","Brasil","19 de outubro de 1929",91,"Feminino","img/Actors/FernandaMontenegro.jpg"))
    favDirector.push(new Director("Margot Robbie","Austrália","02 de julho de 1990",30,"Feminino","img/Actors/MargotRobbie.jpg"))
    favDirector.push(new Director("Viola Davis","EUA","11 de agosto de 1965",55,"Feminino","img/Actors/ViolaDavis.jpg"))
    return favDirector
}

function getFavoriteProducers(){
    let favProducers =[]
    favProducers.push(new Producer("Bradley Cooper","EUA","5 de janeiro de 1975",45,"Masculino","img/Actors/BradleyCooper.jpg"))
    favProducers.push(new Producer("Chris Hemsworth","Austrália","11 de agosto de 1983",37,"Masculino","img/Actors/ChrisHemsworth.jpg"))
    favProducers.push(new Producer("Kevin Hart","EUA","6 de julho de 1979",41,"Masculino","img/Actors/KevinHart.jpg"))
    favProducers.push(new Producer("Fernanda Montenegro","Brasil","19 de outubro de 1929",91,"Feminino","img/Actors/FernandaMontenegro.jpg"))
    favProducers.push(new Producer("Margot Robbie","Austrália","02 de julho de 1990",30,"Feminino","img/Actors/MargotRobbie.jpg"))
    favProducers.push(new Producer("Viola Davis","EUA","11 de agosto de 1965",55,"Feminino","img/Actors/ViolaDavis.jpg"))
    return favProducers
}

function getFavoriteStudios(){
    let favStudios =[]
    favStudios.push(new Studio("Disney","01 de Janeiro de 1900","EUA","L.A","img/Studios/Disney.jpg"))
    favStudios.push(new Studio("Fox","01 de Janeiro de 1900","EUA","L.A","img/Studios/Fox.jpg"))
    favStudios.push(new Studio("Warner Bros","01 de Janeiro de 1900","EUA","L.A","img/Studios/Bros.jpg"))
    favStudios.push(new Studio("MGM","01 de Janeiro de 1900","EUA","L.A","img/Studios/MGM.png"))
    favStudios.push(new Studio("Netflix","01 de Janeiro de 2007","EUA","L.A","img/Studios/Netflix.jpg"))
    return favStudios
}
function getMoviesByName(){}
function addMovieCardToRow(rowID,card){
    let row = document.getElementById(rowID)
    row.innerHTML +='<div class="col-md-6 col-xl-4 mb-5 mt-n5"><div class="card movie-card h-100"'
    +'data-toggle="modal" data-target="#movieModal-'+card.movie.nameId+'" style="width: 18rem;">'
    /*antes */
    +'<div  class="modal fade show" id="movieModal-'+card.movie.nameId+'"tabindex="-1" aria-labelledby="movieModal-'+card.movie.nameId+'" aria-hidden="true">'
    +'<div  class="modal-dialog modal-lg big bg-white">'
	+'<div  class="modal-content">'
	+'<div  class="modal-header"><h5 class="modal-title" id="movieLable">Mais detalhes</h5>'
    +'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
	+'<div  class="modal-body">'
    +'<div  class="row">'
	+'<div  class="col"><img src="'+card.movie.imageUrl+'" class="poster-modal" alt=""></div>'
	+'<div  class="col"><h4 class="mb-4">'
    +card.title+'</h4><p><strong>Ano lançamento</strong>: '+card.year+'</p><p><strong>Gênero</strong>: '+card.movie.genre+' </p><p><strong>Diretor</strong>: '+card.movie.director
    +' </p><p><strong>Atores</strong>: '+card.movie.actors+' </p><p><strong>Tempo de gravação</strong>: '+card.movie.timeToMake
    +' dias</p><p><strong>Custo de produção</strong>: '+card.movie.cost+' </p><hr><h5>Sinopse:</h5><p>Lorem ipsum dolor sit amet consectetur adipisicing elit.'
    +'Consequatur, eos facere eum odit labore optio laboriosam nobis dolorem unde tempora.</p></div></div>'
    +'<div  class="modal-footer justify-content-around">'
    +'<button type="button" class="btn btn-secondary btn-lg" data-dismiss="modal" data-toggle="tooltip" data-placement="left" title="Voltar">'
    +'<i class="fas fa-arrow-circle-left"></i> Voltar</button><button type="button" class="btn btn-danger btn-lg" data-toggle="tooltip" data-placement="left" title="Adicionar aos favoritos" onclick="addToFavorites()" >'
    +'<i class="fas fa-heart"></i> Adicionar aos favoritos</button></div></div></div></div></div>'
    /*depois */
    +'<div class="movie-info"><p>'
    +card.title+'</p><p class="text-detalhes">(carregue para ver mais detalhes!</p></div>'
    +'<div class="card-body"><h5 class="card-title">'+card.title+'</h5><h6 class="card-subtitle mb-2 text-muted">'
    +card.year+'</h6><img src="'+card.movie.imageUrl+'" class="card-img" alt=""></div></div></div>'
}

function addPeopleCardToRow(rowID,cardActor){
    let row = document.getElementById(rowID)
    row.innerHTML +='<div class="col-md-6 col-xl-4 mb-5 mt-n5"><div class="card movie-card h-100"'
    +'data-toggle="modal" data-target="#movieModal-'+cardActor.actor.nameId+'" style="width: 18rem;">'
    /*antes */
    +'<div  class="modal fade show" id="movieModal-'+cardActor.actor.nameId+'"tabindex="-1" aria-labelledby="movieModal-'+cardActor.actor.nameId+'" aria-hidden="true">'
    +'<div  class="modal-dialog modal-lg big bg-white">'
	+'<div  class="modal-content">'
	+'<div  class="modal-header"><h5 class="modal-title" id="movieLable">Mais detalhes</h5>'
    +'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
	+'<div  class="modal-body">'
    +'<div  class="row">'
	+'<div  class="col"><img src="'+cardActor.actor.imageUrl+'" class="poster-modal" alt=""></div>'
	+'<div  class="col"><h4 class="mb-4">'
    +cardActor.title+'</h4><p><strong>Data de Nacscimento</strong>: '+cardActor.actor.birthday+'('+cardActor.actor.age+' anos)</p><p><strong>Gênero</strong>: '+cardActor.actor.genre+' </p>'
    +'<p><strong>Nacionalidade</strong>: '+cardActor.actor.nationality+' </p><hr><h5>Biografia:</h5><p>Lorem ipsum dolor sit amet consectetur adipisicing elit.'
    +'Consequatur, eos facere eum odit labore optio laboriosam nobis dolorem unde tempora.</p></div></div>'
    +'<div  class="modal-footer justify-content-around">'
    +'<button type="button" class="btn btn-secondary btn-lg" data-dismiss="modal" data-toggle="tooltip" data-placement="left" title="Voltar">'
    +'<i class="fas fa-arrow-circle-left"></i> Voltar</button><button type="button" class="btn btn-danger btn-lg" data-toggle="tooltip" data-placement="left" title="Adicionar aos favoritos" onclick="addToFavorites()" >'
    +'<i class="fas fa-heart"></i> Adicionar aos favoritos</button></div></div></div></div></div>'
    /*depois */
    +'<div class="movie-info"><p>'
    +cardActor.title+'</p><p class="text-detalhes">(carregue para ver mais detalhes!</p></div>'
    +'<div class="card-body"><h5 class="card-title">'+cardActor.title+'</h5><h6 class="card-subtitle mb-2 text-muted">'
    +cardActor.description+'</h6><img src="'+cardActor.actor.imageUrl+'" class="card-img" alt=""></div></div></div>'
}

function addStudioCardToRow(rowID,cardStudio){
    let row = document.getElementById(rowID)
    row.innerHTML +='<div class="col-md-6 col-xl-4 mb-5 mt-n5"><div class="card movie-card h-100"'
    +'data-toggle="modal" data-target="#movieModal-'+cardStudio.studio.nameId+'" style="width: 18rem;">'
    /*antes */
    +'<div  class="modal fade show" id="movieModal-'+cardStudio.studio.nameId+'"tabindex="-1" aria-labelledby="movieModal-'+cardStudio.studio.nameId+'" aria-hidden="true">'
    +'<div  class="modal-dialog modal-lg big bg-white">'
	+'<div  class="modal-content">'
	+'<div  class="modal-header"><h5 class="modal-title" id="movieLable">Mais detalhes</h5>'
    +'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
	+'<div  class="modal-body">'
    +'<div  class="row">'
	+'<div  class="col"><img src="'+cardStudio.studio.imageUrl+'" class="poster-modal" alt=""></div>'
	+'<div  class="col"><h4 class="mb-4">'
    +cardStudio.title+'</h4><p><strong>Data de Criação</strong>: '+cardStudio.studio.creationDate+'</p><p><strong>Nacionalidade</strong>: '+cardStudio.studio.nationality+'</p>'
    +'<p><strong>Sede</strong>: '+cardStudio.studio.city+'</p><p><strong>Número de obras produzidas</strong>: '+cardStudio.studio.numberOfMovies+'</p><hr><h5>História:</h5><p>Lorem ipsum dolor sit amet consectetur adipisicing elit.'
    +'Consequatur, eos facere eum odit labore optio laboriosam nobis dolorem unde tempora.</p></div></div>'
    +'<div  class="modal-footer justify-content-around">'
    +'<button type="button" class="btn btn-secondary btn-lg" data-dismiss="modal" data-toggle="tooltip" data-placement="left" title="Voltar">'
    +'<i class="fas fa-arrow-circle-left"></i> Voltar</button><button type="button" class="btn btn-danger btn-lg" data-toggle="tooltip" data-placement="left" title="Adicionar aos favoritos" onclick="addToFavorites()" >'
    +'<i class="fas fa-heart"></i> Adicionar aos favoritos</button></div></div></div></div></div>'
    /*depois */
    +'<div class="movie-info"><p>'
    +cardStudio.title+'</p><p class="text-detalhes">(carregue para ver mais detalhes!</p></div>'
    +'<div class="card-body"><h5 class="card-title">'+cardStudio.title+'</h5><h6 class="card-subtitle mb-2 text-muted">'
    +cardStudio.description+'</h6><img src="'+cardStudio.studio.imageUrl+'" class="card-img" alt=""></div></div></div>'
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

function fillMainContentFavoritos(favoriteList,type){
    rowCounter = 0
    rowId = "row"+rowCounter
    for(i=0; i < favoriteList.length;i++){
        if(i % 3 == 0){
            rowCounter += 1
            rowId = "row"+rowCounter
            addRow(rowId)
        }
        switch (type) {
            case "actor": 
                addPeopleCardToRow(rowId,new CardActor(favoriteList[i]))
                break;
            case "director": 
                addPeopleCardToRow(rowId,new CardDirector(favoriteList[i]))
                break;
            case "producer": 
                addPeopleCardToRow(rowId,new CardProducer(favoriteList[i]))
                break;
            case "studio": 
                addStudioCardToRow(rowId,new CardStudio(favoriteList[i]))
                break;
            default:
                break;
        }
    }
}


function loadPage(){
    let hello = document.getElementById("helloUser") 
    let favoritos = document.getElementById("btn-favoritos")
    hide(hello)
    hide(favoritos)
    fillMainContent(getMoviesAll())
}

function login(){
    let hello = document.getElementById("helloUser") 
    let favoritos = document.getElementById("btn-favoritos")
    let user = document.getElementById("login-username")
    let pass= document.getElementById("login-password")
    let fields = [user,pass]
    if (!checkForm(fields)){
        return
    }
    hideModal("loginModal")
    favoritos.style.display = 'block'
    hello.style.display = 'block'
    hello.innerHTML += user.value
    logbtn = document.getElementById("btn-login")
    signUpbtn = document.getElementById("btn-signup")
    hide(signUpbtn)
    hide(logbtn)
}

function hide(element){
    element.style.display = 'none'
}

function hideModal(modalId){
    let modal = document.getElementById(modalId)
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('style', 'display: none');
    const modalBck = document.getElementsByClassName('modal-backdrop');
    document.body.removeChild(modalBck[0]);
    document.body.className = document.body.className.replace("modal-open","");  
}

function signUp(){
    let hello = document.getElementById("helloUser") 
    let favoritos = document.getElementById("btn-favoritos")
    let name = document.getElementById("signUp-name")
    let lastName= document.getElementById("signUp-lastname")
    let user = document.getElementById("signUp-username")
    let pass= document.getElementById("signUp-password")
    let fields = [name,lastName,user,pass]
    if (!checkForm(fields)){
        return
    }
    favoritos.style.display = 'block'
    hello.style.display = 'block'
    hello.innerHTML += user.value
    logbtn = document.getElementById("btn-login")
    signUpbtn = document.getElementById("btn-signup")
    hideModal("signupModal")
    hide(signUpbtn)
    hide(logbtn)
}


function checkForm(fields){
  for (i  = 0; i < fields.length; i++) {
      let element = fields[i];
      if (element.value==''){
        element.style.backgroundColor= '#fcfa7f'
        element.focus()
        return false
    }
    else{
        element.style.backgroundColor= '#fff'
    }
  }
  return true
}

function listFavoriteMovies(){
    clenMain()
    fillMainContent(getFavoriteMovies())
    updateLabel("Filmes Favoritos")
}
function listFavoriteActors(){
    clenMain()
    fillMainContentFavoritos(getFavoriteActors(),"actor")
    updateLabel("Atores Favoritos")
}
function listFavoriteDirectors(){
    clenMain()
    fillMainContentFavoritos(getFavoriteDirectors(),"director")
    updateLabel("Diretores Favoritos")
}
function listFavoriteProducers(){
    clenMain()
    fillMainContentFavoritos(getFavoriteProducers(),"producer")
    updateLabel("Produtores Favoritos")
}
function listFavoriteStudios(){
    clenMain()
    fillMainContentFavoritos(getFavoriteStudios(),"studio")
    updateLabel("Estídios Favoritos")
}

function clenMain(){
    let main = document.getElementById("main-content")
    main.innerHTML='<p id="label-resultado" class="text-resultado pl-5">Filmes favoritos</p>'
}

function addToFavorites(){
    alert("Filme adicionado aos favoritos!")
}

function getMovieModal(movie){
    //
}

function updateLabel(value) {
    let label = document.getElementById("label-resultado")
    label.innerHTML=value
}


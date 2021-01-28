/*Classes*/

class Movie{
    constructor(id,title,year,genre,director,actors,imageUrl,cost,timeToMake){
        this.id = id,
        this.title=title
        this.year=year
        this.genre=genre
        this.director=director
        this.actors=actors
        this.nameId = title.replace(/\s/g, "-")
        this.imageUrl = imageUrl
        this.cost = cost
        this.timeToMake = timeToMake
    }
}

class Actor{
    constructor(id,name, nationality,birthday,age,genre,imageUrl){
        this.id=id,
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
    constructor(id,name, nationality,birthday,age,genre,imageUrl){
        this.id=id,
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
    constructor(id,name, nationality,birthday,age,genre,imageUrl){
        this.id=id,
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
    constructor(id,name,creationDate,nationality,city,imageUrl,numberOfMovies){
        this.id=id,
        this.name=name
        this.creationDate=creationDate
        this.nationality=nationality
        this.city=city
        this.numberOfMovies=numberOfMovies
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
async function buscar(){
    let type = getTypeOfSearch()
    let rd = document.getElementById(`radio${type}`)
    rd.checked = true;
    let busca = document.getElementById('inp-busca')
    cleanMain()
    if(busca.value=='' || busca.value == null){return}
    switch (type) {
        case 'movie':
            let movies = await getMoviesSearch(busca.value)
            fillMainContent(movies,false)
            break;
        case 'studio':
            let studios = await getStudiosSearch(busca.value)
            fillMainContentFavoritos(studios,'studio',false)
            break;
        case 'actor':
            let actors = await getActorsSearch(busca.value)
            fillMainContentFavoritos(actors,'actor',false)
            break;
        case 'director':
            let directors = await getDirectorSearch(busca.value)
            fillMainContentFavoritos(directors,'director',false)
            break;
        case 'producer':
            let producers = await getProducerSearch(busca.value)
            fillMainContentFavoritos(producers,'producer',false)
            break;
        default:
            break;
    }
    updateLabel(`Resuldados encontrados:`)
    cleanFormBusca()

    
}
/* Carrega index com as novidades*/
function getNewMovies(){
    let mainContent = document.getElementById('main-content')
    mainContent.innerHTML +='<div class="row pl-5 pt-5"><div class="col-md-6 col-xl-4 mb-5 mt-n5"><div class="card movie-card h-100" onClick="getNewMovies()" style="width: 18rem;"><div class="movie-info"><p>007 - No time to Diesss</p><p class="text-detalhes">(carregue para ver mais detalhes!</p> </div><div class="card-body"><h5 class="card-title">007 - No time to Die</h5><h6 class="card-subtitle mb-2 text-muted">2021</h6><img src="img/posters/007 - No-Time-to-Die.jpg" class="card-img" alt=""></div></div></div></div>'
}

function addRow(idStr){
    let mainContent = document.getElementById('main-content')
    mainContent.innerHTML +='<div id='+idStr+' class="row pl-5 pt-5"></div>'
}
async function getMoviesAll(){
    let movies = await getAllMovies()
    return movies
}

async function getMoviesSearch(busca){
    
    let resp = await fetch(`http://localhost:3000/search/all/${busca}`,{
        headers: new Headers({'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.token}`})}
    )
    if(!resp.ok){
        throw new Error(resp.json().name)
    }
    let respdata = await resp.json()
    let movieList =[]
    respdata.forEach(movie => {
        movieList.push(new Movie(movie.id,movie.portuguese_title,movie.year,movie.genre,
            movie.directors,movie.actors,movie.pictureUrl,movie.cost,movie.totalRecordingDays))
    });
    return movieList
}

async function getStudiosSearch(busca){
    
    let resp = await fetch(`http://localhost:3000/search/studio/${busca}`,{
        headers: new Headers({'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.token}`})}
    )
    if(!resp.ok){
        throw new Error(resp.json().name)
    }
    let respdata = await resp.json()
    let studios =[]
    respdata.forEach(studio => {
        studios.push(new Studio(studio.id,studio.name,studio.creationDate, studio.nationality,studio.city,
            studio.pictureUrl,studio.numberOfMovies))
    });
    return studios
}

function getFavoriteMovies(){
    let favMovies =getAllMovies()
    return favMovies
}

async function getFavoriteActors(){
    let favActors = await getAllActors()
    // favActors.push(new Actor(1,"Bradley Cooper","EUA","5 de janeiro de 1975",45,"Masculino","img/Actors/BradleyCooper.jpg"))
    // favActors.push(new Actor(1,"Chris Hemsworth","Austrália","11 de agosto de 1983",37,"Masculino","img/Actors/ChrisHemsworth.jpg"))
    // favActors.push(new Actor(1,"Kevin Hart","EUA","6 de julho de 1979",41,"Masculino","img/Actors/KevinHart.jpg"))
    // favActors.push(new Actor(1,"Fernanda Montenegro","Brasil","19 de outubro de 1929",91,"Feminino","img/Actors/FernandaMontenegro.jpg"))
    // favActors.push(new Actor(1,"Margot Robbie","Austrália","02 de julho de 1990",30,"Feminino","img/Actors/MargotRobbie.jpg"))
    // favActors.push(new Actor(1,"Viola Davis","EUA","11 de agosto de 1965",55,"Feminino","img/Actors/ViolaDavis.jpg"))
    // return favActors
    return favActors
}

async function getFavoriteDirectors(){
    let favDirector = await getAllDirectors()
    // favDirector.push(new Director("Bradley Cooper","EUA","5 de janeiro de 1975",45,"Masculino","img/Actors/BradleyCooper.jpg"))
    // favDirector.push(new Director("Chris Hemsworth","Austrália","11 de agosto de 1983",37,"Masculino","img/Actors/ChrisHemsworth.jpg"))
    // favDirector.push(new Director("Kevin Hart","EUA","6 de julho de 1979",41,"Masculino","img/Actors/KevinHart.jpg"))
    // favDirector.push(new Director("Fernanda Montenegro","Brasil","19 de outubro de 1929",91,"Feminino","img/Actors/FernandaMontenegro.jpg"))
    // favDirector.push(new Director("Margot Robbie","Austrália","02 de julho de 1990",30,"Feminino","img/Actors/MargotRobbie.jpg"))
    // favDirector.push(new Director("Viola Davis","EUA","11 de agosto de 1965",55,"Feminino","img/Actors/ViolaDavis.jpg"))
    return favDirector
}

async function getFavoriteProducers(){
    let favProducers = getAllProducers()
    // favProducers.push(new Producer("Bradley Cooper","EUA","5 de janeiro de 1975",45,"Masculino","img/Actors/BradleyCooper.jpg"))
    // favProducers.push(new Producer("Chris Hemsworth","Austrália","11 de agosto de 1983",37,"Masculino","img/Actors/ChrisHemsworth.jpg"))
    // favProducers.push(new Producer("Kevin Hart","EUA","6 de julho de 1979",41,"Masculino","img/Actors/KevinHart.jpg"))
    // favProducers.push(new Producer("Fernanda Montenegro","Brasil","19 de outubro de 1929",91,"Feminino","img/Actors/FernandaMontenegro.jpg"))
    // favProducers.push(new Producer("Margot Robbie","Austrália","02 de julho de 1990",30,"Feminino","img/Actors/MargotRobbie.jpg"))
    // favProducers.push(new Producer("Viola Davis","EUA","11 de agosto de 1965",55,"Feminino","img/Actors/ViolaDavis.jpg"))
    return favProducers
}

async function getFavoriteStudios(){
    let favStudios = await getAllStudios()
    // favStudios.push(new Studio("Disney","01 de Janeiro de 1900","EUA","L.A","img/Studios/Disney.jpg"))
    // favStudios.push(new Studio("Fox","01 de Janeiro de 1900","EUA","L.A","img/Studios/Fox.jpg"))
    // favStudios.push(new Studio("Warner Bros","01 de Janeiro de 1900","EUA","L.A","img/Studios/Bros.jpg"))
    // favStudios.push(new Studio("MGM","01 de Janeiro de 1900","EUA","L.A","img/Studios/MGM.png"))
    // favStudios.push(new Studio("Netflix","01 de Janeiro de 2007","EUA","L.A","img/Studios/Netflix.jpg"))
    return favStudios
}
function getMoviesByName(){}
function addMovieCardToRow(rowID,card,isFav){
    let text ='Adivionar aos favoritos'
    let  msg ='addToFavorites()'
    if(isFav){
        text='Remover dos favoritos'
        msg='removeFromFavorites()'
    }
    let row = document.getElementById(rowID)
    row.innerHTML +='<div class="col-md-6 col-xl-4 mb-5 mt-n5"><div class="card movie-card h-100"'
    +'data-toggle="modal" data-target="#movieModal-'+card.movie.nameId+'" id="'+card.movie.id+'" style="width: 18rem;">'
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
    +'<i class="fas fa-arrow-circle-left"></i> Voltar</button><button type="button" class="btn btn-danger btn-lg" data-toggle="tooltip" data-placement="left" title="Adicionar aos favoritos" onclick="'+msg+'" >'
    +'<i class="fas fa-heart"></i> '+text+'</button></div></div></div></div></div>'
    /*depois */
    +'<div class="movie-info"><p>'
    +card.title+'</p><p class="text-detalhes">(carregue para ver mais detalhes!</p></div>'
    +'<div class="card-body"><h5 class="card-title">'+card.title+'</h5><h6 class="card-subtitle mb-2 text-muted">'
    +card.year+'</h6><img src="'+card.movie.imageUrl+'" class="card-img" alt=""></div></div></div>'
}

function addPeopleCardToRow(type,rowID,cardActor,isFav){
    let text ='Adivionar aos favoritos'
    let  msg =`addToPeopleFavorites()`
    if(isFav){
        text='Remover dos favoritos'
        msg=`removeFromPeopleFavorites()`
    }
    let row = document.getElementById(rowID)
    row.innerHTML +='<div class="col-md-6 col-xl-4 mb-5 mt-n5"><div class="card movie-card h-100"'
    +'data-toggle="modal" data-target="#movieModal-'+cardActor.actor.nameId+'" id="'+cardActor.actor.Id+'" style="width: 18rem;">'
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
    +'<i class="fas fa-arrow-circle-left"></i> Voltar</button><button type="button" class="btn btn-danger btn-lg" data-toggle="tooltip" data-placement="left" title="'+text+'" onclick="'+msg+'" >'
    +'<i class="fas fa-heart"></i> '+text+'</button></div></div></div></div></div>'
    /*depois */
    +'<div class="movie-info"><p>'
    +cardActor.title+'</p><p class="text-detalhes">(carregue para ver mais detalhes!</p></div>'
    +'<div class="card-body"><h5 class="card-title">'+cardActor.title+'</h5><h6 class="card-subtitle mb-2 text-muted">'
    +cardActor.description+'</h6><img src="'+cardActor.actor.imageUrl+'" class="card-img" alt=""></div></div></div>'
}

function addStudioCardToRow(rowID,cardStudio,isFav){
    let text ='Adivionar aos favoritos'
    let  msg ='addToFavorites()'
    if(isFav){
        text='Remover dos favoritos'
        msg='removeFromFavorites()'
    }
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
    +'<i class="fas fa-arrow-circle-left"></i> Voltar</button><button type="button" class="btn btn-danger btn-lg" data-toggle="tooltip" data-placement="left" title="'+text+'" onclick="'+msg+'" >'
    +'<i class="fas fa-heart"></i> '+text+'</button></div></div></div></div></div>'
    /*depois */
    +'<div class="movie-info"><p>'
    +cardStudio.title+'</p><p class="text-detalhes">(carregue para ver mais detalhes!</p></div>'
    +'<div class="card-body"><h5 class="card-title">'+cardStudio.title+'</h5><h6 class="card-subtitle mb-2 text-muted">'
    +cardStudio.description+'</h6><img src="'+cardStudio.studio.imageUrl+'" class="card-img" alt=""></div></div></div>'
}


function fillMainContent(movieList,isFav){
    rowCounter = 0
    rowId = "row"+rowCounter
    for(i=0; i < movieList.length;i++){
        if(i % 3 == 0){
            rowCounter += 1
            rowId = "row"+rowCounter
            addRow(rowId)
        }
        addMovieCardToRow(rowId,new Card(movieList[i]),isFav)
    }
}

function fillMainContentFavoritos(favoriteList,type,isFav){
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
                addPeopleCardToRow('actor',rowId,new CardActor(favoriteList[i]),isFav)
                break;
            case "director": 
                addPeopleCardToRow('director',rowId,new CardDirector(favoriteList[i]),isFav)
                break;
            case "producer": 
                addPeopleCardToRow('producer',rowId,new CardProducer(favoriteList[i]),isFav)
                break;
            case "studio": 
                addStudioCardToRow(rowId,new CardStudio(favoriteList[i]),isFav)
                break;
            default:
                break;
        }
    }
}


async function loadPage(){   
    const token = localStorage.getItem('token')
    if(token && token != null && token != ''){
        try {
            const user = await getAccountInfo()
            getNavMenu(true,user)
            setLogedView()
            cleanMain()
            fillMainContent(await getMoviesAll(),false)
        } catch (error) {
            logout()
        }
    }else{
        getNavMenu(false,null)
        fillMainContent(await getMoviesAll(),false)
    }
    
}

async function login(user=null,pass=null){
    let loginErrorMessage = document.getElementById('loginErrorMessage')
    let modalName = 'signupModal'

    if(user == null && pass == null){
        user = document.getElementById("login-username")
        pass= document.getElementById("login-password")
        modalName ='loginModal'
    }
    
    let fields = [user,pass]
    if (!checkForm(fields)){
        return
    }
    let token =null
    
    let passEnc = encrypt(pass.value)

    let loginResponse = await fetch('http://localhost:3000/login',
        {method: 'POST',headers: new Headers({'content-type': 'application/json'}),
         body: JSON.stringify({username:user.value,password:passEnc})}
        );
    
    if(!loginResponse.ok){
        loginErrorMessage.innerHTML=`<p>E-mail ou senha errados. Tente novamente!</p>`
    }
    else{
        token = await loginResponse.json()
        localStorage.setItem("token", token.token);
        hideModal(modalName)
        loadPage()
    }   
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


async function signUp(){
    let name = document.getElementById("signUp-name")
    let lastName= document.getElementById("signUp-lastname")
    let user = document.getElementById("signUp-username")
    let pass= document.getElementById("signUp-password")
    let signUpErrorMsg= document.getElementById("signUpErrorMsg")
    let fields = [name,lastName,user,pass]
    if (!checkForm(fields)){
        signUpErrorMsg.innerHTML ='<p>Valide os campos e tente novamente!</p>'
        return
    }
    let encPass = encrypt(pass.value)
    let signUptResp = await fetch('http://localhost:3000/register',
    {method: 'POST',headers: new Headers({'content-type': 'application/json'}),
     body: JSON.stringify({signUpName:name.value,signUpLastname:lastName.value,signUpEmail:user.value
        ,signUpPassword:encPass})}
    );
    if(!signUptResp.ok){
        signUpErrorMsg.innerHTML='Erro. Tente novamente mais tarde!'
        return
    }
    
    await login(user,pass)
    
    
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
function listResultados(){
    cleanMain()
    showFavoriteMenu()
    fillMainContent(getFavoriteMovies(),true)
    updateLabel("Resultado Busca")
}
async function listFavoriteMovies(){
    cleanMain()
    showFavoriteMenu()
    fillMainContent(await getFavoriteMovies(),true)
    updateLabel("Filmes Favoritos")
}
async function listFavoriteActors(){
    cleanMain()
    showFavoriteMenu()
    fillMainContentFavoritos(await getFavoriteActors(),"actor")
    updateLabel("Atores Favoritos")
}
async function listFavoriteDirectors(){
    cleanMain()
    showFavoriteMenu()
    fillMainContentFavoritos(await getFavoriteDirectors(),"director")
    updateLabel("Diretores Favoritos")
}
async function listFavoriteProducers(){
    cleanMain()
    showFavoriteMenu()
    fillMainContentFavoritos(await getFavoriteProducers(),"producer")
    updateLabel("Produtores Favoritos")
}
async function listFavoriteStudios(){
    cleanMain()
    showFavoriteMenu()
    fillMainContentFavoritos(await getFavoriteStudios(),"studio")
    updateLabel("Estídios Favoritos")
}

function cleanMain(){
    let main = document.getElementById("main-content")
    main.innerHTML='<p id="label-resultado" class="text-resultado pl-5">Filmes favoritos</p><div id="menu-favoritos" class="row justify-content-center mb-3">'
}

async function addToFavorites(){
    const token = localStorage.getItem('token') 
    if(token && token != null && token != ''){
        alert('Item adicionado aos favorito!')
    }
    else{
        alert('Você deve estar logado para utilizar essa funcionalidade!')
    }
}

function removeFromFavorites(){
    alert("Conteúdo removido dos favoritos!")
}

function updateLabel(value) {
    let label = document.getElementById("label-resultado")
    label.innerHTML=value
}

function showBuscaMenu(bucaObject){
    let favMenu = document.getElementById("menu-favoritos")
    favMenu.innerHTML = '<ul id="li"><li><a href="#" onclick="listFavoriteMovies()" class="btn-filtro-favoritos">Filmes</a></li></ul><ul><li><a href="#" onclick="listFavoriteActors()" class="btn-filtro-favoritos">Atores</a></li></ul><ul><li><a href="#" onclick="listFavoriteDirectors()" class="btn-filtro-favoritos">Diretores</a></li></ul><ul><li><a href="#" onclick="listFavoriteProducers()" class="btn-filtro-favoritos">Produtores</a></li></ul><ul><li><a href="#" onclick="listFavoriteStudios()" class="btn-filtro-favoritos">Estúdios</a></li></ul></div>'
}

function showFavoriteMenu(){
    let favMenu = document.getElementById("menu-favoritos")
    favMenu.innerHTML = '<ul id="li"><li><a href="#" onclick="listFavoriteMovies()" class="btn-filtro-favoritos">Filmes</a></li></ul><ul><li><a href="#" onclick="listFavoriteActors()" class="btn-filtro-favoritos">Atores</a></li></ul><ul><li><a href="#" onclick="listFavoriteDirectors()" class="btn-filtro-favoritos">Diretores</a></li></ul><ul><li><a href="#" onclick="listFavoriteProducers()" class="btn-filtro-favoritos">Produtores</a></li></ul><ul><li><a href="#" onclick="listFavoriteStudios()" class="btn-filtro-favoritos">Estúdios</a></li></ul></div>'
}

function cleanFormBusca(){
    let input = document.getElementById('inp-busca')
    input.value=''
}

async function getUpdatePage(){
    const user = await getAccountInfo()  
    // let userName = document.getElementById("nomeUserNav")
    cleanMain()
    let main = document.getElementById("main-content")
    main.innerHTML +='<form action=""><div class="colapse mt-4 text-dark"><div class="container col-4 text-dark mb-5 pb-5"><label for="nomeUserDetails">Nome</label><input id="nomeUserDetails" value="'+user.firstName+'" class="form-control" type="text" aria-label="Search">'
    +'<label for="lastNameUserDetails">Apelido</label>'
    +'<input id="lastNameUserDetails" class="form-control" value="'+user.lastName+'" type="text" aria-label="Search">'
    +'<label for="emailUserDetails">E-mail</label>'
    +'<input id="emailUserDetails" class="form-control" value="'+user.email+'" type="text" aria-label="Search">'
    +'<label for="userBi">B.I</label>'
    +'<input id="userBi" class="form-control" value="0xxxxx0xxxx0x" type="text" aria-label="Search">'
    +'</div>'
    +'</div>'
    +'<div class="text-center mb-5 pb-5">'
    +'<button style="margin-right: auto;" onclick="updatePageCancel()" class="btn btn btn-secondary">voltar</button>'
    +'<button style="margin-left: 25rem;" onclick="salveUserInfo()" class="btn btn btn-success">Salvar</button>'
    +'</div></div></form> '
    updateLabel("Atualizar dados")
}

function updatePageCancel(){
    cleanMain()
    fillMainContent(getMoviesAll())
    updateLabel("Novos Filmes")
}

function salveUserInfo(){
    nameinp = document.getElementById("nomeUserDetails")
    alert("Informações salvas com sucesso!")
    fillMainContent(getMoviesAll())
    let name = document.getElementById("nomeUserNav")
    name.innerHTML = nameinp.value
    cleanMain()
    fillMainContent(getMoviesAll())
    updateLabel("Novos Filmes")
}

async function getNavMenu(isLogged,user){
    let navMenu = document.getElementById('nav-menu')
    if(isLogged){
        const isAdmin = user.isAdmin
        const adminBtn = isAdmin ? '<li class="nav-item ml-3 text-light" id="btnAdmin"><a type="button" onclick="openAdmin()" class="btn btn-link text-light">Administração</a></li>' :'';
        navMenu.innerHTML= '<li class="nav-item active"><a class="nav-link" onclick="setBuscaOnFocus()" href="#">Busca</a>'
              +'</li><li class="nav-item" id="btn-favoritos"><button onclick="listFavoriteMovies()" class="btn btn-link text-light">'
              +'Favoritos</button></li><li class="nav-item ml-3 pt-2 text-light" id="helloUser">Olá, </li>'
              +adminBtn
              +'<li class="nav-item ml-3 text-light" id="logOut"><a type="button" onclick="logout()" class="btn btn-link text-light">'
              +'Log-out</a></li>'
    }
    else{
        navMenu.innerHTML= '<li class="nav-item active"><a class="nav-link" onclick="setBuscaOnFocus()" href="#">Busca</a></li>'
                          +'<li class="nav-item" id="btn-login" ><button type="button" class="btn btn-link text-light" data-toggle="modal" data-target="#loginModal">'
                          +'Sign In</button></li><li class="nav-item" id="btn-signup"><button type="button" class="btn btn-link text-light" data-toggle="modal" data-target="#signupModal">'
                          +'Sign Up</button></li>'
                          +'<li class="nav-item ml-3 pt-2 text-light" style="display: none;" id="helloUser">Olá, </li>' 
    }
}

async function setLogedView(){
    const user = await getAccountInfo()
    let hello = document.getElementById("helloUser") 
    hello.style.display = 'block'
    hello.innerHTML += `<a href="#" id="nomeUserNav" onclick="getUpdatePage()" class="text-white">${user.firstName}</a>`
}

async function getAccountInfo(){
    let resp = await fetch('http://localhost:3000/getaccountinfo',{
        headers: new Headers({'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.token}`})}
    )
    if(!resp.ok){
        throw new Error(resp.json().name)
    }
    let user = await resp.json()
    return user
}


async function logout(){
    let logoutResp = await fetch('http://localhost:3000/logout',
        {method: 'POST',headers: new Headers({'content-type': 'application/json',
        Authorization: `${localStorage.token}`})}
        );
    
    if(logoutResp.ok){
        localStorage.removeItem('token')
        alert('Sessão encerrada.')
    }
    window.location.href="index.html"
    loadPage()
}


/* Admin pages */
async function openAdmin(){
    let adminPanel = await fetch('http://localhost:3000/adminpanel',{
        headers: new Headers({'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.token}`})}
    )
    if(!adminPanel.ok){
        logout()
    }else{
        document.body.innerHTML= await adminPanel.text()
    }
    
}
async function getOptionsList(type){
    const addr =`http://localhost:3000/lists/${type}`
    try{
        let options = await fetch(addr,{
            headers: new Headers({'content-type': 'application/json'})})
        if(!options.ok){throw new Error('Erro ao carregar dados')}
        else{
               return options.text()
            }
    } catch(e){console.log(e)}  
    
}
async function openAdminInsertItem(type){
    let adminPanel = await fetch(`http://localhost:3000/adminpanel/insert/${type}`,{
        headers: new Headers({'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.token}`})}
    )
    if(!adminPanel.ok){
        logout()
    }else{
        let htmlBody = await adminPanel.text()
        if(type=='Filme'){
            let studiosList = await getOptionsList('studios')
            let actorsList = await getOptionsList('actors')
            let directorsList = await getOptionsList('directors')
            let prodList = await getOptionsList('producers')
            htmlBody = htmlBody.replace('[#STUDIO_LIST#]',studiosList)
            htmlBody = htmlBody.replace('[#ACTOR_LIST#]',actorsList)
            htmlBody = htmlBody.replace('[#DIRECTOR_LIST#]',directorsList)
            htmlBody = htmlBody.replace('[#PRODUCER_LIST#]',prodList)
        }
        document.body.innerHTML= htmlBody
    }
}

async function openAdminEditItem(type){
    let adminPanel = await fetch(`http://localhost:3000/adminpanel/edit/${type}`,{
        headers: new Headers({'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.token}`})}
    )
    if(!adminPanel.ok){
       logout()
    }else{
        document.body.innerHTML= await adminPanel.text()
    }
}

function getMultiSelection(itemId){
    let selectOptions = [];
    for (let option of document.getElementById(itemId).options) {
      if (option.selected) {
        selectOptions.push(option.value);
      }
    }
    return selectOptions
}
async function insertMovie(){
    let inputNome = document.getElementById('inputNome')
    let inputPTNome = document.getElementById('inputPTNome')
    let inputAno = document.getElementById('inputAno')
    let inputCusto = document.getElementById('inputCusto')
    let inputTempo = document.getElementById('inputTempo')
    let inputGenero = document.getElementById('inputGenero')
    let inputAtores = document.getElementById('inputAtores')
    let inputDiretores = document.getElementById('inputDiretores')
    let inputRealizador = document.getElementById('inputRealizador')
    let inputImageUrl = document.getElementById('inputImageUrl')
    let inputSinopse = document.getElementById('inputSinopse')
    let inputStudio = document.getElementById('inputStudio')
    let inputDuracao = document.getElementById('inputDuracao')
    let fields = [inputNome,inputPTNome,inputAno,inputCusto,inputTempo,inputGenero,inputAtores,inputDiretores,
        inputRealizador,inputImageUrl,inputSinopse,inputStudio,inputDuracao]
    if(!checkForm(fields)){
        alert('Erro!\n Preencha todos os campos para continuar!')
        return
    }
    let response = await fetch(`http://localhost:3000/movie/create`,{
        method: 'POST',headers: new Headers({'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.token}`}),
        body: JSON.stringify({
            title: inputNome.value,
            portuguese_title: inputPTNome.value,
            year: inputAno.value,
            duration: inputDuracao.value,
            totalRecordingDays: inputTempo.value,
            cost: inputCusto.value,
            synopsis: inputSinopse.value,
            genre: inputGenero.value,
            pictureUrl: inputImageUrl.value,
            studioId: inputStudio.value,
            actors: getMultiSelection('inputAtores'),
            directors: getMultiSelection('inputDiretores'),
            producers: getMultiSelection('inputRealizador')})});
    if(!response.ok){
        alert(`Error! \nMensagem:${response.text()}`)
        return
    }
        alert('Filme inserido com Sucesso!')
        openAdmin()
}

async function editMovie(){
    let movieId =  document.getElementById('movieId')
    let inputNome = document.getElementById('inputNome')
    let inputPTNome = document.getElementById('inputPTNome')
    let inputAno = document.getElementById('inputAno')
    let inputCusto = document.getElementById('inputCusto')
    let inputTempo = document.getElementById('inputTempo')
    let inputGenero = document.getElementById('inputGenero')
    let inputAtores = document.getElementById('inputAtores')
    let inputDiretores = document.getElementById('inputDiretores')
    let inputRealizador = document.getElementById('inputRealizador')
    let inputImageUrl = document.getElementById('inputImageUrl')
    let inputSinopse = document.getElementById('inputSinopse')
    let inputStudio = document.getElementById('inputStudio')
    let inputDuracao = document.getElementById('inputDuracao')
    let fields = [inputNome,inputPTNome,inputAno,inputCusto,inputTempo,inputGenero,inputAtores,inputDiretores,
        inputRealizador,inputImageUrl,inputSinopse,inputStudio,inputDuracao]
    if(!checkForm(fields)){
        alert('Erro!\n Preencha todos os campos para continuar!')
        return
    }
    let response = await fetch(`http://localhost:3000/movie/update/${movieId.value}`,{
        method: 'PUT',headers: new Headers({'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.token}`}),
        body: JSON.stringify({
            title: inputNome.value,
            portuguese_title: inputPTNome.value,
            year: inputAno.value,
            duration: inputDuracao.value,
            totalRecordingDays: inputTempo.value,
            cost: inputCusto.value,
            synopsis: inputSinopse.value,
            genre: inputGenero.value,
            pictureUrl: inputImageUrl.value,
            studioId: inputStudio.value,
            actors: getMultiSelection('inputAtores'),
            directors: getMultiSelection('inputDiretores'),
            producers: getMultiSelection('inputRealizador')})});
    if(!response.ok){
        alert(`Error! \nMensagem:${response.text()}`)
        return
    }
        alert('Filme atualizado com Sucesso!')
        openAdmin()
}

async function deleteMovie(movieId){
    if (!confirm("Está certo que deseja deletar esse filme?")){return}
    let response = await fetch(`http://localhost:3000/movie/${movieId}`,{
        method: 'DELETE',headers: new Headers({'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.token}`})})
    if(!response.ok){
        alert(`Erro!\n${await response.text()}`)
        return
    }
    alert('Filme deletado com sucesso!')
    openAdmin()
}

function deleteConfirmation(type){
  let confirmation = confirm("Press a button!");
  if (confirmation == true) {
    return
  } else {
    txt = "You pressed Cancel!";
  }


}

async function insertator(){
    
    let inputNome = document.getElementById('inputNome')
    let inputNascionalidade = document.getElementById('inputNascionalidade')
    let inputNascimento = document.getElementById('inputNascimento')
    let inputSexo = document.getElementById('inputSexo')
    let inputImageUrl = document.getElementById('inputImageUrl')
    let inputIdade = document.getElementById('inputIdade')
    let fields = [inputNome,inputNascionalidade,inputNascimento,inputSexo,inputImageUrl,inputIdade]
    if(!checkForm(fields)){
        alert('Erro!\n Preencha todos os campos para continuar!')
        return
    }
    let response = await fetch(`http://localhost:3000/actors/create`,{
        method: 'POST',headers: new Headers({'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.token}`}),
        body: JSON.stringify({
            name: inputNome.value,
            nationality: inputNascionalidade.value,
            birthday: inputNascimento.value,
            age: inputIdade.value,
            genre: inputSexo.value,
            imageUrl: inputImageUrl.value})});
    if(!response.ok){
        alert(`Error! \nMensagem:${response.text()}`)
        return
    }
        alert('Ator/Atriz inserido(a) com Sucesso!')
        openAdmin()
}

async function insertdiretor(){
    
    let inputNome = document.getElementById('inputNome')
    let inputNascionalidade = document.getElementById('inputNascionalidade')
    let inputNascimento = document.getElementById('inputNascimento')
    let inputSexo = document.getElementById('inputSexo')
    let inputImageUrl = document.getElementById('inputImageUrl')
    let inputIdade = document.getElementById('inputIdade')
    let fields = [inputNome,inputNascionalidade,inputNascimento,inputSexo,inputImageUrl,inputIdade]
    if(!checkForm(fields)){
        alert('Erro!\n Preencha todos os campos para continuar!')
        return
    }
    let response = await fetch(`http://localhost:3000/director/create`,{
        method: 'POST',headers: new Headers({'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.token}`}),
        body: JSON.stringify({
            name: inputNome.value,
            nationality: inputNascionalidade.value,
            birthday: inputNascimento.value,
            age: inputIdade.value,
            genre: inputSexo.value,
            imageUrl: inputImageUrl.value})});
    if(!response.ok){
        alert(`Error! \nMensagem:${response.text()}`)
        return
    }
        alert('Diretor(a) inserido(a) com Sucesso!')
        openAdmin()
}

async function insertprodutor(){
    
    let inputNome = document.getElementById('inputNome')
    let inputNascionalidade = document.getElementById('inputNascionalidade')
    let inputNascimento = document.getElementById('inputNascimento')
    let inputSexo = document.getElementById('inputSexo')
    let inputImageUrl = document.getElementById('inputImageUrl')
    let inputIdade = document.getElementById('inputIdade')
    let fields = [inputNome,inputNascionalidade,inputNascimento,inputSexo,inputImageUrl,inputIdade]
    if(!checkForm(fields)){
        alert('Erro!\n Preencha todos os campos para continuar!')
        return
    }
    let response = await fetch(`http://localhost:3000/producer/create`,{
        method: 'POST',headers: new Headers({'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.token}`}),
        body: JSON.stringify({
            name: inputNome.value,
            nationality: inputNascionalidade.value,
            birthday: inputNascimento.value,
            age: inputIdade.value,
            genre: inputSexo.value,
            imageUrl: inputImageUrl.value})});
    if(!response.ok){
        alert(`Error! \nMensagem:${response.text()}`)
        return
    }
        alert('Produtor(a) inserido(a) com Sucesso!')
        openAdmin()
}

async function insertStudio(){
    let inputNome = document.getElementById('inputNome')
    let inputCountry = document.getElementById('inputCountry')
    let inputFundador = document.getElementById('inputFundador')
    let inputFundacao = document.getElementById('inputFundacao')
    let inputImageUrl = document.getElementById('inputUrlImage')
    let inputCidade = document.getElementById('inputCidade')
    let inputNumFilmes = document.getElementById('inputNumFilmes')

    if(!checkForm(inputNome,inputCountry,inputFundador,inputFundacao,
        inputImageUrl,inputCidade,inputNumFilmes)){
        alert('Erro!\n Preencha todos os campos para continuar!')
        return
    }
    let response = await fetch(`http://localhost:3000/studio/create`,{
        method: 'POST',headers: new Headers({'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.token}`}),
        body: JSON.stringify({
            name: inputNome.value,
            founder:inputFundador.value,
            nationality: inputCountry.value,
            creationDate: inputFundacao.value,
            city: inputCidade.value,
            numberOfMovies: inputNumFilmes.value,
            pictureUrl: inputImageUrl.value})});
    if(!response.ok){
        alert(`Error! \nMensagem:${response.text()}`)
        return
    }
        alert('Estúdio inserido com Sucesso!')
        openAdmin()
}

async function insertUser(){
    let inputNome = document.getElementById('inputNome')
    let inputUNome = document.getElementById('inputUNome')
    let inputEmail = document.getElementById('inputEmail')
    let inputPass = document.getElementById('inputPass')

    let passEnc = encrypt(inputPass.value)

    let signUptResp = await fetch('http://localhost:3000/register',
    {method: 'POST',headers: new Headers({'content-type': 'application/json'}),
     body: JSON.stringify({signUpName:inputNome.value,signUpLastname:inputUNome.value,signUpEmail:inputEmail.value
        ,signUpPassword:passEnc})}
    );
    if(!signUptResp.ok){
        signUpErrorMsg.innerHTML='Erro. Tente novamente mais tarde!'
        return
    }
    if(!signUptResp.ok){
        alert(`Error! \nMensagem:${signUptResp.text()}`)
        return
    }
        alert('Usuário inserido com Sucesso!')
        openAdmin()
}

async function getAllActors(){
    let response = await fetch('http://localhost:3000/actors',{
        headers: new Headers({'content-type': 'application/json'})}
    )
    if(!response.ok){
        alert(`Error! \nMensagem:${response.text()}`)
        return
    }
    let reponseData = await response.json()
    let actorsList =[]
    reponseData.forEach(actor => {
        actorsList.push(new 
            Actor(actor.id,actor.name,actor.nationality,convertTimestampToDate(actor.birthday),actor.age,
                actor.genre,actor.pictureUrl))
    });
    return actorsList
}

async function getActorsSearch(name){
    let response = await fetch(`http://localhost:3000/search/actors/${name}`,{
        headers: new Headers({'content-type': 'application/json'})}
    )
    if(!response.ok){
        alert(`Error! \nMensagem:${response.text()}`)
        return
    }
    let reponseData = await response.json()
    let actorsList =[]
    reponseData.forEach(actor => {
        actorsList.push(new 
            Actor(actor.id,actor.name,actor.nationality,convertTimestampToDate(actor.birthday),actor.age,
                actor.genre,actor.pictureUrl))
    });
    return actorsList
}

async function getDirectorSearch(name){
    let response = await fetch(`http://localhost:3000/search/director/${name}`,{
        headers: new Headers({'content-type': 'application/json'})}
    )
    if(!response.ok){
        alert(`Error! \nMensagem:${response.text()}`)
        return
    }
    let reponseData = await response.json()
    let directors =[]
    reponseData.forEach(director => {
        directors.push(new 
            Director(director.id,director.name,director.nationality,convertTimestampToDate(director.birthday),director.age,
            director.genre,director.pictureUrl))
    });
    return directors
}

async function getProducerSearch(name){
    let response = await fetch(`http://localhost:3000/search/producer/${name}`,{
        headers: new Headers({'content-type': 'application/json'})}
    )
    if(!response.ok){
        alert(`Error! \nMensagem:${response.text()}`)
        return
    }
    let reponseData = await response.json()
    let producers =[]
    reponseData.forEach(producer => {
        producers.push(new 
            Producer(producer.id,producer.name,producer.nationality,convertTimestampToDate(producer.birthday),producer.age,
            producer.genre,producer.pictureUrl))
    });
    return producers
}



async function getAllDirectors(){
    let response = await fetch('http://localhost:3000/director',{
        headers: new Headers({'content-type': 'application/json'})}
    )
    if(!response.ok){
        alert(`Error! \nMensagem:${response.text()}`)
        return
    }
    let reponseData = await response.json()
    let directorsList =[]
    reponseData.forEach(director => {
        directorsList.push(new 
            Director(director.id,director.name,director.nationality,convertTimestampToDate(director.birthday),director.age,
            director.genre,director.pictureUrl))
    });
    return directorsList
}

async function getAllProducers(){
    let response = await fetch('http://localhost:3000/producer',{
        headers: new Headers({'content-type': 'application/json'})}
    )
    if(!response.ok){
        alert(`Error! \nMensagem:${response.text()}`)
        return
    }
    let reponseData = await response.json()
    let producersList =[]
    reponseData.forEach(producer => {
        producersList.push(new 
            Producer(producer.id,producer.name,producer.nationality,convertTimestampToDate(producer.birthday),
            producer.age,producer.genre,producer.pictureUrl))
    });
    return producersList
}

async function getAllStudios(){
    let response = await fetch('http://localhost:3000/studio',{
        headers: new Headers({'content-type': 'application/json'})}
    )
    if(!response.ok){
        alert(`Error! \nMensagem:${response.text()}`)
        return
    }
    let reponseData = await response.json()
    let studiosList =[]
    reponseData.forEach(studio => {
        studiosList.push(new 
            Studio(studio.id,studio.name,studio.creationDate,studio.nationality,
                studio.city,studio.pictureUrl))
    });
    return studiosList
}

async function getAllMovies(){
    let response = await fetch('http://localhost:3000/movie',{
        headers: new Headers({'content-type': 'application/json'})}
    )
    if(!response.ok){
        alert(`Error! \nMensagem:${response.text()}`)
        return
    }
    let reponseData = await response.json()
    let movieList =[]
    reponseData.forEach(movie => {
        movieList.push(new Movie(movie.id,movie.portuguese_title,movie.year,movie.genre,
            movie.directors,movie.actors,movie.pictureUrl,movie.cost,movie.totalRecordingDays))
    });
    return movieList
}

function cleanSearchTbody(){
    let searchTbody = document.getElementById('searchTbody')
    searchTbody.innerHTML=''
}

async function searchMovieToEdit(){
    let tableSearch = document.getElementById('tableSearch')
    let inputSearch = document.getElementById('inputSearch').value
    if(inputSearch==null || inputSearch==''){return}
    let searchTbody = document.getElementById('searchTbody')
    tableSearch.style.display='block'
    cleanSearchTbody()
    let resp = await fetch(`http://localhost:3000/search/movie/${inputSearch}`,{
        headers: new Headers({'content-type': 'application/json'})})
    if(!resp.ok){
        alert(`Erro ao carregar os dados.\n${resp.text()}`)
        return
    }
    let movies = await resp.json()
    movies.forEach(movie=>{
        searchTbody.innerHTML+=`<tr>
        <td><button class="btn btn-dark" onclick="updateMovie(${movie.id})">Editar</button></td>
        <td>${movie.id}</td>
        <td>${movie.portuguese_title}</td>
        <td>${movie.year}</td>
        <td><button class="btn btn-danger" onclick="deleteMovie(${movie.id})">Deletar</button></td>
        </tr>`
    })
}

async function updateMovie(movieId){
    let resp = await fetch(`http://localhost:3000/movie/${movieId}`,{
        headers: new Headers({'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.token}`})}
    )
    if(!resp.ok){
        throw new Error(resp.json().name)
    }
    let movie = await resp.json()
    document.getElementById('movieId').value =movie.id
    let inputNome = document.getElementById('inputNome')
    let inputPTNome = document.getElementById('inputPTNome')
    let inputStudio = document.getElementById('inputStudio')
    let inputDuracao = document.getElementById('inputDuracao')
    let inputAno = document.getElementById('inputAno')
    let inputCusto = document.getElementById('inputCusto')
    let inputTempo = document.getElementById('inputTempo')
    let inputAtores = document.getElementById('inputAtores')
    let inputDiretores = document.getElementById('inputDiretores')
    let inputRealizador = document.getElementById('inputRealizador')
    let inputImageUrl = document.getElementById('inputImageUrl')
    let inputSinopse = document.getElementById('inputSinopse')
    
    // fields =[inputNome,inputPTNome,inputStudio,inputDuracao,inputAno,inputCusto,inputTempo,
    // inputAtores,inputDiretores,inputRealizador,inputImageUrl,inputSinopse]
    
    // if(!checkForm(fields)){
    //     alert('Erro!\n Preencha todos os campos para continuar!')
    //     return
    // }

    let studiosList = await getOptionsList('studios')
    let actorsList = await getOptionsList('actors')
    let directorsList = await getOptionsList('directors')
    let prodList = await getOptionsList('producers')

    inputNome.value = movie.title
    inputPTNome.value = movie.portuguese_title
    inputDuracao.value = movie.duration
    inputAno.value = movie.year
    inputCusto.value = movie.cost
    inputTempo.value = movie.totalRecordingDays
    inputAtores.innerHTML = inputAtores.innerHTML.replace('[#ACTOR_LIST#]',actorsList)
    inputDiretores.innerHTML = inputDiretores.innerHTML.replace('[#DIRECTOR_LIST#]',directorsList)
    inputRealizador.innerHTML = inputRealizador.innerHTML.replace('[#PRODUCER_LIST#]',prodList)
    inputStudio.innerHTML =inputStudio.innerHTML.replace('[#STUDIO_LIST#]',studiosList)
    inputImageUrl.value = movie.pictureUrl
    inputSinopse.value = movie.synopsis
}

function adminLogin(){
    let window = window.open('mainpage.html','_self')
}

function convertTimestampToDate(timestamp){
    var year = timestamp.substring(0, 4);
    var month = timestamp.substring(5, 7);
    var day = timestamp.substring(8, 10);
    return `${day}-${month}-${year} `
}
function convertTimestampToDateUsa(timestamp){
    var year = timestamp.substring(0, 4);
    var month = timestamp.substring(5, 7);
    var day = timestamp.substring(8, 10);
    return `${year}-${month}-${day} `
}

async function searchAtorToEdit(){
    let tableSearch = document.getElementById('tableSearch')
    let inputSearch = document.getElementById('inputSearch').value
    if(inputSearch==null || inputSearch==''){return}
    let searchTbody = document.getElementById('searchTbody')
    tableSearch.style.display='block'
    cleanSearchTbody()
    let resp = await fetch(`http://localhost:3000/search/actors/${inputSearch}`,{
        headers: new Headers({'content-type': 'application/json'})})
    if(!resp.ok){
        alert(`Erro ao carregar os dados.\n${resp.text()}`)
        return
    }
    let actors = await resp.json()
    actors.forEach(actor=>{
        searchTbody.innerHTML+=`<tr>
        <td><button class="btn btn-dark" onclick="updateActor(${actor.id})">Editar</button></td>
        <td>${actor.id}</td>
        <td>${actor.name}</td>
        <td>${actor.nationality}</td>
        <td>${convertTimestampToDate(actor.birthday)}</td>
        <td>${actor.genre}</td>
        <td><button class="btn btn-danger" onclick="deleteActor(${actor.id})">Deletar</button></td>
        </tr>`
    })
}

async function updateActor(actorId){
    let resp = await fetch(`http://localhost:3000/actors/${actorId}`,{
        headers: new Headers({'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.token}`})}
    )
    if(!resp.ok){
        throw new Error(resp.json().name)
    }
    let actor = await resp.json()
    document.getElementById('idActor').value =actor.id
    let inputNome = document.getElementById('inputNome')
    let inputNascionalidade = document.getElementById('inputNascionalidade')
    let inputIdade = document.getElementById('inputIdade')
    let inputNascimento = document.getElementById('inputNascimento')
    let inputSexo = document.getElementById('inputSexo')
    let inputImageUrl = document.getElementById('inputImageUrl')

    inputNome.value = actor.name
    inputNascionalidade.value = actor.nationality
    inputIdade.value = actor.age
    inputNascimento.value = convertTimestampToDateUsa(actor.birthday)
    inputSexo.value = actor.genre
    inputImageUrl.value = actor.pictureUrl
}

async function editAtor(){
    let idActor = document.getElementById('idActor')
    let inputNome = document.getElementById('inputNome')
    let inputNascionalidade = document.getElementById('inputNascionalidade')
    let inputNascimento = document.getElementById('inputNascimento')
    let inputSexo = document.getElementById('inputSexo')
    let inputImageUrl = document.getElementById('inputImageUrl')
    let inputIdade = document.getElementById('inputIdade')
    let fields = [inputNome,inputNascionalidade,inputNascimento,inputSexo,inputImageUrl,inputIdade,idActor]
    if(!checkForm(fields)){
        alert('Erro!\n Preencha todos os campos para continuar!')
        return
    }
    let response = await fetch(`http://localhost:3000/actors/update/${idActor.value}`,{
        method: 'PUT',headers: new Headers({'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.token}`}),
        body: JSON.stringify({
            name: inputNome.value,
            nationality: inputNascionalidade.value,
            birthday: inputNascimento.value,
            age: inputIdade.value,
            genre: inputSexo.value,
            imageUrl: inputImageUrl.value})});
    if(!response.ok){
        alert(`Error! \nMensagem:${response.text()}`)
        return
    }
        alert('Actor atualizado com Sucesso!')
        openAdmin()
}

async function deleteActor(actorId){
    if (!confirm("Está certo que deseja deletar esse ator?")){return}
    let response = await fetch(`http://localhost:3000/actors/${actorId}`,{
        method: 'DELETE',headers: new Headers({'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.token}`})})
    if(!response.ok){
        alert(`Erro!\n${await response.text()}`)
        return
    }
    alert('Ator deletado com sucesso!')
    openAdmin()
}

async function searchDiretorToEdit(){
    let tableSearch = document.getElementById('tableSearch')
    let inputSearch = document.getElementById('inputSearch').value
    if(inputSearch==null || inputSearch==''){return}
    let searchTbody = document.getElementById('searchTbody')
    tableSearch.style.display='block'
    cleanSearchTbody()
    let resp = await fetch(`http://localhost:3000/search/director/${inputSearch}`,{
        headers: new Headers({'content-type': 'application/json'})})
    if(!resp.ok){
        alert(`Erro ao carregar os dados.\n${resp.text()}`)
        return
    }
    let directors = await resp.json()
    directors.forEach(director=>{
        searchTbody.innerHTML+=`<tr>
        <td><button class="btn btn-dark" onclick="updateDirector(${director.id})">Editar</button></td>
        <td>${director.id}</td>
        <td>${director.name}</td>
        <td>${director.nationality}</td>
        <td>${convertTimestampToDate(director.birthday)}</td>
        <td>${director.genre}</td>
        <td><button class="btn btn-danger" onclick="deleteDirector(${director.id})">Deletar</button></td>
        </tr>`
    })
}

async function updateDirector(directorId){
    let resp = await fetch(`http://localhost:3000/director/${directorId}`,{
        headers: new Headers({'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.token}`})}
    )
    if(!resp.ok){
        throw new Error(resp.json().name)
    }
    let director = await resp.json()
    document.getElementById('idActor').value =director.id
    let inputNome = document.getElementById('inputNome')
    let inputNascionalidade = document.getElementById('inputNascionalidade')
    let inputIdade = document.getElementById('inputIdade')
    let inputNascimento = document.getElementById('inputNascimento')
    let inputSexo = document.getElementById('inputSexo')
    let inputImageUrl = document.getElementById('inputImageUrl')

    inputNome.value = director.name
    inputNascionalidade.value = director.nationality
    inputIdade.value = director.age
    inputNascimento.value = convertTimestampToDateUsa(director.birthday)
    inputSexo.value = director.genre
    inputImageUrl.value = director.pictureUrl
}

async function editDiretor(){
    let idDirector = document.getElementById('idActor')
    let inputNome = document.getElementById('inputNome')
    let inputNascionalidade = document.getElementById('inputNascionalidade')
    let inputNascimento = document.getElementById('inputNascimento')
    let inputSexo = document.getElementById('inputSexo')
    let inputImageUrl = document.getElementById('inputImageUrl')
    let inputIdade = document.getElementById('inputIdade')
    let fields = [inputNome,inputNascionalidade,inputNascimento,inputSexo,inputImageUrl,inputIdade,idDirector]
    if(!checkForm(fields)){
        alert('Erro!\n Preencha todos os campos para continuar!')
        return
    }
    let response = await fetch(`http://localhost:3000/director/update/${idDirector.value}`,{
        method: 'PUT',headers: new Headers({'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.token}`}),
        body: JSON.stringify({
            name: inputNome.value,
            nationality: inputNascionalidade.value,
            birthday: inputNascimento.value,
            age: inputIdade.value,
            genre: inputSexo.value,
            imageUrl: inputImageUrl.value})});
    if(!response.ok){
        alert(`Error! \nMensagem:${response.text()}`)
        return
    }
        alert('Director atualizado com Sucesso!')
        openAdmin()
}

async function deleteDirector(directorId){
    if (!confirm("Está certo que deseja deletar esse diretor?")){return}
    let response = await fetch(`http://localhost:3000/director/${directorId}`,{
        method: 'DELETE',headers: new Headers({'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.token}`})})
    if(!response.ok){
        alert(`Erro!\n${await response.text()}`)
        return
    }
    alert('Director deletado com sucesso!')
    openAdmin()
}


async function searchProdutorToEdit(){
    let tableSearch = document.getElementById('tableSearch')
    let inputSearch = document.getElementById('inputSearch').value
    if(inputSearch==null || inputSearch==''){return}
    let searchTbody = document.getElementById('searchTbody')
    tableSearch.style.display='block'
    cleanSearchTbody()
    let resp = await fetch(`http://localhost:3000/search/producer/${inputSearch}`,{
        headers: new Headers({'content-type': 'application/json'})})
    if(!resp.ok){
        alert(`Erro ao carregar os dados.\n${resp.text()}`)
        return
    }
    let producers = await resp.json()
    producers.forEach(producer=>{
        searchTbody.innerHTML+=`<tr>
        <td><button class="btn btn-dark" onclick="updateProdutor(${producer.id})">Editar</button></td>
        <td>${producer.id}</td>
        <td>${producer.name}</td>
        <td>${producer.nationality}</td>
        <td>${convertTimestampToDate(producer.birthday)}</td>
        <td>${producer.genre}</td>
        <td><button class="btn btn-danger" onclick="deleteProdutor(${producer.id})">Deletar</button></td>
        </tr>`
    })
}

async function updateProdutor(producerId){
    let resp = await fetch(`http://localhost:3000/producer/${producerId}`,{
        headers: new Headers({'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.token}`})}
    )
    if(!resp.ok){
        throw new Error(resp.json().name)
    }
    let producer = await resp.json()
    document.getElementById('idActor').value =producer.id
    let inputNome = document.getElementById('inputNome')
    let inputNascionalidade = document.getElementById('inputNascionalidade')
    let inputIdade = document.getElementById('inputIdade')
    let inputNascimento = document.getElementById('inputNascimento')
    let inputSexo = document.getElementById('inputSexo')
    let inputImageUrl = document.getElementById('inputImageUrl')

    inputNome.value = producer.name
    inputNascionalidade.value = producer.nationality
    inputIdade.value = producer.age
    inputNascimento.value = convertTimestampToDateUsa(producer.birthday)
    inputSexo.value = producer.genre
    inputImageUrl.value = producer.pictureUrl
}

async function editProdutor(){
    let idProdutor = document.getElementById('idActor')
    let inputNome = document.getElementById('inputNome')
    let inputNascionalidade = document.getElementById('inputNascionalidade')
    let inputNascimento = document.getElementById('inputNascimento')
    let inputSexo = document.getElementById('inputSexo')
    let inputImageUrl = document.getElementById('inputImageUrl')
    let inputIdade = document.getElementById('inputIdade')
    let fields = [inputNome,inputNascionalidade,inputNascimento,inputSexo,inputImageUrl,inputIdade,idProdutor]
    if(!checkForm(fields)){
        alert('Erro!\n Preencha todos os campos para continuar!')
        return
    }
    let response = await fetch(`http://localhost:3000/producer/update/${idProdutor.value}`,{
        method: 'PUT',headers: new Headers({'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.token}`}),
        body: JSON.stringify({
            name: inputNome.value,
            nationality: inputNascionalidade.value,
            birthday: inputNascimento.value,
            age: inputIdade.value,
            genre: inputSexo.value,
            imageUrl: inputImageUrl.value})});
    if(!response.ok){
        alert(`Error! \nMensagem:${response.text()}`)
        return
    }
        alert('Produtor atualizado com Sucesso!')
        openAdmin()
}

async function deleteProdutor(directorId){
    if (!confirm("Está certo que deseja deletar esse produtor?")){return}
    let response = await fetch(`http://localhost:3000/producer/${directorId}`,{
        method: 'DELETE',headers: new Headers({'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.token}`})})
    if(!response.ok){
        alert(`Erro!\n${await response.text()}`)
        return
    }
    alert('Director deletado com sucesso!')
    openAdmin()
}

function getTypeOfSearch(){
    const types = document.querySelectorAll('input[name="searchType"]');
            let selectedtype;
            for (let type of types) {
                if (type.checked) {
                    selectedtype = type.value;
                    break;
                }
            }
            return selectedtype;
}

function encrypt(str){
    let encrypted = CryptoJS.AES.encrypt(str, "WebDevEncrypt")
    return encrypted.toString()
}

async function addToPeopleFavorites(){
    const token = localStorage.getItem('token') 
    if(token && token != null && token != ''){
        alert('Item adicionado aos favorito!')
    }
    else{
        alert('Você deve estar logado para utilizar essa funcionalidade!')
    }

}
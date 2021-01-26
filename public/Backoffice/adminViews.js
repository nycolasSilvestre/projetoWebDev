const adminpanelTop ='<!DOCTYPE html>'
+'<html lang="pt-br">'
+'<head>'
+'    <meta charset="utf-8">'
+'    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">'
+'    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"'
+'        integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous" />'
+'    <link rel="stylesheet" href="/css/style.css" />'
+'    <title>MainPage</title>'
+'</head>'
+'<body>'
+'    <nav class="navbar navbar-expand-lg bg-dark navbar-dark navbar-marketing mb-5 px-5 py-3 fixed-top">'
+'        <ul class="navbar-nav ml-auto mr-auto">'
+'        <li class="nav-item"><a href="index.html" class="nav-link">Voltar ao portal</a></li>'
+'            <li class="nav-item dropdown">'
+'                <a class="nav-link dropdown-toggle" href="#" id="navbarMoviesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
+'                  Filmes'
+'                </a>'
+'                <div class="dropdown-menu" aria-labelledby="navbarMoviesDropdown">'
+'                  <a class="dropdown-item" type="button" onclick="openAdminInsertItem(\'Filme\')">Inserir novo</a>'
+'                  <a class="dropdown-item" type="button" onclick="openAdminEditItem(\'Filme\')">Editar existente</a>'
+'                  <a class="dropdown-item" href="/#">Excluir existente</a>'
+'                </div>'
+'              </li>'
+'            <li class="nav-item dropdown">'
+'                <a class="nav-link dropdown-toggle" href="#" id="navbarActorsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
+'                    Atores'
+'                  </a>'
+'                  <div class="dropdown-menu" aria-labelledby="navbarActorsDropdown">'
+'                    <a class="dropdown-item" type="button" onclick="openAdminInsertItem(\'Ator\')">Inserir novo</a>'
+'                    <a class="dropdown-item" href="editarAtor.html">Editar existente</a>'
+'                    <a class="dropdown-item" href="excluirAtor.html">Excluir existente</a>'
+'                  </div>'
+'            </li>'
+'            <li class="nav-item dropdown">'
+'                <a class="nav-link dropdown-toggle" href="#" id="navbarDirectorsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
+'                    Diretores'
+'                  </a>'
+'                  <div class="dropdown-menu" aria-labelledby="navbarDirectorsDropdown">'
+'                    <a class="dropdown-item" type="button" onclick="openAdminInsertItem(\'Diretor\')">Inserir novo</a>'
+'                    <a class="dropdown-item" href="editarDiretor.html">Editar existente</a>'
+'                    <a class="dropdown-item" href="excluirDiretor.html">Excluir existente</a>'
+'                  </div>'
+'            </li>'
+'            <li class="nav-item dropdown">'
+'                <a class="nav-link dropdown-toggle" href="#" id="navbarProducersDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
+'                    Produtores'
+'                  </a>'
+'                  <div class="dropdown-menu" aria-labelledby="navbarProducersDropdown">'
+'                    <a class="dropdown-item" type="button" onclick="openAdminInsertItem(\'Produtor\')">Inserir novo</a>'
+'                    <a class="dropdown-item" href="editarProdutor.html">Editar existente</a>'
+'                    <a class="dropdown-item" href="excluirProdutor.html">Excluir existente</a>'
+'                  </div>'
+'            </li>'
+'            <li class="nav-item dropdown">'
+'                <a class="nav-link dropdown-toggle" href="#" id="navbarStudiosDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
+'                    Estúdios'
+'                  </a>'
+'                  <div class="dropdown-menu" aria-labelledby="navbarStudiosDropdown">'
+'                    <a class="dropdown-item" type="button" onclick="openAdminInsertItem(\'Estudio\')">Inserir novo</a>'
+'                    <a class="dropdown-item" type="button" onclick="openAdminEditItem(\'Estudio\')">Editar existente</a>'
+'                    <a class="dropdown-item" href="excluirEstudio.html">Excluir existente</a>'
+'                  </div>'
+'            </li>'
+'            <li class="nav-item dropdown">'
+'                <a class="nav-link dropdown-toggle" href="#" id="navbarStudiosDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
+'                    Usuários'
+'                  </a>'
+'                  <div class="dropdown-menu" aria-labelledby="navbarStudiosDropdown">'
+'                    <a class="dropdown-item" type="button" onclick="openAdminInsertItem(\'Usuário\')">Inserir novo</a>'
+'                    <a class="dropdown-item" type="button" onclick="openAdminEditItem(\'Usuário\')">Editar existente</a>'
+'                    <a class="dropdown-item" href="excluirUsuario.html">Excluir existente</a>'
+'                  </div>'
+'            </li>'
+'        </ul>'
+'    </nav>'
+'    <section id="main-section" class=" container text-center">'

const adminpanelBottom='</section>'
+'    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js "'
+'        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj "'
+'        crossorigin="anonymous "></script>'
+'    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js "'
+'        integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx "'
+'        crossorigin="anonymous "></script>'
+'    <script src="/js/script.js"></script>'
+'</body>'
+'</html>'

const welcomeMsg ='<h3>Bem vindo ao painel de controle do sitio Hollywood Database</h3>'
+'        <article>'
+'            <p>Para gerir os dados presentes na base, basta carregar sobre os links acima e efetuar as atualizações'
+'                necessárias</p>'
+'        </article>'


function getMainPanel(content){
    return adminpanelTop+welcomeMsg+adminpanelBottom
}
function getAddItem(type){
    let title = `Inserir novo ${type}`
    let form =''
    switch (type.toLowerCase()) {
        case 'filme':
            form =`<h5 class="section-title">${title}</h5>
                 <hr>
                 <form>
                  <div class="form-row">
                      <div class="form-group col-md-6">
                          <label for="inputNome">Nome Original:</label>
                          <input type="text" class="form-control" id="inputNome">
                      </div>
                      <div class="form-group col-md-6">
                          <label for="inputPTNome">Nome em Português:</label>
                          <input type="text" class="form-control" id="inputPTNome">
                      </div>
                  </div>
                  <div class="form-row justify-content-around">
                      <div class="form-group col-md-2">
                          <label for="inputData">Data de Produção:</label>
                          <input type="text" class="form-control" id="inputData">
                      </div>
                      <div class="form-group col-md-2">
                          <label for="inputCusto">Custo de Produção:</label>
                          <input type="text" class="form-control" id="inputCusto">
                      </div>
                      <div class="form-group col-md-2">
                          <label for="inputTempo">Tempo de Produção:</label>
                          <input type="text" class="form-control" id="inputTempo">
                      </div>
                      <div class="form-group col-md-2">
                          <label for="inputGenero">Genero:</label>
                          <select class="form-control" id="inputGenero">
                              <option>Animação</option>
                              <option>Ação</option>
                              <option>Aventura</option>
                              <option>Épico</option>
                              <option>Fantasia</option>
                              <option>Guerra</option>
                              <option>Terror</option>
                            </select>
                      </div>
                      <div class="form-group col-md-2">
                          <label for="inputRealizador">Realizador:</label>
                          <select class="form-control" id="inputRealizador">
                              <option>Escolher</option>
                            </select>
                      </div>
                      <div class="form-group col-md-2">
                        <label for="inputImageUrl">Url do Poster:</label>
                        <input type="text" class="form-control" id="inputImageUrl">
                    </div>
                  </div>
                  <div class="form-group">
                      <label for="inputSinopse">Sinopse:</label>
                      <textarea class="form-control" id="inputSinopse" rows="3"></textarea>
                  </div>
                  <button type="button" onclick="clearFields()" class="btn btn-secondary">Cancelar</button>
            <button type="button" onclick="inserfilme()" class="btn btn-primary">Criar</button>
                 </form>`
            break;
        case 'estudio':
            form =`<h5 class="section-title">${title}</h5>
            <hr>
            <form>
            <div class="form-row">
                <div class="form-group col-md-3">
                    <label for="inputNome">Nome do Estudio:</label>
                    <input type="text" class="form-control" id="inputNome">
                </div>
                <div class="form-group col-md-3">
                    <label for="inputFundador">Fundador:</label>
                    <input type="text" class="form-control" id="inputFundador">
                </div>
                <div class="form-group col-md-3">
                    <label for="inputNumFilmes">Nº de filmes lancados:</label>
                    <input type="text" class="form-control" id="inputNumFilmes">
                </div>
                <div class="form-group col-md-3">
                    <label for="inputID">País:</label>
                    <input type="text" class="form-control" id="inputCountry">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-3">
                    <label for="inputMorada">Cidade:</label>
                    <input type="text" class="form-control" id="inputCidade">
                </div>
                <div class="form-group col-md-3">
                    <label for="inputFundação">Data de Fundação:</label>
                    <input type="date" class="form-control" id="inputFundação">
                </div>
                <div class="form-group col-md-3">
                    <label for="inputLucro">Lucro Anual:</label>
                    <input type="text" class="form-control" id="inputLucro">
                </div>
                <div class="form-group col-md-3">
                    <label for="inputUrlImage">Url foto:</label>
                    <input type="text" class="form-control" id="inputUrlImage">
                </div>
            </div>
            <button type="submit" class="btn btn-secondary">Cancelar</button>
            <button type="submit" class="btn btn-primary">Criar</button>
        </form>`
            break;
        case 'usuário':
            form=`<h5 class="section-title">${title}</h5>
            <hr>
            <form>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="inputNome">Primeiro Nome:</label>
                    <input type="text" class="form-control" id="inputNome">
                </div>
                <div class="form-group col-md-6">
                    <label for="inputUNome">Ultimo Nome:</label>
                    <input type="text" class="form-control" id="inputUNome">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="inputEmail">E-mail:</label>
                    <input type="email" class="form-control" id="inputEmail">
                </div>
                <div class="form-group col-md-6">
                    <label for="inputPass">Senha:</label>
                    <input type="text" class="form-control" id="inputPass">
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-1">
                    <label for="inputIsAdm">Admin:</label>
                    <input type="checkbox" class="form-control" id="inputIsAdm">
                </div>
            </div>
            <button type="submit" class="btn btn-secondary">Cancelar</button>
            <button type="submit" class="btn btn-primary">Criar</button>
            </form>`
            break;
        default:
            form =`<h5 class="section-title">${title}</h5>
                <hr>
                <form>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="inputNome">Nome:</label>
                    <input type="text" class="form-control" id="inputNome">
                </div>
                <div class="form-group col-md-3">
                    <label for="inputNascionalidade">Nacionalidade:</label>
                    <input type="text" class="form-control" id="inputNascionalidade">
                </div>
                <div class="form-group col-md-3">
                    <label for="inputNascimento">Data Nascimento:</label>
                    <input type="date" class="form-control" id="inputNascimento">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-3">
                    <label for="inputEmail">E-mail:</label>
                    <input type="text" class="form-control" id="inputEmail">
                </div>
                
                <div class="form-group col-md-3">
                    <label for="inputIdade">Idade:</label>
                    <input type="text" class="form-control" id="inputIdade">
                </div>
                <div class="form-group col-md-3">
                    <label for="inputSexo">Sexo:</label>
                    <select class="form-control" id="inputSexo">
                        <option>Masculino</option>
                        <option>Feminino</option>
                      </select>
                </div>
                <div class="form-group col-md-3">
                    <label for="inputImageUrl">Url Foto:</label>
                    <input type="text" class="form-control" id="inputImageUrl">
                </div>
            </div>
            <button type="button" onclick="clearFields()" class="btn btn-secondary">Cancelar</button>
            <button type="button" onclick="insert${type.toLowerCase()}()" class="btn btn-primary">Criar</button>
            </form>`
            break;        
    }
    return adminpanelTop+form+adminpanelBottom
}
function getEditItem(type){
    let title = `Editar ${type} existente`
    let form =''
    let functionName=''
    switch (type.toLowerCase()) {
        case 'filme':
            form =`<h5 class="section-title">${title}</h5>
                 <hr>
                <form class="form-inline mb-5">
                <label for="inputSearch">Nome do Filme</label>
                <input class="form-control mx-5" type="text" id="inputSearch"  placeholder="Insira o nome do Filme a ser editado">
                <button class="btn btn-primary" type="button" onclick="searchMovieToEdit()">Buscar</button>
                </form>
                <div id="tableSearch">
                <table class="table table-striped">
                <thead>
                <th>Selecionar</th>
                <th>ID</th>
                <th>Nome do filme</th>
                <th>Diretor/Diretores</th>
                <th>Ator/Atores</th>
                <th>Ano</th>
                <th>Deletar</th>
                </thead>
                <tbody>
                ${getMoviesTableContent()}
                </tbody>
                </table>
                </div>
                <hr>
                <form>
                <div class="form-row">
                <div class="form-group col-md-6">
                <label for="inputNome">Nome Original:</label>
                <input type="text" class="form-control" id="inputNome">
                </div>
                <div class="form-group col-md-6">
                <label for="inputPTNome">Nome em Português:</label>
                <input type="text" class="form-control" id="inputPTNome">
                </div>
                </div>
                <div class="form-row">
                <div class="form-group col-md-2">
                <label for="inputID">ID:</label>
                <input type="text" class="form-control" id="inputID">
                </div>
                <div class="form-group col-md-2">
                <label for="inputData">Data de Produção:</label>
                <input type="text" class="form-control" id="inputData">
                </div>
                <div class="form-group col-md-2">
                <label for="inputCusto">Custo de Produção:</label>
                <input type="text" class="form-control" id="inputCusto">
                </div>
                <div class="form-group col-md-2">
                <label for="inputTempo">Tempo de Produção:</label>
                <input type="text" class="form-control" id="inputTempo">
                </div>
                <div class="form-group col-md-2">
                <label for="inputGenero">Genero:</label>
                <select class="form-control" id="inputGenero">
                <option>Animação</option>
                <option>Ação</option>
                <option>Aventura</option>
                <option>Épico</option>
                <option>Fantasia</option>
                <option>Guerra</option>
                <option>Terror</option>
                </select>
                </div>
                <div class="form-group col-md-2">
                <label for="inputRealizador">Realizador:</label>
                <select class="form-control" id="inputRealizador">
                <option>Escolher</option>
                </select>
                </div>
                </div>
                <div class="form-group">
                <label for="inputSinopse">Sinopse:</label>
                <textarea class="form-control" id="inputSinopse" rows="3"></textarea>
                </div>
                <button type="button" onclick="clearEditFields()" class="btn btn-secondary">Cancelar</button>
                <button type="button" onclick="editMovie()" class="btn btn-primary">Salvar</button>
                </form>`
            break;
        case 'estudio':
            form =`<h5 class="section-title">${title}</h5>
                 <hr>
                <form class="form-inline mb-5">
                <label for="inputSearch">Nome do Estúdio</label>
                <input class="form-control mx-5" id="inputSearch" type="text" placeholder="Insira o nome do estúdio a ser editado">
                <button class="btn btn-primary" type="button" onclick="searchStudioToEdit()">Buscar</button>
                </form>
                <div id="tableSearch">
                <table class="table table-striped">
                <thead>
                <th>Selecionar</th>
                <th>ID</th>
                <th>Nome</th>
                <th>Fundador</th>
                <th>País</th>
                <th>Deletar</th>
                </thead>
                <tbody>
                ${getStudioContent()}
                </tbody>
                </table>
                </div>
                <hr>
                <form>
                <div class="form-row">
                    <div class="form-group col-md-3">
                        <label for="inputNome">Nome do Estudio:</label>
                        <input type="text" class="form-control" id="inputNome">
                    </div>
                    <div class="form-group col-md-3">
                        <label for="inputFundador">Fundador:</label>
                        <input type="text" class="form-control" id="inputFundador">
                    </div>
                    <div class="form-group col-md-3">
                        <label for="inputNumFilmes">Nº de filmes lancados:</label>
                        <input type="text" class="form-control" id="inputNumFilmes">
                    </div>
                    <div class="form-group col-md-3">
                        <label for="inputID">País:</label>
                        <input type="text" class="form-control" id="inputCountry">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-3">
                        <label for="inputMorada">Cidade:</label>
                        <input type="text" class="form-control" id="inputCidade">
                    </div>
                    <div class="form-group col-md-3">
                        <label for="inputFundação">Data de Fundação:</label>
                        <input type="date" class="form-control" id="inputFundação">
                    </div>
                    <div class="form-group col-md-3">
                        <label for="inputLucro">Lucro Anual:</label>
                        <input type="text" class="form-control" id="inputLucro">
                    </div>
                    <div class="form-group col-md-3">
                        <label for="inputUrlImage">Url foto:</label>
                        <input type="text" class="form-control" id="inputUrlImage">
                    </div>
                </div>
                <button type="button" onclick="clearEditFields()" class="btn btn-secondary">Cancelar</button>
                <button type="button" onclick="editStudio()" class="btn btn-primary">Salvar</button>
                </form>`
            break;
        case 'usuário':
            form =`<h5 class="section-title">${title}</h5>
                 <hr>
                <form class="form-inline mb-5">
                <label for="inputSearch">Nome do Usuário</label>
                <input class="form-control mx-5" id="inputSearch" type="text" placeholder="Insira o nome do Usuário a ser editado">
                <button class="btn btn-primary" type="button" onclick="searchUserToEdit()">Buscar</button>
                </form>
                <div id="tableSearch">
                <table class="table table-striped">
                <thead>
                <th>Selecionar</th>
                <th>ID</th>
                <th>Primeiro Nome</th>
                <th>Apelido</th>
                <th>Email</th>
                <th>Deletar</th>
                </thead>
                <tbody>
                ${getUserContent()}
                </tbody>
                </table>
                </div>
                <hr>
                <form>
                <div class="form-row">
                <div class="form-group col-md-6">
                <label for="inputNome">Primeiro Nome:</label>
                <input type="text" class="form-control" id="inputNome">
                </div>
                <div class="form-group col-md-6">
                <label for="inputUNome">Ultimo Nome:</label>
                <input type="text" class="form-control" id="inputUNome">
                </div>
                </div>
                <div class="form-row">
                <div class="form-group col-md-6">
                <label for="inputEmail">E-mail:</label>
                <input type="email" class="form-control" id="inputEmail">
                </div>
                <div class="form-group col-md-6">
                <label for="inputPass">Nova Senha:</label>
                <input type="text" class="form-control" id="inputPass">
                </div>
                </div>
                <div class="row">
                <div class="form-group col-md-1">
                <label for="inputIsAdm">Admin:</label>
                <input type="checkbox" class="form-control" id="inputIsAdm">
                </div>
                </div>
                <button type="button" onclick="clearEditFields()" class="btn btn-secondary">Cancelar</button>
                <button type="button" onclick="editUser()" class="btn btn-primary">Salvar</button>
                </form>`
            break;        
        default:
            break;
    }
    return adminpanelTop+form+adminpanelBottom
}

function getMoviesTableContent(){
    return`<tr>
           <td><button class="btn btn-dark" onclick="updateMovie()">Editar</button></td>
           <td>1</td>
           <td>adeededfefdedassssssssssssssssssss</td>
           <td>badeededfefdedassssssssssssssssssss</td>
           <td>badeededfefdedassssssssssssssssssss</td>
           <td>2000</td>
           <td><button class="btn btn-danger" onclick="deleteMovie()">Deletar</button></td>
           </tr>`
}

function getStudioContent(){
    return `<tr>
            <td><button class="btn btn-dark" onclick="updateStudio()">Editar</button></td>
            <td>1</td>
            <td>Disney</td>
            <td>Walt Disney</td>
            <td>EUA</td>
            <td><button class="btn btn-danger" onclick="deleteStudio()">Deletar</button></td>
            </tr>`
}

function getUserContent(){
    return `<tr>
            <td><button class="btn btn-dark" onclick="updateStudio()">Editar</button></td>
            <td>1</td>
            <td>Nycolas</td>
            <td>Silvestre</td>
            <td>ncy@nyco</td>
            <td><button class="btn btn-danger" onclick="deleteStudio()">Deletar</button></td>
            </tr>`
}

module.exports.getMainPanel = getMainPanel
module.exports.getAddItem = getAddItem
module.exports.getEditItem = getEditItem
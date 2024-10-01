let filmes = [];
// Inicializa um array vazio que armazenará a lista de filmes retornados pela API

// Função para fazer a busca dos filmes
function buscarFilmes(query) {
    fetch(`https://omdbapi.com/?s=${query}&apikey=682c159a`)
        // Faz uma requisição à API OMDb utilizando a busca "query" e a chave da API

        .then(response => response.json())
        // Converte a resposta da API para formato JSON

        .then(data => {
            filmes = data.Search || [];
            // Armazena os filmes retornados pela API no array "filmes". Caso não haja resultados, o array permanece vazio.

            exibirLista(filmes);
            // Chama a função para exibir a lista de filmes
        });
}

// Função para exibir a lista de filmes
function exibirLista(filmes) {
    const moviesList = document.getElementById('movies-list');
    // Obtém a referência ao elemento HTML onde a lista de filmes será exibida

    moviesList.innerHTML = '';
    // Limpa qualquer conteúdo anterior da lista de filmes

    filmes.forEach(filme => {
        // Itera sobre cada filme no array "filmes"

        const movieItem = document.createElement('div');
        // Cria um novo elemento <div> para cada filme

        movieItem.classList.add('movie-item');
        // Adiciona a classe "movie-item" ao novo elemento <div>

        movieItem.innerHTML = `
            <img src="${filme.Poster}" alt="${filme.Title}">
            <h3>${filme.Title}</h3>
            <p>${filme.Year}</p>
            <button onclick="adicionarAosFavoritos('${filme.imdbID}')">Favoritar</button>
            <button onclick="mostrarDetalhes('${filme.imdbID}')">Ver Detalhes</button>
        `;
        // Preenche o conteúdo HTML do <div> com a imagem, título, ano e botões para favoritar e ver detalhes do filme

        moviesList.appendChild(movieItem);
        // Adiciona o novo <div> ao elemento que exibe a lista de filmes
    });
}

// Função para mostrar detalhes do filme
function mostrarDetalhes(imdbID) {
    fetch(`https://omdbapi.com/?i=${imdbID}&apikey=682c159a`)
        // Faz uma requisição à API OMDb com o ID do filme (imdbID)

        .then(response => response.json())
        // Converte a resposta para formato JSON

        .then(filme => {
            const detalhes = document.getElementById('detalhes');
            // Obtém a referência ao elemento que exibe os detalhes do filme

            detalhes.innerHTML = `
                <h2>${filme.Title}</h2>
                <p><strong>Ano:</strong> ${filme.Year}</p>
                <p><strong>Diretor:</strong> ${filme.Director}</p>
                <p><strong>Elenco:</strong> ${filme.Actors}</p>
                <p><strong>Sinopse:</strong> ${filme.Plot}</p>
            `;
            // Preenche o conteúdo do elemento de detalhes com informações do filme como título, ano, diretor, elenco e sinopse
        });
}

// Função para adicionar aos favoritos
function adicionarAosFavoritos(imdbID) {
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    // Obtém a lista de favoritos armazenada no localStorage, ou inicializa um array vazio se não houver favoritos

    if (!favoritos.includes(imdbID)) {
        favoritos.push(imdbID);
        // Se o ID do filme não estiver na lista de favoritos, ele é adicionado

        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        // Atualiza a lista de favoritos no localStorage

        alert('Filme adicionado aos favoritos!');
        // Exibe uma mensagem de confirmação
    } else {
        alert('Este filme já está nos favoritos.');
        // Exibe uma mensagem caso o filme já esteja na lista de favoritos
    }
}

// Função para carregar favoritos ao carregar a página
function carregarFavoritos() {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    // Obtém a lista de favoritos armazenada no localStorage

    favoritos.forEach(favID => {
        mostrarDetalhes(favID);
        // Para cada filme favorito, exibe seus detalhes
    });
}

// Evento de busca ao clicar no botão
document.getElementById('search-btn').addEventListener('click', () => {
    const query = document.getElementById('search-input').value;
    // Obtém o valor inserido pelo usuário no campo de busca

    if (query) {
        buscarFilmes(query);
        // Se houver algo inserido, chama a função para buscar filmes
    }
});

// Carregar favoritos ao carregar a página
window.onload = carregarFavoritos;

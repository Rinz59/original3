function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function loadAnimeDetails() {
    const title = getParameterByName('title');
    const image = getParameterByName('image');
    const description = getParameterByName('description');
    const episodes = JSON.parse(getParameterByName('episodes'));
    const pausedEpisode = parseInt(getParameterByName('pausedEpisode'));

    document.getElementById('animeTitle').innerText = title;
    document.getElementById('animeImage').src = image;
    document.getElementById('animeDescription').innerText = description;

    const episodeList = document.getElementById('episodeList');
    let defaultEpisodeLoaded = false;
    episodes.forEach((episode, index) => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#';  // Evitar que recargue la página
        link.innerText = episode.title;
        link.onclick = function(e) {
            e.preventDefault();
            changeVideo(episode.url);
            document.querySelectorAll('.episode-list li').forEach(item => {
                item.classList.remove('active');
            });
            listItem.classList.add('active');
        };
        listItem.appendChild(link);
        episodeList.appendChild(listItem);
        if (!defaultEpisodeLoaded) {
            changeVideo(episode.url);
            listItem.classList.add('active');
            defaultEpisodeLoaded = true;
        }
    });
}

function changeVideo(videoURL) {
    document.getElementById('videoFrame').src = videoURL;
}

window.onload = loadAnimeDetails;
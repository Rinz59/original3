document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    searchInput.addEventListener('input', function() {
        const query = searchInput.value.toLowerCase();
        
        // Obtener todos los elementos con clase 'box'
        const boxes = document.querySelectorAll('.box');
        const results = Array.from(boxes).map(box => {
            return {
                title: box.getAttribute('data-title'),
                category: box.getAttribute('data-category'),
                imageUrl: box.querySelector('.anime-image').src
            };
        });
        
        if (query.trim().length >= 2) {
            const filteredResults = results.filter(item => item.title.toLowerCase().includes(query));
            
            if (filteredResults.length > 0) {
                searchResults.innerHTML = '';
                filteredResults.forEach(item => {
                    const resultItem = document.createElement('li');
                    resultItem.innerHTML = `
                        <img src="${item.imageUrl}" alt="${item.title}">
                        <div class="info">
                            <h3>${item.title}</h3>
                            <p>${item.category}</p>
                            <span class="tag">${item.category.toUpperCase()}</span>
                        </div>
                    `;
                    searchResults.appendChild(resultItem);
                });
                searchResults.style.display = 'block';
            } else {
                searchResults.style.display = 'none';
            }
        } else {
            searchResults.style.display = 'none';
        }
    });

    document.addEventListener('click', function(event) {
        if (!searchInput.contains(event.target) && !searchResults.contains(event.target)) {
            searchResults.style.display = 'none';
        }
    });
});

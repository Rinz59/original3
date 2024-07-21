const gallery = document.querySelector('.gallery');
const pagesContainer = document.querySelector('.pages');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');

const itemsPerPage = 12; // Número de imágenes por página
const totalItems = 100; // Número total de imágenes
let currentPage = 1; // Página actual

function renderPagination() {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calcular el rango de páginas a mostrar alrededor de la página actual
  const visiblePages = 5; // Número de páginas visibles
  let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  let endPage = Math.min(totalPages, startPage + visiblePages - 1);

  // Ajustar el rango si está cerca de los bordes
  if (endPage - startPage < visiblePages - 1) {
    startPage = Math.max(1, endPage - visiblePages + 1);
  }

  // Renderizar botones de paginación
  pagesContainer.innerHTML = '';

  for (let i = startPage; i <= endPage; i++) {
    const pageLink = document.createElement('a');
    pageLink.href = '#';
    pageLink.textContent = i;
    pageLink.setAttribute('data-page', i); // Agregar el número de página como atributo de datos

    if (i === currentPage) {
      pageLink.classList.add('active');
    }

    const listItem = document.createElement('li');
    listItem.appendChild(pageLink);
    pagesContainer.appendChild(listItem);
  }
}

// Manejar el evento de clic en el contenedor de páginas
pagesContainer.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    currentPage = parseInt(event.target.getAttribute('data-page'));
    renderGallery();
    renderPagination();
    event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
  }
});

function renderGallery() {
  // Ocultar todas las imágenes
  const boxes = document.querySelectorAll('.box');
  boxes.forEach(box => box.style.display = 'none');

  // Calcular el rango de imágenes para la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  // Mostrar las imágenes correspondientes a la página actual
  for (let i = startIndex; i < endIndex; i++) {
    boxes[i].style.display = 'block';
  }
}

prevPageBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderGallery();
    renderPagination();
  }
});

nextPageBtn.addEventListener('click', () => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderGallery();
    renderPagination();
  }
});

renderGallery();
renderPagination();

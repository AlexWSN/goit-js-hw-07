import { galleryItems } from "./gallery-items.js";
// Change code below this line

// Referința la containerul galeriei
const galleryContainer = document.querySelector(".gallery");

// Creează și adaugă markup-ul în galeria HTML
function createGalleryItemsMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </li>
      `;
    })
    .join("");
}

// Adaugă markup-ul în HTML
const galleryMarkup = createGalleryItemsMarkup(galleryItems);
galleryContainer.innerHTML = galleryMarkup;

// Adaugă delegare de evenimente pentru a asculta clickurile pe imagini
galleryContainer.addEventListener("click", onGalleryItemClick);

function onGalleryItemClick(event) {
  event.preventDefault(); // Previne redirecționarea pe linkul imaginii mari

  const isImage = event.target.classList.contains("gallery__image");
  if (!isImage) {
    return; // Asigură-te că doar imaginile declanșează evenimentul
  }

  const largeImageURL = event.target.dataset.source;

  // Deschide fereastra modală cu imaginea mare
  const instance = basicLightbox.create(`
    <img src="${largeImageURL}" width="800" height="600">
  `);

  instance.show();

  // Adaugă ascultător pentru tasta Escape
  window.addEventListener("keydown", onEscKeyPress);

  function onEscKeyPress(event) {
    if (event.code === "Escape") {
      instance.close();
      window.removeEventListener("keydown", onEscKeyPress);
    }
  }
}

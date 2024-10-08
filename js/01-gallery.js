import { galleryItems } from "./gallery-items.js";
const galleryContainer = document.querySelector(".gallery");
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

const galleryMarkup = createGalleryItemsMarkup(galleryItems);
galleryContainer.innerHTML = galleryMarkup;
galleryContainer.addEventListener("click", onGalleryItemClick);

function onGalleryItemClick(event) {
  event.preventDefault(); // Previne redirecționarea pe linkul imaginii mari

  const isImage = event.target.classList.contains("gallery__image");
  if (!isImage) {
    return; 
  }

  const largeImageURL = event.target.dataset.source;

  // Deschide fereastra modală cu imaginea mare
  const instance = basicLightbox.create(`
    <img src="${largeImageURL}" width="800" height="600">
  `);

  instance.show();

  window.addEventListener("keydown", onEscKeyPress);

  function onEscKeyPress(event) {
    if (event.code === "Escape") {
      instance.close();
      window.removeEventListener("keydown", onEscKeyPress);
    }
  }
}

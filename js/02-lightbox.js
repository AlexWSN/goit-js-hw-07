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
const lightbox = new SimpleLightbox(".gallery__link", {
  captionsData: "alt",
});

function scrollDown() {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth',
  });
}
const renderImages = (images, refs) => {
  const imageElMarkup = images.map(image => {
    return `
          <a href="${image.largeImageURL}">
            <div class="photo-card">
              <img src="${image.webformatURL} width="500"  alt="${image.tags}" width="500" loading="lazy" />
              <div class="info">
                <p class="info-item">
                  <b>Likes:</b> ${image.likes}
                </p>
                <p class="info-item">
                  <b>Views:</b> ${image.views}
                </p>
                <p class="info-item">
                  <b>Comments:</b> ${image.comments}
                </p>
                <p class="info-item">
                  <b>Downloads:</b> ${image.downloads}
                </p>
              </div>
            </div>
          </a>`;
  });

  refs.gallery.insertAdjacentHTML('beforeend', imageElMarkup.join(''));

  lightbox.refresh();

  scrollDown();
};

export { renderImages };

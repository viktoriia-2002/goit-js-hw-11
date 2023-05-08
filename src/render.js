const scrollDown = () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth',
  });
};
const renderImages = (images, refs, lightbox) => {
  const imageElMarkup = images.map(image => {
    return `
          <a href="${image.largeImageURL}">
            <div class="photo-card">
              <img src="${image.webformatURL}" width="500"  alt="${image.tags}" width="500" loading="lazy" />
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

  const displayTotalHits = totalHits => {
    const totalHitsEl = document.querySelector('.total-hits');
    if (totalHitsEl) {
      totalHitsEl.textContent = `Total Images Found: ${totalHits}`;
    } else {
      const totalHitsMarkup = `<p class="total-hits">Total Images Found: ${totalHits}</p>`;
      refs.gallery.insertAdjacentHTML('beforebegin', totalHitsMarkup);
    }

    Notiflix.Notify.info(`Total Images Found: ${totalHits}`);
  };

  scrollDown();
};

export { renderImages };

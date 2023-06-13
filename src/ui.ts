import { Photos } from 'unsplash-js/dist/methods/search/types/response';
import { addSearch, getSearch } from './search_storage';

const container = document.querySelector('.main__section') as HTMLElement;

const renderPhoto = (photos: Photos) => {
  clear();
  const element = document.getElementsByTagName('template')[0];
  const template = element.content;
  const card = template.querySelector('.template__card') as HTMLDivElement;

  photos.results.slice(0, 9).forEach(photo => {
    const cardClone = card.cloneNode(true) as HTMLDivElement;
    const img = cardClone.querySelector('.card__img') as HTMLImageElement;
    const author = cardClone.querySelector('.card__author') as HTMLSpanElement;
    img.src = photo.urls.small;
    if (photo.alt_description) {
      img.setAttribute('alt', photo.alt_description);
    }
    author.textContent = photo.user.name;
    container.append(img, author);
  });
};

const renderSearch = () => {
  const data = getSearch();
  // const div = document.querySelector('.input-border__search-history') as HTMLDivElement;
  // div.classList.remove('hidden');
  if (data.length > 0) {
    const el = document.querySelector(
      '.search-history__list'
    ) as HTMLUListElement;
    const content = data.map(item => `<li>${item}</li>`).join('');
    el.innerHTML = content;
    return;
  }
  // div.classList.add("hidden");
};

const clear = () => {
  while (container.lastChild) {
    container.lastChild.remove();
  }
};

export { renderPhoto, renderSearch };

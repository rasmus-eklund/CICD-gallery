import { Photos } from "unsplash-js/dist/methods/search/types/response";

const container = document.querySelector('.main__section') as HTMLElement;

const render = (photos: Photos) => {
  clear();
  const element = document.getElementsByTagName('template')[0];
  const template = element.content;
  const card = template.querySelector('.template__card') as HTMLDivElement;

  photos.results.slice(0,9).forEach(photo => {
    const cardClone = card.cloneNode(true) as HTMLDivElement;
    const img = cardClone.querySelector('.card__img') as HTMLImageElement;
    const author = cardClone.querySelector('.card__author') as HTMLSpanElement;
    img.src = photo.urls.small;
    if(photo.alt_description){
      img.setAttribute('alt', photo.alt_description);
    }
    author.textContent = photo.user.name;
    container.append(img, author);
  });
};

const clear = () => {
  while (container.lastChild) {
    container.lastChild.remove();
  }
};

export { render };

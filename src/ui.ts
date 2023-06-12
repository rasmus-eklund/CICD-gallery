import { Photos } from "unsplash-js/dist/methods/search/types/response";
import { Basic } from "unsplash-js/dist/methods/users/types";

const container = document.querySelector('.main__section') as HTMLElement;

const render = (photos: Photos[]) => {
  clear();
  const element = document.querySelector('template') as HTMLTemplateElement;
  const template = element.content;
  const card = template.querySelector('.template__card') as HTMLDivElement;

  photos.forEach(photo => {
    const cardClone = card.cloneNode(true) as HTMLDivElement;
    const img = cardClone.querySelector('.card__img') as HTMLImageElement;
    const author = cardClone.querySelector('.card__author') as HTMLSpanElement;
    img.src = photo.urls.small;
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

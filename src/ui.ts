import { type Photos } from 'unsplash-js/dist/methods/search/types/response'
import { getSearch } from './search_storage'

const container = document.querySelector('.main__section') as HTMLElement

const renderPhoto = (photos: Photos): void => {
  clear()
  const element = document.getElementsByTagName('template')[0]
  const template = element.content
  const cardTemplate = template.querySelector(
    '.section__card'
  ) as HTMLDivElement

  photos.results.slice(0, 9).forEach(photo => {
    const card = cardTemplate.cloneNode(true) as HTMLDivElement
    const img = card.querySelector('.inner__front') as HTMLImageElement
    const author = card.querySelector('.card__author') as HTMLSpanElement
    const backP = card.querySelector(
      '.back__description'
    ) as HTMLParagraphElement
    img.src = photo.urls.small
    if (photo.alt_description !== null) {
      img.setAttribute('alt', photo.alt_description)
    }
    backP.textContent = photo.description
    author.textContent = photo.user.name
    container.append(card)
  })
}

const renderSearch = (): void => {
  const data = getSearch()
  if (data.length > 0) {
    const el = document.querySelector(
      '.search-history__list'
    ) as HTMLUListElement
    const content = data
      .map(item => `<li class="list__item">${item}</li>`)
      .join('')
    el.innerHTML = content
  }
}

const clear = (): void => {
  while (container.lastChild != null) {
    container.lastChild.remove()
  }
}

export { renderPhoto, renderSearch }

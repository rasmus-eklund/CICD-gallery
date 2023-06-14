import './style.css'
import { fetchImage } from './fetcher.ts'
import { renderPhoto, renderSearch } from './ui.ts'
import { addSearch } from './search_storage'
import searchLogo from './searchLogo.svg'
import { type State } from './vite-env'

// This gets the DOM elements.
const searchDropDown = document.querySelector(
  '.input-border__search-history'
) as HTMLDivElement

const input = document.querySelector(
  '.input-border__input'
) as HTMLInputElement

const image = document.querySelector('.input-border__img') as HTMLImageElement

image.src = searchLogo // This sets the image to the search logo (magnifying glass).

// This adds the state to the history of browsing history (states) && renders them (renderPhoto).
const updateState = (newState: State): void => {
  window.history.pushState(
    newState,
    'HISTORY',
    `index.html#${newState.search}`
  )
  renderPhoto(newState.data)
}

// This inserts a previous search into the search box when clicked.
const insertSearchItem = (item: string): void => {
  console.log('clicked!')
  input.value = item
};

// This adds insertSearchItem (above function) to the window.
(window as any).insertSearchItem = insertSearchItem

// This is fired when you return or go forward in the browser & renders the selected state to the DOM.
window.addEventListener('popstate', () => {
  const state = window.history.state
  renderPhoto(state.data)
  input.value = state.search
})

// This renders the page when you first open it. The initial search value is "cat"
document.addEventListener('DOMContentLoaded', _ev => {
  fetchImage('cat')
    .then(result => {
      updateState({
        data: result,
        search: 'cat'
      })
    })
    .catch(error => {
      console.log(error.message)
    })
})

// This performs a search when you press enter. && Renders the result.
input.addEventListener('keydown', ev => {
  if (ev.key === 'Enter') {
    fetchImage(input.value)
      .then(result => {
        updateState({ data: result, search: input.value })
        addSearch(input.value)
        renderSearch()
      })
      .catch(error => {
        console.log(error.message)
      })
  }
})

// This makes the dropdown of previous searches appear when the search input is selected. (Clicked)
input.addEventListener('focus', _ev => {
  renderSearch()
  searchDropDown.classList.remove('hidden')
})

// This removes the above eventlistener when something else outside of the dropdown is clicked.
input.addEventListener('blur', _ev => {
  searchDropDown.classList.add('hidden')
})

console.log('Test push')
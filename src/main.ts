import './style.css'
import { fetchImage } from './fetcher.ts'
import { renderPhoto, renderSearch } from './ui.ts'
import { addSearch } from './search_storage'

const searchDropDown = document.querySelector(
  '.input-border__search-history'
) as HTMLDivElement

const input = document.querySelector(
  '.input-border__input'
) as HTMLInputElement

document.addEventListener('DOMContentLoaded', _ev => {
  fetchImage('cat')
    .then(result => {
      renderPhoto(result)
    })
    .catch(error => {
      console.log(error.message)
    })
})

input.addEventListener('keydown', ev => {
  if (ev.key === 'Enter') {
    fetchImage(input.value)
      .then(result => {
        renderPhoto(result)
        addSearch(input.value)
        renderSearch()
      })
      .catch(error => { console.log(error.message) })
  }
})

input.addEventListener('focus', _ev => {
  renderSearch()
  searchDropDown.classList.remove('hidden')
})

input.addEventListener('blur', _ev => {
  searchDropDown.classList.add('hidden')
})

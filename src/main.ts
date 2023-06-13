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

document.addEventListener('DOMContentLoaded', async _ev => {
  const photos = await fetchImage('cat')
  if (photos != null) {
    renderPhoto(photos)
  }
})

input.addEventListener('keydown', async ev => {
  if (ev.key === 'Enter') {
    const result = await fetchImage(input.value)
    if (result != null) {
      renderPhoto(result)
      renderSearch()
      addSearch(input.value)
    }
  }
})

input.addEventListener('focus', _ev => {
  renderSearch()
  searchDropDown.classList.remove('hidden')
})

input.addEventListener('blur', _ev => {
  searchDropDown.classList.add('hidden')
})

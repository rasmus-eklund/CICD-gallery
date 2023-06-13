import './style.css';
import { fetchImage } from './fetcher.ts';
import { renderPhoto, renderSearch } from './ui.ts';
import { addSearch } from './search_storage';

const searchDropDown = document.querySelector(
  '.input-border__search-history'
) as HTMLDivElement;

const input = document.querySelector(
  '.input-border__input'
) as HTMLInputElement;

document.addEventListener('DOMContentLoaded', async _ev => {
  const result = await fetchImage('cat');
  if (result) {
    renderPhoto(result);
  }
});

input.addEventListener('keydown', async ev => {
  if (ev.key === 'Enter') {
    const result = await fetchImage(input.value);
    if (result) {
      renderPhoto(result);
      renderSearch();
      addSearch(input.value);
    }
  }
});

input.addEventListener('focus', _ev => {
  renderSearch();
  searchDropDown.classList.remove('hidden');
});

input.addEventListener('blur', _ev => {
  searchDropDown.classList.add('hidden');
});

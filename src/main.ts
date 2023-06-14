import './style.css';
import { fetchImage } from './fetcher.ts';
import { renderPhoto, renderSearch } from './ui.ts';
import { addSearch } from './search_storage';
import { Photos } from 'unsplash-js/dist/methods/search/types/response';
import searchLogo from './searchLogo.svg';

const image = document.querySelector('.input-border__img') as HTMLImageElement;
image.src = searchLogo;
type State = {
  data: Photos;
  search: string;
};

const updateState = (newState: State) => {
  window.history.pushState(
    newState,
    'HISTORY',
    `index.html#${newState.search}`
  );
  renderPhoto(newState.data);
};

window.addEventListener('popstate', () => {
  const state = window.history.state;
  renderPhoto(state.data);
  input.value = state.search;
});

const searchDropDown = document.querySelector(
  '.input-border__search-history'
) as HTMLDivElement;

const input = document.querySelector(
  '.input-border__input'
) as HTMLInputElement;

const insertSearchItem = (item: string) => {
  console.log('clicked!');
  input.value = item;
};
(window as any).insertSearchItem = insertSearchItem;

document.addEventListener('DOMContentLoaded', _ev => {
  fetchImage('cat')
    .then(result => {
      updateState({
        data: result,
        search: 'cat',
      });
    })
    .catch(error => {
      console.log(error.message);
    });
});

input.addEventListener('keydown', ev => {
  if (ev.key === 'Enter') {
    fetchImage(input.value)
      .then(result => {
        updateState({ data: result, search: input.value });
        addSearch(input.value);
        renderSearch();
      })
      .catch(error => {
        console.log(error.message);
      });
  }
});

input.addEventListener('focus', _ev => {
  renderSearch();
  searchDropDown.classList.remove('hidden');
});

input.addEventListener('blur', _ev => {
  searchDropDown.classList.add('hidden');
});

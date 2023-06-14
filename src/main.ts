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

let state: State;

const update = (newState: State) => {
  state = newState;
  window.history.pushState(state, 'HISTORY', `index.html#${state.search}`);
  window.dispatchEvent(new Event('statechange'));
};

window.addEventListener('popstate', () => {
  state = window.history.state;
  update(state);
  console.log(`Updated state ${state.search}`);
});

window.addEventListener('statechange', () => {
  renderPhoto(state.data);
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
      state = {
        data: result,
        search: 'cat',
      };
      update(state);
      // renderPhoto(result);
    })
    .catch(error => {
      console.log(error.message);
    });
});

input.addEventListener('keydown', ev => {
  if (ev.key === 'Enter') {
    fetchImage(input.value)
      .then(result => {
        state = { data: result, search: input.value };
        update(state);
        // renderPhoto(result);
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

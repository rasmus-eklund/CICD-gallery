import './style.css';
import { fetchImage } from './fetcher.ts';
import { renderPhoto, renderSearch } from './ui.ts';
import { addSearch } from './search_storage';
import { Photos } from 'unsplash-js/dist/methods/search/types/response';

type State = {
  data: Photos;
  count: number;
};

let state: State;

const update = (newState: State) => {
  state = newState;
  window.history.pushState(state, 'HISTORY', `index.html#${state.count}`);
  window.dispatchEvent(new Event('statechange'));
};

window.addEventListener('popstate', () => {
  update(window.history.state);
  console.log('updated!!!!!!!');
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

document.addEventListener('DOMContentLoaded', _ev => {
  fetchImage('cat')
    .then(result => {
      state = {
        data: result,
        count: state ? state.count + 1 : 1,
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
        state = { data: result, count: state.count + 1 };
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

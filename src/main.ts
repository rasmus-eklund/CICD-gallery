import './style.css';
import { fetchImage } from './fetcher.ts';
import { render } from './ui.ts';

const input = document.querySelector(
  '.input-border__input'
) as HTMLInputElement;

document.addEventListener('DOMContentLoaded', async _ev => {
  const result = await fetchImage('cat');
  if (result) {
    const photos = result.results.slice(0, 9);
    console.log(photos);
    // render(photos);
  }
});

input.addEventListener('keydown', async ev => {
  if (ev.key === 'Enter') {
    const result = await fetchImage(input.value);
    if (result) {
      const photos = result.results.slice(0, 9);
      console.log(photos);
      console.log(typeof photos[0]);
    }
  }
});

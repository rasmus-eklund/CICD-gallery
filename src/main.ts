import './style.css';
import { fetchImage } from './fetcher.ts';
import { render } from './ui.ts';

const input = document.querySelector(
  '.input-border__input'
) as HTMLInputElement;

document.addEventListener('DOMContentLoaded', async _ev => {
  const result = await fetchImage('cat');
  if (result) {
    render(result);
  }
});

input.addEventListener('keydown', async ev => {
  if (ev.key === 'Enter') {
    const result = await fetchImage(input.value);
    if (result) {
      render(result)
    }
  }
});

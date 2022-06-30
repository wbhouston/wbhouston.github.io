import { readable } from 'svelte/store';

export const access_token = readable(null, function start(set) {
  let match = (window.location.hash) ?
    window.location.hash.match(/#access_token=([^&]+)/) :
    false;

  if(match[1]) {
    set(match[1]);
  } else {
    set(null);
  }

  return function stop() {};
});

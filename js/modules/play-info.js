import Playlist from './playlist.js';

const PlayInfo = (_ => {

    const states = {
        songsLength: 0,
        isPlaying: false
    };
    
    // caching the dom

    const playerCountEl = document.querySelector(".player-count");
    const playerTriggerEl = document.querySelector(".player-trigger");


    const listeners = _ => {
        playerTriggerEl.addEventListener("click", _ => {
            // 1. change isPlaying property
            states.isPlaying = states.isPlaying ? false : true;
            // 2. Render it
            render();
            // 3. Toggle the play pause functionaity in the playlist.fa-js
            Playlist.flip();
        })
    }

    const init = _ => {
        render();
        listeners();
    };

    const setState = obj => {
        states.songsLength = obj.songsLength;
        states.isPlaying = obj.isPlaying;
        render();
    }

    const render = _ => {
        playerCountEl.innerHTML = states.songsLength;
        playerTriggerEl.innerHTML = states.isPlaying ? 'Pause' : 'Play';
    }

    return {
        init,
        setState
    }
})();

export default PlayInfo;
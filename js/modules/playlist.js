import { songsList } from '../data/songs.js';
import PlayInfo from '../modules/play-info.js';
import TrackBar from './track-bar.js';

const Playlist = (_ => {
    // States   
    let songs = songsList;
    let currentlyPlayingIndex = 0;
    let currentSong = new Audio(songs[currentlyPlayingIndex].url);
    let isPlaying = false;
    // Caching the DOM


    const playlistEl = document.querySelector(".playlist");

    const init = _ => {
       render();
       listeners();
       PlayInfo.setState({
           songsLength: songs.length,
           isPlaying: !currentSong.paused
       })
    }

    const flip = _ => {
        togglePlayPause();
        render();
    }

    const changeAudioSource = _ => {
        currentSong.src = songs[currentlyPlayingIndex].url;
    }

    const togglePlayPause = _ => {
        return currentSong.paused ? currentSong.play() : currentSong.pause();
    }

    const nextSong = _ => {
        if (songs[currentlyPlayingIndex + 1]) {
            currentlyPlayingIndex++;
            changeAudioSource();
            togglePlayPause();
            render();
         }  else {
            songs[currentlyPlayingIndex = 0];
            changeAudioSource();
            togglePlayPause();
            render();
        }
    }

    const mainPlay = clickedIndex => {
        if (currentlyPlayingIndex === clickedIndex){
            togglePlayPause();
            //toggle play payuse
        } else {
            currentlyPlayingIndex = clickedIndex;
            changeAudioSource();
            togglePlayPause();
        }
        PlayInfo.setState({
            songsLength: songs.length,
            isPlaying: !currentSong.paused
        })
    }

    const listeners = _ => {
        // 1. Get index of LI Tag
        // 2. Change current playing index to index of LI fa-tag
        // 3. Play or pause 
        // 4. After changing current playing index, then change song source
        playlistEl.addEventListener("click", event => {
            if (event.target && event.target.matches(".playlist-song")){
                const listElem = event.target;
                const listElemIndex = [...listElem.parentElement.children].indexOf(listElem);
                mainPlay(listElemIndex);
                render();
            }
        });

        currentSong.addEventListener("timeupdate", _ => {
            TrackBar.setState(currentSong);
        })

        currentSong.addEventListener("ended", _ => {
            nextSong();
        });
    }

    const toggleIcon = itemindex => {
        if (currentlyPlayingIndex === itemindex) {
            return currentSong.paused ? 'fa-play' : 'fa-pause';
        } else {
            return 'fa-play';
        }
    }

    const render = _ => {
        let markup = '';

        songs.forEach((songObj, index) => {
            markup += `
            <li class="playlist-song ${index === currentlyPlayingIndex ? 'playlist-song-active' : ''}">
            <div class="play-pause">
              <i class="fa ${toggleIcon(index)} pp-icon"></i>
            </div>
            <div class="playlist-song-details">
              <span class="playlist-song-name">${songObj.title}</span>
              <br>
              <span class="playlist-song-artist">${songObj.artist}</span>
            </div>
            <div class="playlist-song-duration">
              ${songObj.time}
            </div> 
          </li>
            `;
        })

        playlistEl.innerHTML = markup;
    }

    return {
        init,
        flip
    }
})();

export default Playlist;
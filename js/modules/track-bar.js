
const TrackBar = (_ => {

    const state = {
        currentTrackTime: 0,
        fullTrackTime: 0,
        fillWidth: 0
    }

    const trackBarFillEL = document.querySelector(".track-bar-fill");


    const init = _ => {
        render();
    }

    const render = _ => {
        trackBarFillEL.style.width = `${state.fillWidth}%`
    }

    const getPercentage = (current, duration) => {
        return (current/duration) * 100;
    }

    const setState = obj => {
        state.currentTrackTime = obj.currentTime;
        state.fullTrackTime = obj.duration;
        state.fillWidth = getPercentage(state.currentTrackTime, state.fullTrackTime);
        render();
    }

    return {
        init,
        setState
    }
})();

export default TrackBar;
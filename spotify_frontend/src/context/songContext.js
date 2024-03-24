import {createContext} from "react";

const songContext = createContext({
    currentSong: null,
    setCurrentSong: (currentSong) => {},
    soundPlayed: null,
    setSoundPlayed: () => {},
    isPaused: null,
    setIsPaused: () => {},
    isLiked: false,
});

export default songContext;

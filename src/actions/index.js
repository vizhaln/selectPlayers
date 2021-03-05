import data from '../players.json';

export const defaultPlayer = () => {
    return {
        type: "DEFAULTPLAYER",
        payload: data,
    }
};

export const selectedPlayer = (list) => {
    return {
        type: "SELECTEDPLAYER",
        payload: list
    }
};
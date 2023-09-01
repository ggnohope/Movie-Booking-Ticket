let currUser = null;

export const getCurrUser = () => currUser;

export const setCurrUser = (newUser) => {
    currUser = newUser;
};

let currNowPlayingMoviesList = null;

export const getCurrNowPlayingMoviesList = () => currNowPlayingMoviesList;

export const setCurrNowPlayingMoviesList = (newCurrNowPlayingMoviesList) => {
    currNowPlayingMoviesList = newCurrNowPlayingMoviesList;
};
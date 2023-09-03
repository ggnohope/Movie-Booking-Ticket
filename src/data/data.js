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
export const user = [{ 
    id: 1,
    name: 'To Phuoc Hung',
    phone: '84 982123423',
    email: 'tphung21@gmail.com',
    address: '325 Nguyen Duc Manh',
}]
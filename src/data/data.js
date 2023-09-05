let currUser = null;

export const getCurrUser = () => currUser;

export const setCurrUser = (newUser) => {
    currUser = newUser;
};

let currNowShowingMoviesList = null;

export const getCurrNowShowingMoviesList = () => currNowShowingMoviesList;

export const setCurrNowShowingMoviesList = (newCurrNowShowingMoviesList) => {
    currNowShowingMoviesList = newCurrNowShowingMoviesList;
};
export const user = [{
    id: 1,
    name: 'To Phuoc Hung',
    phone: '84 982123423',
    email: 'tphung21@gmail.com',
    address: '325 Nguyen Duc Manh',
    balance: 192000,
}]

export const TicketBooked = [
    {
        id: 1,
        imgPath: 'https://image.tmdb.org/t/p/w780/4Y1WNkd88JXmGfhtWR7dmDAo1T2.jpg',
        title: 'Elemental',
        date: new Date(2023,9,10,13,30),
        position: {hall: 2, row: 3, seat: '20, 21'},
    },
    {
        id: 2,
        imgPath: 'https://image.tmdb.org/t/p/w780/drCySAAAvegq1vQRGRqPKN9f00w.jpg?fbclid=IwAR0jXzGZnEFLCjGPOTmMPKzen1V2GSyFXVQPoGxJGjUaTldfzRcoESPDZsw',
        title: 'Meg 2: The Trench',
        date: new Date(2023,9,12,12,30),
        position: {hall: 1, row: 5, seat: '12, 13'},
    },
    {
        id: 3,
        imgPath: 'https://image.tmdb.org/t/p/w780/nrtbv6Cew7qC7k9GsYSf5uSmuKh.jpg',
        title: 'The Last Voyage of the Demeter',
        date: new Date(2023,9,14,7,45),
        position: {hall: 3, row: 2, seat: '5, 6, 7'},
    }
]
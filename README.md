# usePopcorn - Movie Management App

usePopcorn is a movie management app built using React. It allows users to search for movies, view movie details, and manage their watched movie list.


## Features

- **Search for Movies**: Use the search bar to find movies by title.
- **View Movie Details**: Get detailed information about each movie, including title, year, runtime, IMDb rating, genres, and a movie poster.
- **Watched Movies List**: Add movies to your "watched" list and keep track of your movie-watching history.
- **Delete Movies from Watched List**: Easily remove movies from the watched list when you're done.


## Live Demo

Check out the live demo of the app on [Netlify](https://usepopcorn-chichizhang.netlify.app/).


## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/usePopcorn.git
   ```
2. Navigate to the project folder:
   ```bash
   cd usePopcorn
   ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Run the application:
   ```bash
   npm start
   ```
5. Open your browser and go to http://localhost:3000 to view the app.


## How It Works

- The app fetches movie data from The Movie Database (TMDb) API.
- The app allows users to search for movies, view movie details, and add movies to a watched list.
- The watched list is stored in the component state and can be deleted or cleared as needed.


## Technologies Used

- React (v18)
- React Hooks (useState, useEffect)
- TMDb API (for movie data)
- CSS Modules for styling


## License

This project is licensed under the MIT License - see the LICENSE file for details.

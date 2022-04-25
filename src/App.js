import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Header from './pages/components/Header';
import { getFavoriteSongs, removeSong, addSong } from './services/favoriteSongsAPI';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      // favoriteSongs: [],
    };
  }

  componentDidMount = async () => {
    const favoriteSongs = await getFavoriteSongs();
    favoriteSongs.forEach((song) => {
      this.setState((prevState) => ({
        isLoading: false,
        // favoriteSongs: [...prevState.favoriteSongs, song],
      }));
    });
  }

  updateFavoriteSongs = async (event) => {
    const favoriteSongs = await getFavoriteSongs();
    this.setState(({
      isLoading: false,
      // favoriteSongs: [favoriteSongs],
    }));

    const clickedSong = favoriteSongs
      .find((music) => music.trackId === parseInt(event.target.id, 10));
    this.setState({
      isLoading: true,
    });
    if (clickedSong) {
      await this.removeFavoriteSong(clickedSong);
    }
    // } else {
    //   await this.saveFavoriteSong(musicToSave);
    // }
  }

  saveFavoriteSong = async (song) => {
    await addSong(song);
    // const songs = await getFavoriteSongs();
    this.setState({
      isLoading: false,
      // favoriteSongs: songs,
    });
  }

  removeFavoriteSong = async (song) => {
    await removeSong(song);
    const songs = await getFavoriteSongs();
    this.setState({
      isLoading: false,
      // favoriteSongs: songs,
    });
  }

  render() {
    const { favoriteSongs, isLoading } = this.state;
    return (
      <BrowserRouter>
        <Switch>

          <Route exact path="/">
            <Login />
          </Route>

          <Route exact path="/search">
            <Header />
            <Search />
          </Route>

          <Route
            exact
            path="/album/:id"
            render={ (props) => (
              <>
                <Header />
                <Album
                  { ...props }
                  saveFavoriteSong={ this.saveFavoriteSong }
                  removeFavoriteSong={ this.removeFavoriteSong }
                  updateFavoriteSongs={ this.updateFavoriteSongs }
                  favoriteSongs={ favoriteSongs }
                  isLoading={ isLoading }
                />
              </>) }
          />

          <Route exact path="/favorites">
            <Header />
            <Favorites
              removeFavoriteSong={ this.removeFavoriteSong }
              updateFavoriteSongs={ this.updateFavoriteSongs }
              favoriteSongs={ favoriteSongs }
              isLoading={ isLoading }
              getFavoriteSongsFromStorage={ this.getFavoriteSongsFromStorage }
            />
          </Route>

          <Route exact path="/profile">
            <Header />
            <Profile />
          </Route>

          <Route exact path="/profile/edit">
            <Header />
            <ProfileEdit />
          </Route>

          <Route exact path="*">
            <NotFound />
          </Route>

        </Switch>
      </BrowserRouter>

    );
  }
}

export default App;

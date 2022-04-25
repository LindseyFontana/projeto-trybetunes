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
    };
  }

  componentDidMount = async () => {
    const favoriteSongs = await getFavoriteSongs();
    favoriteSongs.forEach((song) => {
      this.setState((prevState) => ({
        isLoading: false,
      }));
    });
  }

  updateFavoriteSongs = async (event, musicToSave) => {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      isLoading: true,
    });
    if (favoriteSongs) {
      const clickedSong = favoriteSongs
        .find((music) => music.trackId === parseInt(event.target.id, 10));
      this.setState({
        isLoading: false,
      });
      if (clickedSong) {
        await this.removeFavoriteSong(clickedSong);
      } else {
        await this.saveFavoriteSong(musicToSave);
      }
    } else {
      await this.saveFavoriteSong(musicToSave);
    }
  }

  saveFavoriteSong = async (song) => {
    await addSong(song);
    this.setState({
      isLoading: false,
    });
  }

  removeFavoriteSong = async (song) => {
    await removeSong(song);
    this.setState({
      isLoading: false,
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
                  updateFavoriteSongs={ this.updateFavoriteSongs }
                  isLoading={ isLoading }
                />
              </>) }
          />

          <Route exact path="/favorites">
            <Header />
            <Favorites
              updateFavoriteSongs={ this.updateFavoriteSongs }
              isLoading={ isLoading }
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

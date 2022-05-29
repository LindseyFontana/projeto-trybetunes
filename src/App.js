import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Header from './pages/components/Header';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Provider from './contextAPI/Provider';
import Search from './pages/Search';
import { addSong, getFavoriteSongs, removeSong } from './services/favoriteSongsAPI';

const maxNumberCharacteres = 20;
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      favoriteSongs: [],
    };
  }

  async componentDidMount() {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favoriteSongs,
    });
  }

  reduceAlbumName = (albumName) => {
    const newAlbumName = albumName.slice(0, maxNumberCharacteres);
    return `${newAlbumName}...`;
  }

  updateFavoriteSongs = async (event, musicToSave) => {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      isLoading: true,
      favoriteSongs,
    });

    if (favoriteSongs) {
      const clickedSong = favoriteSongs
        .find((music) => music.trackId === parseInt(event.target.id, 10));

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
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      isLoading: false,
      favoriteSongs,
    });
  }

  removeFavoriteSong = async (song) => {
    await removeSong(song);
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      isLoading: false,
      favoriteSongs,
    });
  }

  render() {
    const { favoriteSongs, isLoading } = this.state;

    return (
      <BrowserRouter>
        <Provider>
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
                    favoriteSongs={ favoriteSongs }
                    isLoading={ isLoading }
                    reduceAlbumName={ this.reduceAlbumName }
                  />
                </>
              ) }
            />

            <Route exact path="/favorites">
              <>
                <Header />
                <Favorites
                  updateFavoriteSongs={ this.updateFavoriteSongs }
                  favoriteSongs={ favoriteSongs }
                  isLoading={ isLoading }
                  reduceAlbumName={ this.reduceAlbumName }
                />
              </>
            </Route>

            <Route
              exact
              path="/profile"
              render={ (props) => (
                <>
                  <Header />
                  <Profile { ...props } />
                </>
              ) }
            />

            <Route
              exact
              path="/profile/edit"
              render={ (props) => (
                <>
                  <Header />
                  <ProfileEdit handleHeader={ this.handleHeader } { ...props } />
                </>
              ) }
            />
            <Route exact path="*">
              <NotFound />
            </Route>

          </Switch>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;

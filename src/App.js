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

class App extends React.Component {
  render() {
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
                <Album { ...props } />
              </>) }
          />

          <Route exact path="/favorites">
            <Header />
            <Favorites />
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

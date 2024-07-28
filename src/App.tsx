import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Provider } from 'react-redux';
import { store } from './data/redux/store';
import { Route, Router, Routes } from 'react-router-dom';
import BackdropComponent from './views/components/BackdropComponent';
import NavbarComponent from './views/components/NavbarComponent';
import LandingScreen from './views/screens/LandingScreen';
import { createBrowserHistory } from 'history'; // Import createBrowserHistory from 'history' package
import AboutMeScreen from './views/screens/AboutMeScreen';
import ContactScreen from './views/screens/ContactScreen';
import MyWorkScreen from './views/screens/MyWorkScreen';

function App() {
  const history = createBrowserHistory(); // Create browser history

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);


  return (
    <Provider store={store}>
      <Router location={history.location} navigator={history}>
        <BackdropComponent />
        <NavbarComponent />

        <Routes>
          <Route path="/" element={<LandingScreen />} />
          <Route path="/aboutMe" element={<AboutMeScreen />} />
          <Route path="/contact" element={<ContactScreen />} />
          <Route path="/myWork" element={<MyWorkScreen />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './data/redux/store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use BrowserRouter directly
import BackdropComponent from './views/components/BackdropComponent';
import NavbarComponent from './views/components/NavbarComponent';
import LandingScreen from './views/screens/LandingScreen';
import AboutMeScreen from './views/screens/AboutMeScreen';
import ContactScreen from './views/screens/ContactScreen';
import MyWorkScreen from './views/screens/MyWorkScreen';
import AuthScreen from './views/screens/AuthScreen';
import CreatePostScreen from './views/screens/CreatePostScreen';
import PostScreen from './views/screens/PostScreen';
import EditPostScreen from './views/screens/EditPostScreen';
import './App.css';

function App() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <BackdropComponent />
        <NavbarComponent />

        <Routes>
          <Route path="/" element={<LandingScreen />} />
          <Route path="/aboutMe" element={<AboutMeScreen />} />
          <Route path="/contact" element={<ContactScreen />} />
          <Route path="/myWork" element={<MyWorkScreen />} />

          <Route path="/auth" element={<AuthScreen />} />
          <Route path="/createPost" element={<CreatePostScreen />} />
          <Route path="/post/:post" element={<PostScreen />} />
          <Route path="/post/:post/edit" element={<EditPostScreen />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;

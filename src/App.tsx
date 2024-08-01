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
import Text from './views/components/Text';
import Me1Component from './views/components/Me1Component';
import MyNameComponent from './views/components/MyNameComponent';
import Me2Component from './views/components/Me2Component';
import BusinessCardComponent from './views/components/BusinessCardComponent';

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
        <MyNameComponent />
        <Me1Component />
        <Me2Component />
        <BusinessCardComponent />
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

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './data/redux/store';
import { BrowserRouter as Router, Route, Routes, HashRouter } from 'react-router-dom'; // Use BrowserRouter directly
import BackdropComponent from './views/components/BackdropComponent';
import NavbarComponent from './views/components/NavbarComponent';
import LandingScreen from './views/screens/LandingScreen';
import AboutScreen from './views/screens/AboutScreen';
import ContactScreen from './views/screens/ContactScreen';
import AuthScreen from './views/screens/AuthScreen';
import CreatePostScreen from './views/screens/CreatePostScreen';
import PostScreen from './views/screens/PostScreen';
import EditPostScreen from './views/screens/EditPostScreen';
import './App.css';
import Me1Component from './views/components/Me1Component';
import MyNameComponent from './views/components/MyNameComponent';
import Me2Component from './views/components/Me2Component';
import BusinessCardComponent from './views/components/BusinessCardComponent';
import WorkScreen from './views/screens/WorkScreen';

function App() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  return (
    <Provider store={store}>
      <HashRouter>
        <BackdropComponent />
        <MyNameComponent />
        <Me1Component />
        <Me2Component />
        <BusinessCardComponent />
        <NavbarComponent />

        <Routes>
          <Route path="/" element={<LandingScreen />} />
          <Route path="/about" element={<AboutScreen />} />
          <Route path="/contact" element={<ContactScreen />} />
          <Route path="/work" element={<WorkScreen />} />

          {/* <Route path="/auth" element={<AuthScreen />} />
          <Route path="/createPost" element={<CreatePostScreen />} />
          <Route path="/post/:post" element={<PostScreen />} />
          <Route path="/post/:post/edit" element={<EditPostScreen />} /> */}
        </Routes>
      </HashRouter>
    </Provider>
  );
}

export default App;

import React from 'react';
import HeaderComponent from './Component/HeaderComponent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';  // Sử dụng Switch thay vì Routes
import HomePage from './Page/HomePage';
import MatchCVPage from './Page/MatchCVPage';
import AboutPage from './Page/AboutPage';
import { ROUTES } from './util/ROUTES';
import FooterComponent from './Component/FooterComponent';
import LoginPage from './Page/LoginPage';
import ProfilePage from './Page/ProfilePage';
import RegisterPage from './Page/RegisterPage';

export const App = () => {
  const handleLoginSuccess = () => {
    window.location.href = ROUTES.HOME; // Chuyển hướng sau đăng nhập
  };
  const handleRegisterSuccess = () => {
    window.location.href = ROUTES.LOGIN; // Chuyển hướng sau đăng nhập
  };

  return (
    <Router>
      <HeaderComponent />
      <div style={{ marginTop: '105px', minHeight: '80vh'}}>
        <Switch> 
          <Route path={ROUTES.HOME} exact component={HomePage} />
          <Route path={ROUTES.MATCH_CV_JD} exact component={MatchCVPage} />
          <Route path={ROUTES.ABOUT} exact component={AboutPage} />
          <Route path="/login" exact render={() => <LoginPage onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/profile" exact component={ProfilePage} />
          <Route path="/register" exact render={() => <RegisterPage onRegisterSuccess={handleRegisterSuccess} />} />
        </Switch>
      </div>
      <FooterComponent />
    </Router>
  );
}

export default App;

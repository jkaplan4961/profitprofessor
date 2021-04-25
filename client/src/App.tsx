import React from 'react';
import './App.css';
import { Switch , Route, BrowserRouter as Router } from 'react-router-dom';
import Home from "./Pages/Home";
import SignUpForm  from './Components/SignUpForm';
import { TokenProvider } from './Context/TokenContext';
import NewMarketPlaceForm from './Components/NewMarketPlaceForm'



function App() {
  return (
    <TokenProvider>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/"component={Home}/>
            <Route exact path="/Signup"component={SignUpForm}/>
            <Route exact path="/Marketplace/Create"component={NewMarketPlaceForm}/>

          </Switch>
        </Router>
      </div>
    </TokenProvider>
  );
}

export default App;
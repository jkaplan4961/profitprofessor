import React from 'react';
import './App.css';
import { Switch , Route, BrowserRouter as Router, RouteComponentProps } from 'react-router-dom';
// import Home from "./Components/Home";
import ViewMarketplaces from "./Components/ViewMarketplaces";
import ViewProducts from "./Components/ViewProducts";
import ViewVendors from "./Components/ViewVendors";
import SignUpForm  from './Components/SignUpForm';
import NavBar  from './Components/NavBar';
import LoginForm  from './Components/LoginForm';
import { TokenProvider } from './Context/TokenContext';
import NewMarketPlaceForm from './Components/NewMarketPlaceForm'
import NewProductForm from './Components/NewProductForm'
import NewVendorForm from './Components/NewVendorForm'

interface MatchParams {
  vendorId: string;
  marketplaceId: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {
}

function App() {
  return (
    <TokenProvider>
      <div className="App">
        <NavBar/> 
        <Router>
          <Switch>
            {/* <Route exact path="/"component={}/> */}
            <Route exact path="/marketplaces"component={ViewMarketplaces}/>
            <Route path="/products/:vendorId/:marketplaceId" render={({match} : MatchProps) => (<ViewProducts vendorIdParam={match.params.vendorId} marketplaceIdParam={match.params.marketplaceId} />)}/>
            <Route exact path="/vendors"component={ViewVendors}/>
            <Route exact path="/Signup"component={SignUpForm}/>
            <Route exact path="/Login"component={LoginForm}/>
            <Route exact path="/Marketplace/Create"component={NewMarketPlaceForm}/>
            <Route exact path="/Product/Create"component={NewProductForm}/>
            <Route exact path="/Vendor/Create"component={NewVendorForm}/>
          </Switch>
        </Router>
      </div>
    </TokenProvider>
  );
}

export default App;
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from './config/axios.config';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import BaseNavbar from "./components/BaseNavbar";
import Footer from "./components/Footer";
import Context from "./context/Context";

// Pages
import Index from "./pages";
import Cart from "./pages/cart";
import Login from "./pages/login";
import Shop from "./pages/shop";
import Signup from "./pages/signup";
import AdminLogin from "./pages/admin/login";
import PlantsList from "./pages/admin/list";
import PlantAdd from "./pages/admin/add";
import Order from "./pages/order";
import PlantEdit from "./pages/admin/edit";
import About from "./pages/about";
import Contact from "./pages/contact";

toast.configure();

function App() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios.get('/cart/items')
      .then(res => setCartItems(res.data.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <Context.Provider value={{cartItems, setCartItems}}>
      <div className="app">
        <Router>
          <BaseNavbar />
          <div className="container mb-5">
            <Switch>
              <Route exact path="/" component={Index} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/shop" component={Shop} />
              <Route path="/cart" component={Cart} />
              <Route path="/orders" component={Order} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/admin/login" component={AdminLogin} />
              <Route path="/admin/plants/edit/:id" component={PlantEdit} />
              <Route exact path="/admin/plants/add" component={PlantAdd} />
              <Route exact path="/admin/plants" component={PlantsList} />
            </Switch>
          </div>
          <Footer />
        </Router>
      </div>
    </Context.Provider>
  );
}

export default App;

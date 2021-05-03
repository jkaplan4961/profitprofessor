import { useState, useContext, useEffect } from 'react'
import "./style.css";
import { TokenContext } from "../Context/TokenContext";
import { Select, MenuItem } from '@material-ui/core';

interface PropTypes {
  userId: number;
  vendorId: number;
  marketplaceId: number;
}

type Vendor= {
  id: number;
  company: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string
}

type Marketplace= {
    id: number;
    name: string;
    commission: number;
    shipping_price: number;
    image: string;
}

export default function NewProductForm({ userId, vendorId, marketplaceId } : PropTypes) {
  const [token, setToken] = useContext(TokenContext)
  const[state,setState] = useState({
    name: "",
    description: "",
    price: "",
    manufacturer: "",
    upc: "",
    cost: "",
    part_num: "",
    shipping_cost: "",
    image: "",
    vendorId: vendorId,
    marketplaceId: marketplaceId
  })
  const[error,setError] = useState({
    name: "",
    description: "",
    price: "",
    manufacturer: "",
    upc: "",
    cost: "",
    part_num: "",
    shipping_cost: "",
    image: "",
    vendorId: "",
    marketplaceId: ""
  })
  const [ vendors, setVendors ] = useState([])
  const [ marketplaces, setMarketplaces ] = useState([])



  useEffect(() => {
      fetch("http://localhost:3001/vendor/",{
        method: "GET",
        headers: new Headers({
            "content-Type": "application/json",
            "Authorization": token,
        }),
      }).then(vendors => vendors.json())
          .then(data => {
            console.log(data)
              setVendors(data)
          })
      fetch("http://localhost:3001/marketplace/",{
        method: "GET",
        headers: new Headers({
            "content-Type": "application/json",
            "Authorization": token,
        }),
      }).then(marketplaces => marketplaces.json())
          .then(data => {
              setMarketplaces(data)
          })
  }, [])

    const handleChange = (event: any) => {
      event.preventDefault();
      const { name, value } = event.target;
      switch (name) {
        case "name":
            value.length < 3
                    ? setError({...error, name: "Product name must be at least 3 characters long!"}) 
                    : setError({...error, name: ""});
          break;
        case "description":
            value.length < 1
                    ? setError({...error,description:"Enter a description!"})
                    : setError({...error, description: ""});
          break;
        case "price":
                isNaN(value)
                    ? setError({...error, price: "Enter a price!"})
                    : setError({...error, price: ""});  
          break;
          case "manufacturer":
            value.length < 2
                    ? setError({...error, manufacturer: "Enter a manufacturer!"}) 
                    : setError({...error, manufacturer: ""});
          break;
          case "cost":
            isNaN(value)
                    ? setError({...error, cost: "Enter the cost!"}) 
                    : setError({...error, cost: ""});
          break;
          case "part_num":
            isNaN(value)
                    ? setError({...error, part_num: "Enter the cost!"}) 
                    : setError({...error, part_num: ""});
          break;
          case "shipping_cost":
            isNaN(value)
                    ? setError({...error, shipping_cost: "Enter the cost!"}) 
                    : setError({...error, shipping_cost: ""});
          break;
          case "vendorId":
            isNaN(value) || value < 1
                    ? setError({...error, shipping_cost: "Select a vendor"}) 
                    : setError({...error, shipping_cost: ""});
          break;
          case "marketplaceId":
            isNaN(value) || value < 1
                    ? setError({...error, shipping_cost: "Select a marketplace"}) 
                    : setError({...error, shipping_cost: ""});
          break;
        default:
          break;
      }
      setState(Object.assign(state, {[name]: value} ));
      console.log(error);
    };
    const handleSubmit = (event: any) => {
      event.preventDefault();
      let validity = true;
      Object.values(error).forEach(
        (val) => val.length > 0 && (validity = false)
      );
      if (validity === true) {
        console.log ({name: state.name,
          description: state.description,
          price: state.price,
          manufacturer: state.manufacturer,
          upc: state.upc,
          cost: state.cost,
          part_num: state.part_num,
          shipping_cost: state.shipping_cost,
          image: state.image,
          userId: userId,
          vendorId: state.vendorId,
          marketplaceId: state.marketplaceId})
        fetch("http://localhost:3001/product/create", {
          method: "POST",
          body: JSON.stringify({
            name: state.name,
            description: state.description,
            price: state.price,
            manufacturer: state.manufacturer,
            upc: state.upc,
            cost: state.cost,
            part_num: state.part_num,
            shipping_cost: state.shipping_cost,
            image: state.image,
            userId: userId,
            vendorId: state.vendorId,
            marketplaceId: state.marketplaceId
          }),
          headers: new Headers({
            "content-Type": "application/json",
            "Authorization": token,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            const{id}=data

            // Redirect
            // window.location.href=`/vendor/${id}`
          });
        console.log("Registering can be done");
      } else {
        setError({...error, name: "Product is already created!"})
        console.log("You cannot be registered!!!"); //show error later
      }
    };
    return (
      <form onSubmit={handleSubmit} noValidate>
        <div className="name">
          <label htmlFor="name">Product Name</label>
          <input
            type="name"
            name="name"
            onChange={handleChange}
          />
          {error.name.length > 0 && (
            <span style={{ color: "red" }}>{error.name}</span>
          )}
        </div>
        <div className="description">
          <label htmlFor="description">Description</label>
          <input
            type="description"
            name="description"
            onChange={handleChange}
          />
          {error.description.length > 0 && (
            <span style={{ color: "red" }}>{error.description}</span>
          )}
        </div>
        <div className="manufacturer">
          <label htmlFor="manufacturer">Manufacturer</label>
          <input
            type="manufacturer"
            name="manufacturer"
            onChange={handleChange}
          />
          {error.manufacturer.length > 0 && (
            <span style={{ color: "red" }}>{error.manufacturer}</span>
          )}
        </div>
        <div className="upc">
          <label htmlFor="upc">UPC</label>
          <input
            type="upc"
            name="upc"
            onChange={handleChange}
          />
          {error.upc.length > 0 && (
            <span style={{ color: "red" }}>{error.upc}</span>
          )}
        </div>
        <div className="price">
          <label htmlFor="price">Price</label>
          <input
            type="price"
            name="price"
            onChange={handleChange}
          />
          {error.price.length > 0 && (
            <span style={{ color: "red" }}>{error.price}</span>
          )}
        </div>
        <div className="part_num">
          <label htmlFor="part_num">Part Number</label>
          <input
            type="part_num"
            name="part_num"
            onChange={handleChange}
          />
          {error.part_num.length > 0 && (
            <span style={{ color: "red" }}>{error.part_num}</span>
          )}
        </div>
        <div className="cost">
          <label htmlFor="cost">Cost</label>
          <input
            type="cost"
            name="cost"
            onChange={handleChange}
          />
          {error.cost.length > 0 && (
            <span style={{ color: "red" }}>{error.cost}</span>
          )}
        </div>
        <div className="shipping_cost">
          <label htmlFor="shipping_cost">Shipping Cost</label>
          <input
            type="shipping_cost"
            name="shipping_cost"
            onChange={handleChange}
          />
          {error.shipping_cost.length > 0 && (
            <span style={{ color: "red" }}>{error.shipping_cost}</span>
          )}
        </div>
        <div className="image">
          <label htmlFor="image">Image</label>
          <input
            type="img"
            name="image"
            onChange={handleChange}
          />
          {error.image.length > 0 && (
            <span style={{ color: "red" }}>{error.image}</span>
          )}
        </div>
        <div className="vendor">
          <label htmlFor="vendor">Vendor</label>
          <Select
            labelId="vendor-select"
            id="vendor-select"
            value={state.vendorId}
            disabled={vendorId > 0}
            onChange={e => {
              setState({...state, vendorId: e.target.value as number});
            }}
          >
            {vendors.map((v: Vendor) => (
              <MenuItem value={v.id}>{v.company}</MenuItem>
            ))}            
        </Select>
          {error.vendorId.length > 0 && (
            <span style={{ color: "red" }}>{error.vendorId}</span>
          )}
        </div>
        <div className="marketplace">
          <label htmlFor="marketplace">Marketplace</label>
          <Select
            labelId="marketplace-select"
            id="marketplace-select"
            value={state.marketplaceId}
            disabled={marketplaceId > 0}
            onChange={e => {
              setState({...state, marketplaceId: e.target.value as number});
            }}
          >
            {marketplaces.map((m: Marketplace) => (
              <MenuItem value={m.id}>{m.name}</MenuItem>
            ))}            
        </Select>
          {error.marketplaceId.length > 0 && (
            <span style={{ color: "red" }}>{error.marketplaceId}</span>
          )}
        </div>
        <div className="submit">
          <button>Create Product!</button>
        </div>
      </form>
    );
    
}

/**
 * Add look up button to this form
 * in the on click method in button, make call to eBay API
 * fetch('ebay url', {
 *  method:...
 * body:...
 * headers: auth will be API token
 * }).then(data => {
 * setState({...state, price: data.price})
 * })
 * 
 * New Component:
 * ProductDetails
 * nanme
 * desc
 * manu
 * upc
 * cost
 * ...
 * price-cost-shipping-packaging = profit
 * 
 * 
 * ^^^^ add onClick to product cards in ViewProducts component to redirect to /product/:id
 * Add new page to routes in app.js
 */
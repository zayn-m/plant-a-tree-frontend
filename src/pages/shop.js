import React, { useEffect, useState, useContext } from "react";
import { Col, Row, Card, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import axios from '../config/axios.config';
import Context from "../context/Context";
import { toast } from "react-toastify";

export default function Shop(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const {cartItems, setCartItems} = useContext(Context);

  useEffect(() => {
    axios.get('/plants').then(res => {
      if (res.data?.content) {
        setData(res.data.content);
        setLoading(false);
      }
    }).catch(e => {
      console.log(e);
      setLoading(false);
    })
  }, [])

  const addToCart = async (plantId) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) toast.error('Please login to continue');

      const res = await axios.post('/cart/add', { plantId });
      let itemIndx = cartItems.findIndex(item => item.plant.id === plantId);

      if (itemIndx > -1) {
        const items = [...cartItems];
        items[itemIndx] = { ...items[itemIndx], quantity: res.data.data.quantity};
        setCartItems(items);
      } else {
        const cartObj = [
          ...cartItems, res.data.data
        ];
        setCartItems(cartObj);
      }
      toast.success('Added to cart')
    } catch (error) {
      console.log(error);
    }
  }

  const checkItemInCart = async (plantId) => {
    console.log('checkItemInCart', cartItems);
    const found = cartItems?.find(item => item.plant?.id === plantId);
    console.log('found', found);
    if (found) return true;
    else return false;
  }

  return (
    <div className="mt-5">
        <h1 className="text-center">Shop Our Plants</h1>
        <Row className="mt-5">
          {loading &&
          <Loader />}

          {data.map(d => (
            <Col xs="12" sm="12" md="3" key={d.id} className="mt-3">
            <Card>
              <Card.Img variant="top" src={d.imageUrl} height={200} style={{objectFit:'cover'}} />
              <Card.Body>
                <Card.Title>{d.name}</Card.Title>
                <Card.Text>
                  {d.description.length > 100 ? d.description.substring(0, 100) + '...' : ''}
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Button 
                    variant="success"
                    onClick={() => addToCart(d.id)}>Add to cart
                  </Button>
                  <strong>£{d.price}</strong>
                </div>
              </Card.Body>
            </Card>
          </Col>
          ))}
      </Row>
    </div>
  );
}

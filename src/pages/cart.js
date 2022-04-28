import React, { useContext, useState } from "react";
import { Row, Col, Card, Button, Badge } from "react-bootstrap";
import { FaTimesCircle } from "react-icons/fa";
import StripeCheckout from 'react-stripe-checkout';
import Context from "../context/Context";
import axios from '../config/axios.config';
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

export default function Cart() {
  const history = useHistory();

  const {cartItems, setCartItems} = useContext(Context);

  const onToken = async (token) => {
    try {
      let res = await axios.post('/orders', {
        stripeToken: token.id,
        cartItemsIds: cartItems.map(item => item.id),  
      });
      
      if (res.data.status === 201) {
        toast.success('Payment successful');
        res = await axios.get('/cart/items');
        setCartItems(res.data.data);
        history.push('/orders');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const removeItem = async (id) => {
    try {
      const res = await axios.delete(`/cart/item/${id}`);
      if (res?.data?.status === 200) {
        const items = [...cartItems];
        const index = cartItems.findIndex(item => item.id === id)
        items.splice(index, 1);
        setCartItems(items);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const itemsTotal = () => {
    return  cartItems.reduce((sum, i) => {
      return sum + (i.plant.price * i.quantity)
    }, 0)
  }

  const getTotal = () => {
    const total =  itemsTotal();

    if (total > 50) {
      return calculateDiscount(total);
    }
    return total;
  }

  const getTotalInCents = () => {
    return Number(getTotal() * 100);
  }

  const calculateDiscount = (total) => {
    return total - (total * 20 / 100);
  }

  return (
    <div className="mt-5">
      <Row >
        <h2>Shopping Cart</h2>
        <Col md="9">
        {cartItems.length ? cartItems.map(item => (
          <div>
          <hr />
          <Col md="12" key={item.id} className="mb-3">
          <Card>
            <Card.Header as="h5">{item.plant.name}</Card.Header>
            <Card.Body>
              <Card.Title><Badge bg="warning">{item.plant.category?.name}</Badge></Card.Title>
              <div className="d-flex justify-content-between">
                <Button variant="link" className="text-danger p-0" onClick={() => removeItem(item.id)}>Remove</Button>
                <strong>£{item.plant.price} {item.quantity ? `x ${item.quantity} = £${item.quantity * item.plant.price}` : ''} </strong>
              </div>
            </Card.Body>
          </Card>
        </Col>
        </div>
        )) : <h4 className="text-danger my-5"><FaTimesCircle/> You have no items in your cart!</h4>}
        </Col>
        
        <Col md="3" className="d-flex flex-column">
          <div>
            TOTAL:
            <h2>£{getTotal()}</h2>
            {itemsTotal() > 50 &&
              <h6>20% discount applied for spending over £50</h6>
            }
          </div>
          <StripeCheckout
            name="Plant A Tree"
            currency="GBP"
            token={onToken}
            amount={getTotalInCents()}
            billingAddress={false}
            zipCode={false}
            stripeKey="pk_test_51KFhziIOCViZ40O3wmHIkJvLBtOsQddXYoW8w8cIHo9pDLZ3r2yXrCeoRCDR34twv0NtcRX3k0T9g8ucPJGTcaGx00RDkovY8O"
          />
          <hr />
          <p className="mt-3">For test purposes use these details: </p>
          <p>CARD: 4242 4242 4242 4242 <br /> EXP: 12/25 <br />CVV: 123</p>
          {/* <Button variant="success" disabled={cartItems.length ? false : true}>Proceed to checkout</Button> */}
        </Col>
      </Row>
    </div>
  );
}

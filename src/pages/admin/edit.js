import React, { useState, useEffect } from "react";
import S3 from "react-aws-s3";
import { Button, Card, Form, Row, Col } from "react-bootstrap";
import axios from "../../config/axios.config";
import { toast } from 'react-toastify';
import { useLocation } from "react-router-dom";

window.Buffer = window.Buffer || require("buffer").Buffer;

const config = {
  bucketName: "nursery-media",
  region: "us-east-1",
  accessKeyId: "AKIAYIJFFDJNUHNSVSKV",
  secretAccessKey: "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",
  s3Url: "https://nursery-media.s3.amazonaws.com",
};

const ReactS3Client = new S3(config);

export default function PlantEdit() {
  const location = useLocation();

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState();
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(null);
  const [stockLeft, setStockLeft] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    axios.get(`/plants/${location.state.id}`)
      .then(res => {
        const {data} = res;
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setStockLeft(data.stockLeft);
        setCategory(data.category.id);
      })
      .catch(err => {
        console.log(err);
      })
  }, [location.state.id]);

  useEffect(() => {
    axios.get('/categories')
      .then(res => {
        setCategories(res.data.content);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  const uploadFile = (event) => {
    setLoading(true);
    ReactS3Client.uploadFile(event.target.files[0])
      .then((data) => {
        setImageUrl(data.location);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const submit = e => {
    e.preventDefault();
    setLoading(true);

    axios.post('/plants', {
      id: location.state.id,
      name,
      price: parseFloat(price),
      description,
      category_id: parseInt(category),
      category: location.state.category,
      stockLeft: parseInt(stockLeft),
      imageUrl,
      createdAt: location.state.createdAt,
    })
    .then(res => {
      toast.success('Success');
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      setLoading(false);
    })
  }

  return (
    <div>
      <Row className="my-5">
        <Col xs="12" md="6">
          <Form onSubmit={submit}>
            <h5>Edit Plant Details</h5>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" value={description} onChange={e => setDescription(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" value={price} onChange={e => setPrice(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
            <Form.Label>Categories</Form.Label>
            <Form.Select aria-label="Categories" onChange={e => setCategory(e.target.value)}>
              <option>Select a category</option>
              {categories.map(cat => (
                <option value={cat.id}>{cat.name}</option>

              ))}
            </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control type="number" value={stockLeft} onChange={e => setStockLeft(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Select image</Form.Label>
              <Form.Control type="file" onChange={uploadFile} />
            </Form.Group>
            <Button variant="success" type="submit" disabled={loading}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

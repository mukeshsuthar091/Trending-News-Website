import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

function App() {

  const [mydata, newData] = useState([]);

  const news_apiData = () => {
    fetch('https://inshorts.me/news/trending?offset=0&limit=21')
      .then((response) => response.json())
      .then((news) => {
        newData(news.data.articles)
      })
  }

  useEffect(() => {
    news_apiData();
    const interval = setInterval(() => { news_apiData(); }, 50000);
    return () => clearInterval(interval);
  }, [])

  return (
    <Container fluid>
      <Row xs={1} md={3} className='g-4'>
        {
          mydata.map(
            (value) => {
              return (
                <Col className="container-fluid mt-4">
                  <Card>
                    <Card.Img variant="top" src={value.imageUrl} width={300} height={350} />
                    <Card.Body>
                      <Card.Title>{value.title}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">{value.subtitle}</Card.Subtitle>
                      <Card.Text>
                        {value.content}
                      </Card.Text>
                      <footer className='blockquote-footer'>
                        <small className="text-muted">Author : {value.authorName}</small>
                      </footer>
                    </Card.Body>
                  </Card>
                </Col>
              );
            }
          )
        }
      </Row>
    </Container>
  );
}

export default App;

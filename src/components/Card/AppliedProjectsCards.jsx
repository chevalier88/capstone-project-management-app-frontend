import React from 'react';
import { Card, Button, CardGroup } from 'react-bootstrap';

export default function AppliedProjectsCards() {
  const Projects = [
    {
      id: '01',
      name: 'Travelookie',
      email: 'john@gmail.com',
      phone: '202-555-0163',
      status: 'Applied',
      applicationDeadline: '26-06-2022',
      projectedProductionDate: '26-12-2022',
      Remuneration: '$80/hour',
      Skillset: 'Javascript, Node, Express, React',
      slotsAvailable: '5',
      description: 'Build a Travel app',
      image: 'https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/3/30bf6c528078ba28d34bc3e37d124bdb.svg',
    },
    {
      id: '02',
      name: 'To The Moon',
      email: 'fightclud@gmail.com',
      phone: '202-555-0163',
      status: 'Applied',
      applicationDeadline: '26-06-2022',
      projectedProductionDate: '26-12-2022',
      Remuneration: '$80/hour',
      Skillset: 'Javascript, Node, Express, React',
      slotsAvailable: '5',
      description: 'Build a Travel app',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Coinbase.svg/500px-Coinbase.svg.png',
    },
    {
      id: '03',
      name: 'To The Moon',
      email: 'fightclud@gmail.com',
      phone: '202-555-0163',
      status: 'Applied',
      applicationDeadline: '26-06-2022',
      projectedProductionDate: '26-12-2022',
      Remuneration: '$80/hour',
      Skillset: 'Javascript, Node, Express, React',
      slotsAvailable: '5',
      description: 'Build a Travel app',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Coinbase.svg/500px-Coinbase.svg.png',
    },
  ];
  const styles = {
    card: {
      backgroundColor: '#cfcfc4',
      borderRadius: 0,
    },
    cardImage: {
      objectFit: 'cover',
      borderRadius: 0,
      width: '50x',
      height: '50px',
    },
  };

  return (
    <>
      <h1>Applied</h1>
      <div>
        <div className="container">
          <div className="d-flex justify-content-center">
            {Projects.map((data) => (
              <CardGroup>
                <Card style={styles.card} key={data.id}>
                  <Card.Img variant="top" src={data.image} style={styles.cardImage} />
                  <Card.Body>
                    <Card.Title>{data.name}</Card.Title>
                    <Card.Title>{data.status}</Card.Title>
                    <Card.Text>
                      {data.description}
                      {data.Skillset}
                      {data.slotsAvailable}
                    </Card.Text>
                    <Button variant="primary">to route to the individual projects page</Button>
                  </Card.Body>
                </Card>
              </CardGroup>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

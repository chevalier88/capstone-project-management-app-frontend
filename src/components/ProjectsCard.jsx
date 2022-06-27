import React from 'react';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Card, Button, CardGroup } from 'react-bootstrap';

export default function ProjectsCard({
  name,
  description,
  Skillset,
  slotsAvailable,
})
{
  const styles = {
    card: {
      backgroundColor: '#B7E0F2',
      borderRadius: 55,
    },
    cardImage: {
      objectFit: 'cover',
      borderRadius: 55,
      width: '50x',
      height: '50px',
    },
  };

  return (
    <>
      <h1> this is ProjectsCard1 Component</h1>
      <div>
        <div className="container">
          <div className="d-flex justify-content-center">
            <CardGroup>
              <Card style={styles.card}>
                <Card.Img variant="top" src={styles.cardImag} style={styles.cardImage} />
                <Card.Body>
                  <Card.Title>{name}</Card.Title>
                  <Card.Text>{description}</Card.Text>
                  <Card.Text>{Skillset}</Card.Text>
                  <Card.Text>{slotsAvailable}</Card.Text>
                  <Button variant="primary">
                    to route to the individual projects page
                  </Button>
                </Card.Body>
              </Card>
            </CardGroup>
          </div>
        </div>
      </div>
    </>
  );
}
//  <ul>
//         {Projects.map((data) => (
//           <li key={data.id}>
//             <p>{data.name}</p>
//             <p>{data.email}</p>
//             <p>{data.phone}</p>
//             <p>{data.id}</p>
//             <p>{data.name}</p>
//             <p>{data.email}</p>
//             <p>{data.phone}</p>
//             <p>{data.status}</p>
//             <p>{data.applicationDeadline}</p>
//             <p>{data.projectedProductionDate}</p>
//             <p>{data.Remuneration}</p>
//             <p>{data.Skillset}</p>
//             <p>{data.slotsAvailable}</p>
//             <p>{data.description}</p>
//             <p>{data.image}</p>
//           </li>
//         ))}
//       </ul>

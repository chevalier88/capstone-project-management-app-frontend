import React from 'react';
import '../index.css';

export default function ProjectsCards() {
  // Projects will be the Cards that we want to show

  // Used in Dashboard to show:
  // Current Projects
  // Available Open Projects
  // Completed Projects

  // Used in Search
  // Used in User Profile

  // applicationDeadline
  // projectedProductionDate
  // Remuneration
  // Skillset
  // Slots Available
  // description
  // image

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
      image: 'URL of the Image',
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
      image: 'URL of the Image',
    },
  ];

  return (
    <>
      <h1> this is ProjectsCards Component</h1>
      <ul>
        {Projects.map((data) => (
          <li key={data.id}>
            <p>{data.name}</p>
            <p>{data.email}</p>
            <p>{data.phone}</p>
            <p>{data.id}</p>
            <p>{data.name}</p>
            <p>{data.email}</p>
            <p>{data.phone}</p>
            <p>{data.status}</p>
            <p>{data.applicationDeadline}</p>
            <p>{data.projectedProductionDate}</p>
            <p>{data.Remuneration}</p>
            <p>{data.Skillset}</p>
            <p>{data.slotsAvailable}</p>
            <p>{data.description}</p>
            <p>{data.image}</p>
          </li>
        ))}
      </ul>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure><img src="https://api.lorem.space/image/shoes?w=400&h=225" alt="Shoes" /></figure>
        <div className="card-body">
          <h2 className="card-title">
            Daisy UI Example : Shoes!
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">Fashion</div>
            <div className="badge badge-outline">Products</div>
          </div>
        </div>
      </div>
    </>
  );
}

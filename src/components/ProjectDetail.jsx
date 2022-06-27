import React, { useState,useEffect } from 'react';
import axios from 'axios';

export default function ProjectDetail() {
  const [project, setProjects] = useState([]);
  useEffect(() => {
    axios
      .get("/api/Projects")
      .then((res) => {
        console.log("ALL Projects:\n", res.data);
        setJobs([...res.data]);
      })
      .catch((err) => console.log(err));
  }, []);

  //Individual Project Details
  //This is like the Profile page, but for the Individual Project

  if (!project) {
    return <div />;
  }

  const handleSelectChange = (event) => {
    setQuantity(event.target.value);
  };

  return (
    <div className="col-sm">
      <div className="project-detail">
        <h2>{project.name}</h2>
        <p>{project.description}</p>
        <p>
          <select
            className="project-quantity"
            value={quantity}
            onChange={handleSelectChange}
          >
            {Array(10)
              .fill(0)
              .map((_, index) => (
                <option value={index + 1}>{index + 1}</option>
              ))}
          </select>
          <button type="button" onClick={detailAddCart}>
            Add To Cart
          </button>
        </p>
      </div>
    </div>
  );
}

import React from "react";
import { useLocation } from "react-router-dom";

const Interest = () => {
  const location = useLocation();
  const data = location.state?.item || []; // default to empty array if no data
  console.log(data)

  return (
    <div className="row" style={{ padding: "20px" }}>
      {[data].map((item) => (
        <div className="column" key={item?.id}>
          <div className="card" style={{ cursor: "pointer" }}>
            <h3>{item?.title}</h3>
            <p>{item?.description}</p>
            <div style={{ marginRight: "80px", textAlign: "left" }}>
              <h4>location: {item?.location}</h4>
              <h4>Contact: {item?.contact?.phone}</h4>
              <h4>Category: {item?.contact?.email}</h4>
            </div>
            <span
              style={{ fontSize: "12px", marginLeft: "200px", color: "grey" }}
            >
              {item?.deadline}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Interest;

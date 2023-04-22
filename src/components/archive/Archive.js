import React from 'react'
import { useLocation } from 'react-router-dom';
import moment from "moment";
const Archive = () => {



  const location = useLocation()
  console.log(location.state)
  const data = location.state?.item;
  console.log(data);
  const deadlineDate = moment(data?.deadline);
  const todayDate = moment();
  const daysRemaining = deadlineDate.diff(todayDate, "days");


  return (
    <div className="row" style={{ padding: "20px" }}>
      <div className="column">
        <div className="card" style={{ cursor: "pointer" }}>
          <h3>{data?.title}</h3>
          <p>{data?.description}</p>
          <div style={{ marginRight: "80px", textAlign: "left" }}>
            <h4>location: {data?.location}</h4>
            <h4>Contact: {data?.contact?.phone}</h4>
            <h4>Category: {data?.contact?.email}</h4>
          </div>
          <span
            style={{ fontSize: "12px", marginLeft: "200px", color: "grey" }}
          >{daysRemaining} days remaining</span>
        </div>
      </div>
    </div>
  )
}

export default Archive

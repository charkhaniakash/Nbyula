import React, { useState } from "react";
import moment from "moment";
import "./Home.css";
import data from "../../db.json";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [store, setStore] = useState([]);
  const [active, setActive] = useState(false);

  console.log(store);

  function handleClick(item) {
    setStore(item);
    navigate("/interest", { state: { item } });
  }

  function handleDelete(item) {
    setActive(!active);
    setTimeout(() => {
      const updatedList = store.filter((d) => d.id !== item.id);
      setStore(updatedList);
      setActive(item.id);
      navigate("/archive", { state: { item } });
    }, 2000);
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    const items = Array.from(store);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setStore(items);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="characters">
        {(provided) => (
          <div
            style={{ padding: "20px" }}
            className="characters"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {data?.data?.map((item) => {
              const deadlineDate = moment(item?.deadline);
              const todayDate = moment();
              const daysRemaining = deadlineDate.diff(todayDate, "days");

              return (
                <Draggable
                  key={item.id}
                  draggableId={item.id.toString()}
                  item={item}
                >
                  {(provided) => (
                    <div
                      className="column"
                      key={item?.id}
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          daysRemaining > 21
                            ? "green"
                            : daysRemaining < 3
                            ? "red"
                            : "purple",
                      }}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div
                        className="card"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleClick(item)}
                      >
                        <h3>{item?.title}</h3>
                        <p>{item?.description.substring(0, 60)}</p>
                        <div style={{ marginRight: "80px", textAlign: "left" }}>
                          <h4>location: {item?.location}</h4>
                          <h4>Contact: {item?.contact?.phone}</h4>
                          <h4>{item?.contact?.email}</h4>
                        </div>
                        <span
                          style={{
                            fontSize: "12px",
                            marginLeft: "200px",
                            color: "grey",
                          }}
                        >
                          {daysRemaining} days remaining
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "end" }}>
                          <input
                            type="checkbox"
                            onClick={() => handleDelete(item)}
                            value={item?.id}
                            style={{
                              backgroundColor:
                                active === item.id ? "black" : "blue",
                            }}
                          />
                          {active === item.id ? (
                            <span>archived</span>
                          ) : (
                            <span>archive</span>
                          )}
                        </div>

                        <BookmarkBorderIcon onClick={() => handleClick(item)} />
                      </div>
                    </div>
                  )}
                </Draggable>
              );
            })}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Home;

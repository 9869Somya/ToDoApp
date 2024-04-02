import React from "react";
import "./TodoList.css";
import { useState, useEffect } from "react";

function TodoList() {
  const [data, setdata] = useState();
  const [selectFilter, setSelectFilter] = useState("option 1");

  const getData = () => {
    fetch("http://localhost:8000/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => setdata(res))
      .catch((err) => console.log(err));
  };

  const handleTodoCompletion = (dataId) => {
    const updatedTodos = data.map((item) =>
      item._id === dataId ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setdata(updatedTodos);
    console.log(updatedTodos);
  };
  useEffect(() => {
    let from = new Date();
    switch (selectFilter) {
      case "option 2": {
        from.setDate(from.getDate() - 7);
        break;
      }
      case "option 3": {
        from.setMonth(from.getMonth() - 1);
        break;
      }
      case "option 4": {
        from.setFullYear(from.getFullYear() - 1);
        break;
      }
      default: {
        from = null;
      }
    }
    if (from) {
      from = `${from.getMonth() + 1}/${from.getDate()}/${from.getFullYear()}`;
      fetch(`http://localhost:8080?from=${from}`, {
        method: "GET",
        headers: {
          "Content-type": "application.json",
        },
      })
        .then((res) => res.json())
        .then((res) => setdata(res))
        .catch((err) => console.log(err));
    } else {
      getData();
    }
  }, [selectFilter]);

  return (
    <div className="main">
      <h1>TodoLists:</h1>
      <select
        id="datafilter"
        value={selectFilter}
        onChange={(e) => setSelectFilter(e.target.value)}
      >
        <option value="option 1">All</option>
        <option value="option 2">Last week</option>
        <option value="option 3">Last month</option>
        <option value="option 4">Last year</option>
      </select>
      {data &&
        data.map((item) => {
          const d = new Date(item.date);
          return (
            <div key={item._id} className="todoname">
              <span className={`task ${item.isCompleted ? "isCompleted" : ""}`}>
                {item.name}
              </span>
              <p>
                {d.getDate()}/{d.getMonth() + 1}/{d.getFullYear()}
              </p>
              <label
                className={`checkBox ${item.isCompleted ? "checked" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={() => handleTodoCompletion(item._id)}
                />
              </label>
            </div>
          );
        })}
    </div>
  );
}

export default TodoList;

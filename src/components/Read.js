import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Read() {
  const [apiData, setApiData] = useState([]);

  const baseURL = "https://664d8c89ede9a2b55653ddd1.mockapi.io/crud";

  function getData() {
    axios.get(baseURL).then((response) => {
      setApiData(response.data);
    });
  }

  function handleDelete(id) {
    axios
      .delete(`${baseURL}/${id}`)
      .then((response) => {
        alert(`Data with id: ${id} is going to be deleted.`);
        getData();
      })
      .catch((error) => {
        alert("Data Deletion Failed");
      });
  }

  function setDataToStorage(id, name, age, email) {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("age", age);
    localStorage.setItem("email", email);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="mb-2 mt-2">
            <Link to="/create">
              <button className="btn btn-primary">Create New Data</button>
            </Link>
          </div>
          <table className="table table-bordered table-striped table-dark table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>AGE</th>
                <th>EMAIL</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {apiData.map((item) => {
                const { id, e_name, e_age, e_email } = item;
                return (
                  <>
                    <tr>
                      <td>{id}</td>
                      <td>{e_name}</td>
                      <td>{e_age}</td>
                      <td>{e_email}</td>
                      <td>
                        <Link to="/edit">
                          <button
                            className="btn btn-primary"
                            onClick={() =>
                              setDataToStorage(id, e_name, e_age, e_email)
                            }
                          >
                            Edit
                          </button>
                        </Link>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            if (
                              window.confirm("Are you sure to delete data?")
                            ) {
                              handleDelete(id);
                            }
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Read;

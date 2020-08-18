import React, { useState, useEffect } from "react";
import {
  getRepositories,
  addRepository,
  deleteRepository,
} from "./services/reposirories";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    getRepositories().then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const newRepo = {
      title: `Novo projeto ${Math.random()}`,
      url: "http://www.google.com",
      techs: ["java", "node", "react"],
    };

    addRepository(newRepo).then((response) => {
      setRepositories([...repositories, response.data]);
    });
  }

  async function handleRemoveRepository(id) {
    deleteRepository(id).then((response) => {
      if (response.status == 204) {
        setRepositories(repositories.filter((value) => value.id != id));
      }
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => {
          console.log("repository", repository);
          return (
            <div key={`rository-${repository.id}`}>
              <li>{repository.title}</li>
              <li>
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
            </div>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

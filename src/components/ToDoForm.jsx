import { useState, useEffect } from "react";
import ToDoTable from "./ToDoTable";
import axios from "axios";

function ToDoForm(props) {
  const [id, setId] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [isDone, setIsDone] = useState(false); // Use a boolean value for isDone
  const [toDos, setToDos] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false)

  const getAll = () => {
    axios
      .get("http://localhost:5163/api/ToDo")
      .then((response) => {
        const array = response.data;
        setToDos(array);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    getAll();
  }, [toDos]);




  const postHandler = (e) =>{
    e.preventDefault()

    let newObj = {
      description : descripcion,
      isDone : isDone
    }

    console.log(newObj)

    axios.post("http://localhost:5163/api/ToDo",
    newObj)
          .then(response =>
                        console.log(response))
          .catch(error =>
                      console.log(error))

                      console.log(e)
                      setId(0);
                      setDescripcion("");
                      setIsDone(false);
                      setIsUpdating(false)
    

  }

  const deleteHandler = (id) => {
    let endpoint = `http://localhost:5163/api/ToDo?id=${id.id}`;
    axios
      .delete(endpoint)
      .then((response) => {
        console.log(response.data);
        getAll();
      })
      .catch((error) => console.log("Error:", error));
  };

  const updateHandler = (object) => {
    setId(object.id);
    setDescripcion(object.description);
    setIsDone(object.isDone);
    setIsUpdating(true)
  };

  const updateHandlerIsDone = (object) => {
    axios
      .put(`http://localhost:5163/api/ToDo/${object.id}`, {id:object.id,description:object.description, isDone: object.isDone })
      .then((response) => {
        console.log(response.data);
        getAll();
      })
      .catch((error) => console.log("Error:", error));
  };

  const updateHandlerEnd = (e) =>{

    e.preventDefault()
   
    axios.put(`http://localhost:5163/api/ToDo/${id}`,{
      description:descripcion,
      isDone : isDone,
      id:id
    })



    setId(0);
    setDescripcion("");
    setIsDone(false);
    setIsUpdating(false)
  }

  return (
    <div>
      
      <form className="border border-bottom">
   
        {
          isUpdating === false ?
                <h1 className="text-center bg-success p-3">Agregar una Nota</h1>
                :
                <h1 className="text-center bg-warning p-3">Actualizar texto</h1>

        
      }
       <hr />
        <div className="row col-6 offset-3">
          <label className="text-center" htmlFor="descripcion">
            Descripcion
          </label>
          <input
            type="text"
            className="form-control"
            id="descripcion"
            name="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <div className="row col-6 offset-3">
          <label className="text-center form-check-label my-2" htmlFor="isDone">
            Is Done
          </label>
          <input
            type="checkbox"
            className="p-5"
            id="isDone"
            name="isDone"
            checked={isDone}
            onChange={(e) => setIsDone(e.target.checked)}
          />
        </div>
        <div className="row col-3 mx-auto my-3">
          {
            isUpdating === false ? 
          <button
            name="botonSubmit"
            id="botonSubmit"
            className="btn btn-primary"
            role="submit"
            type="submit"
            onClick={(e) => postHandler(e)}
          >
            Agregar
          </button>
          :
          <button
            name="botonSubmit"
            id="botonSubmit"
            className="btn btn-warning"
            role="submit"
            type="submit"
            onClick={(e) => updateHandlerEnd(e)}
          >
            Updatear
          </button>
          }
        </div>
        <hr></hr>
      </form>
      <ToDoTable
        updateHandler={updateHandler}
        deleteHandler={deleteHandler}
        updateHandlerIsDone={updateHandlerIsDone}
        toDos={toDos}
      ></ToDoTable>
    </div>
  );
}

export default ToDoForm;

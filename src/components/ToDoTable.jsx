import { useState, useEffect } from "react";
import ToDoForm from "./ToDoForm";
import ToDoCard from "./ToDoCard";

function ToDoTable(props) {

  return (
    <div>
      <div>
        <h2 className="text-center">Notas</h2>

        <div className="table-responsive">
          <table className="table table-striped table-hover table-borderless table-primary align-middle">
            <thead className="table-light">
              <tr>
                <th className="text-center">Id</th>
                <th className="text-center">Descripcion</th>
                <th className="text-center">Terminada</th>
                <th className="text-center">Opciones</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {props.toDos.map((toDo, index) => {
                return (
                  <ToDoCard
                   key={index} 
                  toDo={toDo} 
                  updateHandler={props.updateHandler}
                  deleteHandler ={props.deleteHandler}
                  updateHandlerIsDone={props.updateHandlerIsDone}
                  ></ToDoCard>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ToDoTable;

import React from "react";

function ToDoCard(props) {
  return (
    <tr className="table-primary">
      <td className="text-center" scope="row">
        {props.toDo.id}
      </td>
      { props.toDo.isDone ? 
      <td className="text-center">{props.toDo.description}</td>
      :
      <td className="text-center text-decoration-line-through">{props.toDo.description}</td>
      }
      <td className="text-center">
        <input
          id="checkboxTodo"
          className="form-control-checkbox"
          type="checkbox"
          checked={props.toDo.isDone}
          onChange={() =>
            props.updateHandlerIsDone({
              ...props.toDo,
              isDone: !props.toDo.isDone,
            })
          }
        />
      </td>
      <td className="text-center">
        <button
          className="btn btn-warning mx-2"
          onClick={() =>
            props.updateHandler({
              id: props.toDo.id,
              description: props.toDo.description,
              isDone: props.toDo.isDone,
            })
          }
        >
          Editar
        </button>
        <button
          className="btn btn-danger"
          onClick={() => props.deleteHandler({ id: props.toDo.id })}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
}

export default ToDoCard;

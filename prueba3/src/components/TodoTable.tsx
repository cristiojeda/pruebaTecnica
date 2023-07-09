import { TodoAll } from "../interfaces/interfaces"

type TodoTableProps = {
  todos: TodoAll[],
  onEditar: (todo: TodoAll) => any,
  onEliminar: (todo: TodoAll) => any
}

const TodoTable = (props: TodoTableProps) => {
  return (
    <div>      
  
    <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Completed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            props.todos.map((todo) => (
              <tr key={todo.id} className={`${!todo.completed && 'table-warning'}`}>
                <td>{todo.id}</td>
                <td style={{textAlign: "left"}}>{todo.title}</td>
                <td>{todo.completed ? "Yes" : "No"}</td>
                <td>
                  <div className="d-flex gap-2">
                  <button type="button" className="btn btn-primary" onClick={() => props.onEditar(todo)}>Editar</button>
                  <button type="button" className="btn btn-danger" onClick={() => props.onEliminar(todo)}>Eliminar</button>
                  </div>                  
                </td>
              </tr>
            ))
          }        
        </tbody>
      </table>
    </div>
  )
}

export default TodoTable
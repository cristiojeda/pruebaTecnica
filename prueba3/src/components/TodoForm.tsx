import { TodoAll } from "../interfaces/interfaces"

type TodoFormProps = {
  todo: TodoAll | undefined,
  onSubmit: (event: any) => any,
  onChange: (event: any) => any,
  onCheckbox: (event: any) => any
}

const TodoForm = (props: TodoFormProps) => {

  return (
    <form onSubmit={props.onSubmit} className="d-flex flex-column gap-3 mt-2">
      <div style={{textAlign: "left"}}>
      <span className="text-danger" >Campos obligatorios (*)</span>
      </div>
      
      <div style={{textAlign: "left"}}>
        <label className="form-label">Title<span className="text-danger">*</span></label>
        <input type="text" 
                value={props.todo?.title ?? ""}
                className="form-control" 
                id="title" 
                name="title"                 
                onChange={props.onChange} 
                />
      </div>      
      <div className="form-check" style={{textAlign: "left"}}>
        <input className="form-check-input" 
               onChange={props.onCheckbox} type="checkbox" 
               value={props.todo?.completed ?? false} 
               id="completed" 
               name="completed" 
               />
        <label className="form-check-label">
          Completed
        </label>
      </div>
      <button type="submit" className="btn btn-success">Guardar</button>
    </form>    
  )
}

export default TodoForm
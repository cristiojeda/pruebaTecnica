import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import './App.scss'
import { createTodos, getTodos, removeTodos, updateTodos } from './api'
import TodoTable from './components/TodoTable'
import TodoForm from './components/TodoForm'
import { TodoAll } from './interfaces/interfaces'
import Swal from 'sweetalert2'

function App() {
  const [editar, setEditar] = useState<{editar: boolean, item: any}>({editar: false, item: undefined})
  const [todos, setTodos] = useState<TodoAll[]>([])
  const [filterCompleted, setFilterCompleted] = useState(-1)


  useEffect(() => {
    getAll() // Ejecutta dos veces por que tiene StrictMode
  }, [])

  const getAll = async () => {
    try {
      const response = await getTodos()
      setTodos(response.data)      
      
    } catch(error: any) {
      console.log(error);      
    }    
  }

  const handleNuevo = () => {
    setEditar({editar: true, item: {title: '', completed: false}})
  }

  const handleEditar = (item: any) => {
    setEditar({editar: true, item})
  }

  const handleBack = () => {
    setEditar({editar: false, item: undefined})
  }

  const handleChange = ({target: {name, value}}: ChangeEvent<HTMLInputElement>) => {
    setEditar({
      ...editar,
      item: {
        ...editar.item,
        [name]: value
      }
    })
  }

  const handleChangeSelect = ({target: {value}}: ChangeEvent<HTMLSelectElement>) => {
    setFilterCompleted(Number(value))
  }

  const handleChangeCheckbox = ({target: {name, checked}}: ChangeEvent<HTMLInputElement>) => {
    setEditar({
      ...editar,
      item: {
        ...editar.item,
        [name]: checked
      }
    })
  }

  const handleEliminar = async (todo: TodoAll) => {
    try {
      await removeTodos(todo?.id ?? 0)

      const newTodos = todos.filter((item: any) => item.id !== todo.id)

      setTodos(newTodos)

      Swal.fire({
        icon: 'success',
        title: 'Mensaje',
        text: 'Todo eliminado',        
      })

    } catch(error: any) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Mensaje de error',
        text: 'Hubo un error al intentar eliminar. Intente de nuevo',        
      })
      
    }
  }

  const handleSubmit = async (event: FormEvent) => {

    event.preventDefault()
    
    if (!editar.item.title) {
      Swal.fire({
        icon: 'info',
        title: 'Mensaje',
        text: 'Debe cargar un title',        
      })
      return
    }

    if (!(/^[A-Z ]*$/i.test(editar.item.title))) {
      Swal.fire({
        icon: 'info',
        title: 'Mensaje',
        text: 'Debe contener solo letras',        
      })
      return
    }

    try {

      if (editar.item.id) {
        const response = await updateTodos(editar.item, editar.item.id)        
        
  
        const newTodos = todos.map((item: any) => item.id === editar.item.id ? {...response.data} : item)
        setTodos(newTodos)

        Swal.fire({
          icon: 'success',
          title: 'Mensaje',
          text: 'Todo actualizado',        
        })

      } else {
        const response = await createTodos(editar.item)

        console.log(response.data);
        
  
        const newTodos = [response.data, ...todos]
        setTodos(newTodos)

        Swal.fire({
          icon: 'success',
          title: 'Mensaje',
          text: 'Todo creado',        
        })
      }
      
      setEditar({editar: false, item: undefined})
      

    } catch(error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Mensaje de error',
        text: 'Hubo un error. Intente de nuevo',        
      })
      
    }
  }

  const todosFiltered = filterCompleted === -1
    ? todos 
    : todos.filter(todo => todo.completed === Boolean(filterCompleted) )

  return (    
    <div>
      <h2 className='mb-3'>Prueba 3 - TODO</h2>
      
      {
        !editar.editar 
        ? (
          <>
          <div style={{textAlign: 'left'}} className='mb-2'>
            <button type="button" className="btn btn-primary" onClick={handleNuevo}>Nuevo</button>
            <select className="form-select mt-3" onChange={handleChangeSelect} value={filterCompleted}>
              <option value={-1}>All</option>
              <option value={1}>Completed</option>
              <option value={0}>No completed</option>                                          
            </select>
          </div>
          <TodoTable todos={todosFiltered} onEditar={handleEditar} onEliminar={handleEliminar}></TodoTable>
          </>
        )
        : (
          <>
          <div style={{textAlign: 'left'}}>
            <button type="button" className="btn btn-primary" onClick={handleBack}>Retroceder</button>
          </div>
          <TodoForm todo={editar.item} onChange={handleChange} onCheckbox={handleChangeCheckbox} onSubmit={handleSubmit} />
          </>
        )
      }            
    </div>
  )
}

export default App

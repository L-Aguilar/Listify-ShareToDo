import React, {useState, useEffect} from 'react';

import {useDispatch, useSelector} from 'react-redux'
import { cargarDatosAccion, editarAccion, actualizarStatusAccion, eliminarTareaAccion} from '../redux/tareasDucks'

function Lista({box}) {
    const dispatch = useDispatch()
    const tareas = useSelector(store => store.tareas.lista_tareas)

    const [status, setStatus] = useState('')

    useEffect(() => {
    }, [])

    const eliminarTarea = (id) => {
        dispatch(eliminarTareaAccion(id));
      }

     const cargarForm = item => {
       console.log(item);
       dispatch(editarAccion(true))
       dispatch(cargarDatosAccion(item.id, item.tarea, item.descripcion, item.link, item.status))
     }

     const actualizarStatus = (e,item) => {
       dispatch(actualizarStatusAccion(e, item.id))
     }

    return (
        <>
        <ul className="list-group">
            {
              tareas.length === 0 ? (
                <li className="list-group-item bg-warning text-dark">
                  No hay Items
                </li>
              ) : (
                tareas.map(item => (
                  <li className="list-group-item" key={item.id}>
                    <div className="row align-items-center">
                      {
                        box ? (
                        <div className="col-1">
                            <input type="checkbox" onChange={e => actualizarStatus(e.target.checked, item)} checked={ item.status || false } id="checkBox"/>
                        </div>
                        ):(
                          <div className="col-1"></div>
                        )
                      }
                        <div className="col-7 descripcion px-0">
                            <div>
                                <b>{item.tarea}</b>
                                <p className="m-0 text-break">{item.descripcion}</p>
                            </div>
                        </div>

                        <div className="col-4">
                            {
                                
                                item.link !== '' ? (
                                    <a className="btn btn-primary btn-sm float-right mx-2"
                                    href={item.link}
                                    role="button"
                                    // eslint-disable-next-line react/jsx-no-target-blank
                                    target="_blank">
                                      Link</a>
                                ) : (null)
                            }
                                <button 
                                onClick={()=> eliminarTarea(item.id)}
                                className="button-danger btn-sm float-right mx-2">
                                    Eliminar
                                </button>
                
                                <button
                                onClick={()=> cargarForm(item)}
                                className="button-warning btn-sm float-right">
                                    Editar
                                </button>
                        </div>
                    </div>
                  </li>
                ))
              )
            }
        </ul>

        </>
    )
}

export default Lista

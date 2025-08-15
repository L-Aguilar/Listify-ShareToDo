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
       dispatch(cargarDatosAccion(item.id, item.tarea, item.descripcion, item.link, item.status, item.archivo, item.nombreArchivo))
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
                    <div className="row align-items-start">
                      {
                        box ? (
                        <div className="col-auto pr-2">
                            <input type="checkbox" onChange={e => actualizarStatus(e.target.checked, item)} checked={ item.status || false } id="checkBox"/>
                        </div>
                        ):(
                          <div className="col-auto pr-2"></div>
                        )
                      }
                        <div className="col flex-grow-1 content-area">
                            <div className="item-content">
                                <h6 className="item-title mb-1">{item.tarea}</h6>
                                {item.descripcion && (
                                    <p className="item-description mb-2">{item.descripcion}</p>
                                )}
                                {item.nombreArchivo && (
                                    <div className="file-attachment">
                                        {item.archivo && item.archivo.type.startsWith('image/') ? (
                                            <div className="file-preview">
                                                <img 
                                                    src={URL.createObjectURL(item.archivo)} 
                                                    alt="Preview" 
                                                    className="file-thumbnail-small"
                                                />
                                                <span className="file-name-small">{item.nombreArchivo}</span>
                                            </div>
                                        ) : (
                                            <div className="file-preview">
                                                <div className="file-icon-small">
                                                    {item.archivo && item.archivo.type === 'application/pdf' ? (
                                                        <i className="fas fa-file-pdf"></i>
                                                    ) : (
                                                        <i className="fas fa-file"></i>
                                                    )}
                                                </div>
                                                <span className="file-name-small">{item.nombreArchivo}</span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="col-auto buttons-container">
                            <div className="buttons-row">
                                {item.archivo && (
                                    <button 
                                        className="btn btn-info btn-sm"
                                        onClick={() => {
                                            const url = URL.createObjectURL(item.archivo);
                                            const a = document.createElement('a');
                                            a.href = url;
                                            a.download = item.nombreArchivo;
                                            document.body.appendChild(a);
                                            a.click();
                                            document.body.removeChild(a);
                                            URL.revokeObjectURL(url);
                                        }}
                                        title="Descargar archivo"
                                    >
                                        <i className="fas fa-download"></i>
                                    </button>
                                )}
                                {item.link && (
                                    <a className="btn btn-primary btn-sm"
                                    href={item.link}
                                    role="button"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Abrir enlace">
                                        <i className="fas fa-external-link-alt"></i>
                                    </a>
                                )}
                                <button 
                                    onClick={()=> cargarForm(item)}
                                    className="btn btn-warning btn-sm"
                                    title="Editar item">
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button 
                                    onClick={()=> eliminarTarea(item.id)}
                                    className="btn btn-danger btn-sm"
                                    title="Eliminar item">
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
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

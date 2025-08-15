import React, {useState, useEffect} from 'react';

import {useDispatch, useSelector} from 'react-redux'
import { cargarDatosAccion, editarAccion, actualizarStatusAccion, eliminarTareaAccion, getTareasFiltradas} from '../redux/tareasDucks'
import { CATEGORIAS, PRIORIDADES } from '../constants/categories'

function Lista({box}) {
    const dispatch = useDispatch()
    const tareas = useSelector(getTareasFiltradas)

    const [status, setStatus] = useState('')

    useEffect(() => {
    }, [])

    const eliminarTarea = (id) => {
        dispatch(eliminarTareaAccion(id));
      }

     const cargarForm = item => {
       console.log(item);
       dispatch(editarAccion(true))
       dispatch(cargarDatosAccion(item.id, item.tarea, item.descripcion, item.link, item.status, item.archivo, item.nombreArchivo, item.categoria, item.prioridad))
     }

     const actualizarStatus = (e,item) => {
       dispatch(actualizarStatusAccion(e, item.id))
     }

     // Función para obtener el estilo de la categoría
     const getCategoriaStyle = (categoria) => {
       const cat = CATEGORIAS[categoria] || CATEGORIAS.trabajo;
       return {
         backgroundColor: cat.bgColor,
         color: cat.color,
         borderColor: cat.color
       };
     };

     // Función para obtener el estilo de la prioridad
     const getPrioridadStyle = (prioridad) => {
       const prio = PRIORIDADES[prioridad] || PRIORIDADES.media;
       return {
         backgroundColor: prio.bgColor,
         color: prio.color,
         borderColor: prio.color
       };
     };

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
                                <div className="item-header mb-2">
                                    <h6 className="item-title mb-1">{item.tarea}</h6>
                                    <div className="item-tags">
                                        <span 
                                            className="badge categoria-badge me-2" 
                                            style={getCategoriaStyle(item.categoria)}
                                        >
                                            <i className={`fas ${CATEGORIAS[item.categoria]?.icon || 'fa-tag'}`}></i>
                                            {CATEGORIAS[item.categoria]?.nombre || 'Sin categoría'}
                                        </span>
                                        <span 
                                            className="badge prioridad-badge" 
                                            style={getPrioridadStyle(item.prioridad)}
                                        >
                                            <i className={`fas ${PRIORIDADES[item.prioridad]?.icon || 'fa-flag'}`}></i>
                                            {PRIORIDADES[item.prioridad]?.nombre || 'Sin prioridad'}
                                        </span>
                                    </div>
                                </div>
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

import React, {useEffect} from 'react';
import '../../App.scss';
import '../../scss/main.scss';
import {obtenerListaAccion} from '../../redux/listaDucks'
import {actualizarStatusAccion} from '../../redux/tareasDucks'
import {useDispatch, useSelector} from 'react-redux'
import {
    BrowserRouter as Router, useParams
  } from "react-router-dom";

function GetList() {
    const dispatch = useDispatch()
    const { id } = useParams();
    const lista_config = useSelector(store => store.lista.lista_config)
    const loading = useSelector(store => store.lista.loading)
    const tareas = useSelector(store => store.lista.tareas)
    
    useEffect(() => {
        dispatch(obtenerListaAccion(id))
        console.log('object');
    }, [])

    const cambiarStatus = (item) => {
        const event = item.status;
        dispatch(actualizarStatusAccion(event,item,id))
    }

    return (
        <>
        <div className="container my-5">
            <div className="row">
                <div className="col">
                    <h1 className="text-center color-white">SimpList</h1>
                    <h5 className="text-center parrafo-color">Crea y comparte listas en un par de minutos.</h5>
                    <div className="separator block"></div>
                </div>
            </div>

            <div className="row justify-content-center mt-5">
                <div className="col-8">
                    <span className="parrafo-color text-center">Nombre:</span>
                    <input type="text" readOnly className="form-control-plaintext text-center" value={lista_config.nameList}/>
                </div>
            </div> 

            <div className="row justify-content-center mb-5">
                <div className="col-8 mt-5">
                    <ul style={loading ? {display:'none'} : null} className="list-group">
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
                                    lista_config.box ? (
                                    <div className="col-1">
                                        <input
                                            type="checkbox"
                                            id="checkBox"
                                            checked={item.status}
                                            onChange={(e) => cambiarStatus(item)}
                                        />
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
                                    </div>
                                </div>
                            </li>
                            ))
                        )
                        }
                    </ul>
                </div>
            </div>
        </div>
        </>
    )
}

export default GetList

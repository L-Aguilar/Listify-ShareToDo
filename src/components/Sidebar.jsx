import React, {useState, useEffect} from 'react'
import shortid from 'shortid';

import {useDispatch, useSelector} from 'react-redux'

import {crearTareaAccion, cargarDatosAccion,
  editarAccion, actualizarTareaAccion, mensajeErrorAccion} from '../redux/tareasDucks'

function Sidebar() {

    const form = useSelector(store => store.tareas.data_form)
    const editar = useSelector(store => store.tareas.editar)
    const error = useSelector(store => store.tareas.error)
    
    const [modoEdicion, setModoEdicion] = useState(false)
    const [id, setId] = useState(form.id)
    const [tarea, setTarea] = useState(form.tarea)
    const [descripcion, setDescripcion] = useState(form.descripcion);
    const [link, setLink] = useState(form.link);

    useEffect(() => {
      if(editar){
        setId(form.id)
        setTarea(form.tarea);
        setDescripcion(form.descripcion);
        setLink(form.link);
        setModoEdicion(true)
        dispatch(editarAccion(false))
      }
    }, [editar])

    useEffect(() => {
      cargarDatos()
    }, [tarea, descripcion, link])

    const dispatch = useDispatch()

    const validarTarea = async (e) => {
        e.preventDefault()

        if(!tarea.trim()){
          dispatch(mensajeErrorAccion('Escriba algo por favor...'))
          return
        }
        
        if(link.length > 1) {
          if(link.indexOf ("http://") === 0 || link.indexOf ("https://") === 0){
            // eslint-disable-next-line react-hooks/rules-of-hooks

            (!modoEdicion) ? crearTarea() : actualizarTarea()

          } else { dispatch(mensajeErrorAccion('Escribir Link valido, Ej: https://ejemplo.com')) }
        }
        else {
          (!modoEdicion) ? crearTarea() : actualizarTarea()
        }
    }

    function crearTarea() {
      const id = shortid.generate()
      dispatch(crearTareaAccion(id, tarea, descripcion, link ))
      limpiarState()
    }

    const actualizarTarea = () =>{
        dispatch(actualizarTareaAccion(id, tarea, descripcion, link, form.status ))
        limpiarState()
    }

    const cargarDatos = () =>{
      dispatch(cargarDatosAccion(id,tarea, descripcion, link, form.status))
    }

    const limpiarState = () =>{
        setTarea('');
        setDescripcion('');
        setLink('');
        setModoEdicion(false);
        dispatch(mensajeErrorAccion(null))
    }

    return (
        <div className="row px-3">
            <h4 className="text-center parrafo-color">
              {
                modoEdicion ? 'Editar Item' : 'Agregar Item'
              }
            </h4>

            <form onSubmit={ validarTarea } className="form w-100">
                {
                  error ? (
                    <span className="text-danger">{error}</span>
                  ) : null
                }
                <div className="form-group">
                    <input type="text"
                    className="form-control mb-2"
                    placeholder="Ingrese titulo"
                    onChange={ e => setTarea(e.target.value)}
                    value={form.tarea}
                    />
                </div>
                <div className="form-group">
                    <textarea
                    className="form-control mb-2"
                    rows="3"
                    placeholder="Descripción ..."
                    onChange={ e => setDescripcion(e.target.value)}
                    value={form.descripcion}
                    />
                </div>

                <div className="form-group">
                    <input type="text"
                    className="form-control mb-2"
                    placeholder="Agrega un link"
                    onChange={ e => setLink(e.target.value)}
                    value={form.link}
                    />
                </div>
                {
                  modoEdicion ? (
                    <>
                    <div className="row justify-content-md-center">
                      <button className="button-warning col-4 mx-2" type="submit">Editar</button>
                      <button className="button-danger col-4 mx-2" onClick={()=> {}}>Cancelar</button>
                    </div>
                    </>
                  ) : (
                    <button className="button-default px-5 mx-auto" type="submit">Agregar</button>
                  )
                }
            </form>
        </div>
    )
}

export default Sidebar

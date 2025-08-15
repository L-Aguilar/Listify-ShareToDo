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
    const [archivo, setArchivo] = useState(form.archivo);
    const [nombreArchivo, setNombreArchivo] = useState(form.nombreArchivo);

    useEffect(() => {
      if(editar){
        setId(form.id)
        setTarea(form.tarea);
        setDescripcion(form.descripcion);
        setLink(form.link);
        setArchivo(form.archivo);
        setNombreArchivo(form.nombreArchivo);
        setModoEdicion(true)
        dispatch(editarAccion(false))
      }
    }, [editar])

    useEffect(() => {
      cargarDatos()
    }, [tarea, descripcion, link, archivo, nombreArchivo])

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
      dispatch(crearTareaAccion(id, tarea, descripcion, link, false, archivo, nombreArchivo ))
      limpiarState()
    }

    const actualizarTarea = () =>{
        dispatch(actualizarTareaAccion(id, tarea, descripcion, link, form.status, archivo, nombreArchivo ))
        limpiarState()
    }

    const cargarDatos = () =>{
      dispatch(cargarDatosAccion(id,tarea, descripcion, link, form.status, archivo, nombreArchivo))
    }

    const limpiarState = () =>{
        setTarea('');
        setDescripcion('');
        setLink('');
        setArchivo(null);
        setNombreArchivo('');
        setModoEdicion(false);
        dispatch(mensajeErrorAccion(null))
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validar tipo de archivo
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (allowedTypes.includes(file.type)) {
                // Validar tamaño (máximo 5MB)
                if (file.size <= 5 * 1024 * 1024) {
                    setArchivo(file);
                    setNombreArchivo(file.name);
                } else {
                    dispatch(mensajeErrorAccion('El archivo es demasiado grande. Máximo 5MB permitido.'));
                }
            } else {
                dispatch(mensajeErrorAccion('Tipo de archivo no permitido. Solo se permiten: PDF, imágenes, documentos de texto y Word.'));
            }
        }
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

                <div className="form-group">
                    <label className="form-label mb-2">Archivo adjunto (opcional)</label>
                    <div className="custom-file-upload">
                        <input 
                            type="file"
                            id="fileInput"
                            className="file-input-hidden"
                            onChange={handleFileChange}
                            accept=".pdf,.jpg,.jpeg,.png,.gif,.txt,.doc,.docx"
                        />
                        <label htmlFor="fileInput" className="file-input-label">
                            {nombreArchivo ? (
                                <div className="file-selected">
                                    {archivo && archivo.type.startsWith('image/') ? (
                                        <img 
                                            src={URL.createObjectURL(archivo)} 
                                            alt="Preview" 
                                            className="file-thumbnail"
                                        />
                                    ) : (
                                        <div className="file-icon">
                                            {archivo && archivo.type === 'application/pdf' ? (
                                                <i className="fas fa-file-pdf"></i>
                                            ) : (
                                                <i className="fas fa-file"></i>
                                            )}
                                        </div>
                                    )}
                                    <span className="file-name">{nombreArchivo}</span>
                                    <button 
                                        type="button" 
                                        className="file-remove-btn"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setArchivo(null);
                                            setNombreArchivo('');
                                        }}
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            ) : (
                                <div className="file-placeholder">
                                    <i className="fas fa-cloud-upload-alt"></i>
                                    <span>Subir archivo</span>
                                </div>
                            )}
                        </label>
                    </div>
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

import React, {useState, useEffect} from 'react';
import '../App.scss';
import '../scss/main.scss';
import Lista from './Lista';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Filtros from './Filtros';
import { useToasts } from 'react-toast-notifications'

import {eliminarListaAccion, crearListaAccion, actualizarListaAccion} from '../redux/listaDucks'

import {useDispatch, useSelector} from 'react-redux'

function NewList() {

const nombreLista = useSelector(store => store.lista.lista_nombre)
const listaCreada = useSelector(store => store.lista.lista_creada)
const lista_data = useSelector(store => store.lista.lista_data)
const tareas = useSelector(store => store.tareas.lista_tareas)
const mensaje = useSelector(store => store.lista.mensaje)
const msj_count = useSelector(store => store.lista.msj_count)
const dispatch = useDispatch()

const { addToast } = useToasts();
const [box, setBox] = useState(true);
const [privado, setPrivado] = useState(false);

const crear = async (e) => {
  if(nombreLista.length > 0){

      if(tareas.length > 0){
        dispatch(crearListaAccion(tareas,privado, box))          
      }else{
        console.log('Agrega Items a la lista');
      }

  }else{
    console.log('Agregar nombre a la lista')
  }
}

const actualizarLista = () => {
  dispatch(actualizarListaAccion(lista_data,tareas,privado,box)) 
}

const deleteLista = () => {
  dispatch(eliminarListaAccion(lista_data))
}

useEffect(() => {
  if(mensaje !== null){
    addToast(mensaje, {
      appearance: 'success',
      autoDismiss: true,
    })
  }
}, [msj_count])

  return (
      <div className="container my-5">
        <h1 className="text-center color-white">SimpList</h1>
        <h5 className="text-center parrafo-color">Crea y comparte listas en un par de minutos.</h5>
        <div className="separator block"></div>
        <div className="row mt-5">
          <div className="col-8 mt-5">

            <Topbar/>     
            <Filtros />
            <Lista
              box={box}
            />

            <div className="row mt-5 justify-content-md-center align-items-center">
              {
                listaCreada &&
                  <div className="col-sm-10">
                    <span className="parrafo-color text-center">Link para compartir</span>
                    <input type="text" readOnly className="form-control-plaintext text-center" value={`${window.location.hostname}/list/${lista_data.id}`}/>
                  </div>
              }
                <div className="separator"></div>
                <div className="row w-100 justify-content-md-center">
                  <div className="col-3 pl-5">
                      <span className="parrafo-color">Privado</span>
                      <label className="switch ml-3">
                          <input type="checkbox" className="default" checked={privado} onChange={(e)=> setPrivado(e.target.checked)}/>
                          <span className="slider round"></span>
                      </label>
                  </div>
                  <div className="col-3">
                      <span className="parrafo-color">Checkbox</span>
                      <label className="switch ml-3">
                          <input type="checkbox" className="default" checked={box} onChange={(e)=> setBox(e.target.checked)}/>
                          <span className="slider round"></span>
                      </label>
                  </div>
                </div>
                <div className="row w-50 mt-4">
                  {
                    listaCreada ? (
                      <>
                      <button className="button-default btn-block mb-4" onClick={() => actualizarLista()}>Guardar</button>
                      <a className="text-danger nav-link mx-auto" onClick={() => deleteLista()}>Eliminar</a>
                      </>
                    ):(
                      <button className="button-default btn-block" onClick={() => crear()}>Crear</button>
                    )
                  }
                  
                </div>
            </div>

          </div>
          <div className="col-4 mt-5">

            <Sidebar/>

          </div>
        </div>
      </div>
  );
}

export default NewList;

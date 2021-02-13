import {firebase} from '../firebase'


//const

const db = firebase.firestore();

const dataInicial = {
    lista_creada:false,
    loading: false,
    tareas:[],
    lista_config:'',
    mensaje: null,
    msj_count:0
}

//Type
const LOADING = 'LOADING'
const NOMBRE_LISTA = 'NOMBRE_LISTA'
const CREAR_LISTA = 'CREAR_LISTA'
const MENSAJE_GENERAL = 'MENSAJE_GENERAL'
const OBTENER_LISTA = 'OBTENER_LISTA'
const ELIMINAR_LISTA = 'ELIMINAR_LISTA'

//Reducer
export default function listaReducer(state = dataInicial, action ){
    switch (action.type) {
        case LOADING:
            return {...state, loading: true}
        case NOMBRE_LISTA:
            return {...state, lista_nombre: action.payload}
        case CREAR_LISTA:
            return {...state, lista_data: action.payload, lista_creada:true, mensaje: 'Lista creada correctamente', msj_count: state.msj_count + 1}
        case OBTENER_LISTA:
            return {...state, loading: false, tareas: action.payload.tareas, lista_config: action.payload.config}
        case MENSAJE_GENERAL:
            return {...state, mensaje: action.payload, msj_count: state.msj_count + 1}
        default:
            return {...state}
    }
}

//Acciones
export const nombreListaAccion = (nombreLista) => (dispatch) => {
    dispatch({
        type: NOMBRE_LISTA,
        payload:nombreLista
    })
}

export const crearListaAccion = (tareas, privado, box) => async (dispatch, getState) => {
  
    const {lista_nombre} = getState().lista

    try {
        const db = firebase.firestore();
        const nuevaLista = {
          nameList : lista_nombre, 
          private: privado,
          box: box,
          user: 'allUser',
          fecha: Date.now()
        }
        
        const dataLista = await db.collection('Listas').add(nuevaLista);
        await tareas.map(tarea => (db.collection('Listas').doc(dataLista.id).collection('tareas').add(tarea)));

        dispatch({
            type: CREAR_LISTA,
            payload: dataLista
        })

      } catch (error) {
        console.log(error);
      }
}

export const obtenerListaAccion = (lista_id) => async (dispatch) => {

    dispatch({
        type:LOADING
    })

    const tareas = await db.collection('Listas').doc(lista_id);
    const lista_config = await tareas.get()

    tareas.collection('tareas').onSnapshot(function(doc) {
        var allTareas = [];
        doc.forEach(function(doc) {
            allTareas.push(doc.data())
        });
        dispatch({
            type:OBTENER_LISTA,
            payload: { tareas: allTareas , config: lista_config.data() }
        })
    });
}

export const actualizarListaAccion = (lista_data,tareas, privado, box) => async (dispatch, getState) => {
     const {lista_nombre} = getState().lista

     dispatch({
        type:LOADING
    })

    try {
        const updateData = await db.collection('Listas').doc(lista_data.id);
        updateData.update({
          nameList : lista_nombre, 
          private: privado,
          box: box
        })
        
        await updateData.collection('tareas').get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              let id_tarea = doc.data().id;
              tareas.map(tarea => {
                if(id_tarea === tarea.id){
                    console.log(tarea)
                    updateData.collection('tareas').doc(doc.id).update({
                        id: tarea.id,
                        tarea: tarea.tarea,
                        descripcion: tarea.descripcion,
                        link: tarea.link,
                        status: tarea.status
                      })
                    tareas = tareas.filter(tarea => tarea.id !== id_tarea);
                    console.log(tareas)
                }
              });
          });
        });

        console.log(tareas.length)

        if(tareas.length >= 1){
            tareas.map(tarea => (updateData.collection('tareas').add(tarea)));
        }

        dispatch({
            type: MENSAJE_GENERAL,
            payload: 'Lista actualizada correctamente'
        })

  
      } catch (error) {
        console.log(error)
      }
}

export const eliminarListaAccion = (lista_data) => async (getState) => {
    try {
        alert('desea eliminar');
        await db.collection('Listas').doc(lista_data.id).delete();
        window.location = "/newList";
      } catch (error) {
        console.log(error)
      }
}
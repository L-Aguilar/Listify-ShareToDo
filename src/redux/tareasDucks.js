import {firebase} from '../firebase'
const db = firebase.firestore();
const dataInicial = {
    loading: false,
    lista_tareas:[],
    data_form:{
        id:'',
        tarea:'',
        descripcion:'',
        link:'',
        status:'',
        archivo: null,
        nombreArchivo: '',
        categoria: 'trabajo',
        prioridad: 'media'
    },
    editar:false,
    error:null,
    filtros: {
        categoria: 'todas',
        prioridad: 'todas',
        texto: ''
    }
}

//Type
const LOADING = 'LOADING'
const EDITAR = 'EDITAR'
const CARGAR_DATOS = 'CARGAR_DATOS'
const CREAR_TAREA = 'CREAR_TAREA'
const ACTUALIZAR_TAREA = 'EDITAR_TAREA'
const ACTUALIZAR_STATUS = 'ACTUALIZAR_STATUS'
const LIMPIAR_FORM = 'LIMPIAR_FORM'
const MENSAJE_ERROR = 'MENSAJE_ERROR'
const ELIMINAR_TAREA = 'ELIMINAR_TAREA'
const ACTUALIZAR_FILTROS = 'ACTUALIZAR_FILTROS'
const LIMPIAR_FILTROS = 'LIMPIAR_FILTROS'

//Reducer
export default function tareaReducer(state = dataInicial, action ){
    switch (action.type) {
        case LOADING:
            return {...state, loading: true}
        case EDITAR:
            return {...state, editar: action.payload}
        case CARGAR_DATOS:
            return {...state, data_form: action.payload};
        case CREAR_TAREA:
            return {...state, loading: false, lista_tareas: state.lista_tareas.concat(action.payload) }
        case ACTUALIZAR_TAREA:
            return {...state, lista_tareas: state.lista_tareas.map(
                item => item.id === action.payload.id ? action.payload : item
              )};
        case LIMPIAR_FORM:
            return {...state, data_form: action.payload, editar: false};
        case ELIMINAR_TAREA:
            return {...state, lista_tareas: action.payload}
        case MENSAJE_ERROR:
            return{...state, error: action.payload}
        case ACTUALIZAR_FILTROS:
            return{...state, filtros: {...state.filtros, ...action.payload}}
        case LIMPIAR_FILTROS:
            return{...state, filtros: {categoria: 'todas', prioridad: 'todas', texto: ''}}
        default:
            return {...state};
    }
}

//Acciones

export const editarAccion = (editar) => (dispatch) => {
    dispatch({
        type: EDITAR,
        payload: editar
    })
}

export const cargarDatosAccion = (id, tarea, descripcion, link, status, archivo, nombreArchivo, categoria, prioridad) => (dispatch) => {
    dispatch({
        type: CARGAR_DATOS,
        payload:{id, tarea, descripcion, link, status, archivo, nombreArchivo, categoria, prioridad}
    })
}

export const crearTareaAccion = (id, tarea, descripcion, link, status = false, archivo = null, nombreArchivo = '', categoria = 'trabajo', prioridad = 'media') => (dispatch) => {
    dispatch({
        type:CREAR_TAREA,
        payload: {
            id, tarea, descripcion, link, status, archivo, nombreArchivo, categoria, prioridad
        }
    })
    dispatch(limpiarFormAccion())
}

export const actualizarTareaAccion = (id, tarea, descripcion, link, status, archivo, nombreArchivo, categoria, prioridad) => (dispatch) => {
    dispatch({
        type: ACTUALIZAR_TAREA,
        payload:{id, tarea, descripcion, link, status, archivo, nombreArchivo, categoria, prioridad}
    })
}

export const limpiarFormAccion = () => (dispatch) => {
    dispatch({
        type: LIMPIAR_FORM,
        payload: {
            id:'',
            tarea:'',
            descripcion:'',
            link:'',
            archivo: null,
            nombreArchivo: '',
            categoria: 'trabajo',
            prioridad: 'media'
        }
    })
}

export const actualizarFiltrosAccion = (filtros) => (dispatch) => {
    dispatch({
        type: ACTUALIZAR_FILTROS,
        payload: filtros
    })
}

export const limpiarFiltrosAccion = () => (dispatch) => {
    dispatch({
        type: LIMPIAR_FILTROS
    })
}

export const actualizarStatusAccion = (event,tarea,listaId) => async (dispatch, getState) => {
    dispatch({
        type:LOADING
    })
    try {
        const tareas = await db.collection('Listas').doc(listaId);
        await tareas.collection('tareas').onSnapshot(function(doc) {
            doc.forEach(function(doc) {
                let data = doc.data();
                if(data.id === tarea.id){
                    tareas.collection('tareas').doc(doc.id).update({
                        status: !event
                    })
                    tarea.id = null 
                }
            });
        });

    } catch (error) {
        console.log(error)
    }
}

export const eliminarTareaAccion = (id) => async (dispatch, getState) => {
    const {lista_data} = getState().lista
    const {lista_creada} = getState().lista
    const {lista_tareas} = getState().tareas

    if(lista_creada){
        const deleteTarea = await db.collection('Listas').doc(lista_data.id);
        await deleteTarea.collection('tareas').get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                const tarea = doc.data()
                if(tarea.id === id){
                    deleteTarea.collection('tareas').doc(doc.id).delete();
                    let tareas_nuevas = lista_tareas.filter(function(item) {
                        return item.id !== id
                    })
                    dispatch({
                        type: ELIMINAR_TAREA,
                        payload: tareas_nuevas
                    })
                }
            });
        });

        
    }else{
        let tareas_nuevas = lista_tareas.filter(function(item) {
            return item.id !== id
        })
        dispatch({
            type: ELIMINAR_TAREA,
            payload: tareas_nuevas
        })
    }
}

export const mensajeErrorAccion = (mensaje) => (dispatch) => {
    dispatch({
        type: MENSAJE_ERROR,
        payload: mensaje
    })
}

// Selector para obtener tareas filtradas
export const getTareasFiltradas = (state) => {
    const { lista_tareas, filtros } = state.tareas;
    
    if (!lista_tareas || lista_tareas.length === 0) {
        return [];
    }
    
    return lista_tareas.filter(tarea => {
        // Filtro por categoría
        if (filtros.categoria !== 'todas' && tarea.categoria !== filtros.categoria) {
            return false;
        }
        
        // Filtro por prioridad
        if (filtros.prioridad !== 'todas' && tarea.prioridad !== filtros.prioridad) {
            return false;
        }
        
        // Filtro por texto
        if (filtros.texto && filtros.texto.trim() !== '') {
            const texto = filtros.texto.toLowerCase();
            const titulo = (tarea.tarea || '').toLowerCase();
            const descripcion = (tarea.descripcion || '').toLowerCase();
            
            if (!titulo.includes(texto) && !descripcion.includes(texto)) {
                return false;
            }
        }
        
        return true;
    });
};
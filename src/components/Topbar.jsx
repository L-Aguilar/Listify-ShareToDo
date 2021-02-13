import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {nombreListaAccion} from '../redux/listaDucks'

function Topbar() {
  const dispatch = useDispatch()

    const defaultForm = (e) =>{
        e.preventDefault()
    }

    const [nombreLista, setNombreLista] = useState('')
  

    useEffect(() => {
      dispatch(nombreListaAccion(nombreLista))
      
    }, [nombreLista])

    return (
        <div className="row align-items-center nombre">
            <div className="col-12 mb-4">
            <h4 className="parrafo-color">Nombre:</h4>
              <form onSubmit={defaultForm} className="form w-100">
                <div className="form-group">
                    <input type="text"
                    className="form-control mb-2"
                    placeholder="Ingrese nombre de la lista"
                    onChange={ e => setNombreLista(e.target.value)}
                    value={nombreLista}
                    />
                </div>
              </form>
            </div>
          </div>
    )
}

export default Topbar

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actualizarFiltrosAccion, limpiarFiltrosAccion, getTareasFiltradas } from '../redux/tareasDucks';
import { FILTROS_CATEGORIAS, FILTROS_PRIORIDADES } from '../constants/categories';

function Filtros() {
    const dispatch = useDispatch();
    const filtros = useSelector(store => store.tareas.filtros);
    const tareasFiltradas = useSelector(getTareasFiltradas);
    const todasLasTareas = useSelector(store => store.tareas.lista_tareas);

    const handleCategoriaChange = (e) => {
        dispatch(actualizarFiltrosAccion({ categoria: e.target.value }));
    };

    const handlePrioridadChange = (e) => {
        dispatch(actualizarFiltrosAccion({ prioridad: e.target.value }));
    };

    const handleTextoChange = (e) => {
        dispatch(actualizarFiltrosAccion({ texto: e.target.value }));
    };

    const limpiarFiltros = () => {
        dispatch(limpiarFiltrosAccion());
    };

    // Verificar si hay filtros activos
    const hayFiltrosActivos = filtros.categoria !== 'todas' || filtros.prioridad !== 'todas' || filtros.texto.trim() !== '';

    return (
        <div className="filtros-container mb-4">
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h6 className="mb-0">
                        <i className="fas fa-filter me-2"></i>
                        Filtros
                    </h6>
                    <div className="filtros-info">
                        <small className="text-muted">
                            Mostrando {tareasFiltradas.length} de {todasLasTareas.length} tareas
                            {hayFiltrosActivos && (
                                <span className="ms-2 badge bg-primary">
                                    <i className="fas fa-filter me-1"></i>
                                    Filtros activos
                                </span>
                            )}
                        </small>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-3 mb-3">
                            <label className="form-label">Categoría</label>
                            <select 
                                className="form-select form-select-sm" 
                                value={filtros.categoria} 
                                onChange={handleCategoriaChange}
                            >
                                {FILTROS_CATEGORIAS.map(([key, cat]) => (
                                    <option key={key} value={key}>
                                        {cat.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="col-md-3 mb-3">
                            <label className="form-label">Prioridad</label>
                            <select 
                                className="form-select form-select-sm" 
                                value={filtros.prioridad} 
                                onChange={handlePrioridadChange}
                            >
                                {FILTROS_PRIORIDADES.map(([key, prio]) => (
                                    <option key={key} value={key}>
                                        {prio.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Buscar texto</label>
                            <input 
                                type="text" 
                                className="form-control form-control-sm" 
                                placeholder="Buscar en título o descripción..."
                                value={filtros.texto} 
                                onChange={handleTextoChange}
                            />
                        </div>
                        
                        <div className="col-md-2 mb-3 d-flex align-items-end">
                            <button 
                                className={`btn btn-sm w-100 ${hayFiltrosActivos ? 'btn-warning' : 'btn-outline-secondary'}`}
                                onClick={limpiarFiltros}
                                title="Limpiar filtros"
                                disabled={!hayFiltrosActivos}
                            >
                                <i className="fas fa-times me-1"></i>
                                Limpiar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Filtros;

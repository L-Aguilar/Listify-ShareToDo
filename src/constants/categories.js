// Constantes para categorías
export const CATEGORIAS = {
    trabajo: {
        nombre: 'Trabajo',
        color: '#007bff',
        bgColor: '#e3f2fd',
        icon: 'fas fa-briefcase'
    },
    personal: {
        nombre: 'Personal',
        color: '#28a745',
        bgColor: '#e8f5e8',
        icon: 'fas fa-user'
    },
    urgente: {
        nombre: 'Urgente',
        color: '#dc3545',
        bgColor: '#ffeaea',
        icon: 'fas fa-exclamation-triangle'
    },
    proyecto: {
        nombre: 'Proyecto',
        color: '#6f42c1',
        bgColor: '#f3e5f5',
        icon: 'fas fa-project-diagram'
    },
    casa: {
        nombre: 'Casa',
        color: '#fd7e14',
        bgColor: '#fff3e0',
        icon: 'fas fa-home'
    }
};

// Constantes para prioridades
export const PRIORIDADES = {
    alta: {
        nombre: 'Alta',
        color: '#dc3545',
        bgColor: '#ffeaea',
        icon: 'fas fa-arrow-up',
        nivel: 3
    },
    media: {
        nombre: 'Media',
        color: '#ffc107',
        bgColor: '#fff8e1',
        icon: 'fas fa-minus',
        nivel: 2
    },
    baja: {
        nombre: 'Baja',
        color: '#28a745',
        bgColor: '#e8f5e8',
        icon: 'fas fa-arrow-down',
        nivel: 1
    }
};

// Opciones para filtros
export const FILTROS_CATEGORIAS = [
    { value: 'todas', label: 'Todas las categorías' },
    { value: 'trabajo', label: 'Trabajo' },
    { value: 'personal', label: 'Personal' },
    { value: 'urgente', label: 'Urgente' },
    { value: 'proyecto', label: 'Proyecto' },
    { value: 'casa', label: 'Casa' }
];

export const FILTROS_PRIORIDADES = [
    { value: 'todas', label: 'Todas las prioridades' },
    { value: 'alta', label: 'Alta' },
    { value: 'media', label: 'Media' },
    { value: 'baja', label: 'Baja' }
];

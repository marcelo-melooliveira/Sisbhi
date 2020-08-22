

export const modificaEmail = (texto) => {

    
    return {
        type: 'salva_bacia',
        payload: texto
    }
}


export const indicadorescheck = (texto) => {

    
    return {
        type: 'indicadores_check',
        payload: texto
    }
}

export const salvacidades = (texto) => {

    
    return {
        type: 'salva_cidades',
        payload: texto
    }
}

export const salva_dadosindicadores = (texto) => {

    
    return {
        type: 'dadosindicadores',
        payload: texto
    }
}


export const salva_indicadoresfinal = (texto) => {

    
    return {
        type: 'salvaindicadoresfinal',
        payload: texto
    }
}



export const salva_dadoscidades = (texto) => {

    
    return {
        type: 'salvadadoscidades',
        payload: texto
    }
}

export const salva_ambiental = (texto) => {

    
    return {
        type: 'ambiental',
        payload: texto
    }
}

export const salva_social = (texto) => {

    
    return {
        type: 'social',
        payload: texto
    }
}

export const salva_economica = (texto) => {

    
    return {
        type: 'economica',
        payload: texto
    }
}

export const salva_final = (texto) => {

    
    return {
        type: 'final',
        payload: texto
    }
}

export const tamanho_vetor = (texto) => {

    
    return {
        type: 'tamanho_vetor',
        payload: texto
    }
}

export const resetar = () => {

    
    return {
        type: 'resetar_valores',
        
    }
}



import { 
    SALVA_BACIA
} from '../actions/types';


const INITIAL_STATE = {
   nome: 'marcelo melo',
   bacia: 'teste',
   indicadores_check: [],  
   cidades_escolhidas: [],
   dados_indicadores: [],
   dados_cidades: [],
   verificar: 0,
   ambiental: [],
   social: [],
   economico: [],
   final: [],
   tamanho: 0,

}

export default (state = INITIAL_STATE, action) => {
    console.log('dentro do reducer');
    console.log(action.payload);
   

    switch(action.type){
        case 'salva_bacia':
        return { ...state, bacia: action.payload }

        case 'indicadores_check':
        return { ...state, indicadores_check: action.payload }

        case 'salva_cidades':
        return { ...state, cidades_escolhidas: action.payload }

        case 'dadosindicadores':
        return { ...state, dados_indicadores: action.payload }

        case 'salvaindicadoresfinal':
        return { ...state, dados_indicadores: action.payload, verificar:1 }

        case 'salvadadoscidades':
        return { ...state, dados_cidades: action.payload }

        case 'ambiental':
        return { ...state, ambiental: action.payload }

        case 'social':
        return { ...state, social: action.payload }

        case 'economica':
        return { ...state, economico: action.payload }

        case 'final':
        return { ...state, final: action.payload }

        case 'tamanho_vetor':
        return { ...state, tamanho: action.payload }

        case 'resetar_valores':
        return { ...state,  verificar: 0 }

        default:
            return state;
    }
    
        

}
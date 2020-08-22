import firebase from 'firebase';
//import b64 from 'base-64';
import _ from 'lodash';

import { 
    LISTA_CONTATO_USUARIO
} from './types';

export const contatosUsuarioFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        //let emailUsuarioB64 = b64.encode( currentUser.email );

        //firebase.database().ref(`/usuario_contatos/${emailUsuarioB64}`)

        firebase.database().ref(`/Comites/Bacias/CE1/Cidades`)
            .once("value", snapshot => {
                dispatch({ type: LISTA_CONTATO_USUARIO, payload: snapshot.val() })
            })
    }
    //console.log("chegou na função");
}
import React from 'react';
import {View, Text, ImageBackground, ActivityIndicator, Button, ScrollView } from 'react-native';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {salva_ambiental, salva_social, salva_economica, salva_final, tamanho_vetor} from '../actions/AutenticacaoActions';



 class resultadosPage extends React.Component {
    static navigationOptions = {
        title: 'Resultados',
        headerStyle: {
        backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold',
        }
  
      }

      constructor(){
        super();
  
        this.state = {
            dadosLista:[],
            loading: true,
            ambiental:[],
            social:[],
            economica:[],
            tamanho: 1846
           
           
            
        }
    }

    componentDidMount(){

        // relacao = 1 é positiva e 2 é negativa
        //dimensao = 1 é ambienta, 2 é social e 3 é economica
      
        this.buscaparamentros();  
       // this.setState({loading: false});   
                      
    }


    //console.log(this.props.navigation.state.params.bacia);

   
    
    
   buscaparamentros(){
        dados = this.props.dados_indicadores;
        let cidades = this.props.cidades_escolhidas;
        let dados_recolhidos = this.props.dados_cidades;
        maior = [];
        menor = [];
        dados_finais = dados;
        dimensao_ambiental =[];
        dimensao_social = [];
        dimensao_economica = [];
        
        let aux = {v:10, name:"zero"};
        let vetor_ambiental = [];
        let vetor_social = [];
        let vetor_economico = [];
        let vetor_final = [];
        
       let i=0;
       let j=0;


      

    console.log("função dos indicadores*******");
    console.log(dados);
     

        for(i=0;i<dados.length;i++){
            vetor_ambiental.push(Object.assign({}, aux));
            vetor_social.push(Object.assign({}, aux));
            vetor_economico.push(Object.assign({}, aux));
            vetor_final.push(Object.assign({}, aux));
            
        }
        
        for(i=0;i<dados_recolhidos.length;i++){
            vetor_ambiental[i].name = dados_recolhidos[i];
            vetor_social[i].name = dados_recolhidos[i];
            vetor_economico[i].name = dados_recolhidos[i];
            vetor_final[i].name = dados_recolhidos[i];
        }

      

      

        for(i=0; i<dados[0].length ; i++){


            maior.push(dados[0][i].valor);
            menor.push(dados[0][i].valor);
            
        }

      

        
        for(j=0; j<maior.length ; j++){
            
                for(i=0; i<dados.length; i++){
                    dados[i][j].valor = parseFloat(dados[i][j].valor);

                    if(dados[i][j].valor > 0 ){

                        if(dados[i][j].valor > maior[j]){
                            maior[j] = dados[i][j].valor;
                        }


                        if(dados[i][j].valor < menor[j]){
                            menor[j] = dados[i][j].valor;
                        }
                   
                

                }

        }

    }



        for(i=0; i<maior.length; i++){
            maior[i] = parseFloat(maior[i]);
            menor[i] = parseFloat(menor[i]);
        }


        for(j=0; j<maior.length ; j++){
            
            for(i=0; i<dados.length; i++){

             let valor = 0;
             let valor2 = 0;
             let valor3 = 0;


                if(dados[i][j].valor == -1){
                   
                    dados[i][j].valor = 0;
                   // console.log("teve -1");
                    
                }else {
                
                    if(dados[i][j].relacao == 1){
                        
                        
                        valor2 = (dados[i][j].valor) - menor[j];
                        valor3 = maior[j] - menor[j]; 
                        valor = valor2 / valor3;
                        dados[i][j].valor = parseFloat(valor);
                        
                       
                    } else if(dados[i][j].relacao == 2){

                        valor2 = maior[j] - (dados[i][j].valor);
                        valor3 = maior[j] - menor[j]; 
                        valor = valor2 / valor3;
                        dados[i][j].valor = parseFloat(valor);
                       
                        
                    }
                }

            }

        }
       
       

       for(i=0; i<dados.length ; i++){
           let cont1 = 0;
           let cont2 = 0;
           let cont3 = 0;
           let amb =0;
           let soc =0;
           let econ = 0;
            
            for(j=0; j<maior.length; j++){

                if(dados[i][j].dimensao == 1){
                    amb = amb + dados[i][j].valor;
                    cont1++;

                }
                if(dados[i][j].dimensao == 2){
                    soc = soc + dados[i][j].valor;
                    cont2++;
                }
                if(dados[i][j].dimensao == 3){
                    econ = econ + dados[i][j].valor;
                    cont3++;
                }


                if(j == ((maior.length) - 1)){

                   let calcula = amb/cont1;
                    calcula = parseFloat(calcula.toFixed(2));
                    dimensao_ambiental.push(calcula);


                  let calcula2 = soc/cont2;
                    calcula2 = parseFloat(calcula2.toFixed(2));
                    dimensao_social.push(calcula2);



                   let calcula3 = econ/cont3;
                    calcula3 = parseFloat(calcula3.toFixed(2));
                    dimensao_economica.push(calcula3);


                    //dados_dimensionados[i][0].ambiental = amb / cont1;
                    //dados_dimensionados[i][0].social = soc / cont2;
                    //dados_dimensionados[i][0].economica = econ / cont3;
                }
            }

       }

       let dimensao_final = [];

       for(i=0;i<dados.length;i++){
            vetor_ambiental[i].v = dimensao_ambiental[i];
            vetor_social[i].v = dimensao_social[i];
            vetor_economico[i].v = dimensao_economica[i];
            dimensao_final.push(parseFloat(((vetor_ambiental[i].v +  vetor_social[i].v +  vetor_economico[i].v)/3).toFixed(2)));
            vetor_final[i].v = parseFloat(((vetor_ambiental[i].v +  vetor_social[i].v +  vetor_economico[i].v)/3).toFixed(2));

       }

      

      console.log("dimesaofinal");
      console.log(dimensao_final);
       

       let m=0;
        let n =1;
      
       while(m<dados.length){
        

        let constvalor = dimensao_ambiental[m];
        let constvalor1 = dimensao_ambiental[n];
           
           if( constvalor < constvalor1){
               let aux1 = vetor_ambiental[m];
               vetor_ambiental[m] = vetor_ambiental[n];
               vetor_ambiental[n] = aux1;

                aux1 = dimensao_ambiental[m];
               dimensao_ambiental[m] = dimensao_ambiental[n];
               dimensao_ambiental[n] = aux1;

               m=0;
               n=1;

           }else{m++; n++;}
           
       }

       m=0;
       n =1;

       while(m<dados.length){
        

        let constvalor = dimensao_social[m];
        let constvalor1 = dimensao_social[n];
           
           if( constvalor < constvalor1){
               let aux1 = vetor_social[m];
               vetor_social[m] = vetor_social[n];
               vetor_social[n] = aux1;

                aux1 = dimensao_social[m];
               dimensao_social[m] = dimensao_social[n];
               dimensao_social[n] = aux1;

               m=0;
               n=1;

           }else{m++; n++;}
           
       }


       m=0;
       n =1;

       while(m<dados.length){
        

        let constvalor = dimensao_economica[m];
        let constvalor1 = dimensao_economica[n];
           
           if( constvalor < constvalor1){
               let aux1 = vetor_economico[m];
               vetor_economico[m] = vetor_economico[n];
               vetor_economico[n] = aux1;

                aux1 = dimensao_economica[m];
               dimensao_economica[m] = dimensao_economica[n];
               dimensao_economica[n] = aux1;

               m=0;
               n=1;

           }else{m++; n++;}
           
       }



       m=0;
       n =1;

       while(m<dados.length){
        

        let constvalor = dimensao_final[m];
        let constvalor1 = dimensao_final[n];
           
           if( constvalor < constvalor1){
               let aux1 = vetor_final[m];
               vetor_final[m] = vetor_final[n];
               vetor_final[n] = aux1;

                aux1 = dimensao_final[m];
               dimensao_final[m] = dimensao_final[n];
               dimensao_final[n] = aux1;

               m=0;
               n=1;

           }else{m++; n++;}
           
       }


       

       this.props.salva_ambiental(vetor_ambiental);
       this.props.salva_social(vetor_social);
       this.props.salva_economica(vetor_economico);
       this.props.salva_final(vetor_final);
       this.props.tamanho_vetor((dados.length)*77);

       //this.setState({ambiental:vetor_ambiental});
       //this.setState({social:vetor_social});
      // this.setState({economica:vetor_economico});
       
       
       //this.setState({loading: false});
        
    

}



    render(){

      
          setTimeout(() => {this.props.navigation.navigate('resultadosFinal')}, 1500)

        
        if (this.state.loading) {
                
            return (
 
              <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                <ActivityIndicator size="large" color="dodgerblue" />
                <Text>Processando os dados</Text>

                
                
              </View>
             
            )
           
          }
          

    }

} 




mapStateToProps = state =>(
    {
      
       
        cidades_escolhidas: state.AutenticacaoReducer.cidades_escolhidas,
        dados_indicadores: state.AutenticacaoReducer.dados_indicadores,
        dados_cidades: state.AutenticacaoReducer.dados_cidades,
        indicadores_sel:state.AutenticacaoReducer.indicadores_check
        
    }
)

export default connect(mapStateToProps, {salva_ambiental, salva_social, salva_economica, salva_final, tamanho_vetor})(resultadosPage)




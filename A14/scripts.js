const  Modal  =  {
    abrir ( )  {
        // Abrir modal
        // Adicionar uma classe ativa ao modal
        documento . querySelector ( '.modal-overlay' ) . classList . adicionar ( 'ativo' )
    } ,
    close ( )  {
        // Fechar modal
        // Remover uma classe ativa do modal
        documento . querySelector ( '.modal-overlay' ) . classList . remover ( 'ativo' )
    }
}

const  Storage  =  {
    get ( )  {
        return  JSON . parse ( localStorage . getItem ( "dev.finances: transactions" ) )  ||  [ ]
    } ,

    definir ( transações )  {
        localStorage . setItem ( "dev.finances: transactions" ,  JSON . stringify ( transações ) )
    }
}

 Transação  const =  {
    todos : armazenamento . get ( ) ,

    adicionar ( transação )  {
        Transação . tudo . push ( transação )

        App . recarregar ( )
    } ,

    remove ( index )  {
        Transação . tudo . emenda ( índice ,  1 )

        App . recarregar ( )
    } ,

    rendimentos ( )  {
        deixe  renda  =  0 ;

        Transação . tudo . forEach ( transação  =>  {
            if ( transação . valor  >  0 )  {
                renda  + =  transação . montante ;
            }
        } )
         rendimento de retorno ;
    } , 
    despesas ( )  {
        deixe  despesa  =  0 ;

        Transação . tudo . forEach ( transação  =>  {
            if ( transação . montante  <  0 )  {
                despesa  + =  transação . montante ;
            }
        } )
         despesa de retorno ;
    } , 
    total ( )  {
         Transação de retorno . rendas ( )  +  Transação . despesas ( ) ;
    }
}

const  DOM  =  {
    transactionContainer : document . querySelector ( '# data-table tbody' ) ,

    addTransaction ( transação ,  índice )  {
        const  tr  =  document . createElement ( 'tr' )
        tr . innerHTML  =  DOM . innerHTMLTransaction ( transação ,  índice )
        tr . conjunto de dados . índice  =  índice

        DOM . transactionContainer . appendChild ( tr )
    } ,

    innerHTMLTransaction ( transação ,  índice )  {
        const  CSSclass  =  transaction . quantidade  >  0 ? "receita" : "despesa"

         quantidade  const =  Utils . formatCurrency ( transação . montante )

        const  html  =  `
            <td class = "description"> $ { transação . descrição } </td>
            <td class = " $ { CSSclass } "> $ { amount } </td>
            <td class = "date"> $ { transação . data } </td>
            <td>
                <img onclick = "Transaction.remove ( $ { index } )" src = "./ assets / minus.svg" alt = "Remover Transação">
            </td>
        `

        return  html
    } , 

    updateBalance ( )  {
        documento . getElementById ( 'incomeDisplay' ) . innerHTML  =  Utils . formatCurrency ( Transação . rendas ( ) )
        documento . getElementById ( 'expensDisplay' ) . innerHTML  =  Utils . FormatCurrency ( Transaction . gastos ( ) )
        documento . getElementById ( 'totalDisplay' ) . innerHTML  =  Utils . formatCurrency ( Transaction . total ( ) )
    } , 

    clearTransactions ( )  {
        DOM . transactionContainer . innerHTML  =  ""
    }
}

const  Utils  =  {
    formatAmount ( value )  {
        valor  =  Número ( valor . substituir ( / \, \. / g ,  "" ) )  *  100

         valor de retorno
    } ,

    formatDate ( date )  {
        const  splittedDate  =  date . dividir ( "-" )

        retornar  ` $ { splittedDate [ 2 ] } / $ { splittedDate [ 1 ] } / $ { splittedDate [ 0 ] } `
    } ,
    
    formatCurrency ( value )  {
         sinal  const =  Número ( valor )  <  0 ? "-" : ""    

        valor  =  String ( valor ) . substituir ( / \ D / g ,  "" )

        valor  =  Número ( valor )  /  100

        valor  =  valor . toLocaleString ( "pt-BR" ,  {
            estilo : "moeda" ,
            moeda : "BRL"
        } )

         sinal de  retorno +  valor
    }
}

const  Form  =  {
    descrição : documento . querySelector ( 'input # description' ) ,
    montante : documento . querySelector ( 'input # amount' ) ,
    data : documento . querySelector ( 'input # date' ) ,

    getValues ( )  {
        return  {
            descrição : Formulário . descrição . valor , 
            montante : Formulário . montante . valor , 
            data : Formulário . data . valor
        }
    } ,

    validaçãoFields ( )  {
        const  { descrição , quantia , data }  =  Formulário . getValues ( )

        if ( descrição . trim ( )  ===  ""  || 
        montante . trim ( )  ===  ""  || 
        data . trim ( )  ===  "" )  {
            lançar  novo  erro ( "Por favor, preencha todos os campos" )
        }
    } ,

    formatValues ( )  {
        deixe  { descrição , quantia , data }  =  Formulário . getValues ( )

        montante  =  Utils . formatAmount ( amount )

        data  =  Utils . formatDate ( data )

        return  {
            descrição ,
            montante , 
            encontro
        }
    } ,

    clearFields ( )  {
        Formulário . descrição . valor  =  ""
        Formulário . montante . valor  =  ""
        Formulário . data . valor  =  ""
    } ,

    enviar ( evento )  {
        evento . preventDefault ( )

        tente  {
            Formulário . validFields ( )
             transação  const =  Formulário . formatValues ( )

            Transação . adicionar ( transação )

            Formulário . clearFields ( ) 
            Modal . fechar ( )
        }  catch  ( erro )  {
            alerta ( erro . mensagem )
        } 
    } 
}

const  App  =  {
    init ( )  {
        Transação . tudo . forEach ( DOM . addTransaction )
        
        DOM . updateBalance ( )

        Armazenamento . set ( Transação . tudo )
    } ,

    reload ( )  {
        DOM . clearTransactions ( )
        App . init ( )
    } ,
}

App . init ( )
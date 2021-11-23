let terminal = `<div id='background'>
                    <div id='close-page'></div>
                    <div id='terminal-init'></div>
                    <div class='terminal-top'>
                        <div class='close-terminal'></div>
                    </div>
                    <div id='title-term'>TERMINAL</div>
                    <div class='terminal-box'>
                        <div class='msg-terminal'>
                            <div class='Root'>root@this_machine</div>:<input class='input'></div>
                        </div>
                    </div>`;


let error = `<div class='msg-terminal'>
                comando inválido, tente 'commands' para ver comandos.
            </div><br>
            <div class='msg-terminal'>
                <div class='Root'>root@this_machine</div>:<input class='input'>
            </div>`;

let commands = `<div class='msg-terminal'>
                    clear ==> Limpar o terminal.
                </div><br>
                <div class='msg-terminal'>
                    whoami ==> Informa nome de usuário.
                </div><br>
                <div class='msg-terminal'>
                    washer ==> Interações com o software.
                </div><br>
                <div class='msg-terminal'>
                    commands ==> Lista os comandos existentes.
                </div><br>
                <div class='msg-terminal'>
                    <div class='Root'>root@this_machine</div>:<input class='input'>
                </div>`;

let help_list = `<div class='msg-terminal'>
                    -l     ==> Consulta o limite.
                </div><br>
                <div class='msg-terminal'>
                    -p     ==> Aumenta o limite (numero de PenDriver após, cada pendrive = `+format_value(5000)+`).
                </div><br>
                <div class='msg-terminal'>
                    -i     ==> Inicia o programa, precisa informar o valor em seguida.
                </div><br>
                <div class='msg-terminal'>
                    -h     ==> Comando para instruções.
                </div><br>
                    <div class='msg-terminal'>-q       ==> Sair do software.
                </div><br>
                <div class='msg-terminal'>-v ==>     Versão atual do software.
                </div><br>
                <div class='msg-terminal'>
                    <div class='Root'>root@this_machine</div>:<input class='input'>
                </div>`;

$(document).ready(function () {
	window.addEventListener("message", function (event) {
        switch (event.data.action) {
            case "open":
                $("#container").fadeIn(500);
            break;

            case "close":
                $("#container").fadeOut(500);
            break;
        }
	});
	document.onkeyup = function (data) {
		if (data.which == 27) {
			$.post("http://washmoney/close");
		}
	};
});

$(document).on('click','#terminal-init',function(){
    $('#background').replaceWith(terminal);
    $('.input').focus();
});

$(document).on('click','#close-page',function(){
    $.post("http://washmoney/close");
});

$(document).on('click','.close-terminal',function(){
    $('#background').replaceWith(`<div id='background'><div id='close-page'></div><div id='terminal-init'></div></div>`);
});

$(document).on('input','.input', function(){
    document.onkeydown = (data) => {
        const key = data.key;
        if (key === 'Enter') {
            $('.input').css('visibility', 'hidden');
            let frase = $('.input').val()
            const args = frase.split(' ');

            $('.input').replaceWith(' '+frase);

            if(args[0] == 'washer'){

                    if(args[1] == '-i'){
                        if (!isNaN(args[2])){

                            if (args[2] >= 20000){             
                                start_wash(args[2]);              
                            }else{
                                $('.terminal-box').append(`<div class='msg-terminal'>
                                                                Valor passado menor que o requerido (R$ 20.000,00).
                                                            </div>
                                                            <br>
                                                            <div class='msg-terminal'>
                                                                <div class='Root'>root@this_machine</div>:<input class='input'>
                                                            </div>`);
                            }

                        }else if (args[2] == '' || args[2] == null){

                            $('.terminal-box').append(`<div class='msg-terminal'>
                                                            Terceiro argumento (valor) está faltando  ==> ex: 'washer -i 20000'
                                                        </div><br>
                                                        <div class='msg-terminal'>
                                                            <div class='Root'>root@this_machine</div>:<input class='input'>
                                                        </div>`);
                        }else{

                            $('.terminal-box').append(`<div class='msg-terminal'>
                                                            O valor informado não é um número.
                                                        </div><br>
                                                        <div class='msg-terminal'>
                                                            <div class='Root'>root@this_machine</div>:<input class='input'>
                                                        </div>`);
                        }

                    }else if(args[1] == '-v'){
                        $('.terminal-box').append(`<div class='msg-terminal'>
                                                        Versão: 0.1.5
                                                    </div><br>
                                                    <div class='msg-terminal'>
                                                        <div class='Root'>root@this_machine</div>:<input class='input'>
                                                    </div>`);

                    }else if(args[1] == '-h'){
                        $('.terminal-box').append(help_list);    

                    }else if(args[1] == '-p'){

                        if (!isNaN(args[2])){
                            if (args[2] < 0){            

                                $('.terminal-box').append(`<div class='msg-terminal'>
                                                                Número de pendrivers inválido.
                                                            </div><br>
                                                            <div class='msg-terminal'>
                                                                <div class='Root'>root@this_machine</div>:<input class='input'>
                                                            </div>`);          
                            }else{
                                start_increase(args[2]);           
                            }
                        }else if (args[2] == '' || args[2] == null){

                            $('.terminal-box').append(`<div class='msg-terminal'>
                                                            Terceiro argumento (quantidade de pendrive) está faltando  ==> ex: 'washer -p 5'
                                                        </div><br>
                                                        <div class='msg-terminal'>
                                                            <div class='Root'>root@this_machine</div>:<input class='input'>
                                                        </div>`);

                        }else{
                            $('.terminal-box').append(`<div class='msg-terminal'>
                                                            O valor informado não é um número.
                                                        </div><br>
                                                        <div class='msg-terminal'>
                                                            <div class='Root'>root@this_machine</div>:<input class='input'>
                                                        </div>`);
                        }

                }else if(args[1] == '-l'){                    

                    get_limite();

                }else if(args[1] == '-q'){                    

                    $('#background').replaceWith(`<div id='background'>
                                                        <div id='close-page'></div>
                                                        <div id='terminal-init'></div>
                                                    </div>`);

                }else if(args[1] != '-l' || args[1] != '-q' || args[1] != '-p' || args[1] != '-h' || args[1] != '-v' || args[1] != '-i'){

                        if(args[1] == null || args[1] == ''){

                            $('.terminal-box').append(`<div class='msg-terminal'>
                                                            Argumentos faltando, digite 'washer -h' para ajuda.
                                                        </div><br>
                                                        <div class='msg-terminal'>
                                                            <div class='Root'>root@this_machine</div>:<input class='input'>
                                                        </div>`);
                        }else{
                            $('.terminal-box').append(`<div class='msg-terminal'>
                                                            Argumentos inválidos, digite 'washer -h' para ajuda.
                                                            </div><br>
                                                            <div class='msg-terminal'>
                                                                <div class='Root'>root@this_machine</div>:<input class='input'>
                                                            </div>`);
                        }

                }

            }else if(args[0] == 'whoami'){

                $('.terminal-box').append(`<div class='msg-terminal'>
                                                User: root (super-admin)
                                            </div><br>
                                            <div class='msg-terminal'>
                                                <div class='Root'>
                                                    root@this_machine</div>:<input class='input'>
                                                </div>
                                            </div>`);

            }else if(args[0] == 'commands'){

                $('.terminal-box').append(commands);

            }else if(args[0] == 'clear'){

                $('#background').replaceWith(terminal);

            }else{                

                $('.terminal-box').append(error);
            }
            $('.input').focus();
        }
      };
});

function washer_money(value){    
    $.post('http://washmoney/washer', JSON.stringify({value}),() => {}); 
};

function increase_limite(value){   
    $.post('http://washmoney/increase_limite', JSON.stringify({value}),(data) => {
        $('.terminal-box').append(`<div class='msg-terminal'>`
                                            + data.msg +
                                        `</div><br>
                                        <div class='msg-terminal'>
                                            Seu limite atual: `+ format_value(data.lim) +`
                                        </div><br>
                                        <div class='msg-terminal'>
                                            <div class='Root'>root@this_machine</div>:<input class='input'>
                                        </div>`);
        $('.input').focus();
    });  
};

function get_limite(){    
    $.post('http://washmoney/get_limite', JSON.stringify({}),(data) => {
        $('.terminal-box').append(`<div class='msg-terminal'>
                                        Limite atual: `+ format_value(data.lim) +
                                    `</div><br>
                                    <div class='msg-terminal'>
                                        <div class='Root'>root@this_machine</div>:<input class='input'>
                                    </div>`);
        $('.input').focus();
    });    
};


function start_wash(value){
    $('.terminal-box').append(`<div class='msg-terminal'>
                                    Iniciando sistema.
                                </div>`);
    setTimeout(function(){
        // $("<div class='msg-terminal'>").replaceWith("Iniciando sistema.     ...OK");
        $('.terminal-box').append(`<div class='msg-terminal'>
                                        Preparando módulos.
                                    </div>`);
        setTimeout(function(){
            $('.terminal-box').append(`<div class='msg-terminal'>
                                            Procurando numerações compatíveis.
                                        </div>`);
            setTimeout(function(){
                $('.terminal-box').append(`<div class='msg-terminal'>
                                                Realizando compras falsas.
                                            </div>`);
                setTimeout(function(){
                    $('.terminal-box').append(`<div class='msg-terminal'>
                                                Trasnferindo dinheiro para o seu banco.
                                            </div>`);
                    setTimeout(function(){
                        $('.terminal-box').append(`<div class='msg-terminal'>
                                                        Obrigado por usar o nosso sistema.
                                                    </div><br>
                                                    <div class='msg-terminal'>
                                                        <div class='Root'>root@this_machine</div>:<input class='input'>
                                                    </div>`);
                        $('.input').focus();
                        washer_money(value);
                    },5000);    
                },2000);                                                                                          
            },3500);                                                                                     
        },10000);                                              
    },6000);          
};              

function start_increase(value){
    $('.terminal-box').append(`<div class='msg-terminal'>
                                    Consultando Limite.
                                </div>`);
    setTimeout(function(){
        $('.terminal-box').append(`<div class='msg-terminal'>
                                        Validando Keys no PenDrive.
                                    </div>`);
        setTimeout(function(){
            $('.terminal-box').append(`<div class='msg-terminal'>
                                            Carregando Módulos
                                        </div>`);
            setTimeout(function(){
                $('.terminal-box').append(`<div class='msg-terminal'>
                                                Realizando processos.
                                            </div>`);                
                    setTimeout(function(){
                        increase_limite(value);
                },2000);                                                                                          
            },3500);                                                                                     
        },10000);                                              
    },6000);          
}


function format_value(value){
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value)
};
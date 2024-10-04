        // Função para preencher o filtro
        function preencherFiltro() {
            console.log('função chamada');
            const tabela = document.querySelector(".tabela");
            const linhas = tabela.getElementsByTagName("tr");
            const filtro = document.getElementById("filtro");
            const teamLeaders = {};

            for (let i = 1; i < linhas.length; i++) {
                const celulaNome = linhas[i].getElementsByTagName("td")[2];
                const nome = celulaNome.textContent || celulaNome.innerText;
                teamLeaders[nome] = true;
            }

            filtro.innerHTML = "<option value=''>Todos</option>";

            for (const leader in teamLeaders) {
                const opcao = document.createElement("option");
                opcao.text = leader;
                opcao.value = leader;
                filtro.add(opcao);
            }
        }

        // Função para filtrar a tabela
        function filtrarTabela() {
            const filtro = document.getElementById("filtro").value;
            const tabela = document.querySelector(".tabela");
            const linhas = tabela.getElementsByTagName("tr");

            for (let i = 1; i < linhas.length; i++) {
                const celulaNome = linhas[i].getElementsByTagName("td")[2];
                const nome = celulaNome.textContent || celulaNome.innerText;

                linhas[i].style.display = (filtro === "" || nome === filtro) ? "" : "none";
            }
        }


            function abrirMensagem() {
                document.getElementById("mensagem_confirm").style.display = "block";
            }

            function fecharMensagem() {
                document.getElementById("mensagem_confirm").style.display = "none";
            }

            function realizarAcao() {
            fecharMensagem()
            alert('Enviando dados...');
            const linhas = document.querySelectorAll('.tabela tbody tr');
            const dados = [];

            linhas.forEach(linha => {
                const idGroot = linha.cells[0].innerText;
                const nome = linha.cells[1].innerText;
                const teamLeader = linha.cells[2].innerText;
                const processoMae = linha.cells[3].innerText;
                const presenteismo = linha.cells[4].querySelector('select').value;
                const processoAtual = linha.cells[5].querySelector('select').value;
                const percentProcess = linha.cells[6].querySelector('select').value;

                dados.push({
                    id_groot: idGroot,
                    nome: nome,
                    team_leader: teamLeader,
                    processo_mae: processoMae,
                    presenteismo: presenteismo,
                    processo_atual: processoAtual,
                    percent_process: percentProcess
                });
            });

            fetch('/salvar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            })
            .then(response => {
                if (response.ok) {
                    alert("A ação foi realizada com sucesso!");
                } else {
                    console.error('Falha ao enviar dados');
                }
            })
            .catch(error => console.error('Erro:', error));
        }

        // Função para ajustar a posição do botão durante a rolagem
        window.addEventListener("scroll", function() {
            const botao = document.querySelector(".botao-lancar");
            const distanciaRight = 20;
            const novoRight = distanciaRight + "px";
            botao.style.right = novoRight;
        });

        // Função para redirecionar
        function redirecionar(rota) {
            window.location.href = rota;
        }

        // Função para mostrar ou ocultar o menu lateral
        function menu_lateral() {
            const menu = document.getElementById("menu");
            menu.style.left = (menu.style.left === "-250px") ? "0" : "-250px";
        }

        // Função para fechar o menu lateral
        function fecharMenu() {
            document.getElementById("menu").style.left = "-250px";
        }

        // Função chamada quando a seleção é alterada
        function alterarPresente(selectElement) {
            const valorSelecionado = selectElement.value;
        }

        // Função para adicionar cor no Presentísmo
        function alterarPresente(seletor) {
          var selectedOption = seletor.options[seletor.selectedIndex];
          var selectedText = selectedOption.textContent;
          var corDeFundo = '';

          // Verifica o texto selecionado e define a cor de fundo
          switch (selectedText) {
            case 'Presente':
              corDeFundo = 'green';
              break;
            case 'Falta Injustificada':
              corDeFundo = 'red';
              break;
            case 'Banco de Horas':
              corDeFundo = 'lightgreen';
              break;
            case 'Licença':
              corDeFundo = 'yellow';
              break;
            default:
              corDeFundo = ''; 
              break;
          }

          
          var td = seletor.parentElement;

          td.style.backgroundColor = corDeFundo;
        }

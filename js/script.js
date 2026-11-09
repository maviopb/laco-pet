// ==========================================
// LAÇO PET - JAVASCRIPT
// ==========================================

// 1. MENU MOBILE

const botaoMenu = document.querySelector(".menu-toggle");

const menu = document.querySelector(".nav-links");

// Abre ou fecha o menu
botaoMenu.addEventListener("click", function () {

    menu.classList.toggle("ativo");

    const aberto = menu.classList.contains("ativo");

    botaoMenu.setAttribute("aria-expanded", aberto);

    botaoMenu.setAttribute(
        "aria-label",
        aberto ? "Fechar menu" : "Abrir menu"
    );

    botaoMenu.textContent = aberto ? "✕" : "☰";

});

// Fecha o menu ao clicar nos links
const linksMenu = document.querySelectorAll(".nav-links a");

linksMenu.forEach(function (link) {

    link.addEventListener("click", function () {

        menu.classList.remove("ativo");

        botaoMenu.textContent = "☰";

        botaoMenu.setAttribute("aria-expanded", "false");

        botaoMenu.setAttribute("aria-label", "Abrir menu");

    });

});


// ==========================================
// 2. VÍDEO DO HERO
// ==========================================

const videoHero = document.getElementById("videoHero");

if (videoHero) {

    // Garante que o vídeo fique sem som
    videoHero.muted = true;

    // Mantém a reprodução contínua
    videoHero.loop = true;

    // Tenta iniciar o vídeo
    const reproducao = videoHero.play();

    if (reproducao !== undefined) {

        reproducao.catch(function () {

            console.log(
                "Reprodução automática bloqueada pelo navegador."
            );

        });

    }

}


// ==========================================
// 3. ROLAGEM SUAVE
// ==========================================

const linksInternos = document.querySelectorAll('a[href^="#"]');

linksInternos.forEach(function (link) {

    link.addEventListener("click", function (evento) {

        const destinoId = link.getAttribute("href");

        if (!destinoId || destinoId === "#") {
            return;
        }

        const destino = document.querySelector(destinoId);

        if (destino) {

            evento.preventDefault();

            const movimentoReduzido = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            destino.scrollIntoView({
                behavior: movimentoReduzido ? "auto" : "smooth"
            });

        }

    });

});

// ==========================================
// ANIMAÇÃO DOS CARDS DE SERVIÇOS
// ==========================================

const cardsServicos = document.querySelectorAll(".servico-card");

// Respeita a preferência de movimento reduzido
const reduzirMovimento = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (!reduzirMovimento && "IntersectionObserver" in window) {

    // Prepara os cards
    cardsServicos.forEach(function (card) {
        card.classList.add("card-animavel");
    });

    // Observa quando entram na tela
    const observadorCards = new IntersectionObserver(
        function (entradas, observador) {

            entradas.forEach(function (entrada) {

                if (entrada.isIntersecting) {

                    entrada.target.classList.add("visivel");

                    observador.unobserve(entrada.target);
                }

            });

        },
        {
            threshold: 0.1
        }
    );

    // Inicia a observação
    cardsServicos.forEach(function (card) {
        observadorCards.observe(card);
    });

}

// ==========================================
// ANIMAÇÃO DO BLOCO SOBRE
// ==========================================

const elementosSobre = document.querySelectorAll(
    ".sobre-imagem, .sobre-conteudo"
);

const prefereMenosMovimento = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (!prefereMenosMovimento && "IntersectionObserver" in window) {

    elementosSobre.forEach(function (elemento) {
        elemento.classList.add("sobre-animavel");
    });

    const observadorSobre = new IntersectionObserver(
        function (entradas, observador) {

            entradas.forEach(function (entrada) {

                if (entrada.isIntersecting) {

                    entrada.target.classList.add("visivel");
                    observador.unobserve(entrada.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );

    elementosSobre.forEach(function (elemento) {
        observadorSobre.observe(elemento);
    });

}

// ==========================================
// BLOCO 05 - LAÇO PET
// CALCULADORA + ANTES E DEPOIS
// ==========================================


// ==========================================
// 1. COMPARADOR DE IMAGENS
// ==========================================

const comparadorRange = document.getElementById(
    "comparador-range"
);

const comparadorAntes = document.getElementById(
    "comparador-antes"
);

const comparadorLinha = document.getElementById(
    "comparador-linha"
);

if (comparadorRange && comparadorAntes && comparadorLinha) {

    // Atualiza a divisão entre as imagens
    function atualizarComparador() {

        const valor = Number(comparadorRange.value);

        // Revela a imagem "antes" até a posição escolhida
        comparadorAntes.style.clipPath =
            "inset(0 " + (100 - valor) + "% 0 0)";

        // Movimenta a linha e a seta
        comparadorLinha.style.left = valor + "%";

    }

    // Funciona com mouse, toque e teclado
    comparadorRange.addEventListener(
        "input",
        atualizarComparador
    );

    // Inicia no meio
    atualizarComparador();

}


// ==========================================
// 2. CALCULADORA DE SERVIÇOS
// ==========================================

const formularioSpa = document.getElementById("spa-form");

const totalSpa = document.getElementById("spa-total");

const botaoWhatsappSpa = document.getElementById(
    "spa-whatsapp"
);


// PREÇOS DEMONSTRATIVOS
const precosSpa = {

    banho: {
        P: 45,
        M: 65,
        G: 90
    },

    unhas: 15,

    higienica: {
        P: 25,
        M: 35,
        G: 45
    },

    hidratacao: {
        P: 20,
        M: 30,
        G: 40
    },

    pelo: {
        curto: 0,
        medio: 10,
        longo: 20
    }

};


// FORMATA O VALOR EM REAIS
function formatarReais(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}


// CALCULA OS SERVIÇOS
function calcularSpa() {

    const porte = formularioSpa.querySelector(
        'input[name="porte"]:checked'
    ).value;

    const pelo = formularioSpa.querySelector(
        'input[name="pelo"]:checked'
    ).value;

    const servicos = Array.from(
        formularioSpa.querySelectorAll(
            'input[name="servico"]:checked'
        )
    ).map(function (item) {
        return item.value;
    });

    let total = 0;

    // BANHO
    if (servicos.includes("banho")) {

        total += precosSpa.banho[porte];

        // Adicional pela pelagem
        total += precosSpa.pelo[pelo];

    }

    // UNHAS
    if (servicos.includes("unhas")) {
        total += precosSpa.unhas;
    }

    // TOSA HIGIÊNICA
    if (servicos.includes("higienica")) {
        total += precosSpa.higienica[porte];
    }

    // HIDRATAÇÃO
    if (servicos.includes("hidratacao")) {
        total += precosSpa.hidratacao[porte];
    }

    return {
        porte: porte,
        pelo: pelo,
        servicos: servicos,
        total: total
    };

}


// ==========================================
// 3. ATUALIZAÇÃO AUTOMÁTICA
// ==========================================

if (formularioSpa && totalSpa && botaoWhatsappSpa) {

    function atualizarTotalSpa() {

        const resultado = calcularSpa();

        totalSpa.textContent = formatarReais(
            resultado.total
        );

    }

    formularioSpa.addEventListener(
        "change",
        atualizarTotalSpa
    );

    // Valor inicial
    atualizarTotalSpa();


    // ======================================
    // 4. SOLICITAR ORÇAMENTO
    // ======================================

    botaoWhatsappSpa.addEventListener(
        "click",
        function () {

            const resultado = calcularSpa();

            if (resultado.servicos.length === 0) {

                alert(
                    "Selecione pelo menos um serviço."
                );

                return;
            }

            const nomesServicos = {
                banho: "Banho relaxante",
                unhas: "Corte de unhas",
                higienica: "Tosa higiênica",
                hidratacao: "Hidratação"
            };

            const nomesPorte = {
                P: "Pequeno",
                M: "Médio",
                G: "Grande"
            };

            const nomesPelo = {
                curto: "Curto",
                medio: "Médio",
                longo: "Longo"
            };

            const listaServicos = resultado.servicos.map(
                function (servico) {
                    return nomesServicos[servico];
                }
            ).join(", ");

            const mensagem =
                "Olá, Laço Pet! Gostaria de solicitar um orçamento.\n\n" +
                "Porte: " + nomesPorte[resultado.porte] + "\n" +
                "Pelagem: " + nomesPelo[resultado.pelo] + "\n" +
                "Serviços: " + listaServicos + "\n\n" +
                "Valor estimado: " +
                formatarReais(resultado.total) + "\n\n" +
                "Gostaria de confirmar os valores e a disponibilidade.";

            // COLOQUE O NÚMERO REAL AQUI
            // Formato: 55 + DDD + número
            // Exemplo: 5581999999999
            const numeroWhatsapp = "";

            if (!numeroWhatsapp) {

                alert(
                    "Configure o número do WhatsApp no script.js."
                );

                return;
            }

            const link =
                "https://wa.me/" +
                numeroWhatsapp +
                "?text=" +
                encodeURIComponent(mensagem);

            window.open(
                link,
                "_blank",
                "noopener,noreferrer"
            );

        }
    );

}

// ==========================================
// BLOCO 06 - PERGUNTAS FREQUENTES
// ==========================================

const perguntasFaq = document.querySelectorAll(
    ".faq-pergunta"
);

// Abre ou fecha uma pergunta
perguntasFaq.forEach(function (pergunta) {

    pergunta.addEventListener("click", function () {

        const itemAtual = pergunta.closest(".faq-item");

        const respostaId = pergunta.getAttribute(
            "aria-controls"
        );

        const respostaAtual = document.getElementById(
            respostaId
        );

        const estavaAberta = pergunta.getAttribute(
            "aria-expanded"
        ) === "true";

        // Fecha todas as perguntas
        perguntasFaq.forEach(function (outraPergunta) {

            const outroItem = outraPergunta.closest(
                ".faq-item"
            );

            const outraResposta = document.getElementById(
                outraPergunta.getAttribute("aria-controls")
            );

            outraPergunta.setAttribute(
                "aria-expanded",
                "false"
            );

            outroItem.classList.remove("ativo");

            outraResposta.hidden = true;

            outraPergunta.querySelector(
                ".faq-icone"
            ).textContent = "+";

        });

        // Abre a pergunta clicada, caso estivesse fechada
        if (!estavaAberta) {

            pergunta.setAttribute(
                "aria-expanded",
                "true"
            );

            itemAtual.classList.add("ativo");

            respostaAtual.hidden = false;

            pergunta.querySelector(
                ".faq-icone"
            ).textContent = "−";

        }

    });

});

// ==========================================
// BLOCO 07 - CONTATO E RODAPÉ
// ==========================================

// CONFIGURAÇÕES DO PET SHOP
// Preencha os dados reais antes de publicar.

const dadosLacoPet = {

    // Somente números: 55 + DDD + telefone
    whatsapp: "",

    // Exemplo: @perfil
    instagram: "",

    // Link completo do Instagram
    instagramUrl: "",

    // Endereço completo
    endereco: "",

    // Horário de funcionamento
    horario: ""

};


// ==========================================
// 1. ATUALIZAR INFORMAÇÕES
// ==========================================

const campoEndereco = document.getElementById(
    "contato-endereco"
);

const campoHorario = document.getElementById(
    "contato-horario"
);

const campoTelefone = document.getElementById(
    "contato-telefone"
);

const campoInstagram = document.getElementById(
    "contato-instagram"
);

const footerInstagram = document.getElementById(
    "footer-instagram"
);

if (campoEndereco && dadosLacoPet.endereco) {
    campoEndereco.textContent = dadosLacoPet.endereco;
}

if (campoHorario && dadosLacoPet.horario) {
    campoHorario.textContent = dadosLacoPet.horario;
}

if (campoTelefone && dadosLacoPet.whatsapp) {
    campoTelefone.textContent = "+" + dadosLacoPet.whatsapp;
}

if (dadosLacoPet.instagram && dadosLacoPet.instagramUrl) {

    if (campoInstagram) {
        campoInstagram.textContent = dadosLacoPet.instagram;
        campoInstagram.href = dadosLacoPet.instagramUrl;
        campoInstagram.target = "_blank";
        campoInstagram.rel = "noopener noreferrer";
    }

    if (footerInstagram) {
        footerInstagram.href = dadosLacoPet.instagramUrl;
        footerInstagram.target = "_blank";
        footerInstagram.rel = "noopener noreferrer";
    }
}


// ==========================================
// 2. WHATSAPP
// ==========================================

function abrirWhatsappLacoPet(mensagem) {

    if (!dadosLacoPet.whatsapp) {

        alert(
            "Configure o número do WhatsApp no script.js."
        );

        return;
    }

    const url =
        "https://wa.me/" +
        dadosLacoPet.whatsapp +
        "?text=" +
        encodeURIComponent(mensagem);

    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );

}

const mensagemContato =
    "Olá, Laço Pet! Gostaria de saber mais " +
    "sobre os serviços e agendamentos.";

const botaoContato = document.getElementById(
    "contato-whatsapp"
);

const botaoFlutuante = document.getElementById(
    "whatsapp-flutuante"
);

if (botaoContato) {

    botaoContato.addEventListener("click", function () {

        abrirWhatsappLacoPet(mensagemContato);

    });

}

if (botaoFlutuante) {

    botaoFlutuante.addEventListener("click", function () {

        abrirWhatsappLacoPet(mensagemContato);

    });

}


// ==========================================
// 3. MAPA E ROTA
// ==========================================

const mapaIframe = document.getElementById(
    "mapa-iframe"
);

const mapaPlaceholder = document.getElementById(
    "mapa-placeholder"
);

const botaoRota = document.getElementById(
    "contato-rota"
);

if (dadosLacoPet.endereco) {

    const enderecoCodificado = encodeURIComponent(
        dadosLacoPet.endereco
    );

    // Exibe o mapa incorporado
    if (mapaIframe) {

        mapaIframe.src =
            "https://maps.google.com/maps?q=" +
            enderecoCodificado +
            "&output=embed";

        mapaIframe.hidden = false;

    }

    // Esconde a mensagem inicial
    if (mapaPlaceholder) {
        mapaPlaceholder.hidden = true;
    }

    // Ativa a rota no Google Maps
    if (botaoRota) {

        botaoRota.href =
            "https://www.google.com/maps/search/?api=1&query=" +
            enderecoCodificado;

        botaoRota.target = "_blank";
        botaoRota.rel = "noopener noreferrer";

        botaoRota.removeAttribute("aria-disabled");

    }

} else if (botaoRota) {

    // Impede o botão de navegar sem endereço
    botaoRota.addEventListener("click", function (evento) {
        evento.preventDefault();
        alert("A localização ainda não foi configurada.");
    });

}


// ==========================================
// 4. ANO AUTOMÁTICO DO RODAPÉ
// ==========================================

const campoAno = document.getElementById(
    "ano-atual"
);

if (campoAno) {
    campoAno.textContent = new Date().getFullYear();
}

// ==========================================
// LAÇO PET 2.0 - ACABAMENTO PREMIUM
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // ======================================
    // 1. CABEÇALHO AO ROLAR
    // ======================================

    const cabecalho = document.querySelector(".header");

    function atualizarCabecalho() {

        if (!cabecalho) return;

        cabecalho.classList.toggle(
            "header-rolagem",
            window.scrollY > 30
        );
    }

    window.addEventListener(
        "scroll",
        atualizarCabecalho,
        { passive: true }
    );

    atualizarCabecalho();


    // ======================================
    // 2. ANIMAÇÃO DE ENTRADA
    // ======================================

    const movimentoReduzido = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const elementosReveal = document.querySelectorAll(
        ".servicos-cabecalho, " +
        ".sobre-diferenciais, " +
        ".spa-cabecalho, " +
        ".spa-calculadora, " +
        ".spa-transformacao, " +
        ".faq-cabecalho, " +
        ".faq-lista, " +
        ".faq-contato, " +
        ".contato-cabecalho, " +
        ".contato-informacoes, " +
        ".contato-mapa-card"
    );

    if (
        !movimentoReduzido &&
        "IntersectionObserver" in window
    ) {

        const observadorReveal = new IntersectionObserver(
            function (entradas, observador) {

                entradas.forEach(function (entrada) {

                    if (entrada.isIntersecting) {

                        entrada.target.classList.add(
                            "reveal-visivel"
                        );

                        observador.unobserve(
                            entrada.target
                        );
                    }
                });

            },
            {
                threshold: 0.08,
                rootMargin: "0px 0px 30px 0px"
            }
        );

        elementosReveal.forEach(function (elemento) {

            elemento.classList.add("reveal");

            observadorReveal.observe(elemento);
        });
    }


    // ======================================
    // 3. LINK ATIVO DO MENU
    // ======================================

    const secoes = document.querySelectorAll(
        "main section[id]"
    );

    const linksNavegacao = document.querySelectorAll(
        ".nav-links a[href^='#']"
    );

    function atualizarMenuAtivo() {

        let secaoAtual = "";

        secoes.forEach(function (secao) {

            const topo = secao.getBoundingClientRect().top;

            if (topo <= 160) {
                secaoAtual = secao.id;
            }
        });

        linksNavegacao.forEach(function (link) {

            const destino = link.getAttribute("href");

            link.classList.toggle(
                "link-ativo",
                destino === "#" + secaoAtual
            );
        });
    }

    window.addEventListener(
        "scroll",
        atualizarMenuAtivo,
        { passive: true }
    );

    atualizarMenuAtivo();

});

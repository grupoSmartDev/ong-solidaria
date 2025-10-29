/**
 * SPA.JS
 * Sistema de Single Page Application
 * Gerencia navegação entre páginas sem recarregamento
 */

const SPA = (function () {

    let paginaAtual = null;

    /**
     * Mapeia rotas para conteúdo
     */
    const rotas = {
        'index.html': {
            titulo: 'ONG Solidária - Início',
            carregarConteudo: carregarHome
        },
        'projetos.html': {
            titulo: 'Projetos Sociais - ONG Solidária',
            carregarConteudo: carregarProjetos
        },
        'cadastro.html': {
            titulo: 'Cadastro de Voluntário - ONG Solidária',
            carregarConteudo: carregarCadastro
        }
    };

    /**
     * Inicializa o sistema SPA
     */
    function init() {
        // SPA simplificado - apenas atualiza links ativos
        // Navegação funciona normalmente (com reload)

        // Detecta página atual
        const urlAtual = window.location.pathname.split('/').pop() || 'index.html';
        paginaAtual = urlAtual;

        // Atualiza link ativo no menu
        atualizarMenuAtivo(urlAtual);

        console.log('Página atual:', urlAtual);
    }

    /**
     * Navega para uma nova página
     */
    function navegarPara(url) {
        if (url === paginaAtual) return;

        carregarPagina(url, true);
    }

    /**
     * Carrega conteúdo da página
     */
    function carregarPagina(url, adicionarHistorico) {
        const rota = rotas[url];

        if (!rota) {
            console.error('Rota não encontrada:', url);
            return;
        }

        // Atualiza título
        document.title = rota.titulo;

        // Adiciona ao histórico
        if (adicionarHistorico) {
            window.history.pushState(
                { pagina: url },
                '',
                url
            );
        }

        // Carrega conteúdo
        rota.carregarConteudo();

        // Atualiza página atual
        paginaAtual = url;

        // Scroll para o topo
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Fecha menu mobile se estiver aberto
        const menuToggle = document.getElementById('menu-toggle');
        if (menuToggle) menuToggle.checked = false;

        // Atualiza link ativo no menu
        atualizarMenuAtivo(url);
    }

    /**
     * Atualiza link ativo no menu de navegação
     */
    function atualizarMenuAtivo(url) {
        document.querySelectorAll('nav a').forEach(link => {
            if (link.getAttribute('href') === url) {
                link.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                link.style.fontWeight = 'bold';
            } else {
                link.style.backgroundColor = '';
                link.style.fontWeight = '';
            }
        });
    }

    /**
     * Funções de carregamento de conteúdo
     * (Em produção, fariam fetch de arquivos ou API)
     */

    function carregarHome() {
        const main = document.querySelector('main');
        if (!main) return;

        // Mantém conteúdo existente do index.html
        // Em uma implementação real, faria fetch do conteúdo
        console.log('Carregando página: Home');
    }

    function carregarProjetos() {
        const main = document.querySelector('main');
        if (!main) return;

        console.log('Carregando página: Projetos');
    }

    function carregarCadastro() {
        const main = document.querySelector('main');
        if (!main) return;

        console.log('Carregando página: Cadastro');

        // Reinicializa validação se estiver na página de cadastro
        if (typeof Validacao !== 'undefined') {
            setTimeout(() => {
                Validacao.init();
            }, 100);
        }
    }

    // API pública
    return {
        init,
        navegarPara
    };

})();

// Exporta para uso global
window.SPA = SPA;
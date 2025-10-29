/**
 * TEMPLATES.JS
 * Sistema de templates dinâmicos
 * Renderiza componentes e dados de forma programática
 */

const Templates = (function () {

    /**
     * Inicializa sistema de templates
     */
    function init() {
        // Renderiza componentes dinâmicos se existirem
        renderizarEstatisticas();
        renderizarDepoimentos();
    }

    /**
     * Template: Card de projeto
     */
    function cardProjeto(dados) {
        return `
        <article class="card">
          <div class="card-header">
            <h3>${dados.titulo}</h3>
          </div>
          <div class="card-body">
            <p>${dados.descricao}</p>
            ${dados.impacto ? `
              <div class="mt-md">
                <strong>Impacto:</strong>
                <p>${dados.impacto}</p>
              </div>
            ` : ''}
          </div>
          <div class="card-footer">
            <span class="badge badge-primary">${dados.categoria}</span>
            ${dados.vagas ? `<span class="badge badge-secondary">${dados.vagas} vagas</span>` : ''}
          </div>
        </article>
      `;
    }

    /**
     * Template: Card de estatística
     */
    function cardEstatistica(dados) {
        return `
        <div class="card text-center">
          <div class="card-body">
            <h3 style="color: var(--cor-primaria); font-size: var(--font-size-4xl);">
              ${dados.numero}
            </h3>
            <p style="font-weight: 600; color: var(--cor-neutra-700);">
              ${dados.titulo}
            </p>
            <small>${dados.descricao}</small>
          </div>
        </div>
      `;
    }

    /**
     * Template: Depoimento
     */
    function cardDepoimento(dados) {
        return `
        <blockquote class="card">
          <div class="card-body">
            <p>"${dados.texto}"</p>
            <footer style="margin-top: var(--espaco-md); font-weight: 600;">
              — ${dados.autor}
              ${dados.cargo ? `<br><small>${dados.cargo}</small>` : ''}
            </footer>
          </div>
        </blockquote>
      `;
    }

    /**
     * Template: Alert/Notificação
     */
    function alert(tipo, mensagem) {
        const icones = {
            success: '✓',
            warning: '⚠',
            error: '✗',
            info: 'ℹ'
        };

        return `
        <div class="alert alert-${tipo}">
          <span style="font-size: var(--font-size-xl); margin-right: var(--espaco-sm);">
            ${icones[tipo]}
          </span>
          <span>${mensagem}</span>
        </div>
      `;
    }

    /**
     * Renderiza estatísticas na página inicial
     */
    function renderizarEstatisticas() {
        const container = document.getElementById('estatisticas-container');
        if (!container) return;

        const estatisticas = [
            {
                numero: '50.000+',
                titulo: 'Vidas Impactadas',
                descricao: 'Pessoas beneficiadas diretamente'
            },
            {
                numero: '500+',
                titulo: 'Voluntários Ativos',
                descricao: 'Dedicados em todo o país'
            },
            {
                numero: '25',
                titulo: 'Projetos Ativos',
                descricao: 'Em diversas áreas sociais'
            },
            {
                numero: '80',
                titulo: 'Comunidades',
                descricao: 'Atendidas em 12 estados'
            }
        ];

        const html = estatisticas.map(stat => cardEstatistica(stat)).join('');
        container.innerHTML = `<div class="cards-grid">${html}</div>`;
    }

    /**
     * Renderiza depoimentos dinamicamente
     */
    function renderizarDepoimentos() {
        const container = document.getElementById('depoimentos-container');
        if (!container) return;

        const depoimentos = [
            {
                texto: 'Ser voluntária da ONG Solidária transformou minha vida. Aprendi muito mais do que ensinei.',
                autor: 'Ana Paula Silva',
                cargo: 'Voluntária há 3 anos'
            },
            {
                texto: 'O voluntariado me deu uma nova perspectiva sobre a vida e me ajudou profissionalmente.',
                autor: 'Carlos Eduardo Santos',
                cargo: 'Voluntário há 2 anos'
            },
            {
                texto: 'Encontrei propósito e uma família aqui. Cada dia é uma oportunidade de fazer a diferença.',
                autor: 'Juliana Oliveira',
                cargo: 'Voluntária há 1 ano'
            }
        ];

        const html = depoimentos.map(dep => cardDepoimento(dep)).join('');
        container.innerHTML = `<div class="cards-grid">${html}</div>`;
    }

    /**
     * Renderiza lista de projetos
     */
    function renderizarProjetos(projetos, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const html = projetos.map(projeto => cardProjeto(projeto)).join('');
        container.innerHTML = `<div class="cards-grid">${html}</div>`;
    }

    /**
     * Exibe mensagem de feedback
     */
    function exibirFeedback(tipo, mensagem, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const alertHtml = alert(tipo, mensagem);
        container.innerHTML = alertHtml;

        // Remove após 5 segundos
        setTimeout(() => {
            container.innerHTML = '';
        }, 5000);
    }

    /**
     * Renderiza dados em tabela
     */
    function renderizarTabela(dados, colunas, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        let html = '<table style="width: 100%; border-collapse: collapse;">';

        // Cabeçalho
        html += '<thead><tr>';
        colunas.forEach(col => {
            html += `<th style="border: 1px solid var(--cor-neutra-300); padding: var(--espaco-sm); background: var(--cor-neutra-200);">${col.titulo}</th>`;
        });
        html += '</tr></thead>';

        // Corpo
        html += '<tbody>';
        dados.forEach(item => {
            html += '<tr>';
            colunas.forEach(col => {
                html += `<td style="border: 1px solid var(--cor-neutra-300); padding: var(--espaco-sm);">${item[col.campo]}</td>`;
            });
            html += '</tr>';
        });
        html += '</tbody></table>';

        container.innerHTML = html;
    }

    /**
     * Cria loading spinner
     */
    function loading() {
        return `
        <div style="text-align: center; padding: var(--espaco-xl);">
          <div style="
            border: 4px solid var(--cor-neutra-300);
            border-top: 4px solid var(--cor-primaria);
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 0 auto;
          "></div>
          <p style="margin-top: var(--espaco-md);">Carregando...</p>
        </div>
      `;
    }

    // API pública
    return {
        init,
        cardProjeto,
        cardEstatistica,
        cardDepoimento,
        alert,
        renderizarProjetos,
        renderizarEstatisticas,
        renderizarDepoimentos,
        exibirFeedback,
        renderizarTabela,
        loading
    };

})();

// Adiciona animação de loading ao CSS dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
document.head.appendChild(style);

// Exporta para uso global
window.Templates = Templates;
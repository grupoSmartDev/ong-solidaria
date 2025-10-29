

// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function () {
    console.log('🚀 ONG Solidária - Sistema iniciado');

    // Inicializa o sistema SPA
    if (typeof SPA !== 'undefined') {
        SPA.init();
        console.log('✅ SPA inicializado');
    }

    // Inicializa o sistema de templates
    if (typeof Templates !== 'undefined') {
        Templates.init();
        console.log('✅ Templates inicializados');
    }

    // Inicializa o sistema de validação
    if (typeof Validacao !== 'undefined') {
        Validacao.init();
        console.log('✅ Validação inicializada');
    }

    // Inicializa menu mobile
    inicializarMenuMobile();

    // Adiciona animações suaves
    adicionarAnimacoes();
});

/**
 * Inicializa comportamento do menu mobile
 */
function inicializarMenuMobile() {
    const menuToggle = document.getElementById('menu-toggle');
    const menuLinks = document.querySelectorAll('nav a');

    if (!menuToggle) return;

    // Fecha menu ao clicar em um link
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.checked = false;
        });
    });

    console.log('✅ Menu mobile inicializado');
}

/**
 * Adiciona animações de entrada aos elementos
 */
function adicionarAnimacoes() {
    const elementos = document.querySelectorAll('article, .card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });

    elementos.forEach(el => observer.observe(el));

    console.log('✅ Animações configuradas');
}

/**
 * Utility: Exibe toast notification
 */
function mostrarToast(mensagem, tipo = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${tipo}`;
    toast.textContent = mensagem;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Exporta função utilitária para uso global
window.mostrarToast = mostrarToast;
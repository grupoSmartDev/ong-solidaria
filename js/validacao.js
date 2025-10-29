/**
 * VALIDACAO.JS
 * Sistema de validação de formulários
 * Valida campos no evento blur com feedback visual ao usuário
 */

const Validacao = (function () {

    // Configuração de regras de validação
    const regras = {
        nome: {
            minLength: 3,
            maxLength: 100,
            pattern: /^[A-Za-zÀ-ÿ\s]+$/,
            mensagens: {
                required: 'Nome completo é obrigatório',
                minLength: 'Nome deve ter no mínimo 3 caracteres',
                maxLength: 'Nome deve ter no máximo 100 caracteres',
                pattern: 'Nome deve conter apenas letras e espaços'
            }
        },
        email: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            mensagens: {
                required: 'E-mail é obrigatório',
                pattern: 'E-mail inválido. Use o formato: exemplo@email.com'
            }
        },
        cpf: {
            pattern: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
            validacao: validarCPF,
            mensagens: {
                required: 'CPF é obrigatório',
                pattern: 'CPF deve estar no formato: 000.000.000-00',
                invalid: 'CPF inválido'
            }
        },
        telefone: {
            pattern: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
            mensagens: {
                required: 'Telefone é obrigatório',
                pattern: 'Telefone deve estar no formato: (00) 00000-0000'
            }
        },
        cep: {
            pattern: /^\d{5}-\d{3}$/,
            mensagens: {
                required: 'CEP é obrigatório',
                pattern: 'CEP deve estar no formato: 00000-000'
            }
        },
        dataNascimento: {
            validacao: validarIdade,
            mensagens: {
                required: 'Data de nascimento é obrigatória',
                invalid: 'Você deve ter pelo menos 16 anos'
            }
        },
        motivacao: {
            minLength: 50,
            maxLength: 1000,
            mensagens: {
                required: 'Por favor, compartilhe sua motivação',
                minLength: 'Sua motivação deve ter no mínimo 50 caracteres',
                maxLength: 'Sua motivação deve ter no máximo 1000 caracteres'
            }
        }
    };

    /**
     * Inicializa sistema de validação
     */
    function init() {
        const form = document.getElementById('formulario-cadastro');
        if (!form) return;

        // Adiciona validação blur em todos os campos
        const campos = form.querySelectorAll('input, select, textarea');
        campos.forEach(campo => {
            // Remove listeners anteriores se existirem
            campo.removeEventListener('blur', handleBlur);
            campo.addEventListener('blur', handleBlur);

            // Adiciona máscaras de formatação
            if (campo.id === 'cpf') {
                campo.addEventListener('input', mascaraCPF);
            } else if (campo.id === 'telefone') {
                campo.addEventListener('input', mascaraTelefone);
            } else if (campo.id === 'cep') {
                campo.addEventListener('input', mascaraCEP);
            }
        });

        // Validação no submit
        form.addEventListener('submit', handleSubmit);

        // Adiciona contador de caracteres em campos de texto longo
        adicionarContadores();

        console.log('Validação inicializada em', campos.length, 'campos');
    }

    /**
     * Handler para evento blur
     */
    function handleBlur(event) {
        const campo = event.target;
        validarCampo(campo);
    }

    /**
     * Valida um campo específico
     */
    function validarCampo(campo) {
        const valor = campo.value.trim();
        const nome = campo.name || campo.id;
        const regra = regras[campo.id] || regras[nome];

        // Remove mensagens de erro anteriores
        removerErro(campo);

        // Verifica se campo é obrigatório
        if (campo.hasAttribute('required') && !valor) {
            mostrarErro(campo, regra?.mensagens?.required || 'Campo obrigatório');
            return false;
        }

        // Se campo está vazio e não é obrigatório, não valida
        if (!valor && !campo.hasAttribute('required')) {
            return true;
        }

        // Aplica validações específicas
        if (regra) {
            // Valida comprimento mínimo
            if (regra.minLength && valor.length < regra.minLength) {
                mostrarErro(campo, regra.mensagens.minLength);
                return false;
            }

            // Valida comprimento máximo
            if (regra.maxLength && valor.length > regra.maxLength) {
                mostrarErro(campo, regra.mensagens.maxLength);
                return false;
            }

            // Valida padrão regex
            if (regra.pattern && !regra.pattern.test(valor)) {
                mostrarErro(campo, regra.mensagens.pattern);
                return false;
            }

            // Valida função customizada
            if (regra.validacao && !regra.validacao(valor)) {
                mostrarErro(campo, regra.mensagens.invalid);
                return false;
            }
        }

        // Valida select
        if (campo.tagName === 'SELECT' && !valor) {
            mostrarErro(campo, 'Por favor, selecione uma opção');
            return false;
        }

        // Valida checkboxes obrigatórios
        if (campo.type === 'checkbox' && campo.hasAttribute('required') && !campo.checked) {
            mostrarErro(campo, 'Você deve aceitar este termo');
            return false;
        }

        // Valida grupos de checkbox (áreas de interesse)
        if (campo.name === 'areas-interesse') {
            const checkboxes = document.querySelectorAll('input[name="areas-interesse"]');
            const algumMarcado = Array.from(checkboxes).some(cb => cb.checked);

            if (!algumMarcado) {
                mostrarErro(campo, 'Selecione pelo menos uma área de interesse');
                return false;
            }
        }

        // Campo válido
        mostrarSucesso(campo);
        return true;
    }

    /**
     * Mostra mensagem de erro
     */
    function mostrarErro(campo, mensagem) {
        campo.classList.add('campo-invalido');
        campo.classList.remove('campo-valido');

        // Cria elemento de erro
        const erro = document.createElement('div');
        erro.className = 'mensagem-erro';
        erro.textContent = mensagem;
        erro.style.color = 'var(--cor-erro)';
        erro.style.fontSize = 'var(--font-size-sm)';
        erro.style.marginTop = 'var(--espaco-xs)';
        erro.style.fontWeight = '500';

        // Insere após o campo
        campo.parentNode.insertBefore(erro, campo.nextSibling);

        // Adiciona borda vermelha
        campo.style.borderColor = 'var(--cor-erro)';
        campo.style.backgroundColor = 'rgba(244, 67, 54, 0.05)';
    }

    /**
     * Mostra indicador de sucesso
     */
    function mostrarSucesso(campo) {
        campo.classList.add('campo-valido');
        campo.classList.remove('campo-invalido');

        campo.style.borderColor = 'var(--cor-sucesso)';
        campo.style.backgroundColor = 'rgba(76, 175, 80, 0.05)';
    }

    /**
     * Remove mensagem de erro
     */
    function removerErro(campo) {
        const erroExistente = campo.parentNode.querySelector('.mensagem-erro');
        if (erroExistente) {
            erroExistente.remove();
        }

        campo.classList.remove('campo-invalido', 'campo-valido');
        campo.style.borderColor = '';
        campo.style.backgroundColor = '';
    }

    /**
     * Handler para submit do formulário
     */
    function handleSubmit(event) {
        event.preventDefault();

        const form = event.target;
        const campos = form.querySelectorAll('input, select, textarea');
        let formularioValido = true;

        // Valida todos os campos
        campos.forEach(campo => {
            if (!validarCampo(campo)) {
                formularioValido = false;
            }
        });

        if (formularioValido) {
            // Exibe mensagem de sucesso
            exibirMensagemSucesso(form);

            // Opcional: enviar dados
            // enviarFormulario(new FormData(form));
        } else {
            // Scroll para o primeiro erro
            const primeiroErro = form.querySelector('.campo-invalido');
            if (primeiroErro) {
                primeiroErro.scrollIntoView({ behavior: 'smooth', block: 'center' });
                primeiroErro.focus();
            }

            // Exibe alerta
            exibirAlerta('error', 'Por favor, corrija os erros no formulário antes de enviar.');
        }
    }

    /**
     * Exibe mensagem de sucesso no envio
     */
    function exibirMensagemSucesso(form) {
        const mensagem = document.createElement('div');
        mensagem.className = 'alert alert-success';
        mensagem.innerHTML = `
        <span style="font-size: var(--font-size-xl);">✓</span>
        <div>
          <strong>Cadastro enviado com sucesso!</strong>
          <p>Em breve entraremos em contato. Obrigado por se voluntariar!</p>
        </div>
      `;

        form.insertBefore(mensagem, form.firstChild);

        // Scroll para a mensagem
        mensagem.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Limpa o formulário
        setTimeout(() => {
            form.reset();
            // Remove todas as validações visuais
            form.querySelectorAll('.campo-valido, .campo-invalido').forEach(campo => {
                removerErro(campo);
            });
        }, 2000);
    }

    /**
     * Exibe alerta no topo do formulário
     */
    function exibirAlerta(tipo, mensagem) {
        const form = document.getElementById('formulario-cadastro');
        if (!form) return;

        // Remove alertas anteriores
        const alertaExistente = form.querySelector('.alert');
        if (alertaExistente) alertaExistente.remove();

        const alerta = document.createElement('div');
        alerta.className = `alert alert-${tipo}`;
        alerta.innerHTML = `
        <span style="font-size: var(--font-size-xl);">⚠</span>
        <span>${mensagem}</span>
      `;

        form.insertBefore(alerta, form.firstChild);
        alerta.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Remove após 5 segundos
        setTimeout(() => alerta.remove(), 5000);
    }

    /**
     * Valida CPF (algoritmo real)
     */
    function validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]/g, '');

        if (cpf.length !== 11) return false;

        // Verifica se todos os dígitos são iguais
        if (/^(\d)\1+$/.test(cpf)) return false;

        // Valida primeiro dígito verificador
        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let resto = soma % 11;
        let digito1 = resto < 2 ? 0 : 11 - resto;

        if (digito1 !== parseInt(cpf.charAt(9))) return false;

        // Valida segundo dígito verificador
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        resto = soma % 11;
        let digito2 = resto < 2 ? 0 : 11 - resto;

        return digito2 === parseInt(cpf.charAt(10));
    }

    /**
     * Valida idade mínima (16 anos)
     */
    function validarIdade(data) {
        const nascimento = new Date(data);
        const hoje = new Date();
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();

        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }

        return idade >= 16;
    }

    /**
     * Máscara para CPF
     */
    function mascaraCPF(event) {
        let valor = event.target.value.replace(/\D/g, '');

        if (valor.length > 11) valor = valor.slice(0, 11);

        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

        event.target.value = valor;
    }

    /**
     * Máscara para Telefone
     */
    function mascaraTelefone(event) {
        let valor = event.target.value.replace(/\D/g, '');

        if (valor.length > 11) valor = valor.slice(0, 11);

        if (valor.length <= 10) {
            valor = valor.replace(/(\d{2})(\d)/, '($1) $2');
            valor = valor.replace(/(\d{4})(\d)/, '$1-$2');
        } else {
            valor = valor.replace(/(\d{2})(\d)/, '($1) $2');
            valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
        }

        event.target.value = valor;
    }

    /**
     * Máscara para CEP
     */
    function mascaraCEP(event) {
        let valor = event.target.value.replace(/\D/g, '');

        if (valor.length > 8) valor = valor.slice(0, 8);

        valor = valor.replace(/(\d{5})(\d)/, '$1-$2');

        event.target.value = valor;
    }

    /**
     * Adiciona contadores de caracteres
     */
    function adicionarContadores() {
        const camposTexto = document.querySelectorAll('textarea[maxlength]');

        camposTexto.forEach(campo => {
            const maxLength = campo.getAttribute('maxlength');
            const contador = document.createElement('div');
            contador.className = 'contador-caracteres';
            contador.style.textAlign = 'right';
            contador.style.fontSize = 'var(--font-size-sm)';
            contador.style.color = 'var(--cor-neutra-600)';
            contador.style.marginTop = 'var(--espaco-xs)';

            const atualizarContador = () => {
                const atual = campo.value.length;
                contador.textContent = `${atual}/${maxLength} caracteres`;

                if (atual > maxLength * 0.9) {
                    contador.style.color = 'var(--cor-erro)';
                } else if (atual > maxLength * 0.7) {
                    contador.style.color = 'var(--cor-alerta)';
                } else {
                    contador.style.color = 'var(--cor-neutra-600)';
                }
            };

            campo.addEventListener('input', atualizarContador);
            atualizarContador();

            campo.parentNode.insertBefore(contador, campo.nextSibling);
        });
    }

    // API pública
    return {
        init,
        validarCampo,
        validarCPF,
        validarIdade
    };

})();

// Exporta para uso global
window.Validacao = Validacao;
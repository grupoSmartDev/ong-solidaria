# Projeto Web - ONG Solidária

Projeto completo desenvolvido para a disciplina de Desenvolvimento Web, simulando um site institucional para uma ONG fictícia focada em projetos sociais e voluntariado.

## Sobre o Projeto

O site foi criado pensando em ser uma plataforma completa para uma organização do terceiro setor, permitindo que visitantes conheçam os projetos, se cadastrem como voluntários e façam doações. O desenvolvimento seguiu boas práticas de HTML semântico, CSS moderno e JavaScript funcional.

## Estrutura do Projeto

```
projeto/
│
├── index.html              # Página principal com informações institucionais
├── projetos.html           # Listagem dos projetos sociais
├── cadastro.html           # Formulário de cadastro de voluntários
│
├── css/
│   └── styles.css          # Todos os estilos do site
│
├── js/
│   ├── main.js             # Script principal, inicializa tudo
│   ├── spa.js              # Gerencia navegação entre páginas
│   ├── templates.js        # Componentes dinâmicos reutilizáveis
│   └── validacao.js        # Validação completa do formulário
│
└── imagens/
    └── (colocar as imagens aqui)
```

## Tecnologias Utilizadas

- **HTML5** - Estrutura semântica das páginas
- **CSS3** - Estilização e layout responsivo
- **JavaScript (ES6)** - Interatividade e validações
- **Design Mobile-First** - Prioridade para dispositivos móveis

## Principais Funcionalidades

### 1. Sistema de Design Consistente

Criei um sistema de variáveis CSS para manter consistência visual em todo o site:

- Paleta de cores pensada para transmitir acolhimento (laranjas e verdes)
- Tipografia hierárquica com 9 tamanhos diferentes
- Espaçamento modular baseado em múltiplos de 8px
- Sistema de grid de 12 colunas customizado

### 2. Layout Responsivo

O site se adapta a diferentes tamanhos de tela:

- Mobile (< 576px)
- Mobile landscape (576px - 767px)
- Tablet (768px - 991px)
- Desktop (992px - 1199px)
- Desktop large (>= 1200px)

Usei CSS Grid para a estrutura geral e Flexbox para componentes internos, seguindo as melhores práticas atuais.

### 3. Menu Mobile

Implementei um menu hambúrguer usando apenas CSS (técnica do checkbox hack), sem necessidade de JavaScript. Funciona bem em telas menores que 992px.

### 4. Validação de Formulário

A validação acontece quando o usuário sai de cada campo (evento blur), dando feedback imediato:

**Campos validados:**

- Nome completo (só aceita letras, mínimo 3 caracteres)
- Email (valida formato correto)
- CPF (valida formato E se o número é válido usando o algoritmo oficial)
- Telefone (formato brasileiro com DDD)
- CEP (formato 00000-000)
- Data de nascimento (valida idade mínima de 16 anos)
- Campos obrigatórios em geral

**Máscaras automáticas:**

- CPF: aplica formato 000.000.000-00 enquanto você digita
- Telefone: aplica formato (00) 00000-0000
- CEP: aplica formato 00000-000

**Feedback visual:**

- Borda verde quando o campo está correto
- Borda vermelha + mensagem de erro quando algo está errado
- Alerta no topo se tentar enviar o formulário com erros

### 5. Componentes Reutilizáveis

Criei vários componentes CSS que podem ser usados em qualquer parte do site:

- Cards com header, body e footer
- Botões em 3 estilos (primary, secondary, outline)
- Alertas para mensagens (sucesso, aviso, erro, info)
- Badges para tags e categorias
- Sistema de grid flexível

## Como Usar

### Instalação

1. Baixe todos os arquivos mantendo a estrutura de pastas
2. Coloque suas imagens na pasta `imagens/`
3. Abra o arquivo `index.html` em qualquer navegador moderno

Não precisa de servidor local, funciona direto abrindo o arquivo.

### Testando as Funcionalidades

**Menu Mobile:**

- Redimensione o navegador para menos de 992px de largura
- Clique no ícone de 3 barras no canto superior
- O menu deve expandir e recolher

**Validação:**

- Vá em cadastro.html
- Tente preencher os campos com dados incorretos
- Ao sair de cada campo, você verá a validação acontecer
- Tente enviar o formulário incompleto para ver o alerta

**Design Responsivo:**

- Redimensione o navegador em diferentes larguras
- Observe como o layout se adapta

## Organização do Código

### CSS

O arquivo `styles.css` está organizado em seções:

1. Variáveis CSS (cores, fontes, espaçamentos)
2. Reset e estilos base
3. Tipografia
4. Sistema de grid
5. Header e navegação
6. Conteúdo principal
7. Componentes (cards, botões, etc)
8. Sidebar
9. Footer
10. Media queries para responsividade

### JavaScript

Cada arquivo JS tem uma responsabilidade específica:

**main.js** - Ponto de entrada

- Inicializa todos os módulos
- Configura o menu mobile
- Adiciona animações

**spa.js** - Navegação

- Gerencia links ativos no menu
- Detecta a página atual

**templates.js** - Templates dinâmicos

- Funções para criar componentes HTML
- Renderização de listas e cards

**validacao.js** - Validação de formulários

- Valida cada tipo de campo
- Aplica máscaras de formatação
- Mostra feedback visual
- Previne envio de dados inválidos

## Decisões Técnicas

### Por que não usei frameworks?

O projeto foi desenvolvido com HTML, CSS e JavaScript puro para demonstrar domínio dos fundamentos. Em projetos reais, frameworks como React ou Vue facilitariam muito, mas aqui o objetivo era mostrar que sei trabalhar "na mão".

### Por que CSS puro para o menu mobile?

Implementei usando a técnica do checkbox hack porque:

1. Menos JavaScript significa melhor performance
2. Funciona mesmo se o JS falhar
3. É uma técnica interessante de aprender

### Validação no blur vs submit

Escolhi validar no blur (ao sair do campo) porque dá feedback mais rápido para o usuário. Ele não precisa esperar clicar em "enviar" para saber que algo está errado. Isso melhora bastante a experiência.

## Melhorias Futuras

Se fosse continuar desenvolvendo este projeto, eu implementaria:

- Backend real para processar o formulário
- Banco de dados para armazenar voluntários
- Sistema de login para voluntários acompanharem suas atividades
- Galeria de fotos dos projetos
- Blog com novidades da ONG
- Integração com APIs de pagamento para doações
- Dashboard administrativo

## Dificuldades Encontradas

Durante o desenvolvimento, alguns desafios:

1. **Validação de CPF** - Tive que implementar o algoritmo oficial de validação, não é só verificar o formato
2. **Menu mobile CSS puro** - A técnica do checkbox hack tem suas limitações, mas funcionou bem
3. **Layout responsivo** - Decidir os breakpoints certos levou alguns testes
4. **Máscaras de formatação** - Fazer funcionar bem enquanto o usuário digita não é trivial

Funciona em dispositivos mobile iOS e Android.

## Considerações Finais

Este projeto foi uma ótima oportunidade para aplicar conceitos aprendidos na disciplina e ir além do básico. Tentei criar algo que além de cumprir os requisitos técnicos, também fizesse sentido do ponto de vista de experiência do usuário.

O código está comentado e organizado para facilitar manutenção futura. Todos os componentes foram pensados para serem reutilizáveis e o sistema de design permite mudanças rápidas de cores e espaçamentos apenas alterando as variáveis CSS.

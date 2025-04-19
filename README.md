# Aeon — Front-end Web Application

## Estrutura do Front-end

O front-end da aplicação Aeon é construído com as seguintes tecnologias principais:

- **TypeScript**
- **Angular**

A interface oferece acesso a diversas funcionalidades através de páginas dedicadas, incluindo:

### Principais Funcionalidades

1. Edição de RGB **Segunda Etapa**
   - Alteração de cores, efeitos, brilho e padrões.

2. Criação de Macros **Segunda Etapa**
   - Gravação de teclas e scripts personalizados.

3. Criação e Atualização de Layout **Em Produção**
   - Seleção de teclas e sincronização com a porta COM/Criação do .keymap.

4. Game de Digitação **Segunda Etapa**
   - Jogo interativo com ranking dos 200 melhores usuários.

5. Cadastro de Usuários **Em Produção**
   - Registro e gerenciamento de perfis personalizados.

## Arquitetura Técnica **Mais detalhes em [aeon-bkd](https://github.com/aeon-keyboard/aeon-bkd)**

### Comunicação com Back-end

A aplicação web consome microserviços que interagem com um banco de dados PostgreSQL, permitindo persistência e recuperação eficiente de dados.

### Serviços Principais

- **KeymapService:** Gerencia keymaps personalizados em formato JSON.
- **ConversionService:** Converte formatos JSON para protobuf e vice-versa.
- **FirmwareManager:** Responsável por conexão com a porta COM e envio de firmware binário aos teclados Aeon.
- **UserService:** Gestão de cadastros, logins e atualização de perfis.
- **RankService:** Processamento e recuperação dos rankings dos usuários.
- **GameService:** Controle do jogo de digitação, gerenciamento de pontos e registro de desempenho.

### Infraestrutura

- **Proxy Reverso:** Configurado para HTTPS seguro e gerenciamento da comunicação entre usuário e aplicação.
- **Banco de Dados:** PostgreSQL para armazenamento seguro e estruturado.

## Identidade Visual

A identidade visual da Aeon reflete sofisticação e precisão, utilizando uma paleta de cores cuidadosamente selecionada:

| Cor                 | Código HEX |
|---------------------|------------|
| Preto Profundo      | #0D0D0D    |
| Branco Puro         | #FFFFFF    |
| Branco Quente       | #F2F1EF    |
| Dourado Clássico    | #FFD700    |
| Dourado Envelhecido | #CCB338    |

### Tipografia

- **Principal:** Adrianna DemiBold
- **Secundária:** Cormorant Garamond

## Como executar o projeto

### Pré-requisitos

- Node.js
- npm/yarn

### Instalação

```bash
git clone https://github.com/seu-usuario/aeon-frontend.git
cd aeon-frontend
npm install
```

### Execução

```bash
ng serve
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests para melhorias ou novas funcionalidades.

## Licença

Este projeto é licenciado sob a licença MIT — veja o arquivo [LICENSE](LICENSE) para detalhes.

---
Desenvolvido com sofisticação e precisão pela aeon.

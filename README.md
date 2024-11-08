# 🎥 Biblioteca de Filmes com Recomendações e Avaliações

## CLIENT

## API SERVICE
## Descrição do Projeto
Este é um projeto de backend para uma **Biblioteca de Filmes** que permite que usuários adicionem filmes que já assistiram, façam avaliações e recebam recomendações com base nas avaliações de outros usuários. O projeto é ideal para demonstrar habilidades em desenvolvimento backend, integração com banco de dados e criação de APIs seguras.

## Funcionalidades do Backend
- **CRUD de Filmes**: Endpoints para adicionar, editar, listar e remover filmes da biblioteca.
- **Avaliações de Filmes**: Usuários podem avaliar filmes de 1 a 5 estrelas e deixar comentários opcionais.
- **Recomendações de Filmes**: Algoritmo que fornece recomendações de filmes com base nas avaliações de outros usuários com perfis de avaliação semelhantes.
- **Autenticação de Usuários**: Implementada com JWT para proteger as rotas e fornecer acesso seguro aos usuários autenticados.
- **Pesquisa e Filtragem**: Endpoints para buscar filmes por título, gênero, ano de lançamento e outros critérios.

## Tecnologias Utilizadas
- **Node.js com Express**: Framework para criar a API e gerenciar rotas.
- **PostgreSQL**: Banco de dados relacional utilizado para armazenar dados de filmes, usuários e avaliações.
- **JWT (JSON Web Token)**: Autenticação e segurança das rotas.
- **pnpm**: Gerenciador de pacotes utilizado para gerenciar dependências de forma eficiente.

## Estrutura de Pastas

### Descrição das Pastas
- **controllers/**: Contém a lógica dos controladores que gerenciam as requisições HTTP.
- **models/**: Define os modelos de dados e as interações com o banco de dados.
- **routes/**: Define as rotas da API.
- **services/**: Contém a lógica de negócios, como algoritmos de recomendação.
- **middlewares/**: Middleware para autenticação e outras funções intermediárias.
- **database/**: Configurações da aplicação, como conexões de banco de dados.
- **utils/**: Funções auxiliares e utilitários.

## Como Executar o Projeto

### Pré-requisitos
- Node.js
- PostgreSQL
- `pnpm` (para gerenciar dependências)

### Configuração do Banco de Dados
1. Crie um banco de dados PostgreSQL (foi utilizado o AIVEN gratuitamente).
2. Preencha as variáveis de ambiente no arquivo `.env` com as informações do banco de dados. Veja o exemplo em `.env.example`



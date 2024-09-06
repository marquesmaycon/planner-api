# Planejador de Viagens - Backend

Este é o backend do projeto **Planejador de Viagens**, originalmente desenvolvido durante o evento **Rocketseat NLW 2024**. O projeto foi estendido com novas funcionalidades e melhorias para oferecer uma experiência mais completa.

## Novas Funcionalidades

- **Criação de Conta**: Permite que novos usuários se cadastrem na plataforma.
- **Login com Autenticação**: Autenticação segura utilizando **Access Tokens**.
- **CRUD Completo dos Recursos da Viagem**:
  - **Local**
  - **Dias da viagem**
  - **Atividades**
  - **Links**
  - **Participantes**
- **Validações**: Todas as entradas são validadas para garantir a integridade dos dados.
- **Migrations, Seeders e Factories**: Facilita o gerenciamento e a configuração do banco de dados.

## Tecnologias Utilizadas
- **AdonisJS 6**: Framework backend para Node.js.
- **TypeScript**: Linguagem principal do projeto.
- **Node.js**: Ambiente de execução.
- **Lucid**: ORM para interagir com o banco de dados.
- **VineJS**: Biblioteca de validação de dados.
- **SQLite**: Banco de dados simples para facilitar a execução do projeto

## Pré-requisitos

- **Node.js** >= 20.6
- **NPM**

## Instalação

1. **Clone o repositório**:

```bash
git clone https://https://github.com/marquesmaycon/planner-api
```


2. **Instale as dependências:**
```
# Com NPM
npm i
```

3. **Migrations e Seeders:**
```
# Rode as migrações (criação das tabelas)
node ace migration:run

# Popule o banco de dados
node ace db:seed
```

4. **Inicie o servidor em ambiente de desenvolvimento**
```
npm run dev
```

## Observações
> Os testes automatizados ainda não implementados
>
> Usuários para testes (todos com a senha: ```123456```)
> * ```fulano@mail.com```
> * ```ciclano@mail.com```
> * ```beltrana@mail.com```


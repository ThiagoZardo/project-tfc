# Boas vindas ao meu repositório do Trybe Futebol Clube!

<details>
<summary><strong>👨‍💻 O que foi desenvolvido</strong></summary><br />

  ![Exemplo app front](assets/front-example.png)

  O `TFC` é um site informativo sobre partidas e classificações de futebol! ⚽️

  No time de desenvolvimento do `TFC`, seu *squad* ficou responsável por desenvolver uma API (utilizando o método `TDD`) e também integrar *- através do docker-compose -* as aplicações para que elas funcionem consumindo um banco de dados.

  Nesse projeto, construi **um back-end dockerizado utilizando modelagem de dados através do Sequelize**. Seu desenvolvimento deve **respeitar regras de negócio que foram estabelecidas pela Trybe** no projeto e **a API deve ser capaz de ser consumida por um front-end já provido nesse projeto**.

  Para adicionar uma partida é necessário ter um _token_, portanto a pessoa deverá estar logada para fazer as alterações. Teremos um relacionamento entre as tabelas `teams` e `matches` para fazer as atualizações das partidas.

  O back-end implementa regras de negócio para popular adequadamente a tabela disponível no front-end que será exibida para o usuário do sistema.

</details>

## Habilidades desenvolvidas
  Neste projeto, fiz o uso de Hof's com Typescript com Sequelize juntamente com o uso de classes, e conceitos básicos de POO e SOLID.

<details>

1️⃣ **Banco de dados:**
  - É um container docker MySQL já configurado no docker-compose através de um serviço definido como `db`.
  - Tem o papel de fornecer dados para o serviço de _backend_.
  - Durante a execução dos testes sempre vai ser acessado pelo `sequelize` e via porta `3002` do `localhost`;
  - Você também pode conectar a um Cliente MySQL (Workbench, Beekeeper, DBeaver e etc), colocando as credenciais configuradas no docker-compose no serviço `db`.

2️⃣ **Back-end:**
 - É o ambiente que realizei a maior parte das implementações exigidas.
 - Ele roda na porta `3001`, pois o front-end faz requisições para ele nessa porta por padrão;
 - A aplicação é inicializada a partir do arquivo `app/backend/src/server.ts`;
 - O `express` é executado e a aplicação ouve a porta que vem das variáveis de ambiente;

3️⃣ **Front-end:**
  - O front já estava concluído, não foi necessário realizar modificações no mesmo. A única exceção foi o Dockerfile que precisei configura-lo.
  - O front se comunica com serviço de back-end pela url `http://localhost:3001` através dos endpoints que foi construido nos requisitos do projeto.

4️⃣ **Docker:**
  - O `docker-compose` tem a responsabilidade de unir todos os serviços conteinerizados (backend, frontend e db) e subir o projeto completo com o comando `npm run compose:up` ou `npm run compose:up:dev`;
  - Fiz a configuração dos `Dockerfiles` corretamente nas raízes do `front-end` e `back-end`, para conseguir inicializar a aplicação;

</details>

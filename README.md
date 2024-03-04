Projeto Food Explorer API

O Food Explorer representa a conclusão do curso Explorer da Rocketseat, sendo um aplicativo de pedidos de comida que pode ser utilizado em um restaurante.

O projeto engloba várias funcionalidades, como cadastro e login com autenticação por tokens, capacidade de adicionar itens ao pedido com quantidades desejadas, opção de favoritar pratos, bem como uma lista de favoritos, incluir itens no carrinho e a finalização do pedido com uma simulação de pagamento (a funcionalidade de pagamento é apenas ilustrativa). 

Importante destacar que o sistema conta com dois tipos de usuários: o administrador (admin) e o usuário comum (custumer), cada um com permissões específicas e acesso a recursos distintos.

O administrador tem a capacidade de adicionar novos pratos, editar os existentes ou excluí-los, além disso, é responsável por atualizar o status dos pedidos, desde a confirmação e entrega.

Tecnologias e principais bibliotecas utilizadas incluem: 
Node.js, Express, Knex, SQLITE.

Execução:

clonar projeto em:
  git https://github.com/limarod/food-app-back

  no terminal:

Instalar dependências:
    npm install

Aplicar as migrations:
    npx knex migrate:latest

Iniciar o servidor:
    npm run dev

Servidor vai inicializar em:
    http://localhost:3333


Utilizar uma API client como postman ou insomnia para cadastrar um user ADMIN enviando objeto JSON com a role 'admin' , ou
utilizar um gerenciador database como SQL Server ou Beekeeper Studio para alteração da role manualmente.

O cadastro de usuários na interface se dará apenas para users comuns (Customer).

{
	"name": "xxxx",
	"email": "xxxx@email.com",
	"password": "xxxx",
	"role": "admin"
}
# Food Explorer API
O Food Explorer é um aplicativo de pedidos de comida desenvolvido como parte do curso Explorer da Rocketseat.

# Funcionalidades Principais:
- Cadastro e login com autenticação por tokens.
- Adição de itens ao pedido com quantidades desejadas.
- Opção de favoritar pratos e lista de favoritos.
- Inclusão de itens no carrinho.
- Finalização do pedido com simulação de pagamento.

# Tipos de Usuários:
O sistema possui dois tipos de usuários:
- Administrador (role: admin)
- Usuário Comum (role: customer)

O administrador pode adicionar, editar e excluir pratos, além de atualizar o status dos pedidos.

# Tecnologias Utilizadas:
- Node.js
- Express
- Knex
- SQLITE

# Execução do Projeto

clonar projeto em:
  [https://github.com/limarod/food-app-back](git https://github.com/limarod/food-app-back)

1. Instalar dependências:
```bash
npm install
```
2. Aplicar as migrations:
```bash
npx knex migrate:latest
```
3. Iniciar o servidor:
```bash
    npm run dev
```
4. Servidor vai inicializar em:
    http://localhost:3333

# Cadastro de usuários
Utilizar uma API client (como postman ou insomnia) para cadastrar um user ADMIN enviando objeto JSON com a role 'admin' , ou
utilizar um gerenciador database como SQL Server ou Beekeeper Studio para alteração da role manualmente.

O cadastro de usuários na interface se dará apenas para users comuns (Customer).

Exemplo de cadastro user 'Admin'

```json
{
	"name": "xxxx",
	"email": "xxxx@email.com",
	"password": "xxxx",
	"role": "admin"
}
```

# API de Personagens de Diários de Vampiros

API simples para administrar informações sobre personagens de Diários de Vampiros.

## Série Diários de Vampiros: Resumo

Diários de Vampiros é uma série de televisão que segue a vida de Elena Gilbert enquanto ela se envolve em um triângulo amoroso com dois irmãos vampiros, Stefan e Damon Salvatore. A trama se desenrola na misteriosa cidade de Mystic Falls, onde segredos antigos, magia e a luta pelo poder criam um ambiente tenso e emocionante.

## Rotas

### Listar Personagens

- **URL:** `/chars`
- **Método:** `GET`
- **Descrição:** Retorna uma lista de personagens de Diários de Vampiros.

### Obter Detalhes de um Personagem

- **URL:** `/chars/:id`
- **Método:** `GET`
- **Descrição:** Retorna detalhes de um personagem específico de Diários de Vampiros.

### Adicionar um Novo Personagem

- **URL:** `/chars`
- **Método:** `POST`
- **Descrição:** Adiciona um novo personagem a API.

### Atualizar Detalhes de um Personagem

- **URL:** `/chars/:id`
- **Método:** `PUT`
- **Descrição:** Atualiza os detalhes de um personagem.

### Excluir um Personagem

- **URL:** `/chars/:id`
- **Método:** `DELETE`
- **Descrição:** Exclui um personagem específico.

## Configuração

Certifique-se de ter Node.js e npm instalados. Execute `npm install` para instalar as dependências.

## Executando a Aplicação

- Execute `npm start` e acesse a aplicação em `http://localhost:3333`.
- ou acesse a aplicaçao no [link](https://api-tvd-7tdl.onrender.com/chars)

## Contribuindo

Contribuições são bem-vindas! Envie pull requests.

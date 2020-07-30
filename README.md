API de arquivos da São Paulo Urbanismo

**Pré-requisitos**
 - [nodejs](https://nodejs.org/en/)
 - [mongodb](https://www.mongodb.com/)

### Setup
1. Instale as dependências do projeto
```sh
npm i
```

2. Variáveis de ambiente
crie arquivo `.env` a partir do arquivo `.env.example` e altere os parâmetros se necessário
```
PORT=5000
HOST=localhost
PROTOCOL=http
MONGODB_URI=mongodb://localhost:27017/db_arquivos
API_KEY=123abc456!@#789
```

3. Caso não tenha instale localmente o mongodb. Vejas as intruções na [documentação do mongodb](https://docs.mongodb.com/manual/administration/install-community/).

### Desenvolvimento
```sh
# desenvolver
npm run dev

# rodar linter
npm run lint

# rodar testes
npm run test

# rodar testes em modo "watch"
npm run test:watch
```

### Publicação
```sh
# gera o build em `dist/` e inicia a aplicação
npm run start
```
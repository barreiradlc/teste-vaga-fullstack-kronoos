# Decisões de negócio

## Considerações gerais

### Desenvolvimento em inglês

> Todo o projeto está em inglês para manter a convenção de entidades, enunciados e pluralização

### TDD

> Toda funcionalidade primeiro será pensanda como um teste que assim que concluído ser implementada de fato

## Escolha de ferramentas

### Prisma

> ORM para conecção com o banco de dados, uma ORM robusta que não deixa a desejar em sua aplicação

### Mongo DB

> Banco de dados não relacional para lidar com uma grande massa de dados. Ideal para leitura e inserção de valoresde forma tão robusta


# Requisitos

[x] - Os dados são fornecidos em formato CSV. Utilizaremos a biblioteca fs (File System) para ler o arquivo CSV e a biblioteca csv-parser para processar os dados e convertê-los em um array de objetos JavaScript.

[x] - Valores monetários, como vlTotal, vlPresta, vlMora, etc., precisam ser formatados como moeda brasileira (BRL). Utilizaremos a biblioteca intl do JavaScript para formatar os valores numéricos como moeda BRL, incluindo o símbolo de real (R$), separador de milhar e precisão de duas casas decimais.

[x] - Implementaremos uma função para validar o campo nrCpfCnpj e verificar se ele é um CPF ou CNPJ válido, seguindo as regras de validação apropriadas para cada formato. Parte de todos os CPF e CNPJ sao invalidos, usamos um script para gerar dados fictícios. 

[x] - Dividiremos o valor de `vlTotal` pela quantidade de prestações (`qtPrestacoes`). Verificaremos se o resultado dessa divisão é igual ao valor de `vlPresta` para cada prestação, garantindo que os cálculos estejam corretos e consistentes.

# Como interagir com a aplicação

## Testes

Testes unitários estão implementados nos casos de uso para averiguar seu funcionamento esperado.
Para executar eles basta executar `make test`.

## Docker

A aplicação está em docker, sendo assim os simples domandos `make prisma-g && make prisma-p` e logo após `make up-build` será o bastante para vê-lo functionar

## Banco de dados

Para um primeiro contato vamos precisar configurar as replicasets para nosso projeto com os seguintes comandos:

> Com este comando entramos no banco

```sh 
  docker exec -it mongo1 mongosh --username root --password password
```

> E assim podemos inicializar nossa replicaset

```mongo
  rs.initiate({
    _id: "rs0",
    members: [
      { _id: 0, host: "mongo1:27017" },
      { _id: 1, host: "mongo2:27017" },
      { _id: 2, host: "mongo3:27017" }
    ]
  })

```

> E para verificar se está tudo bem, execute:

```sh 
  rs.status()
```


# Changelog 

## V1

### 1.0.0

>> Nesta primeira versão o App está funcional com o cadastro de itens e seus respectivos erros de validação.
Tudo é feito em uma chamada na Controller de upload de csv onde é feita a leitura da planilha e o tratamento de erros e armazenamentos dos mesmos.
O endpoint pode ser testado utilizando a extensão [rest client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) do vs code e navegando até o arquivo [item.http](src/http/controllers/items/items.http) para fazer a requisição com um arquivo .

#### Notas para a próxima versão:

 - Os arquivos podem escalar de forma infinita em tamanho, sendo assim transações independentes não fazem sentido em um contexto de larga escala.

 - Períodos de upload e interações no geral são comumente associados a alto tráfego, sendo assim a demanda de banco de dados deve ser opostamente inversa a ela.

 - Informações se repetem nas colunas da planilha, verificar se pode ser feita uma inserção no banco associada a elas. Por exemplo, dsCarteira, cdClient e nmClient.

- A cobertura de testes não está 100%. Apenas abrangendo os casos de uso. Validar se precisa, caso precise averiguar outras metodologias para atingir esta meta.
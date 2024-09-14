# Decisões de negócio

## Escolha de ferramentas

### Prisma
> Ferramenta para conecção com o banco de dados, uma ORM robusta que não deixa a desejar em sua aplicação

### Mongo DB
> Banco de dados não relacional para lidar com uma grande massa de dados.


# Requisitos

[x] - Os dados são fornecidos em formato CSV. Utilizaremos a biblioteca fs (File System) para ler o arquivo CSV e a biblioteca csv-parser para processar os dados e convertê-los em um array de objetos JavaScript.

[x] - Valores monetários, como vlTotal, vlPresta, vlMora, etc., precisam ser formatados como moeda brasileira (BRL). Utilizaremos a biblioteca intl do JavaScript para formatar os valores numéricos como moeda BRL, incluindo o símbolo de real (R$), separador de milhar e precisão de duas casas decimais.

[ ] - Implementaremos uma função para validar o campo nrCpfCnpj e verificar se ele é um CPF ou CNPJ válido, seguindo as regras de validação apropriadas para cada formato. Parte de todos os CPF e CNPJ sao invalidos, usamos um script para gerar dados fictícios. 

[ ] - Dividiremos o valor de `vlTotal` pela quantidade de prestações (`qtPrestacoes`). Verificaremos se o resultado dessa divisão é igual ao valor de `vlPresta` para cada prestação, garantindo que os cálculos estejam corretos e consistentes.

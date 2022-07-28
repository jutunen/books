from node:16.16.0

WORKDIR /db

COPY . .

RUN npm install

RUN npm install -g knex

RUN chmod +x wait-for-it.sh

CMD ["sh","-c", "./wait-for-it.sh postgres:5432 && knex migrate:latest && knex seed:run"]
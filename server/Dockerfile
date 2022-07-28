from node:16.16.0

WORKDIR /server

COPY . .

RUN npm install

RUN chmod +x wait-for-it.sh

EXPOSE 3100

CMD ["sh","-c", "./wait-for-it.sh postgres:5432 && npm run start"]
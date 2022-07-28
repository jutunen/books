from node:16.16.0

WORKDIR /client

COPY . .

RUN npm install

RUN chmod +x wait-for-it.sh

EXPOSE 3000

CMD ["sh","-c", "./wait-for-it.sh server:3100 && npm start"]
FROM node:8.10
ARG runCommand="start:dev_docker"
ENV RUNCOMMAND=$runCommand
RUN npm install pm2 -g
WORKDIR /home/node/app
COPY / /home/node/app
RUN npm install
EXPOSE 27017
EXPOSE 7001
RUN echo "$RUNCOMMAND"
ENTRYPOINT ["sh", "-c", "npm run $RUNCOMMAND"]
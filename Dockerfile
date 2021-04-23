FROM node:8.10
ARG runCommand="start:prod"
ENV RUNCOMMAND=$runCommand
RUN npm install pm2 -g
RUN pm2 install typescript
WORKDIR /home/node/app
COPY / /home/node/app
RUN npm install
EXPOSE 27017
EXPOSE 3000
RUN echo "$RUNCOMMAND"
ENTRYPOINT ["sh", "-c", "npm run $RUNCOMMAND"]
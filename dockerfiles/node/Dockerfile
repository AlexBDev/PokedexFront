FROM node:8.0

RUN chown -R node:node /usr/local/bin/node \
    /usr/local/bin \
    /usr/local/lib/node_modules

USER node

RUN npm install -g @angular/cli

WORKDIR /app
CMD tail -f /dev/null
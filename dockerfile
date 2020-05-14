# base image
FROM node

# set working directory
WORKDIR /build

# add `/app/node_modules/.bin` to $PATH
ENV PATH /build/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /build/package.json
RUN npm install
RUN npm install @vue/cli@3.7.0 -g

# start app
CMD ["npm", "run", "serve"]

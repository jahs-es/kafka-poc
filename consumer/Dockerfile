FROM node:12.16.2
RUN mkdir -p /usr/src
WORKDIR /usr/src
COPY . /usr/src
RUN printf "deb http://archive.debian.org/debian/ jessie main\ndeb-src http://archive.debian.org/debian/ jessie main\ndeb http://security.debian.org jessie/updates main\ndeb-src http://security.debian.org jessie/updates main" > /etc/apt/sources.list
RUN apt-get update && apt-get install netcat -y --allow-unauthenticated
RUN npm install
CMD ["npm", "run", "start:production"]

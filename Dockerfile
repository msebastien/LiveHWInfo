FROM node:12.20.1-buster
LABEL maintainer="sebastien.maes3@gmail.com"
RUN apt-get -y update && apt-get -y upgrade
ADD . /home/livehwinfo
WORKDIR /home/livehwinfo
RUN npm install
ENTRYPOINT ["node", "app.js"]
VOLUME /home/livehwinfo
USER 1000
EXPOSE 4200
	

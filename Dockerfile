FROM alpine:latest

COPY ./lighttpd-config/lighttpd.conf lighttpd.conf 
COPY ./app/ /var/www/localhost/htdocs

RUN \
	apk update && \
	apk upgrade && \
	apk add lighttpd && \
	apk add openrc && \
	rc-update add lighttpd default 

EXPOSE 80

CMD ["lighttpd", "-D", "-f", "/etc/lighttpd/lighttpd.conf"]


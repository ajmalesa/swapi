FROM alpine:latest

COPY ./app/ /var/www/localhost/htdocs

COPY ./lighttpd-config/lighttpd.conf lighttpd.conf 

RUN \
	apk add lighttpd && \
	apk add openrc && \
	rc-update add lighttpd default && \
	lighttpd -D -f lighttpd.conf

EXPOSE 8484

ENTRYPOINT /bin/ash
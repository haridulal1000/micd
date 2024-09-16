FROM nginx:stable-alpine

RUN rm /etc/nginx/conf.d/default.conf
ADD app/dist/ /usr/share/nginx/html/
COPY webapp-nginx.conf /etc/nginx/conf.d/webapp.conf

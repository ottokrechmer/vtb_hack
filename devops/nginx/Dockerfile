FROM nginx

COPY nginx.conf /etc/nginx/
COPY server.conf /home/nginx/
RUN mkdir -p /var/www/front/build && mkdir /tmp/static/
COPY static /tmp/static/
COPY build /var/www/front/build

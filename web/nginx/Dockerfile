## docker build --rm -t daggerok/learn-jvm:latest -f config/nginx/Dockerfile .
## docker push daggerok/learn-jvm:latest
## docker run -d -p 80:80 --name daggerok-learn-jvm daggerok/learn-jvm:latest

FROM nginx:1.10.3-alpine
COPY dist /usr/share/nginx/html
COPY config/nginx/default.conf /etc/nginx/conf.d/default.conf

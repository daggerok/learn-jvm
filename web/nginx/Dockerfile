## docker build --rm -t daggerok/learn-jvm-ui -f nginx/Dockerfile .
## docker tag daggerok/learn-jvm-ui daggerok/learn-jvm-ui:latest
## docker push daggerok/learn-jvm-ui:latest
## docker run -d -p 80:80 --name daggerok-learn-jvm-ui daggerok/learn-jvm-ui:latest

FROM nginx:1.10.3-alpine
COPY dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

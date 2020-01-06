FROM openjdk:8-jre-alpine
MAINTAINER Simon Elliston Ball <simon@simonellistonball.com>

ARG JAR_FILE
ADD target/${JAR_FILE} /usr/share/fsec/app.jar

ENTRYPOINT ["java", "-jar", "/usr/share/fsec/app.jar"]


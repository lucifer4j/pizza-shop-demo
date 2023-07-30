FROM node:16-alpine AS frontend-builder

WORKDIR /app

COPY frontend/package.json frontend/package-lock.json frontend/tsconfig.json ./
RUN npm ci

COPY frontend/public ./public
COPY frontend/src ./src

RUN npm run build

FROM maven:3.9.3-eclipse-temurin-17 AS backend-builder

WORKDIR /app

COPY backend/pom.xml /app
RUN mvn dependency:go-offline

COPY backend/src /app/src
COPY --from=frontend-builder /app/build /app/src/main/resources/webroot/

RUN mvn clean package

FROM registry.access.redhat.com/ubi8/ubi-minimal:8.1

ARG JAVA_PACKAGE=java-17-openjdk-headless
ARG RUN_JAVA_VERSION=1.3.5

ENV LANG='en_US.UTF-8' LANGUAGE='en_US:en'

# Install java and the run-java script
# Also set up permissions for user `1001`
RUN microdnf install openssl curl ca-certificates ${JAVA_PACKAGE} \
    && microdnf update \
    && microdnf clean all \
    && mkdir /deployments \
    && chown 1001 /deployments \
    && chmod "g+rwX" /deployments \
    && chown 1001:root /deployments \
    && curl https://repo1.maven.org/maven2/io/fabric8/run-java-sh/${RUN_JAVA_VERSION}/run-java-sh-${RUN_JAVA_VERSION}-sh.sh -o /deployments/run-java.sh \
    && chown 1001 /deployments/run-java.sh \
    && chmod 540 /deployments/run-java.sh \
    && echo "securerandom.source=file:/dev/urandom" >> /etc/alternatives/jre/lib/security/java.security

COPY --from=backend-builder /app/target/lib/ /deployments/lib/
COPY --from=backend-builder /app/target/*.jar /deployments/

EXPOSE 8080
USER 1001

ENTRYPOINT [ "/deployments/run-java.sh" ]

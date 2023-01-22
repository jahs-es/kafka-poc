### kafka-poc

An exercise connecting to a kafka cluster producing and consuming messages.

Using https://kafka.js.org/

## How to run in development

### Launch infrastructure

```bash
cd docker && export HOST_IP=$(ifconfig | grep -E "([0-9]{1,3}\.){3}[0-9]{1,3}" | grep -v 127.0.0.1 | awk '{ print $2 }' | cut -f2 -d: | head -n1) && docker-compose --env-file .env up -d
```

To access to kafka dashboard:
http://localhost:8085/

### Producer

```bash
cd producer && yarn start
```

### Consumer

```bash
cd consumer && yarn start
```



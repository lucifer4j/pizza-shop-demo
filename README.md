# Pizza Shop Demo

This repository contains the code for the Pizza Shop Demo. 

![](images/architecture.png)

## Run the demo

```bash
docker compose \
  -f docker-compose-base.yml \
  -f docker-compose-pinot.yml \
  -f docker-compose-dashboard-enriched-quarkus.yml \
  -f docker-compose-dashboard-vertx.yml \
  up
```

```bash
docker compose \
  -f docker-compose-base.yml \
  -f docker-compose-pinot-m1.yml \
  -f docker-compose-dashboard-enriched-quarkus.yml \
  -f docker-compose-dashboard-vertx.yml \
  up --build
```

Once that's run, you can navigate to the following:

* Pinot UI - http://localhost:9000
* Vert.x Dashboard - http://localhost:8080

You can find a deeper dive on each of the components at https://dev.startree.ai/docs/pinot/demo-apps/pizza-shop

## Things that sometimes don't work

Less frequently, the `pinot-add-table` service never returns code 0 if it created one table and not the other. To stop that service, run this:

```
docker stop pinot-add-table
```


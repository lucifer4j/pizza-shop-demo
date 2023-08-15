package pizzashop;

import io.reactiverse.pinot.client.VertxConnection;
import io.reactiverse.pinot.client.VertxConnectionFactory;
import io.vertx.core.AbstractVerticle;
import io.vertx.core.Future;
import io.vertx.core.http.HttpMethod;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.StaticHandler;
import org.apache.pinot.client.ResultSet;
import org.apache.pinot.client.VertxPinotClientTransport;

import java.util.List;
import java.util.function.Function;

public class DashboardVerticle extends AbstractVerticle {

  private VertxConnection connection;
  private static final Object EMPTY_JSON_ARRAY = JsonArray.of();
  private static final Object EMPTY_JSON_OBJECT = JsonObject.of();

  @Override
  public void start() {
    var brokerUrl = getBrokerUrl();
    var transport = new VertxPinotClientTransport(vertx);
    connection = VertxConnectionFactory.fromHostList(vertx, List.of(brokerUrl), transport);

    var router = Router.router(vertx);
    router.get("/api/dashboard").handler(this::queryDashboard);
    router.get().handler(StaticHandler.create());

    vertx
        .createHttpServer()
        .requestHandler(router)
        .listen(8080)
        .onSuccess(server -> System.out.println("Server started successfully!"))
        .onFailure(Throwable::printStackTrace);
  }

  private String getBrokerUrl() {
    var host = System.getenv("PINOT_SERVER");
    if (host == null || host.isEmpty()) {
      host = "pinot-broker";
    }
    var port = System.getenv("PINOT_PORT");
    if (port == null || port.isEmpty()) {
      port = "8099";
    }
    return host + ":" + port;
  }

  private void queryDashboard(RoutingContext routingContext) {
    Future
        .all(
            queryOrdersInfo(),
            queryOrdersRevenue(),
            queryOrdersRecent(),
            queryMostPopularItems(),
            queryMostPopularCategories()
        ).map(compositeFuture -> new JsonObject()
            .put("ordersInfo", compositeFuture.resultAt(0))
            .put("ordersRevenue", compositeFuture.resultAt(1))
            .put("ordersRecent", compositeFuture.resultAt(2))
            .put("mostPopularItems", compositeFuture.resultAt(3))
            .put("mostPopularCategories", compositeFuture.resultAt(4))
            .toBuffer()
        ).onSuccess(buffer -> routingContext
            .response()
            .putHeader("content-type", "application/json")
            .end(buffer)
        ).onFailure(routingContext::fail);
  }

  private Future<Object> queryOrdersInfo() {
    String query = """
        select count(*) FILTER(WHERE ts > ago('PT1M')) AS events1Min
             , count(*) FILTER(WHERE ts <= ago('PT1M') AND ts > ago('PT2M')) AS events1Min2Min
             , sum(price) FILTER(WHERE ts > ago('PT1M')) AS total1Min
             , sum(price) FILTER(WHERE ts <= ago('PT1M') AND ts > ago('PT2M')) AS total1Min2Min
             , avg(price) FILTER(WHERE ts > ago('PT1M')) AS average1Min
             , avg(price) FILTER(WHERE ts <= ago('PT1M') AND ts > ago('PT2M')) AS average1Min2Min
          from orders
         where ts > ago('PT2M')
         limit 1
    """;

    return executeQuery(query, resultSet -> {
      var json = new JsonObject()
          .put("events1Min", resultSet.getDouble(0, 0))
          .put("events1Min2Min", resultSet.getDouble(0, 1))
          .put("total1Min", resultSet.getDouble(0, 2))
          .put("total1Min2Min", resultSet.getDouble(0, 3))
          .put("average1Min", resultSet.getDouble(0, 4))
          .put("average1Min2Min", resultSet.getDouble(0, 5));
      return json;
    }, EMPTY_JSON_OBJECT);
  }

  private Future<Object> queryOrdersRevenue() {
    String query = """
          select ToDateTime(DATETRUNC('second', ts), 'yyyy-MM-dd HH:mm:ss') AS dateMin
               , count(*) AS orders
               , sum(price) AS revenue
            from orders
           where ts > ago('PT1M')
        group by dateMin
        order by dateMin desc
           limit 10000
    """;

    return executeQuery(query, resultSet -> {
      var json = new JsonArray();
      for (int index = 0; index < resultSet.getRowCount(); index++) {
        var object = new JsonObject()
            .put("dateMin", resultSet.getString(index, 0))
            .put("orders", resultSet.getDouble(index, 1))
            .put("revenue", resultSet.getDouble(index, 2));
        json.add(object);
      }
      return json;
    }, EMPTY_JSON_ARRAY);
  }

  private Future<Object> queryOrdersRecent() {
    String query = """
          select ToDateTime(ts, 'HH:mm:ss:SSS') AS dateTime
               , status
               , price
               , userId
               , productsOrdered
               , totalQuantity
            from orders
        order by ts DESC
           limit 10
    """;

    return executeQuery(query, resultSet -> {
      var json = new JsonArray();
      for (int index = 0; index < resultSet.getRowCount(); index++) {
        var object = new JsonObject()
            .put("dateTime", resultSet.getString(index, 0))
            .put("status", resultSet.getString(index, 1))
            .put("price", resultSet.getDouble(index, 2))
            .put("userId", resultSet.getLong(index, 3))
            .put("productsOrdered", resultSet.getLong(index, 4))
            .put("totalQuantity", resultSet.getDouble(index, 5));
        json.add(object);
      }
      return json;
    }, EMPTY_JSON_ARRAY);
  }

  private Future<Object> queryMostPopularItems() {
    String query = """
        select "product.name" AS product
             , "product.image" AS image
             , distinctcount(orderId) AS orders
             , sum("orderItem.quantity") AS quantity
          from order_items_enriched
         where ts > ago('PT1M')
      group by product, image
      order by count(*) DESC
         limit 5
    """;
    return executeQuery(query, resultSet -> {
      var json = new JsonArray();
      for (int index = 0; index < resultSet.getRowCount(); index++) {
        var object = new JsonObject()
            .put("product", resultSet.getString(index, 0))
            .put("image", resultSet.getString(index, 1))
            .put("orders", resultSet.getDouble(index, 2))
            .put("quantity", resultSet.getDouble(index, 3));
        json.add(object);
      }
      return json;
    }, EMPTY_JSON_ARRAY);
  }

  private Future<Object> queryMostPopularCategories() {
    String query = """
        select "product.category" AS category
             , distinctcount(orderId) AS orders
             , sum("orderItem.quantity") AS quantity
          from order_items_enriched
         where ts > ago('PT1M')
      group by category
      order by count(*) DESC
         limit 5
    """;
    return executeQuery(query, resultSet -> {
      var json = new JsonArray();
      for (int index = 0; index < resultSet.getRowCount(); index++) {
        var object = new JsonObject()
            .put("category", resultSet.getString(index, 0))
            .put("orders", resultSet.getDouble(index, 1))
            .put("quantity", resultSet.getDouble(index, 2));
        json.add(object);
      }
      return json;
    }, EMPTY_JSON_ARRAY);
  }

  private Future<Object> executeQuery(String query, Function<ResultSet, Object> resultSetProcessor, Object emptyObject) {
    return connection
        .execute(query)
        .map(resultSetGroup -> {
          for (var exception: resultSetGroup.getExceptions()) {
            exception.printStackTrace();
          }
          if (resultSetGroup.getResultSetCount() > 0) {
            ResultSet resultSet = resultSetGroup.getResultSet(0);
            return resultSetProcessor.apply(resultSet);
          }
          return emptyObject;
        });
  }

}

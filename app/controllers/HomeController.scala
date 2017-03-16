package controllers

import javax.inject._
import akka.actor.ActorSystem
import akka.stream.Materializer
import models.{City, DBStation, ApiStation}
import play.api._
import play.api.libs.json.{JsResult, Json}
import play.api.libs.ws.WSClient
import play.api.mvc._
import play.modules.reactivemongo.{ReactiveMongoComponents, MongoController, ReactiveMongoApi}
import reactivemongo.play.json.collection.JSONCollection
import scala.annotation.tailrec
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(val ws: WSClient, val reactiveMongoApi: ReactiveMongoApi)
                              (implicit configuration: Configuration,
                               system: ActorSystem,
                               materalizer: Materializer) extends Controller with MongoController with ReactiveMongoComponents {

  protected def getMongoCollection(name: String): Future[JSONCollection] = reactiveMongoApi.database.map(_.collection(name))

  //val cities = getMongoCollection("cities")
  lazy val bikes = getMongoCollection("bikes")



  /**
   * Create an Action to render an HTML page.
   *
   * The configuration in the `routes` file means that this method
   * will be called when the application receives a `GET` request with
   * a path of `/`.
   */
  def index = Action { implicit request =>
    Ok(views.html.index())
  }

  def getStationsFromCity(name: String) = Action.async { implicit request =>
    val f = ws.url("https://api.jcdecaux.com/vls/v1/stations").withQueryString("contract" -> name,"apiKey" -> "").get()
    f.map{ ws =>
      println("name " + name)
      println(ws)
      Ok(ws.json)
    }
  }

  def getCities = Action { implicit request =>
    Ok(Json.toJson(City.cities))
  }

  def createDBStation(l: List[ApiStation]) = {

    @tailrec
    def create(l: List[ApiStation], dbs: List[DBStation]): List[DBStation] = l match {
      case Nil => dbs
      case h::t => create(t, DBStation(h) :: dbs)
    }

    create(l,Nil)

  }

}

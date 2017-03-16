package controllers

import javax.inject._
import models.{City, DBStation, ApiStation}
import play.api._
import play.api.libs.json.{JsResult, Json}
import play.api.libs.ws.WSClient
import play.api.mvc._
import scala.annotation.tailrec
import scala.concurrent.ExecutionContext.Implicits.global

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(ws: WSClient) extends Controller {

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

  def test = Action.async { implicit request =>
    val f = ws.url("https://api.jcdecaux.com/vls/v1/stations").withQueryString("contract" ->"Paris","apiKey" -> "4e1ea8f55b5fc1c94f07daf7ed84108354f39a10").get()
    f.map{ ws =>
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

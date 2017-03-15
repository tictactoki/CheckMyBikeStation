package models

import com.typesafe.config.ConfigFactory
import play.api.libs.json.Json

/**
  * Created by stephane on 15/03/2017.
  */

case class City(name: String, lat: Double, lng: Double)

object City {

  implicit val cityFormat = Json.format[City]

  val cities = City("Paris", 48.856614, 2.352222) :: City("Rouen", 49.443232, 1.099971) :: City("Toulouse", 43.604652, 1.444209) :: Nil



}

package models

import play.api.libs.json.Json

/**
  * Created by stephane on 16/03/2017.
  */
case class Contract(name: String, cities: List[String], commercial_name: String, country_code: String)

object Contract {
  implicit val contractFormat = Json.format[Contract]
}
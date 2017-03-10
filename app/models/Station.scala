package models

import java.util.Date

import play.api.libs.json.Json

/**
  * Created by stephane on 10/03/2017.
  */
case class Position(lat: Double, lng: Double)

object Position {
  implicit val positionReads = Json.reads[Position]
}

case class ApiStation(number: Int,
                   contract_name: String,
                   name: String,
                   address: String,
                   position: Position,
                   banking: Boolean,
                   bonus: Boolean,
                   status: String,
                   bike_stands: Int,
                   available_bike_stands: Int,
                   available_bikes: Int,
                   last_update: Date
                  )

case class DBStation(number: Int,
                     contract_name: String,
                     name: String,
                     address: String,
                     position: Position,
                     banking: Boolean,
                     bonus: Boolean)

object DBStation {
  def apply(as: ApiStation) = new DBStation(as.number,as.contract_name,as.name,as.address,as.position,as.banking,as.bonus)
}

object ApiStation {
  implicit val stationReads = Json.reads[ApiStation]
}
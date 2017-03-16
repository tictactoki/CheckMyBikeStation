package models

import com.typesafe.config.ConfigFactory
import play.api.libs.json.Json

/**
  * Created by stephane on 15/03/2017.
  */

case class City(name: String, code: String, lat: Double, lng: Double)

object City {

  implicit val cityFormat = Json.format[City]

  val cities = {
    City("Paris", "[FR]", 48.856614, 2.352222) ::
      City("Rouen", "[FR]",49.443232, 1.099971) ::
      City("Toulouse", "[FR]",43.604652, 1.444209) ::
      City("Luxembourg", "[LU]",49.815273, 6.129583) ::
      City("Dublin", "[IE]",53.349805, -6.260310) ::
      City("Valence", "[ES]",39.469907, -0.376288) ::
      City("Stockholm", "[SE]",59.329323, 18.068581) ::
      City("Goteborg", "[SE]",57.708870, 11.974560) ::
      City("Santander", "[ES]",43.462306, -3.809980) ::
      City("Lund", "[SE]", 55.704660, 13.191007) ::
      City("Amiens","[FR]", 49.894067, 2.295753) ::
      City("Lillestrom", "[NO]", 59.955970, 11.050378) ::
      City("Mulhouse", "[FR]",47.750839, 7.335888) ::
      City("Lyon", "[FR]", 45.764043, 4.835659) ::
      City("Ljubljana", "[SI]",46.056947, 14.505751) ::
      City("Seville", "[ES]", 37.389092, -5.984459) ::
      City("Namur", "[BE]",50.467388, 4.871985) ::
      City("Nancy", "[FR]",48.692054, 6.184417) ::
      City("Creteil", "[FR]",48.790367, 2.455572) ::
      City("Bruxelles-Capitale", "[BE]",50.850346, 4.351721) ::
      City("Cergy-Pontoise", "[FR]",49.039076, 2.074954) ::
      City("Vilnius", "[LT]",54.687156, 25.279651) ::
      City("Kazan", "[RU]",55.830431, 49.066081) ::
      City("Toyama", "[JP]",36.695952, 137.213677) ::
      City("Marseille", "[FR]",43.296482, 5.369780) ::
      City("Nantes", "[FR]",47.218371, -1.553621) ::
      City("Brisbane", "[AU]",-27.469771, 153.025124) ::
      City("Besancon", "[FR]",47.237829, 6.024054) ::
      Nil
  }


}

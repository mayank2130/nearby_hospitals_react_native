import axios from "axios";

const BASE_URL = " https://places.googleapis.com/v1/places:searchNearby";

{/*  waiting for google approval to create map api keys */}

const API_KEY = "api_key";

const config = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": API_KEY,
    "X-Goog-FieldMask": [
      "places.displayName",
      "places.formattedAddress",
      "places.shortFormattedAddress",
      "places.location",
      "places.photos",
    ],
  },
};

const NewNearByPlace = (data) => axios.post(BASE_URL, data, config);

export default { NewNearByPlace, API_KEY };

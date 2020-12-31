// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

export default async (req, res) => {
  const { place_id } = req.query;
  try {
    const places = await axios(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=name,rating,opening_hours,price_level,url,formatted_address,formatted_phone_number,website,user_ratings_total&key=AIzaSyCgtjvgqJwMNxmkaxcS148R8dBLnfR8Sa8`
    );
    console.log(places);

    const place = places.data.result;
    if (!place) return res.json({ error: true, data: "no places found" });
    const result = {
      name: place.name,
      rating: place.rating,
      place_id: place_id,
      opening_hours: place.opening_hours,
      open_now: place.opening_hours.open_now,
      website: place.website,
      user_ratings_total: place.user_ratings_total,
      formatted_phone_number: place.formatted_phone_number,
      address: place.formatted_address,
      url: place.url,
    };
    return res.status(200).send({
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({ error: true, data: error });
  }
};

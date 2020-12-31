import React from "react";

const Index = ({ placesData }) => {
  if (!placesData) return null;
  const {
    address,
    name,
    price_level,
    opening_hours,
    rating = 0,
    website,
    user_ratings_total,
  } = placesData;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ marginBottom: 0 }}>{name}</h1>
        <h3 style={{ marginTop: 0 }}>{address}</h3>
      </div>
      <p>
        Rating:{" "}
        <strong>
          {Array(Math.floor(rating)).fill("⭐")}
          {rating - Math.floor(rating) >= 0.5 ? "✨" : ""}
        </strong>
      </p>
      <p>
        Total Ratings: <strong>{user_ratings_total}</strong>
      </p>
      <p>
        Price: <strong>{Array(price_level).fill("$")}</strong>
      </p>
      {opening_hours?.weekday_text ? (
        <ul style={{ listStyle: "none" }}>
          {opening_hours?.weekday_text.map((hours, key) => (
            <li key={key}>{hours}</li>
          ))}
        </ul>
      ) : null}
      <a href={website} target="_blank">
        Website 🌎
      </a>
    </div>
  );
};

Index.getInitialProps = async (ctx) => {
  try {
    const { place } = ctx.query;
    if (!place) return {};
    const placesData = await fetch(
      `http://localhost:3000/api/place?place_id=${place}`
    ).then((response) => response.json());

    return { placesData: placesData?.result };
  } catch (error) {
    console.log(error);
    return { placesData: {} };
  }
};
export default Index;

import React from "react";

const star = (half) =>
  half ? (
    <img
      src="/half_star.svg"
      style={{
        backgroundSize: "14px 13px",
        height: 13,
        top: 1,
      }}
    />
  ) : (
    <img
      src="/star.svg"
      style={{
        backgroundSize: "14px 13px",
        height: 13,
        top: 1,
      }}
    />
  );
const Index = ({ placesData, showName, showAddress }) => {
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
        {showName ? <h1 style={{ marginBottom: 0 }}>{name}</h1> : null}
        {showAddress ? <h3 style={{ marginTop: 0 }}>{address}</h3> : null}
      </div>
      <p>
        {Array(Math.floor(rating)).fill(star())}
        {rating - Math.floor(rating) >= 0.4 ? star(true) : ""} (
        {user_ratings_total}){" · "}
        <strong>{Array(price_level).fill("$")}</strong>
      </p>
      <div class="fastfacts infocolumn">hours</div>
      <div class="ff-div-hash"></div>
      {opening_hours?.weekday_text ? (
        <ul
          style={{
            paddingLeft: 0,
            textAlign: "center",
            lineHeight: "24px",
            listStyle: "none",
            fontFamily: "paralucent-text",
            fontWeight: 700,
            fontSize: 14,
            color: "#717171",
          }}
        >
          {opening_hours?.weekday_text.map((hours, key) => (
            <li key={key}>{hours.replace(":", " ")}</li>
          ))}
        </ul>
      ) : null}
      <a
        href={website}
        style={{
          listStyle: "none",
          fontFamily: "paralucent",
          fontWeight: 700,
          fontSize: 14,
          color: "#717171",
          textDecoration: "underline",
        }}
        target="_blank"
      >
        Website
      </a>
    </div>
  );
};

Index.getInitialProps = async (ctx) => {
  try {
    const { place, showName = false, showAddress = false } = ctx.query;
    if (!place) return {};
    const placesData = await fetch(
      `https://coventry-merchants.vercel.app/api/place?place_id=${place}`
    ).then((response) => response.json());

    return { placesData: placesData?.result, showName, showAddress };
  } catch (error) {
    console.log(error);
    return { placesData: {}, showName, showAddress };
  }
};
export default Index;

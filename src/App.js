import { useEffect, useState } from "react";
import { fetchChoices } from "./api";

const TodayChoices = () => {
  const [choices, setChoices] = useState([]);
  const [gatheringTime, setGatheringTime] = useState("");
  const [finalPlace, setFinalPlace] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getChoices = async () => {
      try {
        const data = await fetchChoices();
        setChoices(data.todayPlaces || []);
        setFinalPlace(data.finalPlace || ""); // Set finalPlace

        const gatheringDate = new Date(data.gatheringTime);
        const hours = gatheringDate.getHours().toString().padStart(2, '0');
        const minutes = gatheringDate.getMinutes().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;
        setGatheringTime(formattedTime);

      } catch (err) {
        setError("Failed to load choices");
      } finally {
        setLoading(false);
      }
    };
    getChoices();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div
      className="flex flex-col items-center text-white relative bg-cover bg-center"
      style={{
        backgroundImage: "url('https://i.ibb.co/HfpWXYKn/kai-pilger-Ef6i-L87-v-OA-unsplash.jpg')",
      }}
    >
    {/* Title */}
      <h1
        className="text-center"
        style={{
          fontFamily: "Garamond",
          fontWeight: "100",
          fontSize: "2.5em", // 36px -> 2.25em
          lineHeight: "1.25em", // 20px -> 1.25em
          letterSpacing: "0%",
          marginBottom: "0.5em",
          marginTop: "1em", // Add space between title and choices
        }}
      >
        Bugün Neredeyiz?
      </h1>
      <h2
        className="text-center"
        style={{
          fontFamily: "Bebas Neue",
          fontWeight: "400",
          fontSize: "1.5em",
          lineHeight: "1.25em",
          letterSpacing: "0%",
          marginBottom: "0.5em",
          color: "#FC514B",
        }}
      >
        {gatheringTime}
      </h2>
      {/* Display Final Place if present */}
      {finalPlace && (
        <div
          className="p-4 rounded-lg shadow-md"
          style={{
            marginBottom: "2em",
            textAlign: "center",
          }}
        >
          <h3
            className="uppercase"
            style={{
              fontFamily: "Bebas Neue",
              fontWeight: "bold",
              fontSize: "2.4em", // Make final place text 2 times larger than regular places
              lineHeight: "1.4em",
              letterSpacing: "0%",
              color: "#BA85FF", // Use purple color
            }}
          >
            {finalPlace}
          </h3>
                    {/* Progress Bar */}
          <div className="w-full h-2 bg-white mt-2" style={{
            borderRadius: "3px",
            width: "25em",
            paddingTop: "0.001em"
          }}>
            <div
              className="h-full"
              style={{
                width: "10%",
                height: "90%",
                backgroundColor: "#BA85FF",
                border: "1px solid black", // Black border around the progress bar
                margin: "0.5px", // Add gap between the bar and the fill
                borderRadius: "3px", // Set the border-radius to 3px
              }}
            ></div>
          </div>
          {/* Text Under Progress Bar */}
          <p className="text-left" style={{ color: "#BA85FF", marginTop: "0.2em", fontSize: "1em", }}>
            12 oy
          </p>
        </div>
      )}

      {!finalPlace && choices.map((place, index) => (
        <div key={index} className="rounded-lg shadow-md" style={{ marginBottom: "2em" }}>
          <h3 
            className="uppercase text-center"
            style={{
              fontFamily: "Bebas Neue",
              fontWeight: 400,
              fontSize: "1.2em",
              lineHeight: "1.4em",
              letterSpacing: "0%",
            }}
          >
            {place}
          </h3>
          {/* Progress Bar */}
          <div className="w-full h-2 bg-white mt-2" style={{
            borderRadius: "3px",
            width: "20em",
            paddingTop: "0.001em"
          }}>
            <div
              className="h-full"
              style={{
                width: "10%",
                height: "90%",
                backgroundColor: "#BA85FF",
                border: "1px solid black", // Black border around the progress bar
                margin: "0.5px", // Add gap between the bar and the fill
                borderRadius: "3px", // Set the border-radius to 3px
              }}
            ></div>
          </div>
          {/* Text Under Progress Bar */}
          <p className="text-left" style={{ color: "#BA85FF", marginTop: "0.2em", fontSize: "1em", }}>
            12 oy
          </p>
        </div>
      ))}
    </div>
  );
};

export default TodayChoices;
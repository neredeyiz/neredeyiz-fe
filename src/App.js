import { useEffect, useState } from "react";
import { fetchChoices } from "./api";
import { submitVote } from "./voting";

const MAX_VOTES_FOR_FULL_BAR = 1000;

const TodayChoices = () => {
  const [choices, setChoices] = useState({
    todayPlaces: [],
    gatheringTime: "",
    votes: {},
    finalPlace: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showInfoSheet, setShowInfoSheet] = useState(false);

  useEffect(() => {
    const getChoices = async () => {
      try {
        const data = await fetchChoices();
        setChoices(data);
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

const calculatePercentage = (votes) => {
  if (votes === 0) {
    return 1;
  }
  const MIN_PERCENTAGE = 5; // Minimum 5% width
  const rawPercentage = (votes / MAX_VOTES_FOR_FULL_BAR) * 100;
  const cappedPercentage = Math.min(rawPercentage, 100);
  return Math.max(MIN_PERCENTAGE, cappedPercentage); // Ensures at least 10%
};


  const handleVote = async (placeName) => {
    try {
      await submitVote(placeName);
      const newData = await fetchChoices();
      setChoices(newData);
    } catch (err) {
      console.log("Problem submitting vote.")
    }
  };


  // Clickable title component
  const VoteTitle = ({ place }) => (
    <button
      onClick={() => handleVote(place)}
      className={ "font-bebas-neue text-xl uppercase text-center w-full" }
    >
      {place}
    </button>
  );

  return (
    <div className="flex flex-col items-center text-white relative bg-cover bg-center min-h-screen w-full overflow-x-hidden"
      style={{
        backgroundImage: "url('https://i.ibb.co/HfpWXYKn/kai-pilger-Ef6i-L87-v-OA-unsplash.jpg')",
      }}
    >
      {/* Title Section */}
      <div className="w-full max-w-md px-4 pt-8">
        <h1 className="flex items-center justify-center font-garamond font-thin text-4xl mb-4">
          Neredeyiz?
                    {/* Info Button */}
            <button
    onClick={() => setShowInfoSheet(true)}
    className="top-0 right-4 w-3 h-3 rounded-full bg-white bg-opacity-0 text-sm backdrop-blur-sm flex items-center justify-center hover:bg-opacity-30 transition-all border border-white"
    aria-label="Show information"
  >
    i
  </button>
        </h1>


        <h2 className="text-center font-bebas-neue text-2xl text-[#FC514B] mb-8">
          {new Date(choices.gatheringTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false})}
        </h2>
      </div>
      {/* Info Sheet */}
      {showInfoSheet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Transparent Overlay */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowInfoSheet(false)}
          />
          
          {/* Content Container */}
          <div className="relative bg-white rounded-lg mx-4 w-full max-w-2xl h-1/2 max-h-[50vh] overflow-y-auto z-50">
            {/* Close Button */}
            <button
              onClick={() => setShowInfoSheet(false)}
              className="absolute top-4 right-4 text-gray-700 hover:text-black text-2xl"
            >
              ×
            </button>
            
            {/* Content */}
            <div className="p-6 pt-12">
              <h2 className="text-2xl font-light text-center mb-6 border-b border-gray-200 pb-2 text-black font-garamond">
                Neredeyiz nedir?
              </h2>
              <div className="space-y-4 font-light text-black">
                <p> Rastgele eylem yeri ve zamanı seçen demokratik bir platformdur. </p>
                <p> Eylem alanları ve saati her günün başında rastgele seçilir. Eylem saatine 2 saat kala gerçek eylem yeri belirlenir. </p>
                <p> Anonim olarak oy kullanmak için alan adının üstüne tıklayınız.</p>
                <p> Oylar günlük olarak sıfırlanır. </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Container */}
      <div className="w-full max-w-md px-4 pb-8 flex flex-col items-center">
        {choices.finalPlace ? (
          <div className="w-full mb-8 text-center">
            <h3 className="font-bebas-neue font-bold text-3xl uppercase text-[#BA85FF] mb-2">
              {choices.finalPlace}
            </h3>
            
            <div className="relative w-full max-w-xs mx-auto h-3.5 bg-white rounded-sm">
                <div className="absolute top-0.5 left-0.5 h-[calc(100%-4px)] bg-[#BA85FF] rounded-sm border border-black"
                  style={{ width: `${calculatePercentage(choices.votes[choices.finalPlace] || 0)}%` }}>
                </div>
            </div>
            
            <div className="flex justify-between w-full max-w-xs mx-auto mt-1">
              <span className="text-[#BA85FF] text-sm">
                {choices.votes[choices.finalPlace] || 0} oy
              </span>
            </div>
          </div>
        ) : (
          choices.todayPlaces.map((place) => (
            <div className="w-full mb-6">
              <VoteTitle place={place} />
              
              {/* Progress Bar Container */}
              <div className="relative w-full h-3.5 bg-white rounded-sm">
                <div className="absolute top-0.5 left-0.5 h-[calc(100%-4px)] bg-[#BA85FF] rounded-sm border border-black"
                  style={{ width: `${calculatePercentage(choices.votes[place] || 0)}%` }}>
                </div>
              </div>
              
              {/* Vote Count - Aligned with progress bar */}
              <div className="flex justify-between w-full mt-1">
                <span className="text-[#BA85FF] text-sm">
                  {choices.votes[place] || 0} oy
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodayChoices;
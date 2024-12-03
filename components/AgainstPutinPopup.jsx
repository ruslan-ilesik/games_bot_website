import React, { useState, useEffect } from 'react';

const AgainstPutinPopup = ({ children }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Check if the user has already accepted the popup (using localStorage)
    const doesNotSupportPutin = localStorage.getItem('doesNotSupportPutin');
    if (!doesNotSupportPutin) {
      if (window.location.hostname == "localhost"){
        setIsLoading(false);
        return;
      }
      // Fetch the user's IP information using ipinfo.io
      fetch('https://ipinfo.io/json')
        .then((response) => response.json())
        .then((data) => {
          // Show the popup if the user is from Russia (RU)
          if (data.country === 'RU') {
            setShowPopup(true);
          }
        })
        .catch((error) => {
          console.error('Error fetching IP data:', error);
        })
        .finally(() => {
          setIsLoading(false); // Stop loading after the fetch is done
        });
    } else {
      setIsLoading(false); // Stop loading if user already accepted
    }
  }, []);

  const handleAccept = () => {
    setShowPopup(false); // Hide the popup when the user accepts
    localStorage.setItem('doesNotSupportPutin', 'true'); // Store the acceptance in localStorage
  };

  // Add a loading indicator or a fallback to prevent rendering issues
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      {/* Always render children */}
      {!showPopup && children}

      {/* Show popup if not accepted */}
      {showPopup && (
        <div className="fixed inset-0 darker-block flex justify-center fonts-assgin text-white items-center z-50">
          <div className="p-6 rounded-lg shadow-xl max-w-md w-full border-4 border-red-600 darker-block flex flex-col max-h-full overflow-y-auto">
            
            {/* Image at the top */}
            <img src="/img/stop_war.jpeg" alt="Stop the War" className="w-full h-auto mb-6 rounded-md" />

            <h2 className="text-3xl font-semibold mb-6 text-red-600">
              We see that you are trying to access this website from Russia!
            </h2>
            <p className="text-lg mb-6">
              By using this website, you openly declare your support for Ukraine&apos;s sovereignty, territorial integrity, and oppose the bloody war instigated by Russia. You stand against Putin&apos;s regime and the injustice inflicted upon Ukraine. The world stands for peace, freedom, and human rights.
            </p>
            <p className="text-3xl">Glory to Ukraine!</p>
            <br />
            <p className="text-lg mb-6">
              <p className="text-3xl font-semibold mb-6 text-red-600">
                Мы видим, что вы пытаетесь воспользоваться сайтом с территории россии!
              </p>
              Используя этот сайт, вы открыто заявляете о своей поддержке суверенитета и территориальной целостности Украины и противостоянии кровавой войне, развязанной Россией. Вы выступаете против режима Путина и несправедливости, причиняемой Украине. Мир стоит за мир, свободу и права человека.
            </p>
            <p className="text-3xl">Слава Україні!</p>
            <br />
            <div className="flex justify-center mt-auto">
              <button
                onClick={handleAccept}
                className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700"
              >
                Accept & Support Peace
              </button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default AgainstPutinPopup;

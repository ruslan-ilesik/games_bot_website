import React, { useState, useEffect } from 'react';

const PrivacyPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if the user has already accepted the popup (first visit check)
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setShowPopup(true); // Show the popup if it's the first visit
    }
  }, []);

  const handleAccept = () => {
    setShowPopup(false); // Hide the popup after acceptance
    localStorage.setItem('hasVisited', 'true'); // Set a flag in localStorage
  };

  return (
    <>
      {showPopup && (
        <div className="fixed bottom-0 left-0 w-full darker-block fonts-assign bg-opacity-50 flex justify-center items-center z-50">
          <div className="p-6 rounded-lg shadow-xl max-w-md w-full border-4 border-blue-600">
            <h2 className="text-xl font-semibold mb-4">Terms and Conditions & Privacy Policy</h2>
            <p className="text-sm mb-4">
              This website uses cookies to enhance your experience. We do not use cookies for marketing purposes or share data with third parties. By using this website, you agree to our{' '}
              <a
                href="/documents/privacy_policy.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Privacy Policy
              </a>{' '}
              and{' '}
              <a
                href="/documents/terms_and_conditions.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Terms and Conditions
              </a>.
            </p>
            <div className="flex justify-center">
              <button
                onClick={handleAccept}
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PrivacyPopup;

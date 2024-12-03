import React, { useEffect, useState, useContext } from "react";
import { useUser } from "../../components/UserDataProvider";
import { usePremium } from "../../components/PremiumContext";
import "../../styles/dashboard_page.css";

const DashboardHeader = () => {
  const user = useUser();
  const { isPremium, premiumStatus } = usePremium(); // Use PremiumContext
  const [headerData, setHeaderData] = useState(null);
  const [patreonStatus, setPatreonStatus] = useState(null);

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const response = await fetch("/api/dashboard/get-header");
        if (!response.ok) {
          throw new Error("Failed to fetch header data");
        }
        const data = await response.json();
        setHeaderData(data[0] || null); // Ensure headerData is null if the response array is empty
      } catch {
        console.error("Failed to fetch header data");
      }
    };

    const fetchPatreonStatus = async () => {
      try {
        const response = await fetch("/api/patreon-login-status");
        if (!response.ok) {
          throw new Error("Failed to fetch Patreon status");
        }
        const data = await response.json();
        setPatreonStatus(data[0] || null); // Null if no data
      } catch {
        console.error("Failed to fetch Patreon status");
      }
    };

    fetchHeaderData();
    fetchPatreonStatus();
  }, []);

  return (
    <div className="content-wrapper p-6 fonts-assign">
      <h1
        className="headers-font text-highlight text-center"
        style={{ fontSize: "2.3em" }}
      >
        Welcome back, {user.name}!
      </h1>

      <div
        className="game-info mt-4 flex flex-wrap justify-center gap-6"
        style={{ textAlign: "center" }}
      >
        {/* Favorite Game */}
        <div
          className="block darker-block p-4 rounded-lg flex-grow max-w-sm"
          style={{ height: "min-content" }}
        >
          <p className="">
            <p className="text-bold" style={{ fontSize: "1.6em" }}>
              Favorite game
            </p>
            <br />
            {headerData ? headerData.most_played_game : "N/A"}, Played:{" "}
            <span className="text-highlight">
              {headerData ? headerData.played_amount : "N/A"}
            </span>{" "}
            times.
          </p>
        </div>

        {/* Premium and Patreon Status */}
        <div className="block darker-block p-4 rounded-lg flex-grow max-w-sm">
          {/* Premium Status */}
          <p className="text-bold" style={{ fontSize: "1.6em" }}>
            Premium Status
          </p>
          <br />
          <div className="flex items-center gap-2 justify-center">
            <span
              style={{
                display: "inline-block",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: isPremium ? "green" : "red",
              }}
            ></span>
            <p className="text-highlight" style={{ margin: 0 }}>
              {isPremium ? "Active" : "Inactive"}
            </p>
          </div>

          {/* Buy Premium Button */}
          {!isPremium && (
            <a
              href="/api/buy-premium-redirect"
              target="_blnak"
              className="inline-block px-4 py-2  text-white font-extrabold bg-green-700 rounded-lg shadow-md hover:bg-green-800 transform transition-transform duration-300 hover:scale-105 pulse-button"
              style={{ marginTop: "10px" }}
            >
              Subscribe Now!
            </a>
          )}

          <hr className="my-4" />

          {/* Patreon Login Status */}
          <p className="text-bold" style={{ fontSize: "1.6em" }}>
            Patreon Login Status
          </p>
          <br />
          <div className="flex flex-col items-center gap-4">
            {patreonStatus ? (
              <div className="flex items-center gap-2 justify-center">
                {/* Inverted Patreon Icon */}
                <img
                  src="/img/icons/patreon.png"
                  alt="Patreon"
                  style={{
                    width: "24px",
                    height: "24px",
                    filter: "invert(100%)",
                  }}
                />
                <div>
                  <p className="text-highlight" style={{ margin: 0 }}>
                    {patreonStatus.user_name}
                  </p>
                  <small style={{ fontSize: "0.9em" }}>
                    {patreonStatus.is_from_patreon === "1"
                      ? "Provided by Patreon"
                      : "Website Login"}
                  </small>
                </div>
                {patreonStatus.is_from_patreon !== "1" && (
                  <button
                    className="logout-btn p-2 rounded-lg ml-4"
                    onClick={() =>
                      (window.location.href = "/action/patreon/logout")
                    }
                  >
                    Logout
                  </button>
                )}
              </div>
            ) : (
              <a
                href="/api/login-with-patreon-redirect"
                className="add-patreon-btn btn btn-primary text-highlight p-2 rounded-lg flex items-center gap-2 justify-center"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                  backgroundColor: "var(--btn-color)",
                }}
              >
                <img
                  src="/img/icons/patreon.png"
                  alt="Patreon"
                  style={{
                    width: "24px",
                    height: "24px",
                    filter: "invert(100%)",
                    marginRight: "8px",
                  }}
                />
                Login with Patreon
              </a>
            )}
          </div>
        </div>

        {/* Last Played */}
        <div className="block darker-block p-4 rounded-lg flex-grow max-w-sm" style={{ height: "min-content" }}>
          <p className="">
            <p className="text-bold" style={{ fontSize: "1.6em" }}>
              Last time played
            </p>
            <br />
            <p className="text-highlight">
              {headerData
                ? new Date(headerData.last_game_time + "Z").toLocaleString(
                    undefined,
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }
                  )
                : "N/A"}
            </p>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;

import React, { useEffect, useState } from "react";

const AchievementsReport = () => {
  const [achievements, setAchievements] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await fetch("/api/dashboard/get-achievements-report");
        if (!response.ok) {
          throw new Error("Failed to fetch achievements data");
        }
        const data = await response.json();
        setAchievements(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  if (loading) {
    return <div className="loading-message">Loading achievements...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="fonts-assign    "> 
        <h1 className="headers-font text-highlight text-center" style={{ fontSize: "2.3em" }}>
            Achievements Report
      </h1>

        <div className="achievements-report darker-block ">
        <div className="achievements-container">
            <Section title="Unlocked Usual Achievements" items={achievements.unlocked_usual} />
            <Section title="Unlocked Secret Achievements" items={achievements.unlocked_secret} />
            <Section title="Locked Usual Achievements" items={achievements.locked_usual} />
            <Section
            title="Locked Secret Achievements"
            items={Array(achievements.locked_secret).fill({
                name: "???",
                description: "???",
                image_url: "/img/icons/black_question_mark.png", // Placeholder image URL
                unlocked_at: null,
            })}
            isSecretLocked
            />
        </div>
        </div>
    </div>
  );
};

const Section = ({ title, items, isSecretLocked }) => (
  <section>
    <h2 style={{fontSize:'1.6em'}} className="section-title">{title}</h2>
    {items.length === 0 ? (
      <p className="no-items-message">No achievements in this category</p>
    ) : (
      <div className="achievements-list">
        {items.map((item, index) => (
          <AchievementCard key={index} achievement={item} isSecretLocked={isSecretLocked} />
        ))}
      </div>
    )}
  </section>
);

const AchievementCard = ({ achievement, isSecretLocked }) => {
  const unlockedDate = achievement.unlocked_at
    ? new Date(achievement.unlocked_at * 1000).toLocaleString(undefined, {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      })
    : null;

  return (
    <div className={`pb-2 achievement-card ${isSecretLocked ? "locked" : ""}`}>
      <img
        src={achievement.image_url}
        alt={isSecretLocked ? "Locked Achievement" : achievement.name}
        className="achievement-image"
      />
      <div className="achievement-info pb-2">
        <h3 className="achievement-name">
          {isSecretLocked ? "???" : achievement.name}
        </h3>
        <p className="achievement-description pb-2">
          {isSecretLocked ? "???" : achievement.description}
        </p>
        {!isSecretLocked && unlockedDate && (
          <p className="unlocked-date">Unlocked at: {unlockedDate}</p>
        )}
      </div>
    </div>
  );
};

export default AchievementsReport;

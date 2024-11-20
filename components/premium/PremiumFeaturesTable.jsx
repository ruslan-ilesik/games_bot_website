import '../../styles/premium_page.css';

import { usePremium } from '../PrmeiumContext';

const PremiumFeaturesTable = () => {
  const gamesData = [
    { game: '2048', basic: '✔', premium: '✔' },
    { game: 'Battleships', basic: '✔', premium: '✔' },
    { game: 'Chess', basic: '✔', premium: '✔' },
    { game: 'Connect 4', basic: '✔', premium: '✔' },
    { game: 'Dominoes', basic: '✔', premium: '✔' },
    { game: 'Minesweeper', basic: '✔', premium: '✔' },
    { game: "Rubik's Cube", basic: '✔', premium: '✔' },
    { game: 'Sudoku', basic: '✔', premium: '✔' },
    { game: 'Tic Tac Toe', basic: '✔', premium: '✔' },
    { game: 'Hangman', basic: '1 game in 24h, 2 players', premium: 'Unlimited, 6 players' },
    { game: 'Puzzle 15', basic: '✘', premium: '✔' },
  ];

  const dashboardFeatures = [
    { feature: 'Games history', basic: '✔', premium: '✔' },
    { feature: 'Reports by day', basic: '10 days', premium: 'Unlimited' },
  ];

  const renderCell = (value) => {
    if (value === '✔') {
      return <span className="text-green-500 font-bold">{value}</span>;
    }
    if (value === '✘') {
      return <span className="text-red-500 font-bold">{value}</span>;
    }
    return value;
  };

  const renderRows = (data) =>
    data.map((item, index) => (
      <tr
        key={index}
        className={`${
          index % 2 === 0 ? 'bg-[var(--alt-row-bg-color2)]' : 'bg-[var(--alt-row-bg-color)]'
        }`}
      >
        <td className="py-3 px-4 text-left font-medium text-white">
          {item.game || item.feature}
        </td>
        <td className="py-3 px-4 text-center">{renderCell(item.basic)}</td>
        <td className="py-3 px-4 text-center">{renderCell(item.premium)}</td>
      </tr>
    ));

  return (
    <div className="premium-page">
      {/* Intro Section */}
      <div className="intro-container">
        <h1 className="text-highlight text-center">Support GamesBot!</h1>
        <p className="text-white text-center">
          We put a lot of love and effort into GamesBot development, and it needs your help to keep it running!
        </p>
        <p className="text-white text-center">
          We will greatly appreciate any and every donation we will receive.
        </p>
      </div>

      {/* Benefits Section */}
      <div className="benefits-container">
        <h2 className="headers-font text-highlight text-center">Premium Benefits!</h2>
        <p className="text-white text-center">Supporting us gives you benefits :)</p>
      </div>

      {/* Features Table */}
      <div className="premium-features-table-container" style={{ width: '100%' }}>
        <table className="premium-features-table shadow-lg darker-block" style={{ borderRadius: '2%' }}>
          <thead>
            <tr className="premium-table-header">
              <th className="py-3 px-4 text-center text-lg font-bold text-white">Feature</th>
              <th className="py-3 px-4 text-center text-lg font-bold text-white">Basic User</th>
              <th className="py-3 px-4 text-center text-lg font-bold text-white">Premium User</th>
            </tr>
          </thead>
          <tr>
            <td colSpan="3" className="gap-row" />
          </tr>
          <tbody>
            <tr>
              <td colSpan="3" className="py-3 px-4 text-center text-lg font-bold text-white">
                Games Access
              </td>
            </tr>
            {renderRows(gamesData)}
            <tr>
              <td colSpan="3" className="py-3 px-4 text-center text-lg font-bold text-white">
                Dashboard Features
              </td>
            </tr>
            {renderRows(dashboardFeatures)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PremiumFeaturesTable;

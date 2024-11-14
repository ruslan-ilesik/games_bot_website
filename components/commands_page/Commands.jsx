import { useEffect, useState } from 'react';
import CommandCard from "./CommandCard";
import '../../styles/commands_page.css';

// Utility function to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const Commands = ({ navbarSizeRef }) => {
  const [commands, setCommands] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [searchMarginTop, setSearchMarginTop] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fetchCommands = async () => {
      try {
        const response = await fetch('/api/get-commands-list');
        if (!response.ok) throw new Error("Failed to fetch commands data");
        const data = await response.json();
        
        const sortedCommands = data.sort((a, b) => a.command.name.localeCompare(b.command.name));
        setCommands(sortedCommands);

        const uniqueCategories = new Set();
        sortedCommands.forEach(command => {
          command.categories.forEach(category => uniqueCategories.add(category));
        });
        setCategories(Array.from(uniqueCategories));
      } catch (err) {
        setError(err.message);
      }
    };
    fetchCommands();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setSearchMarginTop(scrollY > navbarSizeRef.current ? -navbarSizeRef.current - 5 : 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navbarSizeRef]);

  if (error) return <div>Error: {error}</div>;
  if (commands.length === 0) return <div>Loading...</div>;

  let filteredCommands = commands.map(command => {
    const matchesSearchTerm = command.command.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategories = selectedCategories.size === 0 || 
                              command.categories.some(category => selectedCategories.has(category));
    return {
      ...command,
      isVisible: matchesSearchTerm && matchesCategories
    };
  });

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm); // Immediately update the search term
    setFadeOut(true); // Trigger fade-out effect immediately
  
    // After fade-out completes, apply the filter and trigger fade-in
    setTimeout(() => {
      setFadeOut(false); // Trigger fade-in after the animation duration
  
      // Now apply the filter logic after fade-out
      filteredCommands = commands.filter((command) => {
        const matchesSearchTerm = command.command.name.toLowerCase().includes(newSearchTerm.toLowerCase());
        const matchesCategories = selectedCategories.size === 0 || 
                                  command.categories.some(category => selectedCategories.has(category));
        return matchesSearchTerm && matchesCategories;
      });
    }, 300); // Delay to match the fade-out animation duration
  };
  const handleCategoryClick = (category) => {
    setFadeOut(true); // Trigger fade-out
    setTimeout(() => {
      // Update selected categories after fade-out completes
      setSelectedCategories((prevSelected) => {
        const updated = new Set(prevSelected);
        if (updated.has(category)) {
          updated.delete(category);
        } else {
          updated.add(category);
        }
        return updated;
      });
      setFadeOut(false); // Trigger fade-in
    }, 300); // Adjust this delay to match the fade-out duration
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 50px)' }}>
      <h1 className="headers-font text-4xl text-center" style={{ paddingBottom: '10px', paddingTop: '20px' }}>Commands</h1>

      {/* Search Bar Section */}
      <div className="commands-container">
        <div className="search-bar-container">
          <div className="fixed-search darker-block rounded-lg shadow-lg" style={{ marginTop: `${searchMarginTop}px` }}>
            <h1 className="headers-font text-2xl">Filters</h1>
            <input
              type="text"
              placeholder="Search commands..."
              className="search-bar"
              value={searchTerm}
              onChange={handleSearchChange}
            />

            {/* Category Filter */}
            <div className="category-filter">
              <h2>Categories:</h2>
              <div className="category-list">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => handleCategoryClick(category)}
                    className={`category-item ${selectedCategories.has(category) ? 'selected' : ''}`}
                  >
                    {capitalizeFirstLetter(category)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Commands List */}
        <div className="commands-list">
  {filteredCommands.map((command, index) => (
    <div
      key={index}
      className={`command-card-container ${fadeOut ? "fade-out" : "fade-in"} ${
        command.isVisible ? "visible" : "hidden"
      }`}
    >
      <CommandCard command={command} />
    </div>
  ))}
</div>
      </div>
    </div>
  );
};

export default Commands;

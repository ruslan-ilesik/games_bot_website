import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Utility function to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const OptionList = ({ options }) => {
  return (
    <div className="option-list flex flex-col pl-4">
      {options.map((option, idx) => (
        <Option key={idx} option={option} />
      ))}
    </div>
  );
};

const Option = ({ option }) => {
  return (
    <div className="option darker-block p-4 mb-2 rounded">
      <h3 className="headers-font text-base text-highlight">
        {option.name}
        {(option.type !== 'sub_command' && option.type !== 'sub_command_group') && (
          <span className={`ml-2 ${option.required ? 'text-green-500' : 'text-gray-500'}`}>
            {option.required ? '(Mandatory)' : '(Optional)'}
          </span>
        )}
      </h3>
      {(option.type !== 'sub_command' && option.type !== 'sub_command_group') && (
        <p className="text-md mb-1"><strong>Type:</strong> {option.type}</p>
      )}
      <p className="text-md mb-1"><strong>Description:</strong> {option.description}</p>
      {option.required && <span className="font-semibold text-red-500">Required</span>}
      {option.options && option.options.length > 0 && (
        <OptionList options={option.options} />
      )}
    </div>
  );
};

// Function to count the total arguments recursively
const countArguments = (options) => {
  let count = 0;
  options.forEach(option => {
    if (option.type !== 'sub_command' && option.type !== 'sub_command_group') {
      count += 1;
    }
    if (option.options && option.options.length > 0) {
      count += countArguments(option.options);
    }
  });
  return count;
};

const CommandCard = ({ handleCategoryClick, command, selectedCategories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [optionsHeight, setOptionsHeight] = useState(0);
  const [helpHeight, setHelpHeight] = useState(0);
  const optionsRef = useRef(null);
  const helpRef = useRef(null);

  const toggleCommandOptions = () => setIsOpen(prev => !prev);
  const toggleHelpText = () => setIsHelpOpen(prev => !prev);
  const argumentCount = command.command.options ? countArguments(command.command.options) : 0;

  useEffect(() => {
    if (optionsRef.current) {
      setOptionsHeight(isOpen ? optionsRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (helpRef.current) {
      setHelpHeight(isHelpOpen ? helpRef.current.scrollHeight : 0);
    }
  }, [isHelpOpen]);

  return (
    <div className="command-card mx-auto px-4 pt-5 mb-10 darker-block rounded-lg shadow-lg p-6 text-left">
      <h2 className="headers-font text-2xl mb-4">{command.command.name}</h2>
      <p className="text-md mb-4">{command.command.description}</p>

      {command.categories && command.categories.length > 0 && (
        <div className="categories mb-4 flex flex-wrap items-center">
          <h4 className="text-lg font-semibold mr-2">Categories:</h4>
          {command.categories.map((category, idx) => (
              <span onClick={()=>handleCategoryClick(category)} 
              key={idx} 
              className="bg-gray-700 text-white rounded-full px-4 py-1 mr-2 text-md" 
              style={{marginBottom: '5px',cursor:'pointer', 'background-color' : (selectedCategories.has(category)? 'var(--btn-color)':'')}}>
                {capitalizeFirstLetter(category)}
              </span>

          ))}
        </div>
      )}

      <div className="flex justify-between cursor-pointer" onClick={toggleCommandOptions}>
        <h3 className="headers-font text-base text-highlight flex items-center">
          Arguments 
          <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center ml-2 text-sm">
            {argumentCount}
          </span>
        </h3>
        <span>{isOpen ? '▼' : '►'}</span>
      </div>

      <div
        ref={optionsRef}
        style={{ height: `${optionsHeight}px`, overflow: 'hidden', transition: 'height 0.3s ease' }}
      >
        {isOpen && (
          <>
            {command.command.options && command.command.options.length > 0 ? (
              <OptionList options={command.command.options} />
            ) : (
              <p className="text-white text-lg text-center mt-4">This command has no arguments.</p>
            )}
          </>
        )}
      </div>

      {/* Help Text Dropdown */}
      <div className="flex justify-between cursor-pointer mt-4" onClick={toggleHelpText}>
        <h3 className="headers-font text-base text-highlight">Command Help</h3>
        <span>{isHelpOpen ? '▼' : '►'}</span>
      </div>

      <div
        ref={helpRef}
        style={{ height: `${helpHeight}px`, overflow: 'hidden', transition: 'height 0.3s ease' }}
      >
        {isHelpOpen && (
          <div className="text-md text-white mt-2 markdown-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mt-4" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-xl font-semibold mt-3" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-lg font-semibold mt-2" {...props} />,
                p: ({ node, ...props }) => <p className="text-base my-2" {...props} />,
                a: ({ node, ...props }) => (
                  <a   target="_blank"
                  rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300" {...props} />
                ),
                li: ({ node, ...props }) => <li className="list-disc ml-5" {...props} />,
                br: () => <br className="my-2" />
              }}
            >
              {String(command.help_text).replace(/\n/g, '  \n')}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommandCard;

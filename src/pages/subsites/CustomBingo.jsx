import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './CustomBingo.css';

const defaultWords = [
  "1", "2", "3", "4", "5",
  "6", "7", "8", "9", "10",
  "11", "12", "13", "14", "15",
  "16", "17", "18", "19", "20",
  "21", "22", "23", "24", "25"
];

const CustomBingo = () => {
  const [boardSource, setBoardSource] = useState("generated");
  const [words, setWords] = useState(defaultWords);
  const [board, setBoard] = useState([]);
  const [markedCells, setMarkedCells] = useState(
    Array(5).fill().map(() => Array(5).fill(false))
  );

  const [isFreeSpaceEnabled, setIsFreeSpaceEnabled] = useState(true);
  const [toolTipEnabled, setToolTipEnabled] = useState(true);
  const [isCentered, setIsCentered] = useState(true);
  const [userInput, setUserInput] = useState('');
  const [tooltip, setTooltip] = useState({ visible: false, text: '', x: 0, y: 0 });
  const cellRefs = useRef([]);

  useEffect(() => {
    if (boardSource === "generated") {
      setBoard(generateRandomBoard(words));
    }

  }, [words, boardSource]);

  useEffect(() => {
    setTimeout(() => {
      cellRefs.current.forEach((cell) => {
        if (cell) adjustFontSize(cell);
      });
    }, 0); 
  }, [board]);

  const adjustFontSize = (cellElement, padding = 10) => {
  if (!cellElement) return;

  const maxFontSize = 30; 
  const minFontSize = 10; 

  const { width: cellWidth, height: cellHeight } = cellElement.getBoundingClientRect();
  const availableWidth = cellWidth - 2 * padding;
  const availableHeight = cellHeight - 2 * padding;

  const tempElement = document.createElement("div");
  tempElement.style.position = "absolute";
  tempElement.style.visibility = "hidden";
  tempElement.style.whiteSpace = "normal";
  tempElement.style.width = `${availableWidth}px`;
  tempElement.style.height = `${availableHeight}px`;
  tempElement.style.lineHeight = "1.2"; 
  tempElement.textContent = cellElement.textContent; 

  document.body.appendChild(tempElement);

  let fontSize = maxFontSize;

  while (fontSize >= minFontSize) {
    tempElement.style.fontSize = `${fontSize}px`;

    const fitsWidth = tempElement.scrollWidth <= availableWidth;
    const fitsHeight = tempElement.scrollHeight <= availableHeight;

    if (fitsWidth && fitsHeight) break;

    fontSize--; 
  }

  cellElement.style.fontSize = `${fontSize}px`;
  cellElement.style.padding = `${padding}px`;

  document.body.removeChild(tempElement);
  };

  const generateRandomBoard = (wordArray) => {
    const shuffledWords = [...wordArray].sort(() => Math.random() - 0.5);
    const newBoard = Array(5).fill().map(() => shuffledWords.splice(0, 5));
    if (isFreeSpaceEnabled) {
        newBoard[2][2] = "Free Space";
    }
    return newBoard;
  };

  const resetBoard = () => {
    setBoardSource("generated");
    setBoard(generateRandomBoard(words));
    setMarkedCells(Array(5).fill().map(() => Array(5).fill(false)));
  };

  const toggleCell = (rowIndex, colIndex) => {
    setMarkedCells((prev) => {
      const updated = [...prev];
      updated[rowIndex] = [...updated[rowIndex]];
      updated[rowIndex][colIndex] = !updated[rowIndex][colIndex];
      return updated;
    });
  };

  const handleUserInputSubmit = () => {
    const inputWords = userInput.trim().split('\n').filter((word) => word.trim());
    if (inputWords.length >= 25) {
      setWords(inputWords);
      setMarkedCells(Array(5).fill().map(() => Array(5).fill(false)));
    } else {
      alert('Please input at least 25 items.');
    }
  };

  const showTooltip = (word, event) => {
    const { left, bottom, width } = event.target.getBoundingClientRect();
    setTooltip({
      visible: true,
      text: word,
      x: left + width / 2, 
      y: bottom + 5,       
    });
  };

  const hideTooltip = () => setTooltip({ ...tooltip, visible: false });

  const saveBoard = () => {
    const boardLines = board.flat().join('\n');
    const blob = new Blob([boardLines], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'bingo-board.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  const importBoard = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const lines = e.target.result
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => line);
  
        if (lines.length >= 25) {
          const boardData = Array.from({ length: 5 }, (_, rowIndex) =>
            lines.slice(rowIndex * 5, rowIndex * 5 + 5)
          );
  
          setBoard(boardData);
          setMarkedCells(Array(5).fill().map(() => Array(5).fill(false))); 
          setBoardSource("imported"); 
  
        } else {
          alert("The file must contain at least 25 non-empty lines.");
        }
      };
      reader.readAsText(file);
  
      event.target.value = null;
    }
  };

  return (
    <>
    <Navbar />
    <div className="CustomBingo">
      <h1>Bingo Board Generator</h1>
      <div className="main-container">
        <div className="board-container">
          <div className="board">
            {board.flat().map((word, index) => (
              <div
              key={index}
              ref={(el) => (cellRefs.current[index] = el)}
              className={`cell ${isCentered ? 'centered' : 'uncentered'} ${
                markedCells[Math.floor(index / 5)][index % 5] ? 'marked' : ''
              }`}
              onClick={() => toggleCell(Math.floor(index / 5), index % 5)}
              onMouseEnter={(e) => showTooltip(word, e)}
              onMouseLeave={hideTooltip}
            >
                {word}
              </div>
            ))}
            {tooltip.visible && toolTipEnabled &&(
              <div
                className="tooltip"
                style={{
                    position: "fixed", 
                    left: tooltip.x,
                    top: tooltip.y,
                    transform: "translateX(-50%)", 
                    zIndex: 100, 
                }}
              >
                {tooltip.text}
              </div>
            )}
          </div>
          <div className="input-container">
            <div className="settings">
                <h3>Settings</h3>
                <div className="checkbox-container">
                    <input type="checkbox" id="freeSpaceToggle" checked={isFreeSpaceEnabled} onChange={() => {
                        setIsFreeSpaceEnabled(!isFreeSpaceEnabled);
                        setBoard(generateRandomBoard(words));
                    }}
                    />
                        <label htmlFor="freeSpaceToggle">Use Free Space?</label>
                    <br/ >
                    <input type="checkbox" id="toolTipToggle" checked={toolTipEnabled} onChange={() => {
                        setToolTipEnabled(!toolTipEnabled);
                    }}
                    />
                        <label htmlFor="toolTipToggle">Enable Tool Tip?</label>
                    <br />
                    <input type="checkbox" id="centerContentToggle" checked={isCentered}onChange={() => setIsCentered(!isCentered)}
                    />
                        <label htmlFor="centerContentToggle">Center Items?</label>
                </div>
                <div className="import-export-buttons">
                  <label className="settings-label">Import Board
                    <input
                      type="file"
                      accept=".txt"
                      style={{ display: 'none' }}
                      onChange={importBoard}
                    />
                  </label>
                <button onClick={saveBoard} className="settings-button">Save Board</button>
                </div>  
            </div>
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Enter at least 25 items, one per line"
            />
            <button onClick={handleUserInputSubmit} className="button">Submit</button>
          </div>
        </div>
        <button onClick={resetBoard} className="button">Generate New Board</button>
      </div>
    </div>
    <Footer />
    </>
  );
  
};


export default CustomBingo;

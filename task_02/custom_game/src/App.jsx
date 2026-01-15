import { useEffect, useMemo, useState } from "react";

var rows = 8;
var cols = 8;
var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

var validWords = [
  "CAT",
  "DOG",
  "APPLE",
  "GAME",
  "BOOK",
  "TREE",
  "CODE",
  "HELLO",
  "WORLD",
  "JAVA",
  "PYTHON",
  "GOOD",
  "COOL",
  "HOME",
  "WATER",
  "MUSIC",
  "NOTE",
  "BLUE",
  "GREEN"
];

function randomLetter() {
  var index = Math.floor(Math.random() * letters.length);
  return letters[index];
}

function createInitialGrid() {
  var initial = [];
  for (var r = 0; r < rows; r++) {
    var row = [];
    for (var c = 0; c < cols; c++) {
      row.push({
        letter: randomLetter(),
        selected: false
      });
    }
    initial.push(row);
  }
  return initial;
}

export default function App() {
  var [grid, setGrid] = useState(function () {
    return createInitialGrid();
  });
  var [selection, setSelection] = useState([]);
  var [score, setScore] = useState(0);
  var [message, setMessage] = useState("");
  var [messageType, setMessageType] = useState("");

  var currentWord = useMemo(
    function () {
      var word = "";
      for (var i = 0; i < selection.length; i++) {
        var pos = selection[i];
        word += grid[pos.row][pos.col].letter;
      }
      return word;
    },
    [grid, selection]
  );

  useEffect(
    function () {
      if (!message) {
        return;
      }
      var timer = setTimeout(function () {
        setMessage("");
        setMessageType("");
      }, 1500);
      return function () {
        clearTimeout(timer);
      };
    },
    [message]
  );

  function handleCellClick(rowIndex, colIndex) {
    var cell = grid[rowIndex][colIndex];
    if (cell.selected) {
      return;
    }
    var newGrid = grid.map(function (row, r) {
      return row.map(function (item, c) {
        if (r === rowIndex && c === colIndex) {
          return {
            letter: item.letter,
            selected: true
          };
        }
        return item;
      });
    });
    var newSelection = selection.concat([{ row: rowIndex, col: colIndex }]);
    setGrid(newGrid);
    setSelection(newSelection);
  }

  function clearSelection() {
    if (selection.length === 0) {
      return;
    }
    var newGrid = grid.map(function (row) {
      return row.map(function (item) {
        if (!item.selected) {
          return item;
        }
        return {
          letter: item.letter,
          selected: false
        };
      });
    });
    setGrid(newGrid);
    setSelection([]);
  }

  function isValidWord(word) {
    var upper = word.toUpperCase();
    for (var i = 0; i < validWords.length; i++) {
      if (validWords[i] === upper) {
        return true;
      }
    }
    return false;
  }

  function applyElimination() {
    var newGrid = grid.map(function (row) {
      return row.slice();
    });
    for (var i = 0; i < selection.length; i++) {
      var pos = selection[i];
      newGrid[pos.row][pos.col] = {
        letter: randomLetter(),
        selected: false
      };
    }
    setGrid(newGrid);
    setSelection([]);
  }

  function handleSubmit() {
    if (!currentWord || currentWord.length < 3) {
      setMessage("请至少选择 3 个字母。");
      setMessageType("error");
      return;
    }
    if (!isValidWord(currentWord)) {
      setMessage("暂未收录该单词，可以尝试其他组合。");
      setMessageType("error");
      clearSelection();
      return;
    }
    var gained = currentWord.length * 10;
    setScore(function (prev) {
      return prev + gained;
    });
    setMessage("消除成功！+" + gained + " 分");
    setMessageType("ok");
    applyElimination();
  }

  function handleResetSelection() {
    clearSelection();
    setMessage("已重置本次选择。");
    setMessageType("");
  }

  return (
    <div className="game-container">
      <h1>英语消消乐</h1>
      <div className="top-panel">
        <div className="current-word-panel">
          <span>当前单词：</span>
          <span className="current-word">{currentWord}</span>
        </div>
        <div className="controls">
          <button onClick={handleSubmit}>提交单词</button>
          <button onClick={handleResetSelection}>重置选择</button>
        </div>
      </div>
      <div className="info-panel">
        <div>
          分数：<span id="score">{score}</span>
        </div>
        <div className="hint">
          提示：在字母表中点击字母按顺序拼出一个单词，然后点击“提交单词”，如果单词有效，这些字母将被消除并补充新的字母。
        </div>
      </div>
      <div className="grid">
        {grid.map(function (row, r) {
          return row.map(function (cell, c) {
            var key = r + "-" + c;
            var className = "cell";
            if (cell.selected) {
              className += " selected";
            }
            return (
              <div
                key={key}
                className={className}
                onClick={function () {
                  handleCellClick(r, c);
                }}
              >
                {cell.letter}
              </div>
            );
          });
        })}
      </div>
      <div
        className={
          "message" +
          (messageType === "ok"
            ? " ok"
            : messageType === "error"
            ? " error"
            : "")
        }
      >
        {message}
      </div>
      <div className="word-list-panel">
        <div>可消除单词示例：</div>
        <div className="word-list">{validWords.join("，")}</div>
      </div>
    </div>
  );
}


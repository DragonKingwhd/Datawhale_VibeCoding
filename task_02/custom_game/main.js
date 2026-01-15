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

var gridElement;
var currentWordElement;
var scoreElement;
var messageElement;
var wordListElement;
var submitButton;
var resetButton;

var grid = [];
var selection = [];
var score = 0;
var messageTimeoutId = null;

function randomLetter() {
var index = Math.floor(Math.random() * letters.length);
return letters[index];
}

function createEmptyGrid() {
grid = [];
for (var r = 0; r < rows; r++) {
var row = [];
for (var c = 0; c < cols; c++) {
row.push({
letter: randomLetter(),
selected: false
});
}
grid.push(row);
}
}

function renderGrid() {
gridElement.innerHTML = "";
for (var r = 0; r < rows; r++) {
for (var c = 0; c < cols; c++) {
var cellData = grid[r][c];
var cell = document.createElement("div");
cell.className = "cell";
if (cellData.selected) {
cell.classList.add("selected");
}
cell.textContent = cellData.letter;
cell.dataset.row = String(r);
cell.dataset.col = String(c);
gridElement.appendChild(cell);
}
}
}

function updateCurrentWord() {
var word = "";
for (var i = 0; i < selection.length; i++) {
var pos = selection[i];
word += grid[pos.row][pos.col].letter;
}
currentWordElement.textContent = word;
}

function clearSelection() {
for (var i = 0; i < selection.length; i++) {
var pos = selection[i];
grid[pos.row][pos.col].selected = false;
}
selection = [];
updateCurrentWord();
renderGrid();
}

function showMessage(text, type) {
if (messageTimeoutId !== null) {
clearTimeout(messageTimeoutId);
messageTimeoutId = null;
}
messageElement.textContent = text;
messageElement.classList.remove("ok");
messageElement.classList.remove("error");
if (type === "ok") {
messageElement.classList.add("ok");
} else if (type === "error") {
messageElement.classList.add("error");
}
if (text) {
messageTimeoutId = setTimeout(function () {
messageElement.textContent = "";
messageElement.classList.remove("ok");
messageElement.classList.remove("error");
messageTimeoutId = null;
}, 1500);
}
}

function addToSelection(rowIndex, colIndex) {
var cell = grid[rowIndex][colIndex];
if (cell.selected) {
return;
}
cell.selected = true;
selection.push({ row: rowIndex, col: colIndex });
updateCurrentWord();
renderGrid();
}

function onGridClick(event) {
var target = event.target;
if (!target.classList.contains("cell")) {
return;
}
var rowIndex = parseInt(target.dataset.row, 10);
var colIndex = parseInt(target.dataset.col, 10);
if (isNaN(rowIndex) || isNaN(colIndex)) {
return;
}
addToSelection(rowIndex, colIndex);
}

function normalizeWord(word) {
return word.toUpperCase();
}

function isValidWord(word) {
var normalized = normalizeWord(word);
for (var i = 0; i < validWords.length; i++) {
if (validWords[i] === normalized) {
return true;
}
}
return false;
}

function applyElimination() {
for (var i = 0; i < selection.length; i++) {
var pos = selection[i];
grid[pos.row][pos.col] = {
letter: randomLetter(),
selected: false
};
}
selection = [];
updateCurrentWord();
renderGrid();
}

function onSubmitWord() {
var word = currentWordElement.textContent;
if (!word || word.length < 3) {
showMessage("请至少选择 3 个字母。", "error");
return;
}
if (!isValidWord(word)) {
showMessage("暂未收录该单词，可以尝试其他组合。", "error");
clearSelection();
return;
}
var gained = word.length * 10;
score += gained;
scoreElement.textContent = String(score);
showMessage("消除成功！+" + gained + " 分", "ok");
applyElimination();
}

function onResetSelection() {
clearSelection();
showMessage("已重置本次选择。", "");
}

function renderWordList() {
var items = [];
for (var i = 0; i < validWords.length; i++) {
items.push(validWords[i]);
}
wordListElement.textContent = items.join("，");
}

function initGame() {
gridElement = document.getElementById("grid");
currentWordElement = document.getElementById("current-word");
scoreElement = document.getElementById("score");
messageElement = document.getElementById("message");
wordListElement = document.getElementById("word-list");
submitButton = document.getElementById("submit-word");
resetButton = document.getElementById("reset-selection");
createEmptyGrid();
renderGrid();
renderWordList();
gridElement.addEventListener("click", onGridClick);
submitButton.addEventListener("click", onSubmitWord);
resetButton.addEventListener("click", onResetSelection);
showMessage("点击字母开始拼单词。", "");
}

if (document.readyState === "loading") {
document.addEventListener("DOMContentLoaded", initGame);
} else {
initGame();
}


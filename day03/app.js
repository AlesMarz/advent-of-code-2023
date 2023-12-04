const fs = require("fs");

const filePath = "./input.txt";

fs.readFile(filePath, (err, data) => {
  if (err) console.log(err);

  const content = data;

  processFile(content);
});

function processFile(content) {
  const lines = content.toString().split("\n");

  let sumOfPartNumbers = 0;

  lines.forEach((line, lineIndex) => {
    let currentNumber = "";
    let shouldAddNumber = false;

    for (let charIndex = 0; charIndex < line.length; charIndex++) {
      const previousLine = lines[lineIndex - 1];
      const nextLine = lines[lineIndex + 1];
      const char = line[charIndex];

      if (isCharNumber(char)) {
        currentNumber = currentNumber + char;

        // char above is a symbol
        const charAbove = previousLine && previousLine[charIndex];
        if (charAbove && !isCharADot(charAbove) && !isCharNumber(charAbove)) {
          shouldAddNumber = true;
        }

        // char below is a symbol
        const charBelow = nextLine && nextLine[charIndex];
        if (charBelow && !isCharADot(charBelow) && !isCharNumber(charBelow)) {
          shouldAddNumber = true;
        }

        // char before is a symbol
        const charBefore = line[charIndex - 1];
        if (
          charBefore &&
          !isCharADot(charBefore) &&
          !isCharNumber(charBefore)
        ) {
          shouldAddNumber = true;
        }

        // char left top diagonally is a symbol
        if (
          charBefore &&
          previousLine &&
          !isCharADot(previousLine[charIndex - 1]) &&
          !isCharNumber(previousLine[charIndex - 1])
        ) {
          shouldAddNumber = true;
        }

        // char left bottom diagonally is a symbol
        if (
          charBefore &&
          nextLine &&
          !isCharADot(nextLine[charIndex - 1]) &&
          !isCharNumber(nextLine[charIndex - 1])
        ) {
          shouldAddNumber = true;
        }

        // char after is a symbol
        const charAfter = line[charIndex + 1];
        if (charAfter && !isCharADot(charAfter) && !isCharNumber(charAfter)) {
          shouldAddNumber = true;
        }

        // char right top diagonally is a symbol
        if (
          charAfter &&
          previousLine &&
          !isCharADot(previousLine[charIndex + 1]) &&
          !isCharNumber(previousLine[charIndex + 1])
        ) {
          shouldAddNumber = true;
        }

        // char right bottom diagonally is a symbol
        if (
          charAfter &&
          nextLine &&
          !isCharADot(nextLine[charIndex + 1]) &&
          !isCharNumber(nextLine[charIndex + 1])
        ) {
          shouldAddNumber = true;
        }
      }

      const isLastChar = charIndex === line.length - 1;

      if ((!isCharNumber(char) || isLastChar) && currentNumber.length > 0) {
        if (shouldAddNumber) {
          sumOfPartNumbers += Number(currentNumber);
          shouldAddNumber = false;
        }

        currentNumber = "";
      }
    }
  });

  console.log("sumOfPartNumbers", sumOfPartNumbers);
}

const isCharADot = (char) => {
  return char === ".";
};

const isCharNumber = (char) => {
  return (
    (char === "0") |
    (char === "1") |
    (char === "2") |
    (char === "3") |
    (char === "4") |
    (char === "5") |
    (char === "6") |
    (char === "7") |
    (char === "8") |
    (char === "9")
  );
};

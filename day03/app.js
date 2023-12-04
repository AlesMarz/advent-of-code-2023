const fs = require("fs");

const filePath = "./input.txt";

fs.readFile(filePath, (err, data) => {
  if (err) console.log(err);

  const content = data;

  part1(content);
  part2(content);
});

function part1(content) {
  const lines = content.toString().split("\r\n");

  let sumOfPartNumbers = [];

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
          sumOfPartNumbers.push(Number(currentNumber));
          shouldAddNumber = false;
        }

        currentNumber = "";
      }
    }
  });

  console.log(
    "sumOfPartNumbers",
    sumOfPartNumbers.reduce((a, b) => a + b, 0)
  );
}

function part2(content) {
  const lines = content.toString().split("\r\n");

  let sumOfPartNumbers = [];
  let numbers = [];

  lines.forEach((line, lineIndex) => {
    for (let charIndex = 0; charIndex < line.length; charIndex++) {
      const previousLine = lines[lineIndex - 1];
      const nextLine = lines[lineIndex + 1];
      const char = line[charIndex];

      const adjacentNumbers = [];
      const adjacentNumbersTop = [];
      const adjacentNumbersBottom = [];

      if (isCharAGear(char)) {
        const charsAbove = [
          isCharNumber(previousLine && previousLine[charIndex - 3])
            ? previousLine[charIndex - 3]
            : "",
          isCharNumber(previousLine && previousLine[charIndex - 2])
            ? previousLine[charIndex - 2]
            : "",
          isCharNumber(previousLine && previousLine[charIndex - 1])
            ? previousLine[charIndex - 1]
            : "",
          isCharNumber(previousLine && previousLine[charIndex])
            ? previousLine[charIndex]
            : "",
          isCharNumber(previousLine && previousLine[charIndex + 1])
            ? previousLine[charIndex + 1]
            : "",
          isCharNumber(previousLine && previousLine[charIndex + 2])
            ? previousLine[charIndex + 2]
            : "",
          isCharNumber(previousLine && previousLine[charIndex + 3])
            ? previousLine[charIndex + 3]
            : "",
        ];

        if (
          charsAbove[2].length &&
          charsAbove[3].length &&
          charsAbove[4].length
        ) {
          adjacentNumbersTop.push(
            charsAbove[2] + charsAbove[3] + charsAbove[4]
          );
        } else if (
          charsAbove[1].length &&
          charsAbove[2].length &&
          charsAbove[3].length
        ) {
          adjacentNumbersTop.push(
            charsAbove[1] + charsAbove[2] + charsAbove[3]
          );
        } else if (
          charsAbove[3].length &&
          charsAbove[4].length &&
          charsAbove[5].length
        ) {
          adjacentNumbersTop.push(
            charsAbove[3] + charsAbove[4] + charsAbove[5]
          );
        } else if (charsAbove[2].length && charsAbove[3].length) {
          adjacentNumbersTop.push(charsAbove[2] + charsAbove[3]);
        } else if (charsAbove[3].length && charsAbove[4].length) {
          adjacentNumbersTop.push(charsAbove[3] + charsAbove[4]);
        } else if (charsAbove[3].length) {
          adjacentNumbersTop.push(charsAbove[3]);
        } else {
          if (
            charsAbove[0].length &&
            charsAbove[1].length &&
            charsAbove[2].length
          ) {
            adjacentNumbersTop.push(
              charsAbove[0] + charsAbove[1] + charsAbove[2]
            );

            if (
              charsAbove[4].length &&
              charsAbove[5].length &&
              charsAbove[6].length
            ) {
              adjacentNumbersTop.push(
                charsAbove[4] + charsAbove[5] + charsAbove[6]
              );
            } else if (charsAbove[4].length && charsAbove[5].length) {
              adjacentNumbersTop.push(charsAbove[4] + charsAbove[5]);
            } else if (charsAbove[4].length) {
              adjacentNumbersTop.push(charsAbove[4]);
            }
          } else if (charsAbove[1].length && charsAbove[2].length) {
            adjacentNumbersTop.push(charsAbove[1] + charsAbove[2]);

            if (
              charsAbove[4].length &&
              charsAbove[5].length &&
              charsAbove[6].length
            ) {
              adjacentNumbersTop.push(
                charsAbove[4] + charsAbove[5] + charsAbove[6]
              );
            } else if (charsAbove[4].length && charsAbove[5].length) {
              adjacentNumbersTop.push(charsAbove[4] + charsAbove[5]);
            } else if (charsAbove[4].length) {
              adjacentNumbersTop.push(charsAbove[4]);
            }
          } else if (charsAbove[2].length) {
            adjacentNumbersTop.push(charsAbove[2]);

            if (
              charsAbove[4].length &&
              charsAbove[5].length &&
              charsAbove[6].length
            ) {
              adjacentNumbersTop.push(
                charsAbove[4] + charsAbove[5] + charsAbove[6]
              );
            } else if (charsAbove[4].length && charsAbove[5].length) {
              adjacentNumbersTop.push(charsAbove[4] + charsAbove[5]);
            } else if (charsAbove[4].length) {
              adjacentNumbersTop.push(charsAbove[4]);
            }
          }

          if (adjacentNumbersTop.length !== 2) {
            if (
              charsAbove[4].length &&
              charsAbove[5].length &&
              charsAbove[6].length
            ) {
              adjacentNumbersTop.push(
                charsAbove[4] + charsAbove[5] + charsAbove[6]
              );
            } else if (charsAbove[4].length && charsAbove[5].length) {
              adjacentNumbersTop.push(charsAbove[4] + charsAbove[5]);
            } else if (charsAbove[4].length) {
              adjacentNumbersTop.push(charsAbove[4]);
            }
          }
        }

        const charsBelow = [
          isCharNumber(nextLine && nextLine[charIndex - 3])
            ? nextLine[charIndex - 3]
            : "",
          isCharNumber(nextLine && nextLine[charIndex - 2])
            ? nextLine[charIndex - 2]
            : "",
          isCharNumber(nextLine && nextLine[charIndex - 1])
            ? nextLine[charIndex - 1]
            : "",
          isCharNumber(nextLine && nextLine[charIndex])
            ? nextLine[charIndex]
            : "",
          isCharNumber(nextLine && nextLine[charIndex + 1])
            ? nextLine[charIndex + 1]
            : "",
          isCharNumber(nextLine && nextLine[charIndex + 2])
            ? nextLine[charIndex + 2]
            : "",
          isCharNumber(nextLine && nextLine[charIndex + 3])
            ? nextLine[charIndex + 3]
            : "",
        ];

        if (
          charsBelow[2].length &&
          charsBelow[3].length &&
          charsBelow[4].length
        ) {
          adjacentNumbersBottom.push(
            charsBelow[2] + charsBelow[3] + charsBelow[4]
          );
        } else if (
          charsBelow[1].length &&
          charsBelow[2].length &&
          charsBelow[3].length
        ) {
          adjacentNumbersBottom.push(
            charsBelow[1] + charsBelow[2] + charsBelow[3]
          );
        } else if (
          charsBelow[3].length &&
          charsBelow[4].length &&
          charsBelow[5].length
        ) {
          adjacentNumbersBottom.push(
            charsBelow[3] + charsBelow[4] + charsBelow[5]
          );
        } else if (charsBelow[2].length && charsBelow[3].length) {
          adjacentNumbersBottom.push(charsBelow[2] + charsBelow[3]);
        } else if (charsBelow[3].length && charsBelow[4].length) {
          adjacentNumbersBottom.push(charsBelow[3] + charsBelow[4]);
        } else if (charsBelow[3].length) {
          adjacentNumbersBottom.push(charsBelow[3]);
        } else {
          if (
            charsBelow[0].length &&
            charsBelow[1].length &&
            charsBelow[2].length
          ) {
            adjacentNumbersBottom.push(
              charsBelow[0] + charsBelow[1] + charsBelow[2]
            );

            if (
              charsBelow[4].length &&
              charsBelow[5].length &&
              charsBelow[6].length
            ) {
              adjacentNumbersBottom.push(
                charsBelow[4] + charsBelow[5] + charsBelow[6]
              );
            } else if (charsBelow[4].length && charsBelow[5].length) {
              adjacentNumbersBottom.push(charsBelow[4] + charsBelow[5]);
            } else if (charsBelow[4].length) {
              adjacentNumbersBottom.push(charsBelow[4]);
            }
          } else if (charsBelow[1].length && charsBelow[2].length) {
            adjacentNumbersBottom.push(charsBelow[1] + charsBelow[2]);

            if (
              charsBelow[4].length &&
              charsBelow[5].length &&
              charsBelow[6].length
            ) {
              adjacentNumbersBottom.push(
                charsBelow[4] + charsBelow[5] + charsBelow[6]
              );
            } else if (charsBelow[4].length && charsBelow[5].length) {
              adjacentNumbersBottom.push(charsBelow[4] + charsBelow[5]);
            } else if (charsBelow[4].length) {
              adjacentNumbersBottom.push(charsBelow[4]);
            }
          } else if (charsBelow[2].length) {
            adjacentNumbersBottom.push(charsBelow[2]);

            if (
              charsBelow[4].length &&
              charsBelow[5].length &&
              charsBelow[6].length
            ) {
              adjacentNumbersBottom.push(
                charsBelow[4] + charsBelow[5] + charsBelow[6]
              );
            } else if (charsBelow[4].length && charsBelow[5].length) {
              adjacentNumbersBottom.push(charsBelow[4] + charsBelow[5]);
            } else if (charsBelow[4].length) {
              adjacentNumbersBottom.push(charsBelow[4]);
            }
          }

          if (adjacentNumbersBottom.length !== 2) {
            if (
              charsBelow[4].length &&
              charsBelow[5].length &&
              charsBelow[6].length
            ) {
              adjacentNumbersBottom.push(
                charsBelow[4] + charsBelow[5] + charsBelow[6]
              );
            } else if (charsBelow[4].length && charsBelow[5].length) {
              adjacentNumbersBottom.push(charsBelow[4] + charsBelow[5]);
            } else if (charsBelow[4].length) {
              adjacentNumbersBottom.push(charsAbove[4]);
            }
          }
        }

        const charsBefore = [
          isCharNumber(line[charIndex - 3]) ? line[charIndex - 3] : "",
          isCharNumber(line[charIndex - 2]) ? line[charIndex - 2] : "",
          isCharNumber(line[charIndex - 1]) ? line[charIndex - 1] : "",
        ];

        if (
          charsBefore[0].length &&
          charsBefore[1].length &&
          charsBefore[2].length
        ) {
          adjacentNumbers.push(
            charsBefore[0] + charsBefore[1] + charsBefore[2]
          );
        } else if (charsBefore[1].length && charsBefore[2].length) {
          adjacentNumbers.push(charsBefore[1] + charsBefore[2]);
        } else if (charsBefore[2].length) {
          adjacentNumbers.push(charsBefore[2]);
        }

        const charsAfter = [
          isCharNumber(line[charIndex + 1]) ? line[charIndex + 1] : "",
          isCharNumber(line[charIndex + 2]) ? line[charIndex + 2] : "",
          isCharNumber(line[charIndex + 3]) ? line[charIndex + 3] : "",
        ];

        if (
          charsAfter[0].length &&
          charsAfter[1].length &&
          charsAfter[2].length
        ) {
          adjacentNumbers.push(charsAfter[0] + charsAfter[1] + charsAfter[2]);
        } else if (charsAfter[0].length && charsAfter[1].length) {
          adjacentNumbers.push(charsAfter[0] + charsAfter[1]);
        } else if (charsAfter[0].length) {
          adjacentNumbers.push(charsAfter[0]);
        }

        if (
          adjacentNumbers.length +
            adjacentNumbersTop.length +
            adjacentNumbersBottom.length ===
          2
        ) {
          numbers.push([
            ...adjacentNumbers,
            ...adjacentNumbersTop,
            ...adjacentNumbersBottom,
          ]);
        }
      }
    }
  });

  numbers.forEach((number) => {
    sumOfPartNumbers.push(number[0] * number[1]);
  });

  console.log(
    "sumOfPartNumbers",
    sumOfPartNumbers.reduce((a, b) => a + b, 0)
  );
}

const isCharAGear = (char) => {
  return char === "*";
};

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

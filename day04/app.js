const fs = require("fs");

const filePath = "./input.txt";

fs.readFile(filePath, (err, data) => {
  if (err) console.log(err);

  const content = data;

  const lines = content
    .toString()
    .split("\r\n")
    .map((line) => {
      return line
        .split(":")[1]
        .trim()
        .split("|")
        .map((item) => item.trim());
    });

  part1(lines);
  part2(lines);
});

function part1(lines) {
  let overallTotal = 0;

  lines.forEach((line) => {
    const a = line[0].split(" ").filter((item) => item !== "");
    const b = line[1].split(" ").filter((item) => item !== "");

    let total = 0;

    a.forEach((item) => {
      if (b.includes(item)) {
        total = total === 0 ? 1 : total * 2;
      }
    });

    overallTotal += total;
  });

  console.log("overall total is: ", overallTotal);
}

function part2(lines) {
  const result = Array.from({ length: lines.length }, () => []);

  lines.forEach((line, lineIndex) => {
    const a = line[0].split(" ").filter((item) => item !== "");
    const b = line[1].split(" ").filter((item) => item !== "");

    let total = 0;

    a.forEach((item) => {
      if (b.includes(item)) {
        total++;
      }
    });

    if (lineIndex === 0) {
      for (let counter = 1; counter <= total; counter++) {
        result[lineIndex + counter].push("copy " + lineIndex);
      }
    } else {
      for (let counter = 1; counter <= total; counter++) {
        result[lineIndex + counter].push("copy " + lineIndex);
      }

      result[lineIndex].forEach(() => {
        for (let counter = 1; counter <= total; counter++) {
          result[lineIndex + counter].push("copy " + lineIndex);
        }
      });
    }
  });

  const sum = result.reduce((acc, arr) => acc + arr.length, 0);
  console.log("sum of element length: ", sum + result.length);
}

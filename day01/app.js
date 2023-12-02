const fs = require("fs");

const filePath = "./input.txt";

fs.readFile(filePath, (err, data) => {
  if (err) console.log(err);

  const content = data;
  processFile(null, content);
});

function processFile(err, data) {
  if (err) console.log(err);

  const content = data.toString();

  const lines = content.split("\n").map((line) => {
    let newString = line
      .replaceAll("one", "one1one")
      .replaceAll("two", "two2two")
      .replaceAll("three", "three3three")
      .replaceAll("four", "four4four")
      .replaceAll("five", "five5five")
      .replaceAll("six", "six6six")
      .replaceAll("seven", "seven7seven")
      .replaceAll("eight", "eight8eight")
      .replaceAll("nine", "nine9nine");
    return newString;
  });

  let total = 0;

  lines.forEach((line) => {
    const numbers = [];

    for (let index = 0; index < line.length; index++) {
      let element = line[index];

      if (
        (element === "0") |
        (element === "1") |
        (element === "2") |
        (element === "3") |
        (element === "4") |
        (element === "5") |
        (element === "6") |
        (element === "7") |
        (element === "8") |
        (element === "9")
      ) {
        numbers.push(Number(element));
      }
    }
    total += Number(
      numbers[0].toString() + numbers[numbers.length - 1].toString()
    );
  });

  console.log("total is: ", total);
}

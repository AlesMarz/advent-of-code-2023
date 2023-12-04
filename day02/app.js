const fs = require("fs");

const filePath = "./input.txt";

fs.readFile(filePath, (err, data) => {
  if (err) console.log(err);

  const content = data;
  processFile(content);
});

function processFile(content) {
  const lines = content.toString().split("\n");

  let totalOfGameNumbers = 0;
  let totalOfPowerNumbers = 0;

  lines.forEach((line) => {
    const gameNumber = line.split(":")[0].replaceAll("Game ", "");
    const blueSetMatches = line.match(/(\d+)\sblue/g);
    const greenSetMatches = line.match(/(\d+)\sgreen/g);
    const redSetMatches = line.match(/(\d+)\sred/g);

    const highestBlueNumber = Math.max(
      ...blueSetMatches.map((match) => {
        const blueSet = match.split(" ")[0];
        return Number(blueSet.replace(" blue", ""));
      })
    );

    const highestGreenNumber = Math.max(
      ...greenSetMatches.map((match) => {
        const greenSet = match.split(" ")[0];
        return Number(greenSet.replace(" green", ""));
      })
    );

    const highestRedNumber = Math.max(
      ...redSetMatches.map((match) => {
        const redSet = match.split(" ")[0];
        return Number(redSet.replace(" red", ""));
      })
    );

    totalOfPowerNumbers +=
      highestBlueNumber * highestGreenNumber * highestRedNumber;

    if (
      highestBlueNumber <= 14 &&
      highestGreenNumber <= 13 &&
      highestRedNumber <= 12
    ) {
      totalOfGameNumbers += Number(gameNumber);
    }
  });

  console.log("total of game numbers is: ", totalOfGameNumbers);
  console.log("total of power numbers is: ", totalOfPowerNumbers);
}

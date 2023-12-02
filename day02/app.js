const fs = require("fs");

const filePath = "./input.txt";

fs.readFile(filePath, (err, data) => {
  if (err) console.log(err);

  const content = data;
  //   const content =
  //     "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\nGame 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\nGame 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\nGame 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\nGame 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green";
  processFile(null, content);
});

function processFile(err, content) {
  if (err) console.log(err);

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

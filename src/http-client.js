const fs = require("fs");
const { argv } = require("yargs");
const axios = require("axios");

async function main() {
  const result = await axios.post(`http://${argv.a}:${argv.p}/ast`, {
    sourceCode: fs.readFileSync(0, "utf-8"),
    anonymous: argv.p,
    outputFormat: argv.f,
    idRef: true,
    prettyPrint: false,
  });
  console.log(JSON.stringify(result.data)); // eslint-disable-line no-console
}

main();

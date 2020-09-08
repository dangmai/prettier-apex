const { spawn } = require("child_process");
const path = require("path");
const util = require("util");

const axios = require("axios");

const waitOn = require("wait-on");

const waitOnPromise = util.promisify(waitOn);

function launch() {
  let serializerBin = path.join(__dirname, "../vendor/apex-ast-serializer/bin");
  if (process.platform === "win32") {
    serializerBin = path.join(serializerBin, "apex-ast-serializer-http.bat");
  } else {
    serializerBin = path.join(serializerBin, "apex-ast-serializer-http");
  }
  return spawn(serializerBin, ["-s", "-a", "secret"], { stdio: "ignore" });
}

async function start(address, port) {
  const command = launch();
  await waitOnPromise({
    resources: [`http://${address}:${port}/api/ast`],
  });

  return command;
}

async function stop(address, port) {
  return axios.post(`http://${address}:${port}/shutdown?token=secret`);
}

module.exports = {
  start,
  stop,
  launch,
};

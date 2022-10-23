// see: https://git.cryto.net/joepie91/fix-esm.git
require("fix-esm").register();

// Set options as a parameter, environment variable, or rc file.
require = require("esm")(module/*, options*/)
module.exports = require("./after-ts/electron-ts/src/main/main.js")
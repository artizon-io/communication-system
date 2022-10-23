const fileURLToPath = require('url');
const { createServer, build, transformWithEsbuild } = require('vite');
const Logger = require('js-logger');
const ts = require("typescript");
const { replaceTscAliasPaths } = require('tsc-alias');


Logger.useDefaults({
  formatter: (messages, context) => {
    messages.unshift("[Electron Forge]");
  }
});

function watchTS(filename) {
  const configPath = ts.findConfigFile(
    "./",
    ts.sys.fileExists,
    filename
  );
  if (!configPath) {
    throw new Error("Could not find a valid 'tsconfig.json'.");
  }

  // TypeScript can use several different program creation "strategies":
  //  * ts.createEmitAndSemanticDiagnosticsBuilderProgram,
  //  * ts.createSemanticDiagnosticsBuilderProgram
  //  * ts.createAbstractBuilder
  // The first two produce "builder programs". These use an incremental strategy
  // to only re-check and emit files whose contents may have changed, or whose
  // dependencies may have changes which may impact change the result of prior
  // type-check and emit.
  // The last uses an ordinary program which does a full type check after every
  // change.
  // Between `createEmitAndSemanticDiagnosticsBuilderProgram` and
  // `createSemanticDiagnosticsBuilderProgram`, the only difference is emit.
  // For pure type-checking scenarios, or when another tool/process handles emit,
  // using `createSemanticDiagnosticsBuilderProgram` may be more desirable.
  const createProgram = ts.createSemanticDiagnosticsBuilderProgram;

  // Note that there is another overload for `createWatchCompilerHost` that takes
  // a set of root files.
  const host = ts.createWatchCompilerHost(
    configPath,
    {},
    ts.sys,
    createProgram,
    reportDiagnostic,
    reportWatchStatusChanged
  );

  ts.createWatchProgram(host);
}

const formatHost = {
  getCanonicalFileName: path => path,
  getCurrentDirectory: ts.sys.getCurrentDirectory,
  getNewLine: () => ts.sys.newLine
};

function reportDiagnostic(diagnostic) {
  console.error("Error", diagnostic.code, ":", ts.flattenDiagnosticMessageText(diagnostic.messageText, formatHost.getNewLine()));
}

function reportWatchStatusChanged(diagnostic) {
  console.info(ts.formatDiagnostic(diagnostic, formatHost));
}

// "packagerConfig": {},
// "makers": [
//   {
//     "name": "@electron-forge/maker-squirrel",
//     "config": {
//       "name": "electron"
//     }
//   },
//   {
//     "name": "@electron-forge/maker-zip",
//     "platforms": [
//       "darwin"
//     ]
//   },
//   {
//     "name": "@electron-forge/maker-deb",
//     "config": {}
//   },
//   {
//     "name": "@electron-forge/maker-rpm",
//     "config": {}
//   }
// ]

module.exports = {
  hooks: {
    // before start
    generateAssets: async (forgeConfig, platform, arch) => {
      Logger.info('Pre-Start');
      Logger.debug(forgeConfig);
      // build({
      //   root: path.resolve(__dirname, './src'),
      // })
      watchTS("tsconfig.json");
      replaceTscAliasPaths({
        watch: true
      })
    },
    // after start
    postStart: async (forgeConfig, child_processes) => {
      Logger.info('Post-Start');
      // Logger.debug(forgeConfig);
    },
    prePackage: async (forgeConfig, ...packager_args) => {
      Logger.info('Pre-Package');
    },
    packageAfterCopy: async (forgeConfig, ...packager_args) => {
      Logger.info('Package-After-Copy');
    },
    packageAfterPrune: async (forgeConfig, ...packager_args) => {
      Logger.info('Package-After-Prune');
    },
    packageAfterExtract: async (forgeConfig, ...packager_args) => {
      Logger.info('Package-After-Extract');
    },
    postPackage: async (forgeConfig, platform, arch, outputPaths, spinner) => {
      Logger.info('Post-Package');
      if (spinner) {
        spinner.info(`Completed packaging for ${platform} / ${arch} at ${outputPaths[0]}`);
      }
    },
    preMake: async (forgeConfig) => {
      Logger.info('Pre-Make');
    },
    postMake: async (forgeConfig, make_results) => {
      Logger.info('Post-Make');
    },
    readPackageJson: async (forgeConfig) => {
      Logger.info('Read-Package-Json');
    }
  }
}

// const __dirname = fileURLToPath(new URL('.', import.meta.url))

// (async () => {
//   const server = await createServer({
//     // any valid user config options, plus `mode` and `configFile`
//     configFile: false,
//     root: __dirname,
//     server: {
//       port: 1337
//     }
//   })
//   await server.listen()

//   server.printUrls()
// })()
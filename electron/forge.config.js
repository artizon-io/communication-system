const fileURLToPath = require('url')
const createServer = require('vite')

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
      console.log('Pre-Start');
    },
    // after start
    postStart: async (forgeConfig, child_processes) => {
      console.log('Post-Start');
    },
    prePackage: async (forgeConfig, ...packager_args) => {
      console.log('Pre-Package');
    },
    packageAfterCopy: async (forgeConfig, ...packager_args) => {
      console.log('Package-After-Copy');
    },
    packageAfterPrune: async (forgeConfig, ...packager_args) => {
      console.log('Package-After-Prune');
    },
    packageAfterExtract: async (forgeConfig, ...packager_args) => {
      console.log('Package-After-Extract');
    },
    postPackage: async (forgeConfig, platform, arch, outputPaths, spinner) => {
      console.log('Post-Package');
      if (spinner) {
        spinner.info(`Completed packaging for ${platform} / ${arch} at ${outputPaths[0]}`);
      }
    },
    preMake: async (forgeConfig) => {
      console.log('Pre-Make');
    },
    postMake: async (forgeConfig, make_results) => {
      console.log('Post-Make');
    },
    readPackageJson: async (forgeConfig) => {
      console.log('Read-Package-Json');
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
# Notes

## Electron

[Awesome Electron](https://github.com/sindresorhus/awesome-electron#boilerplates)

**[Process Model](https://www.electronjs.org/docs/latest/tutorial/process-model)**
- Electron inherits its multi-process architecture from Chromium

**[Packaging (bundling dependencies)](https://www.electronjs.org/docs/latest/tutorial/application-distribution)**


## Electron Forge
Honorable mention... [Electron build](https://www.electron.build/)

**[Configuration](https://www.electronforge.io/configuration)**

- Inside `package.json` or `forge.config.js`

**[Makers](https://www.electronforge.io/config/makers)**

- Generate platform specific distributables for Electron apps using Electron Forge
- Configured inside `package.json` or `forge.config.js` under `config.forge.makers`

**Hooks**
- Own logic at different points in the Electron Forge build proces

**Publishers**
- Taking the artifacts generated by the make command and sending them somewhere (like a github repo)

**Packaging**
- Uses [Electron Rebuild](https://github.com/electron/electron-rebuild#how-can-i-integrate-this-into-grunt--gulp--whatever), which builds the app dependencies using the version of node at target machine
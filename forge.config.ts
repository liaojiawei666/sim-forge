import type {ForgeConfig} from '@electron-forge/shared-types';
import {MakerSquirrel} from '@electron-forge/maker-squirrel';
import {MakerZIP} from '@electron-forge/maker-zip';
import {MakerDeb} from '@electron-forge/maker-deb';
import {MakerRpm} from '@electron-forge/maker-rpm';
import {WebpackPlugin} from '@electron-forge/plugin-webpack';

import {mainConfig} from './webpack.main.config';
import {rendererConfig} from './webpack.renderer.config';
import * as fs from "fs";
import * as path from "path";

const config: ForgeConfig = {
  packagerConfig: {
    asar: {
      unpack:"**\\*.{node,dll}"
    },
    extraResource: [
      "./node_modules/.prisma",
      "./prisma/simulation.db",
      "./assets"
    ],
    afterExtract: [(extractPath, electronVersion, platform, arch, done) => {
      // https://github.com/serialport/node-serialport/issues/2464#issuecomment-1122454950
      // copyRecursiveSync(path.join('node_modules', 'ffi-napi'), path.join(extractPath, 'resources', 'app', 'node_modules', 'ffi-napi'));
      // copyRecursiveSync(path.join('node_modules', 'ref-napi'), path.join(extractPath, 'resources', 'app', 'node_modules', 'ref-napi'));
      // copyRecursiveSync(path.join('node_modules', 'debug'), path.join(extractPath, 'resources', 'app', 'node_modules', 'debug'));
      // copyRecursiveSync(path.join('node_modules', 'ms'), path.join(extractPath, 'resources', 'app', 'node_modules', 'ms'));
      // copyRecursiveSync(path.join('node_modules', 'node-gyp-build'), path.join(extractPath, 'resources', 'app', 'node_modules', 'node-gyp-build'));
      //
      // console.log("Done copying files");
      console.log("############")
      done()
    }]
  },
  rebuildConfig: {},
  makers: [new MakerSquirrel({}), new MakerZIP({}, ['darwin']), new MakerRpm({}), new MakerDeb({})],
  plugins: [
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './src/index.html',
            js: './src/renderer.ts',
            name: 'main_window',
            preload: {
              js: './src/preload.ts',
            },
          },
        ],
      },
    }),
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {}
    }
  ],
};

export default config;


function copyRecursiveSync(src: string, dest: string) {
  const exists: boolean = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    console.log(`Making directory ${dest}`);
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(function (childItemName) {
      console.log(`Copying ${childItemName}`);
      copyRecursiveSync(path.join(src, childItemName),
        path.join(dest, childItemName));
    });
  } else {
    console.log(`Copying ${src} to ${dest}`);
    fs.copyFileSync(src, dest);
  }
}
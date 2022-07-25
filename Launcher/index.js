/**
 * Add Google Translate project
 * Web-Ext Launcher for AddGoogleTranslate
 * Copyright (c) 2022 Arseniy Chereda, aka arschedev
 *
 * Licensed under the GNU General Public License v2.0
 */

/* */

// Imports
const fs = require('fs');
const { execSync } = require('child_process');
const colors = require('colors');
const download = require('download-git-repo');
const rwf = require('read-webfile');

// Version
const VERSION = '3';

// Utils
let print = (str) => process.stdout.write(str);
let println = (...strs) => console.log(...strs);

let Okay = () => print('yes it is\n'.green);
let Failed = () => print('no it\'s not\n'.yellow);

const Sleep = t => new Promise(r => setTimeout(r, t));

let Run = (cmd) => {
  try {
    execSync(cmd, { stdio: 'ignore' });
  } catch (e) {
    Oops(e);
  }
}
let OutputWhileRunning = (cmd) => {
  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch (e) {
    Oops(e);
  }
}

let ReadWebFile = (url, cb) => new Promise((resolve) => {
  rwf.readFileFromWeb(url, 'utf-8', (err, data) => {
    cb(err, data);
    resolve(data);
  });
});

function Oops(error) {
  println(
      '\n Everything is fine, but here is just some little error occurred:'.yellow,
      error.toString().yellow.bold);
}

function DownloadSpinner(text) {
  let s = (text + ' ').magenta;
  let SpinnerIteration = 0;
  let SpinnerPattern = [
    `| ${s}`,
    `/ ${s}`,
    `- ${s}`,
    `\\ ${s}`,
    `| ${s}`
  ];
  return setInterval(() => {
    console.clear();
    print('\n\n  ');
    print(SpinnerPattern[SpinnerIteration]);
    if (SpinnerIteration !== SpinnerPattern.length - 1)
      SpinnerIteration++;
    else SpinnerIteration = 0;
  }, 250);
}

// Start
(async () => {
  try {
    await ReadWebFile(
        'https://raw.githubusercontent.com/arschedev/AddGoogleTranslate/main/Launcher/package.json',
        function(err, data) {
          if (err) {
            Oops(err);
            return 0;
          }
          if (JSON.parse(data.toString()).version.split('-').slice(-1)[0] > VERSION) {
            println(('\n Update available ' + JSON.parse(data.toString()).version).yellow);
          }
        });
    println('\n Version 1.1.1 (at 1.0.0-alpha.1)'.gray);
    println('', '<=== My WebExt Launcher ===>'.bgYellow.black);
    println('    For AddGoogleTranslate\n'.red);
    println(' Note: always check your internet connection\n'.blue);
  } catch (e) {
    Oops(e);
  }

  try {
    //! web-ext check
    print('\n Is web-ext installed? ... '.cyan);
    Run('web-ext --version');
    Okay();
    await runWebExt();
  } catch (E1) {
    Failed();
    print(
        '\n Installing web-ext globally with `npm install --global web-ext` ...\n (You can uninstall it with `npm uninstall --global web-ext`, if you want)\n ... '.magenta.bold);
    try {
      //! web-ext check error -> install web-ext
      Run('npm install --global web-ext');
      print('All right\n'.green);
      await runWebExt();
    } catch (E2) {
      Oops(E2);
      print(' Okay, then... is NodeJS even installed? ... '.cyan);
      try {
        //! install web-ext error -> node check
        Run('node -v');
        Okay();
        //! node check okay -> unknown error
        println(` Hm, strange... So it seems to be like you got an unknown error, so the program doesn't know how to deal with it...
 If you are a programmer, you can try to fix it by yourself,
 If you aren't or error text isn't informative enough - Go there \`https://github.com/arschedev/AddGoogleTranslate/issues\`.
 If you haven't found anything there that explains how to fix an error, just create an "issue" on same GitHub page, 
 so dev at least will know about it and probably fix the error in the future.
 
 You can also do all this without a web-ext launcher, 
 just go to \`https://github.com/arschedev/AddGoogleTranslate#readme\` and follow the instructions`.yellow.bold);
      } catch (E3) {
        //! node check error -> node not installed
        Failed();
        println(
            ' You need NodeJS to install anything with `npm`.\n You can get NodeJS at https://nodejs.org, and then return to this program.'.magenta.bold);
      }
    }
  }
})();

async function runWebExt() {
  try {
    //! __AddGoogleTranslate__ check
    print('\n Checking for updates ... '.magenta);
    let latest_version = '';
    let toDownload = false;
    // does exist?
    if (fs.existsSync('./__AddGoogleTranslate__/')) {
      let old_package_json;
      // package.json?
      try {
        old_package_json = fs.readFileSync('./__AddGoogleTranslate__/package.json');
      } catch (e) {
        toDownload = true;
      }
      // package.json? -> version check
      if (!toDownload) {
        await ReadWebFile(
            'https://raw.githubusercontent.com/arschedev/AddGoogleTranslate/main/package.json',
            (err, new_package_json) => {
              if (err) throw err;
              latest_version = JSON.parse(new_package_json).version;
              let version_old = JSON.parse(old_package_json.toString()).version.split('-').slice(-1)[0];
              let version_new = JSON.parse(new_package_json.toString()).version.split('-').slice(-1)[0];
              if (version_new > version_old) {
                toDownload = true;
              } else {
                webExtInit();
              }
            });
      }
    } else {
      toDownload = true;
    }

    //! __AddGoogleTranslate__ check -> Download?
    if (toDownload) {
      print(('found ' + latest_version).green);
      await Sleep(1000);
      //! download spinner
      let Spinner = DownloadSpinner(`Downloading AddGoogleTranslate${latest_version ? ' (' + latest_version + ') ' : ''}...`);
      //! downloading repo
      download('arschedev/AddGoogleTranslate', './__AddGoogleTranslate__/', {},
          function(err) {
            if (err) {
              Oops(err);
            } else {
              //! managing downloaded repo
              fs.rmdir('./__AddGoogleTranslate__/Launcher/', { recursive: true },
                  () => {
                  });
              clearInterval(Spinner);
              print('succeed'.green);
              //! web-ext run
              webExtInit();
            }
          });
    }

    /**
     * ! web-ext run
     */
    function webExtInit() {
      println('\n\n Running web-ext ...\n\n'.magenta);
      OutputWhileRunning(
          'cd __AddGoogleTranslate__ && web-ext run --verbose');
      //! pause
      println('\n <=== Control+C to exit ===>'.magenta);
      process.stdin.on('data', () => {
      });
    }
  } catch (e) {
    Oops(e);
  }
}
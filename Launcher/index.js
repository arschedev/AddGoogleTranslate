/**
 * Add Google Translate project
 * Web-Ext Launcher for AddGoogleTranslate
 * Copyright (c) 2022 Arseniy Chereda, aka arschedev
 *
 * Licensed under the GNU General Public License v2.0
 */


const fs = require('fs');
const {execSync} = require('child_process');
const colors = require('colors');
const download = require('download-git-repo');


let Run = (cmd) => execSync(cmd, {stdio: 'ignore'});
let KeepRunning = (cmd) => execSync(cmd, {stdio: 'inherit'});

let Okay = () => process.stdout.write('yes it is\n'.green);
let Fail = () => process.stdout.write('no it\'s not\n'.yellow);

function Oops(error) {
  console.log(
      '\n Everything is fine, but here is just some little error occurred:'.yellow,
      error.toString().yellow.bold
  );
}


console.log('\n <=== My WEB-EXT LAUNCHER ===>'.random);
console.log('     for AddGoogleTranslate\n'.red)


try {
  //! web-ext check
  process.stdout.write('\n Is web-ext installed? ... '.cyan);
  Run('web-ext --version');
  Okay();
  runWebExt();
} catch (E1) {
  Fail();
  process.stdout.write('\n Installing web-ext globally with `npm install --global web-ext` ...\n (You can uninstall it with `npm uninstall --global web-ext`, if you want)\n ... '.magenta.bold);
  try {
    //! error -> web-ext install
    Run('npm install --global web-ext');
    process.stdout.write('All right\n'.green);
    runWebExt();
  } catch (E2) {
    Oops(E2);
    process.stdout.write(' Okay, then... is NodeJS even installed? ... '.cyan);
    try {
      //! error -> node check
      Run('node -v');
      Okay();
      //! unknown error
      console.log(` Hm, strange... So it seems to be like you got an unknown error, so the program doesn\'t know how to deal with it...
 If you are a programmer, you can try to fix it by yourself,
 If you aren\'t or your developer experience isn\'t enough - Go there \`https://github.com/arschedev/AddGoogleTranslate/issues\`.
 If you haven\'t found anything there that explains how to fix an error, just create an "issue" on same GitHub page, 
 so dev at least would know about it, and he would probably fix it in the future.
 
 Also you can do all this stuff without a web-ext launcher, just go to \`https://github.com/arschedev/AddGoogleTranslate#readme\` and follow the instuctions`.yellow.bold);
    } catch (E3) {
      //! node not installed
      Fail();
      console.log(' You need NodeJS to install stuff with `npm`.\n You can get NodeJS at https://nodejs.org, and then return to this program.'.magenta.bold);
    }
  }
}

function runWebExt() {
  try {
    //! download repo
    process.stdout.write('\n Downloading AddGoogleTranslate ... '.magenta);
    download('arschedev/AddGoogleTranslate', './__AddGoogleTranslate__/', {}, function (err) {
      if (err) {
        Oops(err);
      } else {
        //! manage downloaded repo
        fs.rmdir('./__AddGoogleTranslate__/Launcher/', {recursive: true}, () => {
        });
        process.stdout.write('succeed'.green);
        /**
         * ! web-ext run
         */
        console.log('\n\n Running web-ext ...\n\n'.magenta);
        KeepRunning('cd __AddGoogleTranslate__ && web-ext run --verbose');
        //! pause
        console.log('\n <=== Control+C to exit ===>'.magenta);
        process.stdin.on('data', () => {})
      }
    });
  } catch (E1) {
    Oops(E1);
  }
}
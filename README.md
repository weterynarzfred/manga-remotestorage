# is it out yet
A serverless android app made to check if new chapters of manga have come out. Checks on [mangatown.com](https://www.mangatown.com/) and in [mangadex](https://mangadex.org/) API.

To add entries you can simply copy an url from mangadex or mangatown. The app will download the title, cover and the number of currently available chapters. Use the "Update All" to recheck all entries. It will only check ones that were not checked in a while - exact time between updates depends on when the last chapter came out and if you've marked the entry as "current". You can also mark your progress on each manga and give it a score from 0 to 5 - both affect the sorting of entries.

Android app is not registered in google so it will warn you during the installation.

![screenshot](https://raw.githubusercontent.com/weterynarzfred/manga-remotestorage/master/screenshots/app-1.png)

Web version available here: https://isitoutyet.netlify.app/

Web version will not work with mangadex unless you disable CORS in your browser. One way to do it relatively safely is to open chrome using `--disable-web-security --disable-site-isolation-trials --user-data-dir="C:\temp_chrome_isitoutyet" --app="https://isitoutyet.netlify.app/"` parameters. You can change `C:\temp_chrome_isitoutyet` to any other local path. Just don't use it to for anything else than this app and to log into remotestorage.

Made using typescript and [capacitor js](https://capacitorjs.com/). Uses [remotestorage](https://remotestorage.io/) to store user data.
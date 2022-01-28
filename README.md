# is it out yet
A serverless android app made to check if new chapters of manga have come out. Checks on [mangatown.com](https://www.mangatown.com/) and in [mangadex](https://mangadex.org/) API.

![screenshot](https://raw.githubusercontent.com/weterynarzfred/manga-remotestorage/master/screenshots/app-1.png)

Web version available here: https://isitoutyet.netlify.app/
Web version will not work with mangadex unless you disable CORS in your browser. One way to do it relatively safely is to open chrome using `--disable-web-security --disable-site-isolation-trials --user-data-dir="C:\temp_chrome_isitoutyet" --app="https://isitoutyet.netlify.app/"` parameters. You can change `C:\temp_chrome_isitoutyet` to any other local path. Just don't use it to for anything else than this app and to log into remotestorage.

Made using typescript and [capacitor js](https://capacitorjs.com/). Uses [remotestorage](https://remotestorage.io/) to store user data.
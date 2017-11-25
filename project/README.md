# Conference Ionic
Conference Ionic is a mobile app that provides all the information related to a conference aiming to enhance the attendee experience and boost the conference marketing.

## Dependecies, Run and Build

### Install NodeJS dependencies

Run `npm install` to install all needed dependencies.

### Install Plugins and Javascript dependencies
#### Linux/MacOX
Run `./install.sh` to install all needed plugins and dependencies

#### Windows Users
Similarly, Windows users should run `install.bat`.

### Run the app
Use `grunt serve -l` to run the app in browser and watch for changes in code

or

use `grunt serve` to just run the app for a browser preview

or

use `grunt serve --lab` to run the app in a browser on two platforms at the same time.

### Add a platform

```bash
$ grunt platform:add:<platform>
```

Supported Cordova platforms:

```bash
$ grunt platform:add:ios
$ grunt platform:add:android
```

### Build the app

```bash
$ grunt build
```

### Εmulate the app on simulator
iOS:

```bash
$ grunt emulate:ios
```

Android:

```bash
$ grunt emulate:android
```

For more information, see [Ionic Framework Generator's instructions](https://github.com/diegonetto/generator-ionic).

### Plugins installation

Use the following commands and install all the plugins required by the app:
```bash
$ cordova plugin add {plugin id or url}
```

eg:

```bash
cordova plugin add cordova-plugin-inappbrowser
```

#### Used Cordova plugins
In case that the required Cordova plugins are not installed while installing NodeJS dependencies, Cordova's command mentioned previously can be used to install the following plugins:

* **cordova-plugin-device** - This plugin defines a global device object, which describes the device's hardware and software.
* **cordova-plugin-console** - This plugin is meant to ensure that console.log() is as useful as it can be. It adds additional function for iOS, Ubuntu, Windows Phone 8, and Windows.
* **cordova-plugin-whitelist** - This plugin implements a whitelist policy for navigating the application webview on Cordova 4.0
* **cordova-plugin-transport-security** - Cordova / PhoneGap Plugin to allow 'Arbitrary Loads' by adding a declaration to the Info.plist file to bypass the iOS 9 App Transport Security.
* **cordova-plugin-network-information** - This plugin provides an implementation of an old version of the Network Information API. It provides information about the device's cellular and wifi connection, and whether the device has an internet connection.
* **cordova-plugin-inappbrowser** - Provides a web browser view. It could be used to open images, access web pages, and open PDF files.
* **cordova-plugin-geolocation** - Grab the current location of the user, or grab continuous location changes.
* **ionic-plugin-keyboard** - It provides functions to make interacting with the keyboard easier, and fires events to indicate that the keyboard will hide/show.
* **de.appplant.cordova.plugin.email-composer@0.8.2** - The plugin provides access to the standard interface that manages the editing and sending an email message (https://github.com/katzer/cordova-plugin-email-composer.git).
* **phonegap-plugin-push** - This plugin offers support to receive and handle native push notifications with a single unified API.

## Demo
Install [Ionic View](http://view.ionic.io/) and preview the app on your mobile device using the following Ionic View ID: `2c644baf`

## Documentation
* [Conference Ionic Quick Start Guide](https://docs.google.com/document/d/1_IieaqMAw3qNHeCwegcZgYMm8k9A224rlv6Mbbd_Ths/edit?usp=sharing)

## Changelog
```
1.3 - May 26, 2017
- Device is registered on the app load to receive push notifications

1.2 - March 22, 2017
- Template improvement to match better with the color themes

1.1 - March 22, 2017
- Color themes added

1.0 - January 13, 2017
- Initial Release
```

## Credits

* [Yeoman](http://yeoman.io/)
* [Yeoman's Ionic Framework generator](https://github.com/diegonetto/generator-ionic)

## Third Party Licences
* [Apache License](http://www.apache.org/licenses/)
* [MIT License](https://opensource.org/licenses/MIT)

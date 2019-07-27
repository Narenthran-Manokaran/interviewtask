## Install

Now install dependencies by running this command in the newly created library.

```
npm install
```

For iOS:

Extra installation step needed on React Native 0.60(+)

```
cd ios && pod install && cd ..
```

Then to run on iOS:

```
react-native run-ios
```

For Android:

It is *recommended* to start the Metro Bundler manually, which would run in the foreground:

```
npm start
```

Otherwise, React Native will open its own window to run the Metro Bundler.

To run on Android, do the following command:

```
react-native run-android
```

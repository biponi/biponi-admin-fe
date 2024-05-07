# Building APK Instruction

This guide provides step-by-step instructions on how to build an APK (Android Package) for an Ionic Capacitor app developed with React and TypeScript, using Yarn for package management.

### Used Frameworks

- **Ionic**
- **Capacitor**
- **React App**

## Prerequisites

Before you begin, ensure you have the following software installed on your development machine:

- **Node.js**: Make sure you have Node.js installed. You can download and install it from [nodejs.org](https://nodejs.org/).
- **npm or Yarn**: Ensure you have npm (Node Package Manager) or Yarn installed. Yarn is recommended for managing dependencies.
- **Ionic CLI**: Install Ionic globally using npm or Yarn:

  ```bash
  npm install -g @ionic/cli
  # or
  yarn global add @ionic/cli
  ```

- **Capacitor CLI**: Install Capacitor globally using npm or Yarn:

  ```bash
  npm install -g @capacitor/cli
  ```

  # or

  ```bash
  yarn global add @capacitor/cli
  ```

- **Android Studio**: Install Android Studio to build and run Android apps. Download it from [developer.android.com/studio](https://developer.android.com/studio).

## Getting Started

1. **Clone Repository:**

   ```bash
   git clone https://github.com/biponi/biponi-admin-fe.git
   cd your-project
   checkout to biponi/apk branch
   ```

2. **Install Dependencies:**
   Install project dependencies using Yarn:

   ```bash
   yarn install
   ```

3. **Install ionic CLI(globally):**

   ```bash
   yarn global add @ionic/cli
   ```

4. **Add Platforms:**
   If you haven't already added the Android platform, use Capacitor CLI to add it:

   ```bash
   npx cap add android
   ```

5. **Build React App:**
   Ensure your React app is built and compiled:

   ```bash
   yarn build
   ```

6. **Sync Changes with Capacitor:**
   Sync your built web app with Capacitor:

   ```bash
   ionic capacitor sync android
   ```

7. **Open Native IDE:**
   Open the Android project in Android Studio:
   ```bash
   ionic capacitor add android
   ```

## Build APK

Follow these steps to build the APK:

1. **Run Gradle Build:**
   Inside Android Studio, open the `android` folder of your project and let it sync. Then, go to `Build` > `Build Bundle(s) / APK(s)` > `Build APK(s)`. This will generate the APK file.

2. **Locate APK:**
   Once the build completes successfully, locate the generated APK file in your project's directory:

   ```
   /biponi-admin-fe/android/app/build/outputs/apk/debug/app-debug.apk
   ```

   or

   ```
   /biponi-admin-fe/android/app/build/outputs/apk/release/app-release.apk
   ```

## Additional Notes

- For building a release APK, you will need to configure signing keys and update Gradle settings accordingly.
- Refer to the official documentation for Ionic, Capacitor, and React for more advanced configurations and troubleshooting.

## Troubleshooting

If you encounter any issues during the build process, check the error messages and ensure all dependencies are properly installed and configured.

## Resources

- [Ionic Framework Documentation](https://ionicframework.com/docs)
- [Capacitor Documentation](https://capacitorjs.com/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)

## License

This project is licensed under the [MIT License](LICENSE).

In this Markdown explanation:

- **Prerequisites**: Lists the necessary software required before starting the build process.
- **Getting Started**: Provides initial setup steps including cloning the repository, installing dependencies, adding the Android platform, building the React app, syncing changes with Capacitor, and opening the Android project in Android Studio.
- **Build APK**: Explains how to run the Gradle build within Android Studio to generate the APK file.
- **Additional Notes**: Includes tips for configuring a release APK and refers to official documentation for further guidance.
- **Troubleshooting**: Mentions troubleshooting steps for resolving build issues.
- **Resources**: Provides links to official documentation for Ionic, Capacitor, and React.
- **License**: Specifies the project's license.

Feel free to adjust or expand upon this Markdown content based on your specific project requirements or preferences. This README file will serve as a comprehensive guide for developers looking to build APKs for your Ionic Capacitor React TypeScript project.

<!-- Badges go here -->

# FrioLam System

Welcome to FrioLam System! This README is the central hub for all technical project and configuration documentation. It's a living document that updates often. Please review and change it as needed over the lifecycle of your project.

- [System Requirements](#system-requirements)
- [Quick Start](#quick-start)
- [Environments](#environments)
- [App Overview](#app-overview)
- [Project Architecture](#project-architecture)
- [Development](#development)
- [Update Dependency Chore](#update-dependency-chore)
- [Testing](#testing)
- [Deployment](#deployment)
- [Libraries Used](#libraries-used)
- [Backend Environment](#backend-environment)

## System Requirements
<!-- Software that must be installed on the local machine for this project to build correctly. -->
| Required | Version
| :-- | :--
| Ionic CLI | 4.x or higher
| Node.js | 16.x or higher
| npm | 8.x or higher

## Quick Start
<!-- What is the shortest path to writing code and pushing my changes back to GitHub? -->
```bash
cd path/to/your/project
git clone https://github.com/Desarrollos-QV/FrioLam.git
cd ./FrioLam
```

## Environments
<!-- Which platforms are we supporting? -->
| Platform | Version
| :--- | :---
| Android | 6.x and higher
| iOS | 13.x and higher

## App Overview
FrioLam is a system for repair and maintenance of semi-industrial equipment

### Key Features
- Provide a similar home delivery system
- Offer a robust system at low cost for customers/users
- Grow the platform to turn it into a 100% functional system


## Project Architecture
<!-- How is the repo organized? -->
```
├── node_modules/         # npm modules and components
├── src/                  # All source code for this project
├── typings/              # Cordova typings files
├── www/                  # Ionic platform code
├── .browserslistrc       # Supported browsers list
├── .editorconfig         # Config file for EditorConfig
├── .eslintignore         # ESLint ignore file
├── .eslintrc.js          # ESLint config file
├── .gitignore            # Git ignore file for this project
├── .nhcli                # nhcli file
├── .npmrc                # npm config file
├── angular.json          # Angular config file
├── ionic.config.json     # Ionic framework config
├── karma.conf.js         # Config file for Karma
├── mcoeandroid.keystore  # Android Build keystore
├── package-lock.json     # Lock file for npm
├── package.json          # Config file for npm
├── README.md             # The main README file
├── tsconfig.app.json     # App config file for TypeScript
├── tsconfig.json         # Config file for TypeScript
└── tsconfig.spec.json    # TypeScript test config file
```

## Development

<!-- Full configuration and installation instructions for writing code. -->

- All persistent development is done on the `main` branch.

- Test your code locally before pushing to GitHub both in browser and on device.

- `main` is always the Source of Truth for the current state of this project.

- Develop and test directly on the `main` branch when in doubt.

:boom: **CAUTION: Use feature branches with caution. Feature branches are always personal, temporary, and must be deleted as soon as they are merged back into `main`.**

## Update Dependency Chore

### package.json

1. Make note of all packages that are hard locked to a version and exclude them during the update process.

1. Run "npm outdated" to get a list of all outdated packages

   - review the release notes for all releases listed to ensure nothing [BREAKING] will be implemented
   - if everything is ok to be updated (without exception), run "npm run update:npm-packages" to blanket update all packages

1. Run "npm audit" to get a list of all packages with open vulnerabilities
   - priorotize all medium/high items for fix during the active sprint
   - manual package upgrade can be achieved by "npm install <package>@latest" or by "npm audit fix"
   - a test run of "npm audit fix" is possible via "npm audit fix --dry-run"

### Android

1. Open the project in Android Studio

1. Open the following files and update all dependencies that are highlighted as out of date

   Tip: Hover over a dependency that is highlighted and Android Studio will display a pop-up with the information on available versions

   - android/app/build.gradle
   - android/build.gradle

1. Run the command to "Sync the Project with Gradle Files" (The Elephant icon with the arrow pointing down in the top right in Android Studio's Toolbar)

1. Run 'app' (The Green Play Arrow in the middle of Android Studios Toolbar)

### iOS

> Note: Updating iOS may require reinstalling cocoapods
>
> https://capacitorjs.com/docs/getting-started

1. Open the project in Xcode

1. Open App.xcodeproj

1. On the far right under the heading "Project Document", set the "Project Format" to the latest version available

1. Set the "iOS Deployment Target" to the "Minimum OS (iOS)" as defined in the [Newton Mobile Documentation] There are 2 locations that need to be updated:

   - PROJECT "App", while on the "Info" Tab, under the "Deployment Target" heading
   - TARGETS "App", while on the "Build Settings" Tab, under the "Deployment" heading

1. Set the "Swift Language Version" to the latest version which is located:

   - TARGETS "App", while on the "Build Settings" Tab, under the "Swift Compiler - Language" heading

## Testing

### Testing on iOS and Android

For iOS:

1. "run:ios" to run the current code
1. "run:ioslive" to run the code (even with live edits) - similar to "npm run watch"

For Android:

1. "run:android" to run the current code
1. "run:androidlive" to run the code (even with live edits) - similar to "npm run watch"

### Unit Testing Coverage

| Sprint | Date / Time            | % Statements | % Branch | % Functions | % Lines |
| ------ | ---------------------- | ------------ | -------- | ----------- | ------- |
| 1      | JAN 17th, 18:32 pm EST | 40.00%       | 0%       | 00%         | 00%  | 


## Deployment
<!-- Full configuration and instructions for deploying to production. -->
- See [App Store Process]

## Libraries Used
<!-- Which libraries are used in this project? Or link to a config file. -->
- See [npm config file](./package.json) and can be used wherever."# friolam-app" 

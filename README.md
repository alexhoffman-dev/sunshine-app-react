# Sunshine App - REACT

The objective of this application is to take user location via the built in browser location services or a user input, and return the closest location(s) to the user with ⛅ sunshine in the foreacst. 

This app is a refactor of it's first iteration written in vanilla JS. The goal with this new version was to use concepts learned from greenfielding this code as an educational tool for learning core React concepts. Additionally, this version implements the Leaflet.js library for displaying the user's coordinates and potential sunny coordinates simulataenously on a map. 

## Table of Contents

- [Features](#features)
- [Usage](#usage)
- [Installation](#installation)
- [License](#license)

## Features 🌞

Highlight the key features and functionalities of your project.

- The primary feature of this app is finding the closest location to the user with the word 'sun' in the current forecast. To do this, the user is able to either input their location or use the built-in browser location services to inform the app of their current/relevant location. Starting at the user's input location, the app moves outward in an Ulam's Spiral in increments of 0.5deg of Latitude and Longitude where it queries the Weather.gov API. The app uses the [Weather.gov API](https://www.weather.gov/documentation/services-web-api) for relevant weather foracast data. 
- In addition to finding the closest location with sunshine in the forecast, the app also provides a button for displaying ALL the locations within 20 consecutive queries which ends up being about a 100 mile square area. 
- The location markers created on an instance of the Leaflet.js map class, each link to a Google Maps page for the user to find directions to the specified sunny location. 

## Usage 🗺️

1. The most common use case for this application comes from a personal desire to find some sunshine during the dreary Winters and Springs of the PNW I call home. 
2. Example 2: Description of the example and how to run it.
3. Example 3: Description of the example and how to run it.
4. ...

## Future Goals and Acknowledgements ⭐

- Roadmap: Future goals for this project will be to incorporate travel time in to the calculation of calculating the relevant forecast for each API query so that the information is as up-to date as possible if the user intended to travel to said location. Once that function is fleshed out, I beleive adding a paramter to the search so the user could ostensibly find sunshine for the upcoming weekend, for example, as opposed to these searches always being contemporaneous. 
- Credits: I'd love to take this small moment to thanks and acknowledge my friend Luke Donahue for his continued support editing and thinking through the process of developing this app!

## Installation 📦
### Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## License

[MIT License](https://opensource.org/license/mit/)


# TrainTracker

## Description

Amtrak National Rail services are a critical part of American transit. In 2023, Amtrak reported 28.58 million users, which was still 11% down from pre-pandemic levels. However, for such an important transit system, Amtrak's capability to allow users to easily and effectively track their services is lacking. The official Amtrak train tracker page is hard to use for searching trains, finding trains, and getting specific information from them. The Amtrak app is a better source of truth, but still does not always show as much information as would be useful. 

This app is meant as a 3rd party open source solution to Amtraks train tracker options. TrainTracker is an intuitive and easy to use web application meant for both desktop and mobile, and allows users to access detailed information about all trains that Amtrak has running on the rails at any given time. This app was built using a self-serviced version of the Amtrak API with Cloudflare, and React & Leaflet to create a cohesive and simple user experience.

![image](https://github.com/user-attachments/assets/9bd8d454-0bb4-4c64-ad38-c34fcdd8d39b)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contribution](#contribution)
- [Attributions](#attributions)
- [License](#license)

# Installation

Download the .tar file of this repository's most recent release from 'Releases'.

Move the file to wherever you would like to build this project on your local machine.

Inside the folder that has the .tar file, run the following command:

### `tar -xvzf TrainTracker-[version].tar.gz`

# Usage

In the project directory, navigate to the folder 'train-tracker', then you can run:

### `npm install`

and then

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

# Contribution

Follow this [project board](https://github.com/orgs/cis3296f24/projects/105) to know the latest status of the project.

Use this [github repository](https://github.com/cis3296f24/TrainTracker/)
- Use branch 'main' for the most up-to-date code  
- Use any environment you are comfortable with for using JavaScript
- Navigate to folder train-tracker
- Run npm install, and then npm start
- A development server will launch, and the web application will launch at [http://localhost:3000](http://localhost:3000) in your browser.

# Attributions

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The train favicon was downloaded from [Train icons created by Smashicons - Flaticon](https://www.flaticon.com/free-icon/train_2855692).

The routes GeoJSON data was downloaded from [The US Department of Transportation](https://data-usdot.opendata.arcgis.com/datasets/usdot::amtrak-routes/explore?location=38%2C-79%2C6.60).

# License

This software is open-source and available under the [MIT License](https://opensource.org/license/mit) (Copyright 2024; [Amitai Goldmeer](https://github.com/ahgoldmeer), [Louise Dupont](https://github.com/ldups), [Molly Barron](https://github.com/molly-pop), [Nicholas Rehac](https://github.com/nicholasrehac), [TJ McBride](https://github.com/tjtemple), [William Sims](https://github.com/wSimsT))

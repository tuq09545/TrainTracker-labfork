# TrainTracker

## Description

Amtrak National Rail services are a critical part of American transit. In 2023, Amtrak reported 28.58 million users, which was still 11% down from pre-pandemic levels. However, for such an important transit system, Amtrak's capability to allow users to easily and effectively track their services is lacking. The official Amtrak train tracker page is hard to use for searching trains, finding trains, and getting specific information from them. The Amtrak app is a better source of truth, but still does not always show as much information as would be useful. 

![image](https://github.com/user-attachments/assets/9bd8d454-0bb4-4c64-ad38-c34fcdd8d39b)

# Table of Contents

- [Website Overview](#website-overview)
- [Contribution](#contribution)
- [How to Build](#how-to-build)
- [Documentation](#documentation)
- [Installation](#installation-from-repository)
- [Attributions](#attributions)
- [License](#license)

# Website Overview

This app is meant as a 3rd party open source solution to Amtraks train tracker options. TrainTracker is an intuitive and easy to use web application meant for both desktop and mobile, and allows users to access detailed information about all trains that Amtrak has running on the rails at any given time. This app was built using a self-serviced version of the Amtrak API with Cloudflare, and React & Leaflet to create a cohesive and simple user experience.

To use this online, go to [https://cis3296f24.github.io/TrainTracker/](https://cis3296f24.github.io/TrainTracker/)

## Home Page

The home page has a search option and a table for train responses. Users can search trains by number, line, or station and use a favorite preset to save time while searching their trains. The response table will bring up all trains that fit the user query. The train line, number, start & destination, and status will be displayed by default. For any train, it can be selected to get more details, including updates for all stations. Additionally, all trains have a shareable link as part of this popup.

## Map Page

The map page has a search option and a map of Amtrak lines. Users can search trains by number, line, or station and use a favorite preset to save time while searching their trains. The map will, by default, show all trains and lines. When a particular train or line has been searched, only the selected items will be shown on the map. For any train, it can be selected on the map and will show the train line, number, speed, status, and the last time Amtrak updated its status and data.

## Train Share Page

This page is where shareable links will lead to. By default, when accessed from the home sidebar and not from a sent link, a table with all available trains will be shown. These trains can be selected, and their links used as shareable links as well.

# Contribution

Follow this [project board](https://github.com/orgs/cis3296f24/projects/105) to know the latest status of the project.

## How to build
1. Use this [github repository](https://github.com/cis3296f24/TrainTracker/) (https://github.com/cis3296f24/TrainTracker/)
2. Clone this repository to your local system (git clone)
3. If you haven't, download Node.js for your respective system [here](https://nodejs.org/en/download/package-manager/current)\
     i. `npm -v`\
     ii. `node -v`
4. Navigate to the folder train-tracker: `cd train-tracker`
5. `npm install`
6. `npm start`\
     i. Runs the app in the development mode.\
     ii. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.\
     iii. Running this app in development mode starts a local proxy that will directly communicate with Amtrak to collect information.\
     iv. The page will reload when you make changes. You may also see any lint errors in the console.

If you'd like to deploy this project yourself:

`npm run build`

This builds the app for production to the `build` folder.

It correctly bundles React in production mode and optimizes the build for the best performance.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Documentation

To see the full JSDoc, download the entire docs folder found in `train-tracker/doc` and open the `index.html` in a browser

# Installation from Repository

If you'd like to install this directly instead of cloning from git, follow these steps instead

Download the .tar file of this repository's most recent release from 'Releases'.

Move the file to wherever you would like to build this project on your local machine.

Inside the folder that has the .tar file, run the following command:

### `tar -xvzf TrainTracker-[version].tar.gz`

# Attributions

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The train favicon was downloaded from [Train icons created by Smashicons - Flaticon](https://www.flaticon.com/free-icon/train_2855692).

The routes GeoJSON data was downloaded from [The US Department of Transportation](https://data-usdot.opendata.arcgis.com/datasets/usdot::amtrak-routes/explore?location=38%2C-79%2C6.60).

# License

This software is open-source and available under the [MIT License](https://opensource.org/license/mit) (Copyright 2024; [Amitai Goldmeer](https://github.com/ahgoldmeer), [Louise Dupont](https://github.com/ldups), [Molly Barron](https://github.com/molly-pop), [Nicholas Rehac](https://github.com/nicholasrehac), [TJ McBride](https://github.com/tjtemple), [William Sims](https://github.com/wSimsT))

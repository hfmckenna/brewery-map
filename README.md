# Liverpool Neighbourhood Pub Map

A map of some of the best places to find a crisp pint of ale, in one of the best cities in the world!

## How it works

Simply browse the map and click on the markers to find out more about any given pub.

- Filter pubs: Search for a specific pub with the 'Search Pubs' search bar at the top
- List pubs: Click the hamburger menu to see a full list of pubs by name. Click on them to see where they are. Press ESC or click again to close the menu.
- Pub details: Get the address and other details by clicking on the pub name.

## Technical notes

### To Install
- Install Node & Yarn globally if you haven't already
- Clone the git repository from https://github.com/hfmckenna/neighbourhood-map and enter the created directory
- Enter `yarn install` on the command line within your local directory
- Enter `yarn start` for the development build, if you need the production build with Service Workers follow instructions below

### To Build

To test the app with Service Workers enabled

- From within your Git clone directory enter `yarn build`
- Then `yarn global add serve`
- To serve it `serve -s build`
- You should have the localhost address presented to paste in your browser

### Notes

This app uses both the Google Maps API and FourSquare API. The former presents lots of detailed information when anything fails to load, please be sure to check the console if anything appears not to be working.

The FourSquare API should only load once when the app is initialised and as such a single browser alert will display if a JSON file is not retrieved from their server.
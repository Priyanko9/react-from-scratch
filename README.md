# Hacker News Clone
This is a clone of the site  https://news.ycombinator.com/.This project is using the api https://hn.algolia.com/api for 
getting the news feed.There are two main component.The home component is used for listing the news and its functionality.
The pagination component is used for iterating over the pages.
It is built using react and node.Server Side Rendering is used for serving the pages from node.
The project is using localStorage for maintaining state.Redux can be used but since its a small app it can be done using 
localStorage.
For bundling purposes it uses webpack.
Jest and enzyme is used for testing.

The frontend files are stored in are stored AWS S3 and the node file is in AWS lambda.The project is hosted at
cloudfront(http://d3o8t1wp3mxy1b.cloudfront.net/).

Travis CI is used for CI/CD process.
 

# Installation
npm install

# Linting
npm run lint

# Tests
npm run test

# start
npm start
After starting it will serve from a express server



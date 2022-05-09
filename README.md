# Project Description
Create an API that resizes and saves images to user specifications when visiting a URL using node.js
Build an API that can be used in two different ways. 
As a simple placeholder API, the first allows you to place images into your frontend with the size set via URL parameters (and additional stylization if you choose) 
for rapid prototyping. 
The second use case is as a library to serve properly scaled versions of your images to the front end to reduce page load size. 
Rather than needing to resize and upload multiple copies of the same image to be used throughout your site, the API you create will handle resizing 
and serving stored images for you.

# Scripts Needed to build/ format / start / test application
	npm run build
	npm run format
	node .\build\.
	npm run test

# Development Phases:
## 1• Initialize project and Configure Dependencies ##
Set up your project structure. Create folders and files for what is anticipated would be needed for the project.
Add the dependencies required for the project, including *Express*, *TypeScript*, *Jasmine*, *Eslint*, *Prettier*, *Git*,and *Spark*.
Complete package.json file for development dependencies and normal ones and also writing scripts to build, run and test code.
Configure added pakages "jasmine", "tsconfig","eslintrc","prettierrc","gitignore"

## 2•Write Tests ##
Write some tests that test the api end point and the out put of every function covering almost every situation even the ones that supposed to through errors.

## 3•Set up server and Create an API Endpoint ##
Set project up in a scalable way. 
Set up server and route so that the project remains scalable. Only one endpoint is required. It is better to create a separate module for processing functionality and import it into your route.

## 4•Preparing Image Resizing Code and Add Middlewares ##
The code is splited into three main functions. The first middleware function is for checking wheter the required image is in the thumb folder so don't process it and just send it to the user using the second function. The third one is for processing and resizing the image.


## 5•Test, Debug, and Refactor ##
Think of edge-cases for your project and how someone may access project.
Add more unit tests.



#### Further Features will be added as soon as possible:
	1-Add additional processing to accept and output other image formats than JPG and provide user with control panel to change different features of the image like bluring and color changing -features that user may need to use and sharp provide-.
	2-Modify the thumbnail filename to include the image size to allow for multiple sizes of the same image.
	3-Add in logging to record when images are processed or accessed.
	4-Create a front-end for uploading more images to the full-size directory.
	5-Create a front-end that displays a thumbnail directory.
	6-Create a front-end that allows for the selection of how to process a selected image.
	7-Deploy it on github or heroku

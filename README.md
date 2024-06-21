###
<div align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="40" alt="nodejs logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" height="40" alt="mongodb logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" height="40" alt="express logo"  />
</div>


  ## Project n°6 from Openclassrooms's Web Development training program
<img align="center" src="./frontend/src/images/ignore/P6_Description.png" alt="Project description"/>


## Setup guide
### Backend 

Go to backend folder and create an env file containing those lines : 
<br>
`NODE_ENV= either "production" (for ATLAS) or "development" (for local)`
<br>
<br>
`ATLAS_DB_USERNAME= ...`
<br>
`ATLAS_DB_PASSWORD= ...`
<br>
`ATLAS_DB_CLUSTER= ...`
<br>
`ATLAS_DB_NAME= ...`
<br>
<br>
`MONGODB_LOCAL_URI= Your local MongoDB URI`
<br>
<br>
`JWT_SECRET= Generate your own secret token's key for authentification middleware.`
<br>
<br>
Then run in the console : 
<br>
`npm install` to install dependencies
<br>
`nodemon server` to start the server
<br>

### Frontend
Go to the frontend folder and run in the console : 
<br>
`npm install` to install dependencies
<br>
`npm start` to run the front

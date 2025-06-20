# eigenlayer restaking info

# project 
This project provides a backend REST API for aggregating and exposing eigenlayer restaking data and related network 


# Workflow 
 dealing with the data fetching throw `fetchData,js` and also connect to etherreum using web3 
 fetching data using mongodb models `restaker`, `velidator`,`reward`

# Models save data into db schemas  
 
 - **restaker** 
 - **velidator**
 - **reward**

# Routes 
    - **restaker** 
    - **velidator**
    - **reward**
# -Scripts/
 - fechData.js  # data feching
 - .env # environment varibles
# Server.js
#used main express server and connect mongodb data base or local host

# test 
-used postman

# Note 
- related_api_key not working for subgraph 
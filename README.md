## VRTube
CMPE 280 SP18 Team Project<br/>
Team name: BAM<br/>


#### Project Description
Through this project, our team seeks to provide a platform by which users can create, share, and participate in virtual reality experiences, both their own and those of others. At a high level, the project is a web application supporting user authentication, file uploads, creation and viewing of virtual realities (think of it like Youtube, but for VR).

Given the broad description of our application above, we can distill it into several main requirements:

- Catch users’ interest in VR from the moment they open the application
- Provide a comfortable user experience, in an intuitive and collaborative environment
- Make it simple for users to create their own VRs and for them to view others’ VRs

A brief summary of the project architecture, as well as several screenshots of the running application, are provided below. Additional details can be found in our [project report](https://github.com/mtkwong/VRTube/blob/master/docs/report.pdf).

#### Setup &amp; Run

To run the application, fork and clone the repository, `cd` into the repository directory, then run the following commands to setup &amp; start the server:

`$ mkdir uploads # create directory where user VRs will be stored`<br/>
`$ npm install # install required libraries`<br/>
`$ npm start # start the server on port 3000`

Once the server is running, you should be able to access the app at [http://localhost:3000](http://localhost:3000).


#### Architecture

##### Node.js Web Server

![280_server](https://user-images.githubusercontent.com/32351699/39911674-138545dc-54b1-11e8-9ee2-bce13b809edc.png)

##### MySQL Database 

![280_mysql](https://user-images.githubusercontent.com/32351699/39911764-5da4054a-54b1-11e8-972a-35b8dbc29c2c.png)

##### MongoDB Database 

![280_mongo](https://user-images.githubusercontent.com/32351699/39911796-73a178dc-54b1-11e8-900f-36ff51dcf2a1.png)

#### REST API Endpoints

| Verb  | Route  | Description  |
| ------------ | ------------ | ------------ |
| GET  | /  | Display landing page  |
| GET  | /users  | Display a particular user's profile  |
| GET  | /users/getUserInfo  | Get the information for the currently logged-in user (if any)  |
| POST  | /users/signup  | Register a new user  |
| POST  | /users/login  | Log in an existing user |
| GET  | /users/logout  | Log out a logged-in user  |
| POST  | /serach  | Display search page  |
| POST  | /files/upload  | Upload a new VR file  |
| POST  | /files/download  | Download an existing VR file  |
| GET  | /files/uservrs  | Get the VRs for a particular user  |
| POST  | /files/search  | Get the files that match a search query keyword |
| GET  | /vrs  | Display a particular VR  |
| GET  | /vrs/getVrInfo  | Get the details for a particular VR  |
| GET  | /vrs/getOtherVrs  | Get the summary of the 10 most recently uploaded VRs  |
| GET  | /vr/getComments | Get the comments for a particular VR |
| POST  | /vr/submitComment | Submit a new comment for a particular VR |

#### Application Screenshots

###### Landing page

<img width="1440" alt="screen shot 2018-05-11 at 12 37 22 am" src="https://user-images.githubusercontent.com/32351699/39912678-5fd56996-54b4-11e8-82f8-729c6830738c.png">

###### Search results page

<img width="1440" alt="screen shot 2018-05-11 at 12 38 17 am" src="https://user-images.githubusercontent.com/32351699/39912733-85028b54-54b4-11e8-8588-3fbeb7329889.png">

###### Virtual Reality page

<img width="1440" alt="screen shot 2018-05-11 at 12 41 17 am" src="https://user-images.githubusercontent.com/32351699/39912760-9c793e22-54b4-11e8-8873-96c4ed2e8178.png">

###### Virtual Reality Home - My VRs

<img width="1440" alt="screen shot 2018-05-11 at 12 41 45 am" src="https://user-images.githubusercontent.com/32351699/39912807-c3c5d36e-54b4-11e8-8bb4-a66f22f25f5e.png">

###### Virtual Reality Home - Upload VR

<img width="1440" alt="screen shot 2018-05-11 at 12 41 54 am" src="https://user-images.githubusercontent.com/32351699/39912840-dc11c608-54b4-11e8-8774-a8e35f0fa727.png">

###### Virtual Reality Home - Create VR

<img width="1440" alt="screen shot 2018-05-11 at 12 42 09 am" src="https://user-images.githubusercontent.com/32351699/39912869-ed20406e-54b4-11e8-8af8-c8e1cae024f3.png">

###### Virtual Reality Home - Comment & Like

<img width="1440" alt="screen shot 2018-05-11 at 12 42 51 am" src="https://user-images.githubusercontent.com/32351699/39912912-019119d8-54b5-11e8-9a98-84867aeccd0a.png">



# ChatWebApp

Real-time chat application which allows it’s users to create, delete and update contacts.
Users can initiateconversations to a single or a group of users.

To run the application localy, run "npm start" from the client diractory and "npm devStart" from the server directory.



**NOTE**

<sup>By default the application uses localhost:3000 for the app itself and localhost:5000 for the server. Changing the app socket might create problems related to **CORS** and the server.js file should be accordingly. Changing the server's port, implies also changing the port in the "client/src/contexts/SocketProvider.js".</sup>

# BITSBids

Welcome to BITSBids, your premier destination for exciting online auctions! Discover a wide range of items, from rare collectibles to everyday essentials, all available at unbeatable prices. Whether you're a seasoned bidder or new to the auction scene, BITSBids offers an engaging and user-friendly platform to help you find amazing deals. Join our community of enthusiastic buyers and start bidding today!

## How it works

1.  Start by logging in or Register
   
  ![image](https://github.com/Radian6405/CRUx-Round-3/assets/99524343/823e99ca-59cd-437b-9490-f6b6316ed289)
  
2. View all public auctions in home page
   
  ![image](https://github.com/Radian6405/CRUx-Round-3/assets/99524343/6b379bb4-a683-4df0-9ae7-45e072c4d240)
  
3. Create your own auctions and rooms
   
  ![image](https://github.com/Radian6405/CRUx-Round-3/assets/99524343/1d584458-a98a-42aa-b7e8-f1663a5b2067)
  
4. View private rooms
   
  ![image](https://github.com/Radian6405/CRUx-Round-3/assets/99524343/c380eb30-d4f9-4616-b681-68356fd53b4a)
  
5. Bid and comment in an auction
    
   ![image](https://github.com/Radian6405/CRUx-Round-3/assets/99524343/c659020a-9c97-4998-a4f0-da50c0e33464)


## Technologies used

- [Node](https://nodejs.org/en)
- [React](https://react.dev/) with [vite](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Cloudinary](https://cloudinary.com/)

## Setup

### Backend

1. ```cd``` into ```backend-server``` and run ```npm i```.
2. Create a ```.env``` file and fill it with the following details:
  ```
MONGO_USERNAME=<your MongoDB username>
MONGO_PASSWORD=<your MongoDB password>

SERVER_PORT=8000
SERVER_ROUNDS=10

MAIL_HOST="gmail"
MAIL_USERNAME=<your gmail address>
MAIL_PASSWORD=<your gmaill app password>

CLOUDINARY_CLOUD_NAME=<your Cloudinary cloud>
CLOUDINARY_API_KEY=<your Cloudinary API key>
CLOUDINARY_API_SECRET=<your Cloudinary API secret>
  ```
3. Run ```npm run dev``` to start the server.
4. Your backend server should be running on [http://localhost:8000](http://localhost:8000).

### Frontend

1. ```cd``` into ```frontend``` and run ```npm i```.
2.  Run ```npm run dev``` to start the server.
3.  Your frontend server should be running run on [http://127.0.0.1:5173](http://127.0.0.1:5173/).

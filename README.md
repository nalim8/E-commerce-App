# PERN-E-Commerce-App

PERN-App (PostgreSQL, Express, React, Node.js) implemented as an online bike store. Users can create accounts, view products, add products to a cart, and place/view orders.


## Running the app

1. Install Node.js and PostgreSQL: Make sure you have Node.js and PostgreSQL installed on your system.

2. This project requires a [PostgreSQL](https://www.postgresql.org/) database to be running locally.  Reference the ERD diagram located in the `resources` folder of this repo to view the structure of the tables.  You can use [pgAdmin](https://www.pgadmin.org/) to interact with the database manually.

3. This repo includes an `example.env` file that contains important environment variables for reference.  Make sure to create a `.env` file and include all variables found in the `example.env` file, replacing the example values with those specific to your environment/needs.

5. Run `npm install` in the server directory to install the server dependencies.

6. Run `npm start` in the server directory to start the server.

7. Run `npm install` in the client directory to install the client dependencies.

8. Run `npm start` in the client directory to start the client.

9. Start the app by starting both the server and the client. For development run `npm run dev` in the root directory.

10. Once the app is running locally, you can access it in a browser at `http://localhost:<your-port>`


## Dependencies

Server dependencies:
- bcrypt: 5.1.0
- concurrently: 7.6.0
- cors: 2.8.5
- dotenv: 16.0.3
- express: 4.18.2
- express-flash: 0.0.2
- express-session: 1.17.3
- morgan: 1.10.0
- passport: 0.6.0
- passport-google-oauth20: 2.0.0
- passport-local: 1.0.0
- pg: 8.8.0
- pg-promise: 11.0.2
- stripe: 11.5.0
- nodemon: 2.0.20

Client dependencies:
- axios: 1.2.2
- nodemon: 2.0.20
- react: 18.2.0
- react-dom: 18.2.0
- react-google-button: 0.7.2
- react-google-login: 5.2.2
- react-router-dom: 6.6.1
- react-scripts: 5.0.1
- @fortawesome/fontawesome 1.1.8
- @fortawesome/fontawesome-free-solid: 5.0.13
- @fortawesome/fontawesome-svg-core: 6.2.1
- @fortawesome/free-regular-svg-icons: 6.2.1
- @fortawesome/free-solid-svg-icons: 6.2.1
- @fortawesome/react-fontawesome: 0.2.0


## Preview

### Frontend
![E-commerce-App_bikes](https://user-images.githubusercontent.com/30770031/220947419-b6f96a9b-6b68-4849-a4ff-6d1936cfe0fd.png)

![E-commerce-App_cart](https://user-images.githubusercontent.com/30770031/220947428-dc324476-ffe2-4d1a-baad-40e5a756d70b.png)


### Database
![ERD](https://user-images.githubusercontent.com/30770031/220948840-9dd67afb-9894-4190-8e76-1f12e919ecbc.png)

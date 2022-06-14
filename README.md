![restaurant_roger.gif](./restaurant_roger.gif)

# Personal Favorite Restaurant Collection Platform
User can browse through the restaurants they like by signing in or to register for an account.
<br>
Testing account:
<br>
* user1@example.com/ 12345678
* user2@example.com/ 12345678

Clicking picturse of any restaurant or Detail button for more information. More information contains the type of the restaurant, address, phone number, and a brief description of the restaurant.

Clicking Edit button to edit restaurant info.

Click Delete button to delete a restaurant.

Clicking Create button to create a new restaurant in navigation bar.

On top of the restaurants list, it's a searching bar. You can type in English or Chinese characters to seach the name or the type of restaurants.

### Prerequisites

Users need to get a local terminal software ready, for example, the Git Bash (for Windows).
* nvm (download this by searching on google "nvm".)
* Node.js (use nvm to download this.)
* express (use npm to install express)
* mongoose (use npm to install mongoose)

### Installing

1. Open up your terminal to clone this project

```
$ git clone https://github.com/RogerHuang0320/restaurant_list.git
```

2. [Click here](https://github.com/coreybutler/nvm-windows/releases) to go to the website to download nvm.

3. use nvm to install Node.js; use your terminal to type in followiwng command.

```
$ nvm install 16.14.2
```

4. Go to the file where you cloned this project, and type in followiwng command to install express.

```
$ npm i express@4.16.4
```

5. Type in followiwng command to install mongoose.

```
$ npm i mongoose@5.9.7
```

6. Type in followiwng command to install dotenv.

```
$ npm i dotenv
```

7. Type in followiwng command to install bcryptjs.

```
$ npn i bcryptjs
```

### Usage

1. Create a .env file at root, refering to .env.example for more details.

2. Run seeder to create restaurant data and users.
```
$ npn run seed
```

3.Type in followiwng command to activate router.

```
$ npn run dev
```

4. If the terminal shows the words below, that means you have successfully open the project.

```
The Express server is running on http://localhost:3000
mongodb connected!
```

5. Open up any web browser and type in "http://localhost:3000" to start to use.

## Contributor

> [Roger Huang](https://github.com/RogerHuang0320)

## Built with

* Node.js @14.16.0
* Express.js @4.16.4
* express-handlebars @3.0.0
* mongoose @5.9.7
* Bootstrap @4.3.1
* Font-awesome @5.8.1
* body-parser @1.20.0
* bcryptjs @2.4.3
* connect-flash @0.1.1
* dotenv @16.0.1
* express-session @1.17.3
* Method-override @3.0.0 
* passport @0.6.0
* passport-facebook @3.0.0
* passport-local @1.0.0

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="#">
    <img src="client/src/assets/logo.png" alt="Logo" width="80" height="80">
  </a>
  <h3 align="center">clientLink</h3>

<p align="center">
    Progressive Web App to link clients and contacts.
</p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Recruiting exercise for a software developer position.
<br>
Demo: <a href="https://youtu.be/FZKj_LVBsMo">on YouTube</a>.

### Built With

- [Vue3](https://vuejs.org)
- [Node](https://nodejs.org)
- [MongoDB](https://www.mongodb.com)
- [Mongoose](https://mongoosejs.com)

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- node.js

    ```sh
    sudo apt install nodejs # Debian/Ubuntu
    brew install node # macOS
    winget install nodejs # Windows
    ```

- npm

    ```sh
    npm install npm@latest -g
    ```

- browser (preferably [Chrome](https://www.google.com/chrome/))

### Installation

#### Server

1. Clone the repo or download the zip file then extract it

    ```sh
    git clone https://github.com/iamdanre/clientLink.git
    ```

2. Change to project directory

    ```sh
    cd clientLink
    ```

3. Install NPM packages and run server

    ```sh
    cd server;
    npm install && npm start; # prepend & to run in background
    ```

#### Client

1. Open a new terminal, navigate to project directory, then install NPM packages for the client

    ```sh
    cd client; # run this in a new terminal window from the project root directory
    npm install;
    ```

2. Build client

    ```sh
    npm run build # uses vite to build dist folder
    ```

3. Serve client, this should open the app in your default browser

    ```sh
    npm run serve # uses http-server to serve dist folder
    ```

<!-- USAGE EXAMPLES -->

## Usage

When you serve the client, the app should open in your default browser. If not, navigate to `http://localhost:5173` in your browser.
<br>
Once opened, the app should prompt for installation in the URL bar. Install the app to use it as a PWA. If you don't want to install it, you can use it as a regular web app.
<br>
Note that the `dist` folder is not included in the repo, so you'll have to build the client before serving it.
<br>
The server uses Atlas MongoDB, so you don't have to install MongoDB locally. However, if you want to use a local MongoDB instance, you can change the connection string in `server/config/db.config.js`.
<br>
<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- CONTACT -->

## Contact

danré - [@xp_x_qx](https://twitter.com/xp_x_qx) - dev.danre@icloud.com

Project Link: [https://github.com/iamdanre/clientLink](https://github.com/iamdanre/clientLink)

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [Vite](https://vitejs.dev)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [FormKit](https://formkit.com)

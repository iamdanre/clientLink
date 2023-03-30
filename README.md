<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/iamdanre/clientLink">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>
  <h3 align="center" style="color:#00bd7e">clientLink</h3>

<p align="center">
    App to link clients and contacts.
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

Recruiting exercise for a software developer position at <a href="https://www.bcity.me/">Binary City</a>.
<br>
<img src="images/screenshot.png" alt="Screenshot" width="100%" height="100%">
<img src="images/screenshot2.png" alt="Screenshot" width="100%" height="100%">

### Built With

- [!Vue](https://vuejs.org)
- [!Node](https://nodejs.org)
- [!MongoDB](https://www.mongodb.com)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running, install the dependencies and follow the instructions below.

### Prerequisites

-   node.js

    ```sh
    sudo apt install nodejs
    ```

-   npm

    ```sh
    npm install npm@latest -g
    ```

-   browser (preferably Chrome)

### Installation

1. Clone the repo or download the zip file

    ```sh
    git clone https://github.com/iamdanre/clientLink.git
    ```

2. Change to project directory

    ```sh
    cd clientLink
    ```

3. Install NPM packages and run server

    ```sh
    cd server; npm install && npm start
    ```

4. Open a new terminal, navigate to project directory, then install NPM packages for the client

    ```sh
    cd client; npm install
    ```

5. Build client

    ```sh
    npm run build
    ```

6. Serve client, this should open the app in your default browser

    ```sh
    npm run serve
    ```

<!-- USAGE EXAMPLES -->

## Usage

When you serve the client, the app should open in your default browser. If not, navigate to `http://localhost:5173` in your browser.
Once opened, the app should prompt for installation in the URL bar. Install the app to use it as a PWA. If you don't want to install it, you can use it as a regular web app.

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
- [FormKit](https://formkit.com)

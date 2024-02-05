<br/>
<p align="center">
  <h3 align="center">Covelo</h3>

  <p align="center">
    An application that bringing together cycling enthusiasts. It allows users to easily organize bicycle trips around the world.
    <br/>
    <br/>
    <a href="https://co-velo.vercel.app">View Demo</a>
    .
    <a href="https://github.com/MMaciej0/co-velo/issues">Report Bug</a>
    .
  </p>
</p>



## Table Of Contents

* [About the Project](#about-the-project)
* [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Authors](#authors)
* [Acknowledgements](#acknowledgements)

## About The Project

In a world abundant with cycling applications tailored for training tracking, route creation, and indoor cycling, there's a noticeable gap when it comes to finding ride companions. Often, cyclists resort to social media platforms like Facebook, which aren't precisely designed for this purpose. This is where my app comes into play.

The primary objective of this application is to facilitate the discovery and organization of cycling rides on a global scale.

Key Features:
*user registration and authentication for secure access,
*search functionality to discover existing rides, with filtering options based on various criteria,
*ability for users to sign up for available rides,
*creation of new rides, empowering users to initiate and organize cycling events seamlessly.


## Built With

- **Frontend:**
  - TypeScript, [React](https://reactjs.org/), [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [React Hook Form](https://react-hook-form.com/), [Zod](https://github.com/colinhacks/zod), [React Query](https://react-query.tanstack.com/).

- **Backend:**
  - [Prisma](https://www.prisma.io/), [MongoDB](https://www.mongodb.com/).

- **Authentication:**
  - [Auth.js](https://authjs.dev/).

- **API Requests:**
  - [Axios](https://axios-http.com/).

- **Mapping:**
  - [Leaflet](https://leafletjs.com/).

## Getting Started

Follow these steps to get your project up and running on your local machine.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

* npm

```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo

```sh
git clone https://github.com/MMaciej0/co-velo.git
```

3. Install NPM packages

```sh
npm install
```

4. Create .env file in root folder
DATABASE_URL= Your MongoDB Connection String
AUTH_SECRET= Your Authentication Secret [Auth.js](https://authjs.dev/)
AUTH_GOOGLE_ID= Your Google Console Project ID
AUTH_GOOGLE_SECRET= Your Google Console Project Secret
COUNTRIES_API_KEY=[https://countrystatecity.in/link](https://countrystatecity.in/link)


## Roadmap

See the [open issues](https://github.com/MMaciej0/co-velo/issues) for a list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.
* If you have suggestions for adding or removing projects, feel free to [open an issue](https://github.com/MMaciej0/co-velo/issues/new) to discuss it, or directly create a pull request after you edit the *README.md* file with necessary changes.
* Please make sure you check your spelling and grammar.
* Create individual PR for each suggestion.
* Please also read through the [Code Of Conduct](https://github.com/MMaciej0/co-velo/blob/main/CODE_OF_CONDUCT.md) before posting your first idea as well.

### Creating A Pull Request

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See [LICENSE](https://github.com/MMaciej0/co-velo/blob/main/LICENSE.md) for more information.

## Authors

* **Maciej Mądry** - ** - [Maciej Mądry](https://github.com/MMaciej0) - **

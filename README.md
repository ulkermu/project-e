
# E-Commerce Website

## Overview

Welcome to the repository of our Eteration E-Commerce website. This platform provides a seamless shopping experience for a variety of products. With an intuitive interface, customers can filter products, add them to their basket, and perform searches across the catalog.

## Features

- **Filtering Options**: Users can filter products based on various criteria such as 'Old to New', 'New to Old', 'Price High to Low', and 'Price Low to High'.
- **Search Functionality**: A general search feature that allows users to search any text visible on the product cards.
- **Persistent Shopping Basket**: Utilizing `localStorage`, the site remembers the user's basket items even after closing the browser.
- **Responsive UI**: Built with Material UI, the interface adapts to various screen sizes for an optimal browsing experience.
- **State Management**: `Recoil` is used for global state management across components.
- **Routing**: `react-router-dom` is used for navigating between different pages of the website.
- **Testing**: Comprehensive test suites are written for each component under the `__test__` directory to ensure reliability and maintainability.

## Technologies & Tools

This project makes use of the following technologies and tools:

- **React**: A JavaScript library for building user interfaces.
- **Material-UI**: A popular React UI framework.
- **Recoil**: A state management library for React.
- **react-router-dom**: A standard library for routing in React.

## Installation

1. Clone the repository to your local machine.
   ```sh
   git clone https://github.com/ulkermu/project-e.git
   ```
2. Navigate to the project directory.
   ```sh
   cd project-e
   ```
3. Install the required dependencies.
   ```sh
   npm install
   ```
4. Run the application.
   ```sh
   npm start
   ```

## Usage

After launching the site, you can:

- Use the filters on the left side to sort products.
- Add products to your basket, which will update the total price and items in the basket section.
- Use the search bar to look for products by any keyword on the product cards.
- Revisit the site and find your previous basket intact, thanks to `localStorage`.

## Testing

To run the tests, execute the following command:

```sh
npm test
```

Each component has an associated test file in the `__test__` directory that can be used to verify its functionality.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Murat ÜLKER - [muratulker93@gmail.com]

Project Link: (Project-e)[https://project-e-rho.vercel.app]

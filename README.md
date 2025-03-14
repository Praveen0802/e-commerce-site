# Product Listing & Cart System

This project is a Product Listing & Cart System built using React.js. It includes core functionalities like product listing, cart management, pagination, search, sorting, and state persistence using cookies.

## 🛠️ Technologies Used

    React.js (Functional Components & Hooks)

    State Management: Redux Toolkit

    UI Library: Tailwind CSS

    Data Fetching: Axios

    Routing: React Router

## Installation

    npm install

    npm start

## Features

### ✅ Product Listing Page (Home Page)

### Product Fetching:

    Initially Products are fetched from the API 'https://dummyjson.com/products' .
     Displayed product details include:

        Title

        Category

        Price

        Stock

        Image

     Pagination:

        Custom pagination component to navigate between pages.

        Pagination is handled by updating limit and skip parameters in the API call.

     Add to Cart:

        Each product has an Add to Cart button.

        Users can add multiple quantities of a product, limited by available stock.

        When the stock limit is reached or no stock is available, the + button and Add to Cart button are disabled.

     Cart Count:

        Cart item count is displayed in the header.

        Redux is used to manage cart state and update the item count in real-time.

        Cart data is stored in cookies for persistence across page reloads.

     Search Functionality:

        Users can search for products using a search bar.

        Search requests are debounced to optimize API calls (API: 'https://dummyjson.com/products/search').

        Pagination works seamlessly with search queries by updating limit and skip parameters in the API call.

     Sorting:

        Products can be sorted by price in ascending (order: 'asc') or descending (order: 'desc') order.

        Pagination works with sorting parameters.
        
## 🛒 Cart Page

 ## Cart Initialization:

    Cart data is retrieved from cookies on page load.

    A secondary API call ('https://dummyjson.com/products/${id}') fetches detailed product information for cart items.

     Cart View:

    Displayed cart details include:

        Product Title

        Price per Item

        Quantity of items added

        Total Price (Price × Quantity)
        
        Actions(Remove Item)

     Modify Cart Items:

        Users can increase or decrease the quantity of items.

        If the stock limit is reached, the + button is disabled.

        Items can be completely removed using the Remove button in actions.

     Total Calculation:

        The total price of all cart items is calculated and displayed.

     Continue Shopping:

        Users can navigate back to the product listing page to add more items to the cart.

## (payment is just a mimic to complete the flow).    

    Payment Integration:

        Created a custom hook for initializing and making Razorpay payment integration.

        After successful payment, the cart will be cleared, and users will be redirected to continue shopping.

        Implemented razorpay is an test account so you can select upi mode
             and write "success@razorpay" for successful payment
        


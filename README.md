# Beauty Buzz

Beauty Buzz is an ecommerce site inspired by Ulta and Etsy. On this site, makeup enthusiasts can list their own makeup products and review makeup products that others have shared. Some features to be expected in the future are Shopping Cart and Favorites.

# Live Link

https://beauty-buzz.onrender.com

# Tech Stack

### Languages

![Static Badge](https://img.shields.io/badge/Python-brown?style=for-the-badge&logo=python&logoColor=white)
![Static Badge](https://img.shields.io/badge/Javascript-red?style=for-the-badge&logo=javascript&logoColor=white)
![Static Badge](https://img.shields.io/badge/CSS-orange?style=for-the-badge&logo=css3)
![Static Badge](https://img.shields.io/badge/HTML-yellow?style=for-the-badge&logo=html5&logoColor=white)

### Frameworks and Libraries

![Static Badge](https://img.shields.io/badge/Flask-green?style=for-the-badge&logo=flask)
![Static Badge](https://img.shields.io/badge/React-darkgreen?style=for-the-badge&logo=react&logoColor=white)
![Static Badge](https://img.shields.io/badge/Redux-lightblue?style=for-the-badge&logo=redux)

### ORM

![Static Badge](https://img.shields.io/badge/SQLAlchemy-blue?style=for-the-badge&logo=SQLAlchemy&logoColor=white)

### Database

![Static Badge](https://img.shields.io/badge/PostgreSQL-lavender?style=for-the-badge&logo=postgresql&logoColor=white)

### Hosting

![Static Badge](https://img.shields.io/badge/render-violet?style=for-the-badge&logo=render&logoColor=white)

### Object Storage

![Static Badge](https://img.shields.io/badge/amazons3-pink?style=for-the-badge&logo=amazons3&logoColor=white)

### Design

![Static Badge](https://img.shields.io/badge/canva-hotpink?style=for-the-badge&logo=canva&logoColor=white)

# Index

[Feature List](https://github.com/nicolehuyen/Beauty-Buzz/wiki/MVP's-Feature-List#mvps-feature-list) | [Database Schema](https://github.com/nicolehuyen/Beauty-Buzz/wiki/Database-Schema-and-Backend-Routes#database-schema) | [User Stories](https://github.com/nicolehuyen/Beauty-Buzz/wiki/User-Stories) | [Wireframes](https://github.com/nicolehuyen/Beauty-Buzz/wiki/Wireframes)

# Landing Page
![Landing Page](./gifs/LandingPage.gif)

# User Login / Sign-Up
![User](./gifs/UserLogin.gif)

# Categories
![Categories](./gifs/Categories.gif)

# Product Details
![Product Details](./gifs/ProductDetails.gif)

# Manage Products
![Manage Products](./gifs/ManageProducts.gif)

# Endpoints

### Auth

| **Request**                | **Purpose**                                                                                                                                                                | **Return Value**                                                                                                            |
|----------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| GET /api/auth/             | This fetch returns an object representing the current user if they are logged in.                                                                                          | {<br> "email": STRING,<br> "first_name": STRING,<br> "id": INTEGER,<br> "last_name": STRING <br>} <br><br> Status: 200      |
| GET /api/auth/unauthorized | This route returns an object with the message 'Unauthorized' if authentication fails.                                                                                      | {<br> "errors": {"message":  "Unauthorized"}<br> } <br><br> Status: 401                                                     |
| POST /api/auth/signup      | This fetch sends the form data to the back end to process the creation of a new user. It returns an object representing the current user if the account creation succeeds. | {<br> "email": STRING,<br> "first_name": STRING,<br> "id": INTEGER,<br> "last_name": STRING <br>} <br><br> Status: 200      |
| POST /api/auth/login       | This fetch sends the form data to the back end to process the login of a user. It returns an object representing the current user if the account login succeeds.           | { <br> "email": STRING, <br> "first_name": STRING, <br> "id": INTEGER, <br> "last_name": STRING <br> } <br><br> Status: 200 |
| GET /api/auth/logout       | This fetch will log out the current user. It returns an object with the message 'User logged out' if it succeeds.                                                          | {<br> "message": "User logged out" <br>} <br><br> Status: 200                                                               |

### Product

| **Request**                      | **Purpose**                                                                                                                                                          | **Return Value**                                                                                                                                                                                                                                                                                                                                                    |
|----------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| GET /api/products/               | This fetch returns an object representing all the makeup products.                                                                                                   | { <br> "products": [ <br>   { <br>    "category": STRING, <br>    "created_at": DATETIME, <br>    "description": STRING, <br>    "id": INTEGER, <br>    "image": STRING, <br>    "name": STRING, <br>    "price": NUMERIC, <br>    "reviews": [], <br>     "seller_id": INTEGER, <br>     "updated_at": DATETIME <br>     } ] <br> } <br><br> Status: 200           |
| GET /api/products/:id            | This fetch returns an object representing a single makeup product.                                                                                                   | {  <br>    "category": STRING, <br>    "created_at": DATETIME, <br>    "description": STRING, <br>    "id": INTEGER, <br>    "image": STRING, <br>    "name": STRING, <br>    "price": NUMERIC, <br>    "reviews": [], <br>     "seller_id": INTEGER, <br>     "updated_at": DATETIME <br> } <br><br> Status: 200                                                   |
| GET /api/products/category/:cate | This fetch returns an object representing all the makeup products in a specific category.                                                                            | { <br> "product_categories": [ <br>   { <br>    "category": STRING, <br>    "created_at": DATETIME, <br>    "description": STRING, <br>    "id": INTEGER, <br>    "image": STRING, <br>    "name": STRING, <br>    "price": NUMERIC, <br>    "reviews": [], <br>     "seller_id": INTEGER, <br>     "updated_at": DATETIME <br>     } ] <br> } <br><br> Status: 200 |
| GET /api/products/manage         | This fetch returns an object representing all the makeup products that the current user owns.                                                                        | { <br> "user_products": [ <br>   { <br>    "category": STRING, <br>    "created_at": DATETIME, <br>    "description": STRING, <br>    "id": INTEGER, <br>    "image": STRING, <br>    "name": STRING, <br>    "price": NUMERIC, <br>    "reviews": [], <br>     "seller_id": INTEGER, <br>     "updated_at": DATETIME <br>     } ] <br> } <br><br> Status: 200      |
| POST /api/products/new           | This fetch sends the form data to the back end to process the creation of a new product. It returns an object representing the new product if the creation succeeds. | { <br>    "category": STRING, <br>    "created_at": DATETIME, <br>    "description": STRING, <br>    "id": INTEGER, <br>    "image": STRING, <br>    "name": STRING, <br>    "price": NUMERIC, <br>    "reviews": [], <br>     "seller_id": INTEGER, <br>     "updated_at": DATETIME <br> } <br><br> Status: 200                                                    |
| PUT /api/products/:id/edit       | This fetch sends the form data to the back end to process the update of a product. It returns an object representing the updated product if the update succeeds.     | { <br>    "category": STRING, <br>    "created_at": DATETIME, <br>    "description": STRING, <br>    "id": INTEGER, <br>    "image": STRING, <br>    "name": STRING, <br>    "price": NUMERIC, <br>    "reviews": [], <br>     "seller_id": INTEGER, <br>     "updated_at": DATETIME <br> } <br><br> Status: 200                                                    |
| DELETE /api/products/:id         | This fetch will delete the product. It returns a message 'Successfully Deleted' if it succeeds.                                                                      | Successfully Deleted <br><br> Status: 200                                                                                                                                                                                                                                                                                                                           |

### Review

| **Request**                                | **Purpose**                                                                                                                                                        | **Return Value**                                                                                                                                                                                                                                                               |
|--------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| GET /api/products/:id/reviews              | This fetch returns an object representing all the makeup product's reviews.                                                                                        | { <br> "reviews": [ <br>   { <br>    "created_at": DATETIME, <br>    "creator_id": INTEGER, <br>    "id": INTEGER, <br>    "product_id": INTEGER, <br>    "review": STRING, <br>    "stars": INTEGER, <br>     "updated_at": DATETIME <br>     } ] <br> } <br><br> Status: 200 |
| POST /api/products/:id/reviews             | This fetch sends the form data to the back end to process the creation of a new review. It returns an object representing the new review if the creation succeeds. | {  <br>    "created_at": DATETIME, <br>    "creator_id": INTEGER, <br>    "id": INTEGER, <br>    "product_id": INTEGER, <br>    "review": STRING, <br>    "stars": INTEGER, <br>     "updated_at": DATETIME <br> } <br><br> Status: 200                                        |
| PUT /api/products/:id/reviews/:reviewId    | This fetch sends the form data to the back end to process the update of a review. It returns an object representing the updated review if the update succeeds.     | {  <br>    "created_at": DATETIME, <br>    "creator_id": INTEGER, <br>    "id": INTEGER, <br>    "product_id": INTEGER, <br>    "review": STRING, <br>    "stars": INTEGER, <br>     "updated_at": DATETIME <br> } <br><br> Status: 200                                        |
| DELETE /api/products/:id/reviews/:reviewId | This fetch will delete the review. It returns a message 'Successfully Deleted' if it succeeds.                                                                     | Successfully Deleted <br><br> Status: 200                                                                                                                                                                                                                                      |

# Feature List

1. Products
2. Reviews

# Future Features

1. Shopping Cart
2. Favorites
3. Search
4. Past Orders / Reorder

# Connect

[LinkedIn](https://www.linkedin.com/in/nicolehuyenle/) | [GitHub](https://github.com/nicolehuyen)

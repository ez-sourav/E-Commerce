# 🚀 Backend E-Commerce System (with Swagger API Docs)

A production-level backend system built using the MERN stack, implementing authentication, role-based access, product management, cart functionality, and order processing.

---

## 📌 Features

### 🔐 Authentication & Authorization

* User registration and login
* JWT-based authentication using **HTTP-only cookies**
* Role-based access control (User / Admin)
* Protected routes

### 📦 Product Management

* Admin can create products
* Fetch all products
* Product schema with stock, category, and pricing

### 🛒 Cart System

* Add products to cart
* Update product quantity
* Remove items from cart
* Automatic cart creation per user
* Stock validation

### 🧾 Order System

* Convert cart into order
* Store order history
* Calculate total price
* Clear cart after successful order

### 🛡️ Security

* Password hashing using bcrypt
* HTTP-only cookies for secure token storage
* Input validation
* Protected APIs

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JWT + HTTP-only Cookies
* **Security:** bcrypt, cookie-parser, cors
* **API Docs:** Swagger (swagger-ui-express, swagger-jsdoc)
* **Tools:** Postman, Git, GitHub

---

## 📁 Project Structure

```
src/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── middlewares/
 ├── services/
 ├── utils/
 └── app.js

server.js
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
NODE_ENV=development
```

### 4. Run the server

```bash
npm run dev
```

---

## 📄 API Documentation (Swagger)

Interactive API documentation is available using Swagger UI.

### 🔗 Access Swagger
```
http://localhost:3000/api-docs
```

### ✅ Features

* View all API endpoints in one place
* Test APIs directly from browser
* Understand request/response format easily
* Authentication supported via cookies

---

## 🔗 API Endpoints

### 🔐 Auth Routes

* `POST /api/auth/register` → Register user
* `POST /api/auth/login` → Login user
* `GET /api/auth/logout` → Logout user

---

### 📦 Product Routes

* `POST /api/products` → Create product (Admin only)
* `GET /api/products` → Get all products
* `GET /api/products/:productId` → Get product by ID
* `PATCH /api/products/:productId` → Update product (Admin only)
* `DELETE /api/products/:productId` → Delete product (Admin only)

---

### 🛒 Cart Routes

* `POST /api/cart` → Add to cart
* `GET /api/cart` → Get user cart
* `DELETE /api/cart/:productId` → Remove item

---

### 🧾 Order Routes

* `POST /api/orders` → Place order
* `GET /api/orders` → Get user orders

---

## 🧪 Testing

* Use Swagger UI (`/api-docs`) for quick testing
* Or use Postman / Thunder Client
* Authentication handled via HTTP-only cookies

---

## 📬 Contact

If you have any questions or suggestions, feel free to connect.

---

## ⭐ Show Your Support

Give a ⭐ if you like this project!

---
## 👤 Author

**Sourav Biswas**
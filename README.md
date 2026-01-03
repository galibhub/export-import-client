# 🌍 Export Import Hub

A modern web application for managing import and export products. Users can browse products, import items with custom quantities, manage their exports, and explore various product categories from around the world.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://export-import-hub.netlify.app/)
[![Client Repo](https://img.shields.io/badge/GitHub-Client-blue)](https://github.com/galibhub/export-import-client.git)
[![Server Repo](https://img.shields.io/badge/GitHub-Server-orange)](https://github.com/galibhub/export-import-server)

---

## 🚀 Live Demo

**Visit the live website:** [https://export-import-hub.netlify.app/](https://export-import-hub.netlify.app/)

---

## 🛠️ Tech Stack

### **Client Side**

- React.js (with Vite)
- Tailwind CSS
- DaisyUI
- React Router
- Firebase Authentication
- React Icons
- React Toastify
- SweetAlert2

### **Server Side**

- Node.js
- Express.js
- MongoDB
- CORS

---

## ✨ Key Features

- 🔐 **User Authentication** - Secure login and registration with Firebase
- 📦 **Product Browsing** - View all available products with beautiful cards
- 🔍 **Search Functionality** - Quickly find products by name
- 🛒 **Import Products** - Select products and import with custom quantities
- 📊 **My Imports** - Manage all your imported products in one place
- 📤 **My Exports** - Add, view, update, and delete your export products
- 🎨 **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- 🌐 **Category Browsing** - Explore products by categories like Electronics, Agriculture, Textiles, and Machinery

---

## 💻 How to Run Locally

Follow these simple steps to run the project on your computer:

### **Prerequisites**

- Node.js installed on your computer
- MongoDB installed or MongoDB Atlas account
- Firebase account for authentication

### **Client Setup**

1. **Clone the client repository**

   ```bash
   git clone https://github.com/galibhub/export-import-client.git
   cd export-import-client
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create `.env.local` file in the root folder and add:**

   ```env
   VITE_APIKEY=your_firebase_api_key
   VITE_AUTHDOMAIN=your_firebase_auth_domain
   VITE_PROJECTID=your_firebase_project_id
   VITE_STORAGEBUCKET=your_firebase_storage_bucket
   VITE_MESSAGINGSENDERID=your_firebase_messaging_sender_id
   VITE_APPID=your_firebase_app_id
   ```

4. **Run the client**

   ```bash
   npm run dev
   ```

5. **Open your browser and visit:** `http://localhost:5173`

### **Server Setup**

1. **Clone the server repository**

   ```bash
   git clone https://github.com/galibhub/export-import-server.git
   cd export-import-server
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create `.env` file in the root folder and add:**

   ```env
   PORT=3000
   DB_USER=your_mongodb_username
   DB_PASS=your_mongodb_password
   ```

4. **Run the server**

   ```bash
   npm start
   ```

5. **Server will run on:** `https://export-server-alpha.vercel.app`

---

## 🔑 Environment Variables

### **Client (`.env.local`)**

```env
VITE_APIKEY=your_firebase_api_key
VITE_AUTHDOMAIN=your_firebase_auth_domain
VITE_PROJECTID=your_firebase_project_id
VITE_STORAGEBUCKET=your_firebase_storage_bucket
VITE_MESSAGINGSENDERID=your_firebase_messaging_sender_id
VITE_APPID=your_firebase_app_id
```

### **Server (`.env`)**

```env
PORT=3000
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
```

---

## 📡 API Endpoints

### **Products**

- `GET /latest-products` - Get latest 6 products
- `GET /products` - Get all products
- `GET /products/:id` - Get single product details
- `GET /search?search=keyword` - Search products by name

### **Imports**

- `GET /myImport?email=user@example.com` - Get user's imports
- `POST /myImport` - Add new import
- `DELETE /myImport/:id` - Delete an import

### **Exports**

- `GET /myExport?email=user@example.com` - Get user's exports
- `POST /myExport` - Add new export
- `PUT /myExport/:id` - Update an export
- `DELETE /myExport/:id` - Delete an export

---

## 📂 Folder Structure

```
export-import-client/
├── public/
│   └── _redirects          # Netlify routing config
├── src/
│   ├── components/
│   │   ├── Home/
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   ├── AllProducts/
│   │   ├── ProductDetails/
│   │   ├── MyImport/
│   │   └── MyExport/
│   ├── pages/
│   │   ├── AboutUs.jsx
│   │   ├── ContactUs.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── Provider/
│   │   └── AuthProvider.jsx
│   ├── Routes/
│   │   └── Router.jsx
│   └── main.jsx
└── package.json
```

---

## 📸 Screenshots

### Home Page

![Home Page](screenshots/home.png)

### All Products

![All Products](screenshots/products.png)

### Product Details

![Product Details](screenshots/details.png)

### My Imports

![My Imports](screenshots/imports.png)

---

## 🌐 Deployment

- **Frontend:** Deployed on [Netlify](https://export-import-hub.netlify.app/)
- **Backend:** Deployed on [Vercel](https://export-server-alpha.vercel.app/)
- **Database:** MongoDB Atlas

---

## 📦 NPM Packages Used

### Client

- `react` - UI library
- `react-router-dom` - Routing
- `firebase` - Authentication
- `react-toastify` - Toast notifications
- `sweetalert2` - Beautiful alerts
- `react-icons` - Icon library
- `tailwindcss` - Styling
- `daisyui` - UI components

### Server

- `express` - Web framework
- `mongodb` - Database driver
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variables

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Made with ❤️ by Galib**

[![GitHub](https://img.shields.io/badge/GitHub-galibhub-black?logo=github)](https://github.com/galibhub)

</div>

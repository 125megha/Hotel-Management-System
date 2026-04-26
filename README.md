# Full Stack Web Application (Angular + .NET + SQL Server)

## 📌 Overview

This is a full-stack web application built using:

* Frontend: Angular
* Backend: .NET (Web API)
* Database: Microsoft SQL Server

The project includes a database script to easily set up the database on any system.

---

## 🛠️ Tech Stack

* Angular
* .NET Web API
* Microsoft SQL Server
* REST APIs

---

## 📁 Project Structure

```
/frontend        → Angular application
/backend         → .NET Web API
/database        → SQL scripts (schema + data)
```

---

## ⚙️ Prerequisites

Make sure you have the following installed:

* Node.js & npm
* Angular CLI
* .NET SDK
* SQL Server
* SQL Server Management Studio (SSMS)

---

## 🚀 Getting Started

### 1. Clone the repository

```
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

---

## 🗄️ Database Setup

This project includes a SQL script to create and populate the database.

### Steps:

1. Open SQL Server Management Studio (SSMS)
2. Connect to your local server
3. Open the script file:

   ```
   /database/database.sql
   ```
4. Click **Execute (F5)**

This will:

* Create the database
* Create tables
* Insert sample data

---

## 🔧 Backend Setup (.NET)

1. Navigate to backend folder:

```
cd backend
```

2. Restore dependencies:

```
dotnet restore
```

3. Update connection string in:

```
appsettings.json
```

Example:

```
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=YourDB;Trusted_Connection=True;"
}
```

4. Run the backend:

```
dotnet run
```

Backend will start on:

```
https://localhost:5001
```

---

## 🎨 Frontend Setup (Angular)

1. Navigate to frontend folder:

```
cd frontend
```

2. Install dependencies:

```
npm install
```

3. Run Angular app:

```
ng serve
```

App will start on:

```
http://localhost:4200
```

---

## 🔗 API Configuration

Make sure Angular is pointing to the correct backend API URL.

Update:

```
environment.ts
```

Example:

```
apiUrl: 'https://localhost:5001/api'
```

---

## 📌 Features

* User management
* RESTful API integration
* Database script included for easy setup
* Clean project structure

---

## ⚠️ Notes

* Ensure SQL Server is running before executing the script
* Update database connection string based on your system
* Ports may vary depending on your configuration

---

## 🤝 Contributing

Feel free to fork this repository and submit pull requests.

---

## 📄 License

This project is for educational purposes.

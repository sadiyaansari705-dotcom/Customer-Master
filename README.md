# Customer Master

A full-stack Customer Master Data Management System built to manage customer records through a web-based interface and REST APIs.

The application provides customer CRUD operations, dashboard statistics, search, pagination and activity history with Oracle Database integration.


## 📌 Project Overview

Customer Master is a web-based application developed to manage customer information in a structured and efficient way.

The system allows users to:

- Add new customers
- View customer records
- Update customer information
- Delete customers 
- Search customer records
- View dashboard statistics 
- Track customer activities 
- Search and paginate activity history

The backend is developed using Java and Spring Boot, while the frontend uses HTML, CSS and JavaScript. Oracle Database is used for storing customer and activity data.


## ✨ Features 

### Customer Management 

- Add new customer
- View all customers
- View customer by ID 
- Update customer details
- Delete customer
- Customer creation timestamp

### Search & Pagination

- Search customers
- Customer list pagination
- Search activity history
- Activity history pagination

### Dashboard

The dashboard displays:

- Total Customers
- Active Records
- Added Today
- Deleted Records

### Activity History

The system records customer activities such as:

- ADD
- DELETE

Activity history contains:

- Activity ID
- Customer ID
- Customer Name
- Activity Type
- Activity Time

### API Integration

The frontend communicates with the Spring Boot backend using REST APIs.

### Database Integration

Customer and activity information is stored in Oracle Database using Spring Data JPA and Hibernate.


## 🛠️ Technology Stack

### Backend

- Java 21
- Spring Boot 4.1.0
- Spring Web
- Spring Data JPA
- Hibernate
- Gradle
- REST API

### Frontend

- HTML5
- CSS3
- JavaScript
- Font Awesome

### Database

- Oracle Database
- Oracle JDBC

### Development Tools

- Eclipse
- Visual Studio Code
- Postman
- Oracle SQL Developer
- Git
- GitHub


## 🏗️ System Architecture

The application follows a layered architecture.

Frontend
   ↓
REST API
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
Spring Data JPA / Hibernate
   ↓
Oracle Database

### Request Flow

User
 ↓
HTML / CSS / JavaScript
 ↓
HTTP Request
 ↓
CustomerController
 ↓
CustomerService
 ↓
CustomerRepository
 ↓
Oracle Database

## 📂 Project Structure

Customer-Master/
│
├── backend/
│   │
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/
│   │   │   │       └── customermaster/
│   │   │   │           ├── controller/
│   │   │   │           ├── repository/
│   │   │   │           ├── service/
│   │   │   │           ├── Customer.java
│   │   │   │           ├── CustomerActivity.java
│   │   │   │           ├── CustomerStatistics.java
│   │   │   │           └── CustomermasterApplication.java
│   │   │   │
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   │
│   │   └── test/
│   │
│   ├── build.gradle
│   ├── gradlew
│   └── settings.gradle
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── .gitignore
├── README.md
└── settings.gradle


## 🔌 REST API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/customers` | Get all customers |
| GET | `/customers/{id}` | Get customer by ID |
| POST | `/customers` | Add a new customer |
| PUT | `/customers/{id}` | Update customer |
| DELETE | `/customers/{id}` | Delete customer |
| GET | `/customers/statistics` | Get dashboard statistics |
| GET | `/customers/activity-history` | Get activity history |


## 👤 Customer CRUD Operations

### Add Customer

A new customer can be added through the frontend form.

Frontend
   ↓
POST /customers
   ↓
CustomerController
   ↓
CustomerService
   ↓
CustomerRepository
   ↓
Oracle Database

### View Customers

The application retrieves customer records using:

GET /customers

### Update Customer

Existing customer information can be updated using:

PUT /customers/{id}

### Delete Customer

A customer can be deleted using:

DELETE /customers/{id}

The delete operation is also recorded in the activity history.


## 🕒 Activity History

Customer activities are stored in the `CUSTOMER_ACTIVITY` table.

The system currently records:

- ADD
- DELETE

Each activity contains:

| Field | Description |
|------|-------------|
| Activity ID | Unique activity identifier |
| Customer ID | Related customer ID |
| Customer Name | Customer name |
| Activity Type | ADD or DELETE |
| Activity Time | Date and time of activity |

Activities are displayed in chronological order in the frontend.


## 📊 Dashboard Statistics

The dashboard provides a quick overview of customer records.

### Statistics

- **Total Customers** – Total number of current customer records
- **Active Records** – Current active customer records
- **Added Today** – Customers added today
- **Deleted Records** – Number of recorded delete activities

Statistics are retrieved from the backend through:

GET /customers/statistics


## 🔎 Search and Pagination

The application provides search and pagination functionality.

### Customer List

Users can search customer records using customer information.

The customer list is divided into pages to make the data easier to view.

### Activity History

Activity history also supports:

- Search
- Pagination
- Customer ID search
- Customer name search
- Activity type search
- Activity time search


## 🗄️ Database Design

The application uses Oracle Database for persistent data storage.

### Main Tables

#### CUSTOMER

Stores customer information such as:

- Customer ID
- First Name
- Last Name
- Email
- Phone
- Address
- Created At

#### CUSTOMER_ACTIVITY

Stores customer activity information such as:

- Activity ID
- Customer ID
- Customer Name
- Activity Type
- Activity Time

Sequences are used for generating unique IDs.


## 🔗 Backend Components

### Controller

The controller handles incoming HTTP requests and maps them to the appropriate service methods.

Main controller:

CustomerController

### Service

The service layer contains the main business logic.

Main service:

CustomerService

### Repository

The repository layer communicates with the database through Spring Data JPA.

Main repositories:

CustomerRepository
CustomerActivityRepository

### Entity Classes

Main entity classes:

Customer
CustomerActivity

### Statistics

Dashboard statistics are represented using:

CustomerStatistics


## 🌐 Frontend

The frontend is developed using:

- HTML
- CSS
- JavaScript

### Frontend Files

index.html
style.css
script.js

### Frontend Responsibilities

- Display customer records
- Add customers
- Edit customers
- Delete customers
- Search customers
- Display dashboard statistics
- Display activity history
- Search activity history
- Handle pagination
- Communicate with REST APIs


## 🔄 Application Workflow

User opens the application
        ↓
Frontend loads
        ↓
JavaScript requests data from REST API
        ↓
Spring Boot receives request
        ↓
Controller handles request
        ↓
Service performs business logic
        ↓
Repository communicates with Oracle Database
        ↓
Database returns data
        ↓
Backend sends JSON response
        ↓
Frontend displays the result


## ▶️ How to Run the Project

### 1. Start Oracle Database

Make sure Oracle Database and the required database service are running.

The application uses the configured Oracle database connection from:

backend/src/main/resources/application.properties

> The actual database credentials are intentionally not included in this repository.


### 2. Start the Backend

Open the `backend` folder in Eclipse.

Run:

CustomermasterApplication.java

The Spring Boot backend runs on:

http://localhost:8080


### 3. Start the Frontend

Open the `frontend` folder in Visual Studio Code.

Open:

index.html

Run it using VS Code Live Server.

The frontend communicates with the backend running on port `8080`.


## 🧪 API Testing

REST APIs were tested using Postman.

The following operations were tested:

- GET customers
- GET customer by ID
- POST customer
- PUT customer
- DELETE customer
- GET statistics
- GET activity history

The application was also tested through the frontend with the connected Oracle Database.


## 🛡️ Security & Configuration

Database credentials and other sensitive configuration values should not be committed to GitHub.

The following configuration file is excluded from version control:

backend/src/main/resources/application.properties

Sensitive information such as:

- Database username
- Database password
- Private credentials

should remain local.


## 🚀 Future Enhancements

Possible future improvements include:

- User authentication
- Role-based access control
- Advanced customer filtering
- Excel export
- PDF export
- Email notifications
- Docker support
- Cloud deployment
- Audit reports
- Advanced analytics


## 📸 Screenshots

Screenshots of the application can be added here to demonstrate:

- Dashboard
- Customer form
- Customer list
- Search functionality
- Activity history
- Statistics cards


## 🎯 Project Outcome

The Customer Master project demonstrates the development of a complete database-driven web application using a modern backend and frontend architecture.

It combines:

- Java
- Spring Boot
- REST APIs 
- Spring Data JPA
- Hibernate
- Oracle Database
- HTML
- CSS
- JavaScript

The project provides practical experience in backend development, database integration, API development and frontend-backend communication.


## 👨‍💻 Author

**Sadiya Mansoor Ansari**

B.Tech – Electronics & Communication Engineering

Aspiring Software Developer


## 📄 License

This project is created for educational and portfolio purposes.
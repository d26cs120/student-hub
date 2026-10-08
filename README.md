# StudentHub Portal

A responsive student portal developed using **HTML5, CSS3, JavaScript, Bootstrap 5, JSON, and Git/GitHub**.

StudentHub provides a centralized interface for students to access campus information and services such as events, notices, FAQs, student profiles, feedback, and contact services.

---

## 📌 Project Overview

**StudentHub** is a modern academic portal designed to bring commonly used student services into one place.

The current version is primarily a **client-side web application**. It uses JavaScript for UI interactions, form validation, theme switching, local storage, and dynamic rendering of JSON-based data.

### Main Objectives

* Provide a centralized student portal.
* Create a clean, modern, and responsive user interface.
* Provide easy navigation between different student services.
* Display dynamic student, event, notice, and FAQ information.
* Implement client-side form validation.
* Demonstrate practical use of HTML, CSS, JavaScript, Bootstrap, JSON, and Git.
* Build a project structure that can be extended into a full-stack application.

---

## ✨ Features

### 🏠 Home Page

* StudentHub branding and navigation.
* Hero section with portal introduction.
* Quick access to major student services.
* Notification/announcement section.
* Responsive navigation.
* Light/Dark theme switcher.

### 🔐 Login

* Student login interface.
* Form handling and validation.
* Client-side demo authentication behaviour.

### 📝 Registration

* Student registration form.
* Full name validation.
* Email validation.
* Mobile number validation.
* Course and academic year selection.
* Gender selection.
* Terms & Conditions validation.
* Password confirmation.
* Password strength indicator.
* Real-time validation feedback.

### 📊 Dashboard

* Student dashboard interface.
* Student-related information.
* Quick access to important portal sections.
* Interactive UI components.

### 👨‍🎓 Student Directory

* Student information loaded dynamically from `students.json`.
* Dynamic rendering using JavaScript.
* Search/filter functionality.
* Responsive student cards/layout.

### 📅 Events

* Events loaded dynamically from `events.json`.
* JavaScript-based dynamic rendering.
* Responsive event cards.
* Event information displayed in an organized format.

### 📢 Notices

* Notices loaded dynamically from `notices.json`.
* Dynamic rendering using JavaScript.
* Suitable for academic and campus announcements.

### ❓ FAQ

* Frequently Asked Questions section.
* Interactive FAQ components.
* FAQ data loaded dynamically from JSON.

### 👤 Profile

* Student profile interface.
* Profile information display.
* Client-side interaction and local storage support.

### 💬 Feedback

* Feedback form.
* Client-side validation.
* Success/error feedback messages.

### 📧 Contact

* Contact form.
* User input validation.
* Interactive form handling.

### 🛠️ Admin Panel

* Admin interface for managing/viewing portal information.
* Designed as a foundation for future backend integration.

### 🎨 Theme Switcher

* Light and dark theme support.
* Theme preference stored using `localStorage`.
* Theme remains available after page reload.

### 📱 Responsive Design

* Desktop responsive layout.
* Tablet responsive layout.
* Mobile responsive layout.
* Bootstrap grid system.
* Custom CSS media queries.

---

## 🧰 Technologies Used

| Technology            | Purpose                                                            |
| --------------------- | ------------------------------------------------------------------ |
| **HTML5**             | Page structure and semantic markup                                 |
| **CSS3**              | Styling, layouts, animations, and responsiveness                   |
| **JavaScript (ES6+)** | Interactivity, validation, DOM manipulation, and dynamic rendering |
| **Bootstrap 5.3**     | Responsive layouts and UI components                               |
| **Bootstrap Icons**   | Interface icons                                                    |
| **JSON**              | Static data storage                                                |
| **Fetch API**         | Loading JSON data dynamically                                      |
| **LocalStorage**      | Client-side data and theme persistence                             |
| **Git**               | Version control                                                    |
| **GitHub**            | Source code hosting                                                |

---

## 📂 Project Structure

```text
Student Hub/
│
├── index.html
├── README.md
│
├── assets/
│   ├── icons/
│   └── images/
│
├── css/
│   ├── about.css
│   ├── admin.css
│   ├── contact.css
│   ├── dashboard.css
│   ├── events.css
│   ├── faq.css
│   ├── feedback.css
│   ├── index.css
│   ├── login.css
│   ├── profile.css
│   └── register.css
│
├── data/
│   ├── events.json
│   ├── faqs.json
│   ├── notices.json
│   └── students.json
│
├── js/
│   ├── about.js
│   ├── admin.js
│   ├── contact.js
│   ├── dashboard.js
│   ├── events.js
│   ├── faq.js
│   ├── feedback.js
│   ├── index.js
│   ├── login.js
│   ├── notices.js
│   ├── profile.js
│   ├── register.js
│   └── students.js
│
└── pages/
    ├── about.html
    ├── admin.html
    ├── contact.html
    ├── dashboard.html
    ├── events.html
    ├── faq.html
    ├── feedback.html
    ├── login.html
    ├── profile.html
    └── register.html
```

---

## 📄 JSON Data Files

The project uses JSON files as lightweight data sources.

### `students.json`

Stores student directory information that is dynamically loaded and displayed on the Student Directory page.

### `events.json`

Stores event information used by the Events page.

### `notices.json`

Stores academic and campus notices that are dynamically displayed.

### `faqs.json`

Stores frequently asked questions and their answers.

Using JSON keeps the data separate from the HTML and makes the project easier to maintain and update.

---

## 🔄 Fetch API & Dynamic Rendering

The project uses the **JavaScript Fetch API** to retrieve JSON data.

The general flow is:

```text
JSON File
    ↓
Fetch API
    ↓
JavaScript
    ↓
DOM Manipulation
    ↓
Dynamic HTML Rendering
    ↓
User Interface
```

This approach allows information such as students, events, notices, and FAQs to be updated without manually modifying the HTML structure.

---

## 📝 Form Validation

The registration and other forms include client-side validation.

### Registration Validation

* Required field validation.
* Name validation.
* Email validation.
* Mobile number validation.
* Password validation.
* Confirm password matching.
* Course selection validation.
* Academic year validation.
* Gender selection validation.
* Terms & Conditions validation.
* Real-time validation feedback.

### Password Requirements

The password validation can require:

* Minimum 8 characters.
* At least one uppercase letter.
* At least one lowercase letter.
* At least one number.
* At least one special character.

---

## 🎨 Theme Switcher

StudentHub includes a Light/Dark theme switcher.

The selected theme is stored using:

```javascript
localStorage
```

This allows the user's selected theme to remain available after refreshing or reopening the page.

---

## 📱 Responsive Design

The website is designed to work across different screen sizes:

* 💻 Desktop
* 💻 Laptop
* 📱 Tablet
* 📱 Mobile

Responsive design is implemented using:

* Bootstrap grid system.
* Bootstrap responsive utilities.
* CSS media queries.
* Flexible layouts.
* Responsive cards and navigation.

---

## 🎯 UI/UX Design

The project focuses on:

* Clean and modern academic portal design.
* Consistent navigation.
* Responsive layouts.
* Clear form validation messages.
* Consistent typography and spacing.
* Interactive components.
* Light/Dark mode.
* User-friendly navigation.
* Mobile-friendly interface.

---

## ⚙️ How to Run the Project

### Method 1 — VS Code Live Server

1. Clone or download the repository.
2. Open the project folder in **Visual Studio Code**.
3. Install the **Live Server** extension.
4. Open `index.html`.
5. Right-click on the file.
6. Select **Open with Live Server**.

Using a local server is recommended because the project uses the Fetch API to load JSON files.

### Method 2 — Python HTTP Server

If Python is installed, run:

```bash
cd "Student Hub"
python -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

---

## 🧪 Testing

The project can be tested for:

### Functional Testing

* Navigation links.
* Registration form.
* Login form.
* Form validation.
* Theme switching.
* JSON data loading.
* Dynamic rendering.
* FAQ interaction.
* Event display.
* Notice display.
* Student directory display.

### Responsive Testing

The interface should be checked on:

* Desktop.
* Tablet.
* Mobile.

### Browser Testing

The project can be tested using modern browsers such as:

* Google Chrome
* Microsoft Edge
* Mozilla Firefox

---

## 🔒 Current Limitations

The current version is mainly a **front-end academic project**.

It does not currently provide:

* Real database authentication.
* Secure server-side authentication.
* Server-side form validation.
* Secure password hashing.
* Production-level role-based authorization.
* Permanent server-side student records.
* Real-time backend communication.
* Production deployment infrastructure.

JSON files and `localStorage` are used for demonstration and client-side functionality.

---

## 🚀 Future Scope

StudentHub can be extended into a complete full-stack student management platform.

### Backend

* Python Flask / Node.js backend.
* REST API integration.
* SQL Server / MySQL / PostgreSQL database.
* Server-side validation.
* Secure authentication.
* Password hashing.

### Student Features

* Attendance management.
* Academic performance tracking.
* Assignment submission.
* Course management.
* Timetable management.
* Exam schedule.
* Digital notices.
* Student notifications.

### Admin Features

* Student CRUD operations.
* Event management.
* Notice management.
* FAQ management.
* User management.
* Dashboard analytics.

### Advanced Features

* Role-based access control.
* Real-time notifications.
* Student communication.
* File/document uploads.
* Email notifications.
* Cloud deployment.
* AI-powered student assistance.

---

## 🔧 Development Practices

The project follows a modular front-end structure:

* HTML files are organized inside `pages/`.
* CSS files are separated according to pages/modules.
* JavaScript files are separated according to functionality.
* JSON data is stored inside `data/`.
* Images and icons are organized inside `assets/`.
* Git is used for version control.
* GitHub is used for remote source-code hosting.

---

## 📚 Academic Concepts Demonstrated

This project demonstrates practical knowledge of:

* HTML5
* CSS3
* Responsive Web Design
* JavaScript
* DOM Manipulation
* Event Handling
* Form Validation
* Fetch API
* JSON
* LocalStorage
* Bootstrap
* CSS Media Queries
* Git
* GitHub

---

## 📌 Academic Project

StudentHub is developed as part of a **Web Designing Frameworks / Web Development practical project**.

The project demonstrates how modern front-end technologies can be combined to create a responsive and interactive student portal.

---

## 👨‍💻 Author

**StudentHub Semester Project**

Developed for academic and educational purposes.

---

## 📜 License

This project is intended for **educational and academic use**.

You may modify and extend the project for learning and demonstration purposes.

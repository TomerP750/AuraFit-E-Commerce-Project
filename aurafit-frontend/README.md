# AuraFit E-Commerce Project

A full-stack e-commerce application for fitness products, featuring a Spring Boot API backend and a modern React/TypeScript/Vite frontend.

---

## 📂 Repository Structure

- **AuraFit-BackEnd** — Spring Boot 3.4.5 REST & security API with JPA, JWT auth, MySQL, WebSocket support :contentReference[oaicite:0]{index=0}  
- **aurafit-frontend** — Vite-powered React 19 + TypeScript 5 SPA with Material UI, Tailwind CSS, Redux Toolkit, authentication flows, and cart management :contentReference[oaicite:1]{index=1}  

---

## 🚀 Features

- **User Authentication & Authorization**  
  – Signup/login with JWT (jjwt), Spring Security, BCrypt.  
- **Product Catalog**  
  – Browse, search, filter fitness products; dynamic loading via REST.  
- **Shopping Cart & Checkout**  
  – Add/remove items, update quantities, persist cart in local storage.  
- **Order Management**  
  – Place orders, view order history; backend order entities managed with Spring Data JPA.  
- **Admin Console (optional)**  
  – CRUD operations for products and categories.  
- **Responsive Design**  
  – Mobile-first layout with Tailwind CSS and MUI components.  
- **Animations & UX**  
  – Framer Motion transitions, toast notifications for actions.  

---

## 🛠 Tech Stack

| Layer     | Technologies                                                                                                                                                 |
|-----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Backend** | • Spring Boot 3.4.5<br>• Spring Security & BCrypt<br>• Spring Data JPA<br>• MySQL Connector/J<br>• jjwt-api/impl/jackson (0.11.5)<br>• Lombok<br>• Maven :contentReference[oaicite:2]{index=2} |
| **Frontend**| • React 19 & React DOM 19<br>• TypeScript 5<br>• Vite 6<br>• Material UI v7 (@mui/material)<br>• Tailwind CSS 4<br>• Redux Toolkit<br>• React Router DOM 7<br>• React Hook Form<br>• Axios, js-cookie, jwt-decode<br>• Framer Motion<br>• React Toastify<br>• ESLint & Prettier :contentReference[oaicite:3]{index=3} |

---

## 📥 Prerequisites

- **Java 17+** & **Maven 3+**  
- **Node.js 18+** & **npm 9+**  
- **MySQL 8+** (or compatible RDBMS)  


# 💳 PAYTM Clone

A full-stack **digital wallet and payment application** inspired by Paytm, built to understand real-world backend concepts such as authentication, wallet management, transactions, and payment transfers.

## ✨ Features

* 🔐 **Authentication** — User signup, signin & JWT authentication
* 💰 **Wallet** — Deposit, withdraw & balance management
* 💸 **Payments** — Transfer money between users
* 📜 **Transactions** — Track wallet and payment transactions
* 🗄️ **Database** — Structured relational data using Prisma & PostgreSQL
* 🔒 **Protected APIs** — Authentication middleware for secure routes

## 🛠️ Tech Stack

* **Node.js**
* **Express.js**
* **Prisma ORM**
* **PostgreSQL / Neon**
* **JWT**
* **React**
* **Postman**
* **Git & GitHub**

## 📡 Core APIs

| Method | Endpoint                   | Purpose             |
| ------ | -------------------------- | ------------------- |
| `POST` | `/signup`                  | Create user         |
| `POST` | `/signin`                  | Authenticate user   |
| `POST` | `/wallet/deposit`          | Add money           |
| `POST` | `/wallet/withdraw`         | Withdraw money      |
| `GET`  | `/wallet/balance`          | Check balance       |
| `GET`  | `/wallet/transactions`     | Transaction history |
| `POST` | `/payments/transfer`       | Transfer money      |
| `GET`  | `/payments/:transactionId` | Get payment details |

## 🗄️ Database Design

```text
User
 │
 ▼
Wallet
 │
 ▼
Transaction
 │
 ▼
LedgerEntry
```

The wallet and transaction system is designed around **credits and debits**, providing a foundation for maintaining consistent financial records.

## ⚙️ Setup

```bash
git clone <YOUR_REPOSITORY_URL>
cd PAYTMCLONE-APP
npm install
```

Create `.env`:

```env
DATABASE_URL="your_database_url"
JWT_SECRET="your_secret"
```

Run Prisma:

```bash
npx prisma generate
npx prisma migrate dev
```

Start the application:

```bash
npm run dev
```

## 🚧 Future Improvements

* [ ] Payment gateway integration
* [ ] Redis for caching
* [ ] Transaction consistency & locking
* [ ] WebSocket notifications
* [ ] Automated tests
* [ ] Docker deployment

## 🎯 Goal

Built as a learning project to understand **secure authentication, wallet architecture, transaction systems, database design, and payment APIs** used in real-world financial applications.

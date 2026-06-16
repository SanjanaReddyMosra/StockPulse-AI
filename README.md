# StockPulse AI

AI-Powered Stock Market Analytics Platform for Indian NSE Stocks.

StockPulse AI combines real-time market data, technical analysis, sentiment analysis, machine learning predictions, and portfolio tracking into a modern fintech dashboard.

## Live Demo

Frontend:
https://stock-pulse-ai-website.vercel.app

Backend API:
https://stockpulse-ai-p2py.onrender.com

---

## Features

### Real-Time Market Dashboard

* Live NSE Stock Tracking
* Market Overview Dashboard
* Market Status Indicator
* Quick Stock Selection
* Auto Refresh System

### Technical Analysis

* RSI (Relative Strength Index)
* SMA20 Indicator
* SMA50 Indicator
* Daily Return Analysis
* Trend Detection (Bullish / Bearish)

### AI Trading Signals

* Buy Signals
* Sell Signals
* Hold Signals
* Confidence Score
* Risk Assessment
* AI Recommendation Engine

### Sentiment Analysis

* Financial News Analysis
* Positive / Negative / Neutral Sentiment
* Sentiment Score Calculation
* News-Based Market Insights

### Machine Learning Prediction

* Random Forest Prediction Model
* Next-Day Price Direction Prediction
* Confidence Estimation
* Historical Data Training

### Portfolio Management

* Portfolio Tracking
* Holdings Management
* Profit & Loss Calculation
* Local Storage Persistence

### Watchlist Management

* Add Stocks to Watchlist
* Remove Stocks from Watchlist
* Quick Access Monitoring
* Persistent Storage

### Interactive Visualization

* Stock Price Charts
* Historical Data Analysis
* Responsive Dashboard Components
* Modern Fintech User Interface

---

## Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* Recharts

### Backend

* FastAPI
* Python
* yFinance
* TA (Technical Analysis Library)
* TextBlob

### Machine Learning

* Scikit-Learn
* Random Forest Classifier
* Feature Engineering

### Deployment

* Vercel (Frontend)
* Render (Backend)

---

## Project Architecture

StockPulse-AI

├── frontend/

│   ├── src/

│   ├── components/

│   ├── api/

│   └── assets/

│

├── backend/

│   ├── services/

│   ├── main.py

│   ├── requirements.txt

│   └── .env

│

└── README.md

---

## API Endpoints

### Stock Data

GET /stock/{symbol}

### Market Stocks

GET /stocks

### News

GET /news/{symbol}

### Sentiment

GET /sentiment/{symbol}

### Prediction

GET /predict/{symbol}

### Recommendation

GET /recommendation/{symbol}

### Historical Data

GET /history/{symbol}

---

## Key Highlights

* Full Stack Fintech Application
* Real-Time Stock Analytics
* Machine Learning Integration
* Sentiment Analysis Engine
* Portfolio Management System
* Production Deployment
* Responsive Modern UI

---

## Future Enhancements

### Phase 2

* User Authentication
* MongoDB Database Integration
* Portfolio Performance Analytics
* Price Alerts & Notifications
* Advanced Candlestick Patterns
* AI Chat Assistant for Stocks
* Stock Comparison Engine
* PDF Portfolio Reports

---

## Author

Sanjana Reddy

Full Stack Development | Machine Learning | FinTech

Built with React, FastAPI, Python, Machine Learning, and Financial Data Analytics.

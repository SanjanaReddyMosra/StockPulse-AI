from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import yfinance as yf
import requests
import os

from ta.momentum import RSIIndicator
from ta.trend import SMAIndicator

from dotenv import load_dotenv
load_dotenv()

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "StockPulse AI Backend Running"
    }


@app.get("/stock/{symbol}")
def stock(symbol: str):

    try:

        ticker = yf.Ticker(f"{symbol}.NS")

        hist = ticker.history(
            period="3mo",
            interval="1d"
        )

        if hist.empty:
            return {
                "error": "Stock not found"
            }

        latest_price = round(
            hist["Close"].iloc[-1],
            2
        )

        open_price = round(
            hist["Open"].iloc[-1],
            2
        )

        high_price = round(
            hist["High"].iloc[-1],
            2
        )

        low_price = round(
            hist["Low"].iloc[-1],
            2
        )

        volume = int(
            hist["Volume"].iloc[-1]
        )

        # RSI

        rsi_indicator = RSIIndicator(
            close=hist["Close"],
            window=14
        )

        rsi = round(
            rsi_indicator.rsi().iloc[-1],
            2
        )

        # SMA20

        sma20_indicator = SMAIndicator(
            close=hist["Close"],
            window=20
        )

        sma20 = round(
            sma20_indicator.sma_indicator().iloc[-1],
            2
        )

        # SMA50

        sma50_indicator = SMAIndicator(
            close=hist["Close"],
            window=50
        )

        sma50 = round(
            sma50_indicator.sma_indicator().iloc[-1],
            2
        )

        # Trend

        trend = (
            "Bullish"
            if sma20 > sma50
            else "Bearish"
        )

        
        change = round(
            latest_price - open_price,
            2
        )

        percent = round(
            (change / open_price) * 100,
            2
        )

        return {
            "symbol": symbol.upper(),
            "price": latest_price,
            "open": open_price,
            "high": high_price,
            "low": low_price,
            "volume": volume,
            "change": change,
            "percent": percent,
            "rsi": rsi,
            "sma20": sma20,
            "sma50": sma50,
            "trend": trend
        }

    except Exception as e:

        return {
            "error": str(e)
        }

@app.get("/news/{symbol}")
def get_news(symbol: str):

    API_KEY = os.getenv("NEWS_API_KEY")

    url = (
        f"https://newsapi.org/v2/everything?"
        f"q={symbol} NSE"
        f"&language=en"
        f"&sortBy=publishedAt"
        f"&pageSize=5"
        f"&apiKey={API_KEY}"
    )

    response = requests.get(url)

    data = response.json()

    articles = []

    for article in data.get("articles", []):

        title = article.get("title", "")

        sentiment = "Neutral"

        positive_words = [
            "gain",
            "growth",
            "profit",
            "surge",
            "bullish",
            "rise",
            "recover",
            "rebound",
            "up",
            "strong",
            "jump",
            "rally"
        ]

        negative_words = [
            "loss",
            "drop",
            "fall",
            "bearish",
            "decline",
            "crash",
            "slump",
            "weak",
            "selloff",
            "bleeds",
            "rout",
            "plunge"
        ]

        if any(
            word in title.lower()
            for word in positive_words
        ):
            sentiment = "Positive"

        elif any(
            word in title.lower()
            for word in negative_words
        ):
            sentiment = "Negative"

        articles.append({
            "title": title,
            "source": article["source"]["name"],
            "url": article["url"],
            "sentiment": sentiment
        })

    return articles

@app.get("/stocks")
def get_stocks():

    stocks = [
        "TCS",
        "INFY",
        "RELIANCE",
        "SBIN",
        "HDFCBANK",
        "ICICIBANK",
        "LT",
        "ITC",
        "WIPRO",
        "AXISBANK",
        "KOTAKBANK",
        "BAJFINANCE",
        "MARUTI",
        "SUNPHARMA",
        "ULTRACEMCO",
        "TITAN",
        "POWERGRID",
        "NTPC",
        "ONGC",
        "TATAMOTORS"
    ]

    result = []

    for symbol in stocks:

        try:

            ticker = yf.Ticker(
                f"{symbol}.NS"
            )

            hist = ticker.history(
                period="1d",
                interval="1m"
            )

            if hist.empty:
                continue

            latest = round(
                hist["Close"].iloc[-1],
                2
            )

            open_price = round(
                hist["Open"].iloc[-1],
                2
            )

            percent = round(
                (
                    (latest - open_price)
                    / open_price
                ) * 100,
                2
            )

            result.append({
                "symbol": symbol,
                "price": latest,
                "percent": percent
            })

        except:
            pass

    return result
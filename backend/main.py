from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import yfinance as yf
import requests
import os

from dotenv import load_dotenv

from services.data_loader import get_history
from services.features import calculate_features
from services.sentiment import analyze_sentiment
from services.predictor import predict_stock

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

        features = calculate_features(hist)
        prediction_data = predict_stock(symbol)

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
            "rsi": features["rsi"],
            "sma20": features["sma20"],
            "sma50": features["sma50"],
            "daily_return": features["daily_return"],
            "trend": features["trend"],
            "prediction": prediction_data["prediction"],
            "confidence": prediction_data["confidence"]
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

        sentiment_data = analyze_sentiment(title)

        articles.append({
            "title": title,
            "source": article["source"]["name"],
            "url": article["url"],
            "sentiment": sentiment_data["label"],
            "score": sentiment_data["score"]
        })

    return articles

@app.get("/sentiment/{symbol}")
def sentiment_summary(symbol: str):

    news = get_news(symbol)

    if not news:
        return {
            "score": 0,
            "label": "Neutral"
        }

    total = sum(
        article["score"]
        for article in news
    )

    average = round(
        total / len(news),
        2
    )

    if average > 0:
        label = "Positive"

    elif average < 0:
        label = "Negative"

    else:
        label = "Neutral"

    return {
        "symbol": symbol.upper(),
        "score": average,
        "label": label
    }

@app.get("/predict/{symbol}")
def predict(symbol: str):

    result = predict_stock(symbol)

    if not result:
        return {
            "error": "Prediction unavailable"
        }

    return result

@app.get("/history/{symbol}")
def history(symbol: str):

    ticker = f"{symbol.upper()}.NS"

    data = get_history(ticker)

    if not data:
        return {
            "error": "No historical data found"
        }

    return {
        "stock": symbol.upper(),
        "days": len(data),
        "history": data
    }


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
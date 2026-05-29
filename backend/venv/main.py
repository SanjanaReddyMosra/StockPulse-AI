from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import yfinance as yf

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
            period="1d",
            interval="1m"
        )

        latest_price = round(
            hist["Close"].iloc[-1], 2
        )

        open_price = round(
            hist["Open"].iloc[-1], 2
        )

        high_price = round(
            hist["High"].iloc[-1], 2
        )

        low_price = round(
            hist["Low"].iloc[-1], 2
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
            "percent": percent
        }

    except:
        return {
            "error": "Stock not found"
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

            ticker = yf.Ticker(f"{symbol}.NS")

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
                ((latest - open_price) /
                 open_price) * 100,
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
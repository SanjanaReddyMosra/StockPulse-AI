import yfinance as yf
import pandas as pd

from ta.momentum import RSIIndicator
from ta.trend import SMAIndicator

from sklearn.ensemble import RandomForestClassifier


def predict_stock(symbol):

    ticker = yf.Ticker(f"{symbol}.NS")

    df = ticker.history(period="1y")

    if len(df) < 60:
        return None

    df["RSI"] = RSIIndicator(
        close=df["Close"],
        window=14
    ).rsi()

    df["SMA20"] = SMAIndicator(
        close=df["Close"],
        window=20
    ).sma_indicator()

    df["SMA50"] = SMAIndicator(
        close=df["Close"],
        window=50
    ).sma_indicator()

    df["Return"] = (
        df["Close"].pct_change()
    )

    df["Target"] = (
        df["Close"].shift(-1)
        > df["Close"]
    ).astype(int)

    df.dropna(inplace=True)

    features = [
        "RSI",
        "SMA20",
        "SMA50",
        "Return",
        "Volume"
    ]

    X = df[features]
    y = df["Target"]

    model = RandomForestClassifier(
        n_estimators=100,
        random_state=42
    )

    model.fit(X, y)

    latest = X.iloc[-1:]

    prediction = model.predict(latest)[0]

    confidence = round(
        max(
            model.predict_proba(latest)[0]
        ) * 100,
        2
    )

    return {
        "prediction": (
            "UP"
            if prediction == 1
            else "DOWN"
        ),
        "confidence": confidence
    }

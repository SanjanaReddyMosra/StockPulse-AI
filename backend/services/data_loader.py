# backend/services/data_loader.py

import yfinance as yf
import pandas as pd

def get_history(symbol):
    try:
        ticker = yf.Ticker(symbol)

        df = ticker.history(period="1y")

        if df.empty:
            return None

        df.reset_index(inplace=True)

        history = []

        for _, row in df.iterrows():
            history.append({
                "date": row["Date"].strftime("%Y-%m-%d"),
                "open": round(float(row["Open"]), 2),
                "high": round(float(row["High"]), 2),
                "low": round(float(row["Low"]), 2),
                "close": round(float(row["Close"]), 2),
                "volume": int(row["Volume"])
            })

        return history

    except Exception as e:
        print("Error:", e)
        return None
    
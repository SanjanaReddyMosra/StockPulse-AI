from ta.momentum import RSIIndicator
from ta.trend import SMAIndicator


def calculate_features(df):

    rsi = round(
        RSIIndicator(
            close=df["Close"],
            window=14
        ).rsi().iloc[-1],
        2
    )

    sma20 = round(
        SMAIndicator(
            close=df["Close"],
            window=20
        ).sma_indicator().iloc[-1],
        2
    )

    sma50 = round(
        SMAIndicator(
            close=df["Close"],
            window=50
        ).sma_indicator().iloc[-1],
        2
    )

    latest_close = df["Close"].iloc[-1]
    previous_close = df["Close"].iloc[-2]

    daily_return = round(
        ((latest_close - previous_close) / previous_close) * 100,
        2
    )

    trend = "Bullish" if sma20 > sma50 else "Bearish"

    return {
        "rsi": rsi,
        "sma20": sma20,
        "sma50": sma50,
        "daily_return": daily_return,
        "trend": trend
    }

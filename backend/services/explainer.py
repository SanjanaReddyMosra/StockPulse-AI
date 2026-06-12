def generate_explanation(stock):

    reasons = []

    if stock["rsi"] < 30:
        reasons.append(
            "RSI indicates oversold conditions"
        )

    if stock["trend"] == "Bullish":
        reasons.append(
            "Bullish trend detected"
        )

    if stock["daily_return"] > 0:
        reasons.append(
            "Positive price momentum"
        )

    return reasons
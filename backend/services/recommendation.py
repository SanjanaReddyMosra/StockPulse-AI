from services.predictor import predict_stock


def get_recommendation(
    symbol,
    sentiment_score
):

    prediction_data = predict_stock(symbol)

    if not prediction_data:
        return None

    prediction = prediction_data["prediction"]
    confidence = prediction_data["confidence"]

    # Strong Buy

    if (
        prediction == "UP"
        and confidence >= 80
        and sentiment_score > 0.25
    ):
        recommendation = "STRONG BUY"

    # Buy

    elif (
        prediction == "UP"
        and confidence >= 65
        and sentiment_score > 0
    ):
        recommendation = "BUY"

    # Strong Sell

    elif (
        prediction == "DOWN"
        and confidence >= 80
        and sentiment_score < -0.25
    ):
        recommendation = "STRONG SELL"

    # Sell

    elif (
        prediction == "DOWN"
        and confidence >= 65
        and sentiment_score < 0
    ):
        recommendation = "SELL"

    else:
        recommendation = "HOLD"

    return {
        "prediction": prediction,
        "confidence": confidence,
        "recommendation": recommendation
    }

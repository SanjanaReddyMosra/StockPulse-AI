from services.predictor import predict_stock


def get_recommendation(symbol, sentiment_score):

    prediction_data = predict_stock(symbol)

    if not prediction_data:
        return None

    prediction = prediction_data["prediction"]
    confidence = prediction_data["confidence"]

    if (
        prediction == "UP"
        and confidence >= 70
        and sentiment_score > 0
    ):
        recommendation = "BUY"

    elif (
        prediction == "DOWN"
        and confidence >= 70
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
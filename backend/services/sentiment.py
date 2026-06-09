from textblob import TextBlob


def analyze_sentiment(text):

    polarity = TextBlob(text).sentiment.polarity

    if polarity > 0:
        label = "Positive"

    elif polarity < 0:
        label = "Negative"

    else:
        label = "Neutral"

    return {
        "score": round(polarity, 2),
        "label": label
    }
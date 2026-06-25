from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)

db = client["stockpulse"]

watchlists = db["watchlists"]
portfolios = db["portfolios"]
users = db["users"]
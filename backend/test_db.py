from database import watchlists
from database import portfolios

watchlists.insert_one({
    "test": "watchlist"
})

portfolios.insert_one({
    "test": "portfolio"
})

print("Collections Created")
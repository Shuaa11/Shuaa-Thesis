import datetime
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from logic import get_date_prediction

# opening the BTC Historical data
trade = {"Dollars": 1000.0, "BTC_Balance": 0.0, "BTC_USD": 0.0}
btc_data = pd.read_csv('resources/BTC-USD2.csv')

# Opening the Bitcoin historical data for the candlestick
btc_usd = pd.read_csv('resources/BTC-USD2.csv', usecols=["Date", "Open", "High", "Low", "Close"])
btc_usd_df = pd.DataFrame(btc_usd)

# Opening the Ethereum historical data for the candlestick
eth_usd = pd.read_csv('resources/ETH-USD.csv', usecols=["Date", "Open", "High", "Low", "Close"])
eth_usd_df = pd.DataFrame(eth_usd)

# Reading news
news = pd.read_pickle("resources/news.txt")
app = Flask(__name__)
CORS(app)

# Trade history
x = {}
trades = []



@app.route('/predictNLTK', methods=["POST"])
def predictNLTK():
    date = request.json
    if get_date_prediction(date["date"],"NLTK") == "":
        return {"info":""}
    perform_trade(get_date_prediction(date["date"],"NLTK"), btc_price_today(date["date"]))
    global x
    x = {"result": get_date_prediction(date["date"],"NLTK"),
         "price": btc_price_today(date["date"]),
         "usd_balance": trade["Dollars"],
         "btc_balance": trade["BTC_Balance"],
         "today_date": date["date"]}

    trades.insert(0, x)
    return x

@app.route('/predictSPACY', methods=["POST"])
def predictSPACY():
    date = request.json
    if get_date_prediction(date["date"],"SPACY") == "":
        return {"info":""}
    perform_trade(get_date_prediction(date["date"],"SPACY"), btc_price_today(date["date"]))
    global x
    x = {"result":get_date_prediction(date["date"],"SPACY"),
         "price": btc_price_today(date["date"]),
         "usd_balance": trade["Dollars"],
         "btc_balance": trade["BTC_Balance"],
         "today_date": date["date"]}

    trades.insert(0, x)
    return x


@app.route('/performance')
def performance():
    bought = 0
    result ={"money_bot_made":0, "money_trader_made":0}
    bought = 1000/trades[-1]["price"]
    if trades[0]["btc_balance"] ==0:
         result["money_bot_made"] = trades[0]["usd_balance"]
    else:
        result["money_bot_made"] = trades[0]["btc_balance"] * trades[0]["price"]
    result["money_trader_made"] = bought * trades[0]["price"]
    return ""

@app.route('/tradeLog')
def tradeLog():
    return jsonify(trades)


@app.route('/resetbalance')
def reset_balance():
    x={}
    trades.clear()
    trade["BTC_USD"]=0.0
    trade["Dollars"]=1000.0
    trade["BTC_Balance"] =0.0
    return ""


@app.route('/getTrade')
def get_trade():
    if len(trades) == 0:
        return ""
    else:
        return x
def btc_price_today(date):
     date =datetime.datetime.strptime(date, "%b %d, %Y").strftime("%Y-%m-%d")
     indexes=btc_data.index[btc_data['Date'] ==date].tolist()
     return btc_data['Open'].iloc[indexes].tolist()[0]


def perform_trade(action,price):
    if action == "BUY":
        if trade["Dollars"] != 0:
            trade["BTC_Balance"] = trade["Dollars"]/price
            trade["Dollars"] =0.0
    elif action == "SELL":
        if trade["BTC_Balance"] != 0:
            trade["Dollars"] = trade["BTC_Balance"]*price
            trade["BTC_Balance"] =0.0

@app.route('/bitcoin_candlestick')
def btc_candlestick():
  return btc_usd_df.to_json(orient='records')

@app.route('/etherum_candlestick')
def eth_candlestick():
  return eth_usd_df.to_json(orient='records')

@app.route('/getNews')
def getNews():
    return news.to_json(orient='records')


# Running app
if __name__ == '__main__':
    # Runs the app on the public IP
    app.run(host='0.0.0.0')

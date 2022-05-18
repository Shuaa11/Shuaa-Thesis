import datetime
import json
import time
import pandas as pd
from binance import Client
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib


#
# client = Client("KonFtpiFoP6v0TuoxrdiRPiKYt9FWFcW6ZBECkwO0Dynn1nBpRtzMujTY3Tk4rTJ", "fp3AlXJ4JdTDTViRAUIkkHxZZDyhLKWrwZ7zPWLwUXwboR7ukK8WKlcp5H7iR8Iz", testnet=True)



import numpy as np
# import NLP_bot
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
# news = pd.read_csv('Crypto-News-Data2.csv', usecols=["Date","Title"])
app = Flask(__name__)
CORS(app)
x = {}
trades = []



@app.route('/predictNLTK', methods=["POST"])
def predictNLTK():
    print("NLTK")
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
    result ={"bought" :0, "sell":0, "final_trade":0}
    result["bought"] = trades[-1]["usd_balance"]/trades[-1]["price"]
    if trades[0]["btc_balance"] ==0:
         result["final_trade"] = trades[0]["usd_balance"]
    else:
        result["final_trade"] = trades[0]["btc_balance"] * trades[0]["price"]
    result["sell"] = result["bought"] * trades[0]["price"]
    return result

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



#
# # First get ETH price
# eth_price = client.get_symbol_ticker(symbol="BTCUSDT")
# print(eth_price)
# # Calculate how much ETH $200 can buy
# buy_quantity = round(1000 / float(eth_price['price']), 5)
# # Create test order
# print(buy_quantity)
# info = client.get_account()
#
#
# order = client.create_order(
#         symbol='BTCUSDT',
#         side=Client.SIDE_SELL,
#         type=Client.ORDER_TYPE_MARKET,
#         quantity=balance['free'],
#     )
# trades = client.get_my_trades(symbol="BTCUSDT")
# print(trades)
# order2 = client.get_order(
#     symbol='ETHUSDT',
#     orderId=)
#

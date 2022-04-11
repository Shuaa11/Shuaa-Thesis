import datetime
import json
import time
import pandas as pd
from flask import Flask, request
from flask_cors import CORS
import joblib


import numpy as np
# import NLP_bot
from logic import get_date_prediction_NLTK
from logic2 import get_date_prediction_Spacy

# opening the BTC Historical data
trade={"Dollars": 1000.0, "BTC_Balance":0.0, "BTC_USD":0.0}
btc_data = pd.read_csv('BTC-USD2.csv')

# Opening the historical data for the candlestick
btc_usd = pd.read_csv('BTC-USD2.csv',usecols=["Date","Open","High","Low","Close"])
btc_usd_df = pd.DataFrame(btc_usd)

# Reading news

news = pd.read_pickle("news.txt")
# news = pd.read_csv('Crypto-News-Data2.csv', usecols=["Date","Title"])
app = Flask(__name__)
CORS(app)
x={}

@app.route('/predict',methods=["POST"])
def predictNLTK():
    date = request.json
    perform_trade(get_date_prediction_Spacy(date["date"]),btc_price_today(date["date"]))
    global x
    x = {"result": get_date_prediction_Spacy(date["date"]),
          "price":btc_price_today(date["date"]),
            "usd_balance": trade["Dollars"],
            "btc_balance": trade["BTC_Balance"],
            "today_date": date["date"]}
    return x

@app.route('/tradeLog')
def tradeLog():
    return x


@app.route('/resetbalance')
def reset_balance():
    trade["BTC_USD"]=0.0
    trade["Dollars"]=1000.0
    trade["BTC_Balance"] =0.0
    print("Reset balance called")
    return ""

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

@app.route('/btc_candlestick')
def btc_candlestick():
  return btc_usd_df.to_json(orient='records')

@app.route('/getNews')
def getNews():
    return news.to_json(orient='records')


# Running app
if __name__ == '__main__':
    app.run(debug=True)



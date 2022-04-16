

# Opening JSON file
import json
import ast
import time

import pandas as pd
import numpy as np
news = pd.read_pickle("frame.txt")
# print(df)

f = open('predict.json')
data = json.load(f)
data = data[1:-1]
pred2 = np.array(ast.literal_eval(data), dtype=str)

# print(len(pred2))
# print(news.head())

def get_date_prediction_NLTK(date: str) -> str:
    results = []
    newdate1 = time.strptime(date, "%b %d, %Y")
    newdate2 = time.strptime(news.iloc[0, 0], "%b %d, %Y")
    if newdate1 > newdate2:
        return ""
    indexes = news.index[news['Date'] == date].tolist()
    if len(indexes) == 0:
        return "HOLD"
    for index in indexes:
        results.append(pred2[index])
    p_count = results.count("Positive")
    n_count = results.count("Negative")

    if p_count > n_count:
        return "BUY"
    elif n_count > p_count:
        return "SELL"
    elif n_count ==  p_count:
        return "HOLD"


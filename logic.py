

# Opening JSON file
import json
import ast
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
    indexes = news.index[news['Date'] == date].tolist()
    if indexes[-1] >= len(pred2):
        return ""
    for index in indexes:
        results.append(pred2[index])
    p_count = results.count("Positive")
    n_count = results.count("Negative")
    if len(indexes) == 0:
        return "Error parsing date" + date
    if p_count > n_count:
        return "BUY"
    elif n_count > p_count:
        return "SELL"
    elif n_count ==  p_count:
        return "HOLD"


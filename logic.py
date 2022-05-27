
# Opening JSON file
import json
import ast
import time

import pandas as pd
import numpy as np
news = pd.read_pickle("resources/news.txt")
# print(df)

f_nltk = open('resources/predict.json')
f_spacy = open('resources/predict-2.json')
data_nltk = json.load(f_nltk)
data_nltk = data_nltk[1:-1]
pred_nltk = np.array(ast.literal_eval(data_nltk), dtype=str)

data_spacy = json.load(f_spacy)
data_spacy = data_spacy[1:-1]
pred_spacy = np.array(ast.literal_eval(data_spacy), dtype=str)

# print(len(pred2))
# print(news.head())

def get_date_prediction(date: str, algorithm :str) -> str:
    predictor = None
    if algorithm == "NLTK":
        predictor = pred_nltk
    if algorithm == "SPACY":
        predictor = pred_spacy
    results = []
    newdate1 = time.strptime(date, "%b %d, %Y")
    newdate2 = time.strptime(news.iloc[0, 0], "%b %d, %Y")
    if newdate1 > newdate2:
        return ""
    indexes = news.index[news['Date'] == date].tolist()
    if len(indexes) == 0:
        return "HOLD"
    for index in indexes:
        results.append(predictor[index])
    p_count = results.count("Positive")
    n_count = results.count("Negative")

    if p_count > n_count:
        return "BUY"
    elif n_count > p_count:
        return "SELL"
    elif n_count ==  p_count:
        return "HOLD"

# Importing all the required libraries
import pandas as pd
import datetime
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.utils import shuffle
news = pd.read_csv('Crypto-News-Data.csv')
data = pd.read_csv('BTC-Historical.csv')

news['Change'] = pd.Series(dtype='object')

area_dict = dict(zip(data['Date'], data['Change %']))
# print(area_dict)
# Adding the Change column in the dataset
for ind in news.index:
    date1= datetime.datetime.strptime(news['Date'][ind], "%b %d, %Y")
    date1 += datetime.timedelta(days=1)
    date2= date1.strftime("%b %d, %Y")
    news['Change'][ind]=area_dict.get(date2)

print(news.shape)
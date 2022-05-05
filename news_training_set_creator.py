# Importing the required libraries
import json

import pandas as pd
import datetime


class NewsTrainingSetCreator:
    def __init__(self):
        self.remove_text()
        self.create_change_column()
        self.label_data()
        self.write_generated_news_file_to_text()

    news = pd.read_csv('resources/Crypto-News-Data2.csv')
    bitcoin_historical_data = pd.read_csv('resources/BTC-USD2.csv')
    bitcoin_historical_data = bitcoin_historical_data[::-1].reset_index(drop=True)
    data_dict = {}

    def remove_text(self):
        # Removing the text after Image credits
        for ind in self.news.index:
            text = self.news['Info'][ind]
            head, sep, tail = text.partition('Image Credits: Shutterstock')
            self.news['Info'][ind] = head

    def create_change_column(self):
        self.bitcoin_historical_data['Change'] = pd.Series(dtype='object')
        self.news['Change'] = pd.Series(dtype='object')

        for ind in self.bitcoin_historical_data.index:
            if ind == len(self.bitcoin_historical_data) - 1:
                self.bitcoin_historical_data['Change'][ind] = str(0)
            else:
                change = ((self.bitcoin_historical_data['Close'][ind] - self.bitcoin_historical_data['Close'][
                    ind + 1]) / self.bitcoin_historical_data['Close'][
                              ind]) * 100
                self.bitcoin_historical_data['Change'][ind] = str(round(change, 2))
        self.data_dict = dict(zip(self.bitcoin_historical_data['Date'], self.bitcoin_historical_data['Change']))

    def label_data(self):
        for ind in self.news.index:
            date1 = datetime.datetime.strptime(self.news['Date'][ind], "%b %d, %Y")
            date1 += datetime.timedelta(days=1)
            date2 = date1.strftime("%Y-%m-%d")
            if self.data_dict.get(date2).startswith("-"):
                self.news['Change'][ind] = "Negative"
            else:
                self.news['Change'][ind] = "Positive"

    def write_generated_news_file_to_text(self):
        self.news[["Date", "Title", "Link", "Change"]].to_pickle("resources/news.txt")

    def return_generated_test_set(self):
        return self.news

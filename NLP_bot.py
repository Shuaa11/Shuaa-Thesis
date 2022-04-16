# Importing the required libraries
import json

import pandas as pd
import datetime
import random
from nltk.corpus import stopwords
from sklearn import metrics
from sklearn.naive_bayes import GaussianNB
from sklearn.feature_extraction.text import CountVectorizer
import re
from nltk.stem import WordNetLemmatizer
class NLP_Bot:

  news = pd.read_csv('Crypto-News-Data2.csv')
  btc_data = pd.read_csv('BTC-USD2.csv')
  btc_data = btc_data[::-1].reset_index(drop=True)

    def remove_text:
        # Removing the text after Image credits
        for ind in news.index:
            text = news['Info'][ind]
            head, sep, tail = text.partition('Image Credits: Shutterstock')
            self.news['Info'][ind] = head
            self.news['Info'][ind]


    def creating_change(self):
        self.btc_data['Change'] = pd.Series(dtype='object')
        self.news['Change'] = pd.Series(dtype='object')

        for ind in self.btc_data.index:
            if ind == len(btc_data) - 1:
                self.btc_data['Change'][ind] = str(0)
            else:
                change = ((self.btc_data['Close'][ind] - self.btc_data['Close'][ind + 1]) / self.btc_data['Close'][ind]) * 100
                self.btc_data['Change'][ind] = str(round(change, 2))
        self.area_dict = dict(zip(self.btc_data['Date'], self.btc_data['Change']))






# Labeling the Change
# Takes long
for ind in news.index:
    date1 = datetime.datetime.strptime(news['Date'][ind], "%b %d, %Y")
    date1 += datetime.timedelta(days=1)
    date2 = date1.strftime("%Y-%m-%d")
    if area_dict.get(date2).startswith("-"):
        news['Change'][ind] = "Negative"
    else:
        news['Change'][ind] = "Positive"

news2 = news[["Date","Title","Link","Change"]]

news2.to_pickle("frame.txt")

# Step 3 : Preprocessing the text
lemmatizer = WordNetLemmatizer()
words = stopwords.words("english")

news['processedtext'] = news['Info'].apply(lambda x: " ".join(
    [lemmatizer.lemmatize(i) for i in re.sub("[^a-zA-Z]", " ", x).split() if i not in words]).lower())

# Step 4: Creating the training and test datasets


acc = []

# print(words)
cv = CountVectorizer(max_features=1500)

X = cv.fit_transform(news['processedtext'])
X = X.toarray()
y = news['Change']

train_pct_index = int(0.2 * len(news))

X_train, X_test = X[train_pct_index:], X[:train_pct_index]
y_train, y_test = y[train_pct_index:], y[:train_pct_index]
# Y_test_dates=news['Date'][:train_pct_index].unique()



# print(len(news), "len news")
# print(len(y_test), "y test")
# print(len(X_test), "X test")
#     print(news.shape); print(X_train.shape); print(X_test.shape)

# Step 5 : Converting Text to Word Frequency Vectors with TfidfVectorizer

#     print(vectorizer_tfidf.get_feature_names()[:10])
#     print(train_tfIdf.shape); print(test_tfIdf.shape)

# Step 6: Create and Fit the Classifier.
nb_classifier = GaussianNB()

nb_classifier.fit(X_train, y_train)

pred2 = nb_classifier.predict(X_test)

# for i in range(pred2.shape[0]):
#     if pred2[i] == "Negative":
#         pred2[i] = "Positive"
#     else:
#         pred2[i] = "Negative"
#     print(pred2[:100])
# news2=news[:202]
# pred3=[]
# l=["Positive","Negative"]





# y_test2= []
#
# for i in Y_test_dates:
#     results2=[]
#     indexes = news2.index[news2['Date'] == i].tolist()
#
#     y_test2.append(y_test[indexes[0]])

# print(len(y_test2), " ", len(pred3))


# print(accuracy_tfidf)


# Serialization
json_str = json.dumps(pred2.tolist())
print(json_str)
with open('predict.json', 'w') as outfile:
    json.dump(json_str, outfile)
print(len(pred2))

# accuracy_tfidf=0
# for p in range(100):
#     s = random.random()
#     for j in range(1000):
#         random.seed(s)
#         for i in Y_test_dates:
#             results=[]
#             indexes = news2.index[news2['Date'] == i].tolist()
#             for k in indexes:
#                 results.append(pred2[k])
#             p_count = results.count("Positive")
#             n_count = results.count("Negative")
#             if p_count > n_count:
#                 pred3.append("Negative")
#             elif n_count > p_count:
#                 pred3.append("Positive")
#             elif n_count == p_count:
#                 pred3.append(random.choice(l))
#         accuracy_tfidf = accuracy_tfidf+ metrics.accuracy_score(y_test2, pred3)
#         pred3=[]
#
# print(accuracy_tfidf/10000)
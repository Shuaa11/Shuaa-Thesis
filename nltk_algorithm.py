import json
import re
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import GaussianNB

from news_training_set_creator import NewsTrainingSetCreator


class NLTKAlgorithm:
    def __init__(self):
        self.pred2 = None
        training_set_creator = NewsTrainingSetCreator()
        self.news = training_set_creator.return_generated_test_set()
        self.lemmatize_words()


    def lemmatize_words(self):
        lemmatizer = WordNetLemmatizer()
        words = stopwords.words("english")

        self.news['processedtext'] = self.news['Info'].apply(lambda x: " ".join(
            [lemmatizer.lemmatize(i) for i in re.sub("[^a-zA-Z]", " ", x).split() if i not in words]).lower())

    def generate_nltk_training_sets(self):
        cv = CountVectorizer(max_features=1500)

        X = cv.fit_transform(self.news['processedtext'])
        X = X.toarray()
        y = self.news['Change']

        train_pct_index = int(0.2 * len(self.news))

        X_train, X_test = X[train_pct_index:], X[:train_pct_index]
        y_train, y_test = y[train_pct_index:], y[:train_pct_index]

        return X_train, X_test, y_train, y_test

    def make_prediction(self,X_train,y_train,X_test):
        nb_classifier = GaussianNB()

        nb_classifier.fit(X_train, y_train)

        self.pred2 = nb_classifier.predict(X_test)

        # Serialization
    def serialize(self):
        json_str = json.dumps(self.pred2.tolist())

        with open('resources/predict.json', 'w') as outfile:
            json.dump(json_str, outfile)

    def make_prediction_and_serialize(self):
        X_train, X_test, y_train, y_test = self.generate_nltk_training_sets()
        self.make_prediction( X_train,y_train ,X_test)
        self.serialize()
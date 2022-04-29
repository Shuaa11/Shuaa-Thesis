import json
import string

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.pipeline import Pipeline
from sklearn.svm import LinearSVC

from news_training_set_creator import NewsTrainingSetCreator
import pandas as pd
import datetime
import spacy
from spacy.lang.en.stop_words import STOP_WORDS

pd.options.mode.chained_assignment = None
nlp = spacy.load('en_core_web_sm')
punct = string.punctuation


class SpacyAlgorithm:
    def __init__(self):
        self.stopwords = list(STOP_WORDS)

        self.y_pred = None
        training_set_creator = NewsTrainingSetCreator()
        self.news = training_set_creator.return_generated_test_set()



    def generate_spacy_training_sets(self):
        X = self.news['Info']
        y = self.news['Change']
        train_pct_index = int(0.2 * len(self.news))

        X_train, X_test = X[train_pct_index:], X[:train_pct_index]
        y_train, y_test = y[train_pct_index:], y[:train_pct_index]
        return X_train, X_test, y_train, y_test

    def make_prediction(self, X_train, y_train, X_test):
        def text_data_cleaning(sentence):
            doc = nlp(sentence)

            tokens = []
            for token in doc:
                if token.lemma_ != "-PRON-":
                    temp = token.lemma_.lower().strip()
                else:
                    temp = token.lower_
                tokens.append(temp)

            cleaned_tokens = []
            for token in tokens:
                if token not in self.stopwords and token not in punct:
                    cleaned_tokens.append(token)
            return cleaned_tokens
        tfidf = TfidfVectorizer(tokenizer=text_data_cleaning)
        classifier = LinearSVC()
        clf = Pipeline([('tfidf', tfidf), ('clf', classifier)])
        clf.fit(X_train, y_train)
        self.y_pred = clf.predict(X_test)

        # Serialization

    def serialize(self):
        json_str = json.dumps(self.y_pred.tolist())

        with open('resources/predict-2.json', 'w') as outfile:
            json.dump(json_str, outfile)

    def make_prediction_and_serialize(self):
        X_train, X_test, y_train, y_test = self.generate_spacy_training_sets()
        self.make_prediction(X_train, y_train, X_test)
        self.serialize()

import pandas as pd
import datetime
import spacy
from spacy.lang.en.stop_words import STOP_WORDS
pd.options.mode.chained_assignment = None
nlp = spacy.load('en_core_web_sm')
import re
from sklearn.svm import LinearSVC
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
import string
punct = string.punctuation
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

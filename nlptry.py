from nltk.tokenize import sent_tokenize, word_tokenize
import nltk

from nltk.corpus import stopwords
# For lemmetizing trying to find the lemme of a lexeme
from nltk.stem import WordNetLemmatizer
example_string="My name is Shuaa. I study in Hungary. I have a class today"
chicute=word_tokenize(example_string)
stop_words = set(stopwords.words("english"))
# Only the words that have made it past the filter will be stored in the filtered_list
filtered_list = []

filtered_list = [
    word for word in chicute if word.casefold() not in stop_words
]
lemmatizer = WordNetLemmatizer()
print(lemmatizer.lemmatize("scarves"))
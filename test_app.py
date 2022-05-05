import pytest

from app import reset_balance, trade
from logic import get_date_prediction


def test_reset_balance():
    trade["Dollars"] = 34234
    trade["BTC_USD"] = 34
    trade["BTC_Balance"] = 0.34
    reset_balance()
    assert trade["Dollars"] == 1000.0
    assert trade["BTC_USD"] == 0.0
    assert trade["BTC_Balance"] == 0.0


def test_false_get_prediction():
    assert get_date_prediction("Aug 21, 2022", "NLTK", ) == ""


def test_NLTK_get_prediction():
    assert get_date_prediction("Mar 20, 2022", "NLTK", ) == "BUY" or "HOLD" or "SELL"

def test_SPACY_get_prediction():
    assert get_date_prediction("Dec 20, 2021", "NLTK", ) == "BUY" or "HOLD" or "SELL"
import pytest

from app import reset_balance, trade, perform_trade
from logic import get_date_prediction


def test_reset_balance_dollars():
    trade["Dollars"] = 34234
    reset_balance()
    assert trade["Dollars"] == 1000.0

def test_reset_balance_BTC_balance():
    trade["BTC_Balance"] = 34234
    reset_balance()
    assert trade["BTC_Balance"] == 0.0


def test_false_get_prediction():
    assert get_date_prediction("Aug 21, 2022", "NLTK", ) == ""


def test_NLTK_get_prediction():
    assert get_date_prediction("Mar 20, 2022", "NLTK", ) == "BUY" or "HOLD" or "SELL"

def test_SPACY_get_prediction():
    assert get_date_prediction("Dec 20, 2021", "NLTK", ) == "BUY" or "HOLD" or "SELL"

def test_perform_trade_BUY():
    price = 342445
    perform_trade("BUY",price)
    assert trade["BTC_Balance"] == 1000.0/price


def test_perform_trade_SELL():
    price = 342445
    perform_trade("BUY",price)
    val = trade["BTC_Balance"] * price
    perform_trade("SELL", price)
    assert trade["Dollars"] == val
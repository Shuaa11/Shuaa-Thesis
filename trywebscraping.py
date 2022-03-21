
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
import requests
import json
country = 'ch'
origional_language = 'en'
chrome_options = webdriver.FirefoxOptions()
driver = webdriver.Remote("http://localhost:4444/wd/hub", options = chrome_options)
driver.get('https://news.bitcoin.com/page/2/?s=bitcoin') #add url of webiste here
print("f")
list_of_restriction_ch_temporrary = []
list_of_restriction_ch = []

div = driver.find_elements:wq\
    (By.CLASS_NAME, "td_module_16")

print(list_of_restriction_ch)

API_endpoint = 'http://127.0.0.1:5000/country/' + country + '/restrictions'
data = json.dumps(list_of_restriction_ch) #add restriction in list format ['restriction1', 'restriction2', etc....]
print(data)


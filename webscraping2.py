import asyncio
import json
import pandas as pd

import requests
from pyppeteer import launch
country = "uk"
#https://www.instituteforgovernment.org.uk/explainers/coronavirus-lockdown-rules-four-nations-uk
async def main():
    browser = await launch()
    page = await browser.newPage()
    data=[]
    for x in range(1950):
        word = 'https://news.bitcoin.com/page/'+str(x+1)+'/?s=bitcoin'
        await page.goto(word)
        x=x+1
        elements = await page.querySelectorAll('.td_module_16 .td-module-thumb a')
        dates=[]
        links=[]
        for element in elements:
            links.append((await page.evaluate('(element) => element.href', element)))
        elements = await page.querySelectorAll('.entry-date')
        for element in elements:
            dates.append((await page.evaluate('(element) => element.textContent', element)))
        list(dict.fromkeys(dates))
        list(dict.fromkeys(links))
        items=[]
        i=0
        infos=[]
        titles=[]
        for link in links:
            info=[]
            await page.goto(link)
            # print("went to the link")
            element = await page.querySelector('.article__header__heading')
            title= await page.evaluate('(element) => element.textContent', element)
            elements= await page.querySelectorAll('.article__body p')
            for element in elements:
                # size = await page.evaluate('(element) => getComputedStyle(element).getPropertyValue(\'font-weight\')', element)
                # print(size)
                info.append(await page.evaluate('(element) => element.textContent', element))
            info = [i for i in info if i]
            info[:-5]
            s = "".join(info)
            s=s.strip()
            title = title.strip()
            # infos.append(info)
            # titles.append(title)
            data.append([title,dates[i],s])
            i=i+1

    df = pd.DataFrame(data, columns=['Title', 'Date', 'Info'])
    df.to_csv("Crypto-News-Data.csv")

    # title = await page.evaluate('(element) => element.textContent', elements)

    # restrictions = []
    # for element in elements:
    #     title = await page.evaluate('(element) => element.textContent', element)
    #     if title.endswith("."):
    #          print("text: "+title)
    #          restrictions.append(title)
    # API_endpoint = 'http://127.0.0.1:5000/country/' + country + '/restrictions'
    # seen = set()
    # result = []
    # for item in restrictions:
    #     if item not in seen:
    #         seen.add(item)
    #         result.append(item)
    # data = json.dumps(result)
    # requests.put(url=API_endpoint, json=data)
    # await browser.close()


asyncio.get_event_loop().run_until_complete(main())

import asyncio
import pandas as pd
import time
from pyppeteer import launch

async def main():
    browser = await launch()
    page = await browser.newPage()
    data=[]
    for x in range(200):

        time.sleep(1)
        word = 'https://news.bitcoin.com/page/'+str(x+1)+'/?s=bitcoin'
        print("went to the page", x+1)
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
            # time.sleep(1)
            page.setDefaultNavigationTimeout(0)
            await page.goto(link)
            print("went to the article", link)
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
            data.append([title,dates[i],s,link])
            i=i+1

    df = pd.DataFrame(data, columns=['Title', 'Date', 'Info', 'Link'])
    df.to_csv("Crypto-News-Data2.csv")



asyncio.get_event_loop().run_until_complete(main())

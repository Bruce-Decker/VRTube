"""
Setup

1. Install Python selenium module: $ pip install selenium
2. Download Chrome Webdriver and place in /usr/local/bin
"""

import time
from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.chrome.options import Options

def main():
  # setup Chrome
  chrome_options = Options()
  chrome_options.add_argument("--window-size=1500,1000")
  driver_path = '/usr/local/bin/chromedriver'
  driver = webdriver.Chrome(executable_path=driver_path, chrome_options=chrome_options)

  # open user page for user 'bam'
  driver.get('http://localhost:3000/users?userid=bam')
  time.sleep(3)
  
  # search for keyword 'jpg'
  search_box = driver.find_element_by_id('searchField')
  search_box.send_keys('jpg')
  search_box.submit()
  time.sleep(3)

  # switch to the next page of results
  actions1 = ActionChains(driver)
  next_button = driver.find_element_by_css_selector('#nextBtn a')
  actions1.move_to_element(next_button)
  actions1.click(next_button)
  actions1.perform()
  time.sleep(3)

  # click on the first result VR
  actions2 = ActionChains(driver)
  first_vr = driver.find_element_by_css_selector('#vrtable tr td:first-child')
  actions2.move_to_element(first_vr)
  actions2.click(first_vr)
  actions2.perform()
  time.sleep(3)

  actions3 = ActionChains(driver)
  likes_button = driver.find_element_by_id('likeh3')
  actions3.move_to_element(likes_button)
  actions3.click(likes_button)
  actions3.perform()
  time.sleep(3)

  driver.quit()

if __name__ == '__main__':
  main()
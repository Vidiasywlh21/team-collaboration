from playwright.sync_api import sync_playwright
import time

pages_to_visit = [
    ("http://localhost:3000", "home"),
    ("http://localhost:3000/tata-letak", "tata-letak"),
    ("http://localhost:3000/booking", "booking"),
    ("http://localhost:3000/status", "status"),
    ("http://localhost:3000/bantuan", "bantuan"),
]

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(viewport={"width": 1280, "height": 900})
    page = context.new_page()

    for url, name in pages_to_visit:
        print(f"Opening {url} ...")
        page.goto(url)
        page.wait_for_load_state("networkidle")
        time.sleep(1)
        page.screenshot(path=f"D:/final-project4/my-app/screenshot_{name}.png", full_page=True)
        print(f"Screenshot saved: screenshot_{name}.png")

    browser.close()
    print("Done!")

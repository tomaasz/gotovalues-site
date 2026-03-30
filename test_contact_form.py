from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.goto("http://localhost:3000/#kontakt")
    page.wait_for_timeout(500)

    # Fill out the form
    page.get_by_label("Imię *").fill("Test User")
    page.wait_for_timeout(500)

    page.get_by_label("E-mail *").fill("test@example.com")
    page.wait_for_timeout(500)

    page.get_by_label("Co dziś dzieje się ręcznie albo chaotycznie *").fill("This is a test message to show the spinner in action.")
    page.wait_for_timeout(500)

    # Click submit
    page.get_by_role("button", name="Wyślij krótki opis").click()
    page.wait_for_timeout(200) # Short wait to catch the spinner state

    # Take screenshot while it is spinning
    page.screenshot(path="contact_form_spinner.png")
    page.wait_for_timeout(2000) # Wait for response

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()

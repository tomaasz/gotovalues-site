from playwright.sync_api import sync_playwright
import time

def run_cuj(page):
    # Intercept API route and delay it
    def handle_route(route):
        time.sleep(1) # Sleep for 1 second to show the spinner
        route.continue_()

    page.route("**/api/contact", handle_route)

    page.goto("http://localhost:3000")
    page.wait_for_timeout(500)

    # Scroll to the contact form section to trigger the lazy load chunk
    # Get the bounding box of the contact section and scroll to it
    page.locator("#kontakt").scroll_into_view_if_needed()
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
    page.wait_for_timeout(200) # Wait just a bit to capture the spinner

    # Take screenshot while it is spinning
    page.screenshot(path="contact_form_spinner.png")
    page.wait_for_timeout(2000) # Wait for response

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="videos_scroll",
            viewport={'width': 1280, 'height': 720}
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()

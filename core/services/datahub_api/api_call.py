import requests
import urllib3


def data_getter(url: str, body: dict, cookies=None):
    urllib3.disable_warnings()
    try:
        response = requests.post(url, json=body, timeout=60, cookies=cookies)
    except requests.exceptions.RequestException as e:
        return None
    if response.status_code == 200:
        if not cookies:
            return response.cookies
        return response.text
    else:
        return None

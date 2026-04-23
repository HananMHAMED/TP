#!/usr/bin/env python3
import requests

base_url = "http://localhost:50180/index.php"
login = requests.post(base_url, data={"route": "api/login", "username": "feurs", "password": "feurs"})
token = login.json()["access_token"]
info = requests.get(
    f"{base_url}?route=api/info&action=meridiens",
    headers={"Authorization": f"Bearer {token}"},
)
print("Login:", login.status_code, login.text)
print("Info :", info.status_code, info.text)

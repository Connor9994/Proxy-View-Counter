import subprocess
import time
import asyncio
import sched
print("Starting RestartChrome.py")

async def CrashChrome():
    await asyncio.create_subprocess_shell("TASKKILL /f  /IM  CHROME.EXE")
    await asyncio.create_subprocess_shell("TASKKILL /f  /IM  CHROMEDRIVER.EXE")

while True:
    asyncio.run(CrashChrome())
    time.sleep(900)

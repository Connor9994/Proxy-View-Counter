import subprocess
import time
import asyncio
import sched
import os
import subprocess

print("Starting RestartChrome.py")

async def CrashChrome():
    await asyncio.create_subprocess_shell("TASKKILL /f  /IM  CHROME.EXE")
    await asyncio.create_subprocess_shell("TASKKILL /f  /IM  CHROMEDRIVER.EXE")

while True:
    asyncio.run(CrashChrome())
    #check if we have lost connection to the workgroup
    connection = os.popen("ping -n 1 Laptop").read()
    print(connection)
    if "Ping request could not find host" in connection: 
        os.system("shutdown /r /t 0")
    else:
        print("still connected to the wifi") 
    time.sleep(900)
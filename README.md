Personally, I ALWAYS use [VirusTotal.com](https://www.virustotal.com/gui/home/url) to scan links and files before clicking/downloading.

Step 1: Install 'TamperMonkey' Extension on Chrome from either the App Store or the Extension's Website; I used App Store.

Step 2: Copy the Github File ZIP Download Link, open VirusTotal.com, and scan the URL for viruses.

Step 3: After confirming it's safe, continue to download my Neopets Comma Extension. (For Chrome ONLY at this time.)

Step 4: ...to be continued...


When looking at the manifest.json file, you can see which pages the extension works on.


The bank.js file works only on the bank page because I used a different method for that page.
It had issues sending commas in the text field when submitting a withdrawal/deposit.
Therefore, made it have a fake display that overlays the text field when you input a value.


The content.js file is for both the Market and Trading Post pages.

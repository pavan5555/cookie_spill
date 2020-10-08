Project: cookie_spill
Course: Special Topics in Information Security 

Description: This project aims to show the end user, the detailed list of trackers(tracking cookies) when he visits a website. To achieve this we implemented a Chrome extension, which actively identifies the First party and Third party cookies of active chrome tab and displays it to the end users.

Problems faced: Chrome doesn't have a api to access the active cookies. 
Implemented Solution: I have Implemented a Listener on the chrome webRequest onBeforeSendHeaders Event and Accessed the request Headers, from which I accessed the cookies.





chrome.runtime.onStartup.addListener();

chrome.runtime.onInstalled.addListener(function() {
    console.log("Application Initialized!");
});

const tabStore = {};
const url_filter = {urls: ["<all_urls>"]};
const extra_options = ["requestHeaders", "extraHeaders"];
let reqs_arry = [];


chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
      for (var i = 0; i < details.requestHeaders.length; ++i) {
        if (details.requestHeaders[i].name === 'Cookie') {
          if (!tabStore.hasOwnProperty(details.tabId)) {
            return;
        }

        tabStore[details.tabId].requests[details.requestId] = {
            url: details.url.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0],
        };
           }
        }
      },
    url_filter, extra_options);

    chrome.webRequest.onCompleted.addListener((details) => {
        const current_tab = details.tabId;
        if(typeof tabStore[current_tab] !== "undefined"){
            reqs_arry = tabStore[current_tab].requests;
        }           
    }, url_filter);

chrome.extension.onConnect.addListener(function(port) {
        console.log("Connected .....");
        port.postMessage(reqs_arry);
    });

chrome.tabs.onActivated.addListener((tab) => {
        const tabId = tab ? tab.tabId : chrome.tabs.TAB_ID_NONE;
        if (!tabStore.hasOwnProperty(tabId)) {
            tabStore[tabId] = {
                id: tabId,
                requests: {},
            };
        }
    });
    
chrome.tabs.onRemoved.addListener((tab) => {
        const tabId = tab.tabId;
        if (!tabStore.hasOwnProperty(tabId)) {
            return;
        }
        tabStore[tabId] = null;
    });

const third_party = ["8114842.fls.doubleclick.net",
"a.tribalfusion.com",
"adservice.google.com",
"adservice.google.de",
"connect.facebook.net",
"ct.pinterest.com",
"cx.atdmt.com",
"googleads.g.doubleclick.net",
"gum.criteo.com",
"i5.wal.co",
"ib.adnxs.com",
"idsync.rlcdn.com",
"loadus.exelator.com",
"pagead2.googlesyndication.com",
"s.yimg.com",
"secure.adnxs.com",
"securepubads.g.doubleclick.net",
"sp.analytics.yahoo.com",
"t.myvisualiq.net",
"tapestry.tapad.com",
"tpc.googlesyndication.com",
"vt.myvisualiq.net",
"www.facebook.com",
"www.google.com",
"www.googleadservices.com",
"www.googletagmanager.com",
"2o7.net",
"addfreestats.com",
"advertising.com",
"channelintelligence.com",
"clickability.com",
"clickability.com",
"coremetrics.com",
"cybermonitor.com",
"doubleclick.net",
"estat.com",
"fastclick.net",
"gostats.com",
"hitbox.com",
"masterstats.com",
"realmedia.com",
"sexcounter.com",
"sextracker.com",
"sitemeter.com",
"sitestat.com",
"spinbox.net",
"spylog.com",
"statcounter.com",
"tribalfusion.com",
"webstat.com",
"webtrendslive.com",
]



var port = chrome.extension.connect({
    name: "incg_req_lst"
});
port.onMessage.addListener(function(msg) {  

    var query = { active: true, currentWindow: true };
    chrome.tabs.query(query, callback);

    function callback(tabs){
    var current_domain= tabs[0].url.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0];

    var fp_list = new Set();
    var tp_list = new Set();
    var tracker_list = new Set();
    var restoarr = Object.keys(msg).map(i => msg[i]);
    restoarr.forEach(function(k){
        if(third_party.includes(k.url)){
            tracker_list.add(k.url);
        }
        else{
            if(current_domain === k.url){
                fp_list.add(k.url);
            }
            else{
                tp_list.add(k.url);
            }
        }
        
    })

    fp_list.forEach(k => $("#fp_list").append('<li>'+k+'</li>'));
    tp_list.forEach(k => $("#tp_list").append('<li>'+k+'</li>'));
    tracker_list.forEach(k => $("#trk_list").append('<li>'+k+'</li>'));
    }

    
});

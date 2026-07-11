document.getElementById("export").onclick = async () => {

    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    chrome.scripting.executeScript({

        target: { tabId: tab.id },

        files: [
            "export/export.js"
        ]

    }, () => {

        chrome.scripting.executeScript({

            target: { tabId: tab.id },

            func: () => window.exportOBJ()

        });

    });

};

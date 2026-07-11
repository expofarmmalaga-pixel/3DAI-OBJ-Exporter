document.getElementById("export").onclick = async () => {

    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    chrome.scripting.executeScript({

        target: {
            tabId: tab.id
        },

        func: () => {

            if (window.exportOBJ)
                window.exportOBJ();
            else
                alert("exportOBJ no encontrado");

        }

    });

};

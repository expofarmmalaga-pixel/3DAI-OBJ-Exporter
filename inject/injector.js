(() => {

    function inject(file) {

        const s = document.createElement("script");

        s.src = chrome.runtime.getURL(file);

        (document.head || document.documentElement).appendChild(s);

        s.onload = () => s.remove();

    }

    inject("inject/capture.js");

    inject("export/export.js");

})();

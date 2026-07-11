
(()=>{
 const s=document.createElement('script');
 s.src=chrome.runtime.getURL('inject/capture.js');
 (document.head||document.documentElement).appendChild(s);
 s.onload=()=>s.remove();
})();

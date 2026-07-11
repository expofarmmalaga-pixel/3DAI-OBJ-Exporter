
document.getElementById('r').onclick=async()=>{
 let [tab]=await chrome.tabs.query({active:true,currentWindow:true});
 let [res]=await chrome.scripting.executeScript({
 target:{tabId:tab.id},
 func:()=>window.__WebGLExtractor?window.__WebGLExtractor.stats:null
 });
 document.getElementById('o').textContent=JSON.stringify(res.result,null,2);
};

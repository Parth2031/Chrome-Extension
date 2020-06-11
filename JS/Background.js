// TODO:: Saving Background Images by Default :->

let fav_sites = JSON.parse(window.localStorage.getItem('fav_sites'));

document.querySelector('#yes').addEventListener("click", () =>
{
  chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs)
  {
    let url = tabs[0].url;
    let title = tabs[0].title;
    
    let tempObj = new Object();
    tempObj["siteURL"] = url;
    tempObj["siteTitle"] = title;
 
    fav_sites.push(tempObj);

    window.localStorage.setItem('fav_sites', JSON.stringify(fav_sites));
    window.open('', '_self', '').close();
  });
});

document.querySelector('#no').addEventListener("click", () => {
  window.open('', '_self', '').close();
});

document.querySelector('#exit').addEventListener("click", () => {
  window.open('', '_self', '').close();
});
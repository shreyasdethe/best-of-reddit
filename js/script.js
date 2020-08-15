doXHR = function (url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function () {
      if (this.status == 200 & this.readyState == 4) {
        // JSON data from reddit post
        let output = JSON.parse(this.responseText);
        let dat = output.data.children;
        resolve(dat);
      }
      else {
        reject(Error(this.statusText));
      }
    };
    xhr.onerror = function () {
      reject(Error(this.statusText));
    };
    xhr.send();
  });
}

let u = "https://www.reddit.com/r/wallpapers/top/.json?limit=10";
doXHR(u)
  .then((dat) => {
    let content = "";

    for (let i = 0; i < dat.length; i++) {
      if (dat[i].data.domain == "i.redd.it") {
        let url = dat[i].data.url;
        let title = dat[i].data.title;
        content += "<div class=\"row content-box\">"
        content += "<div class=\"row\"><span class=\"content-title\">" + title;
        content += "</span><img class=\"media-object\" src=\"" + url + "\"></div></div>";
      }
    }

    document.getElementsByClassName("container")[0].innerHTML = content;

  })
  .catch(() => {
    console.log("Error");
  });


  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
     navigator.serviceWorker.register('../sw.js').then( () => {
      console.log('Service Worker Registered')
     })
   })
  }
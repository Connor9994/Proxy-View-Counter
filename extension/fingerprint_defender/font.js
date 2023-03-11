var inject = function () {
    var rand = {
        "noise": function () {
            let result;
            let font_noise = localStorage.getItem("font_noise")
            if (font_noise) {
                result = font_noise
            } else {
                let SIGN = Math.random() < Math.random() ? -1 : 1;
                result = Math.floor(Math.random() + SIGN * Math.random());
                localStorage.setItem("font_noise", result);
            }
            return result;
        },
        "sign": function () {
            const tmp = [-1, -1, -1, -1, -1, -1, +1, -1, -1, -1];
            let index;
            let font_sign = localStorage.getItem("font_sign")
            if (font_sign) {
                index = font_sign
            } else {
                index = Math.floor(Math.random() * tmp.length);
                localStorage.setItem("font_sign", index);
            }

            return tmp[index];
        }
    };

    Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
        get() {
            const height = Math.floor(this.getBoundingClientRect().height);
            const valid = height && rand.sign() === 1;
            const result = valid ? height + rand.noise() : height;
            //
            if (valid && result !== height) {
                window.top.postMessage("font-fingerprint-defender-alert", '*');
            }
            //
            return result;
        }
    });
    //
    Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
        get() {
            const width = Math.floor(this.getBoundingClientRect().width);
            const valid = width && rand.sign() === 1;
            const result = valid ? width + rand.noise() : width;
            //
            if (valid && result !== width) {
                window.top.postMessage("font-fingerprint-defender-alert", '*');
            }
            //
            return result;
        }
    });
    //
    document.documentElement.dataset.fbscriptallow = true;
};

var script_1 = document.createElement("script");
script_1.textContent = "(" + inject + ")()";
document.documentElement.appendChild(script_1);
script_1.remove();

if (document.documentElement.dataset.fbscriptallow !== "true") {
    var script_2 = document.createElement("script");
    script_2.textContent = `{
    const iframes = [...window.top.document.querySelectorAll("iframe[sandbox]")];
    for (var i = 0; i < iframes.length; i++) {
      if (iframes[i].contentWindow) {
        if (iframes[i].contentWindow.HTMLElement) {
          iframes[i].contentWindow.HTMLElement.prototype.offsetWidth = HTMLElement.prototype.offsetWidth;
          iframes[i].contentWindow.HTMLElement.prototype.offsetHeight = HTMLElement.prototype.offsetHeight;
        }
      }
    }
  }`;
    //
    window.top.document.documentElement.appendChild(script_2);
    script_2.remove();
}

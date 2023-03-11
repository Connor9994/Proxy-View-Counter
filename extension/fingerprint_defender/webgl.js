var inject = function () {
    var config = {
        "random": {
            "value": function (key = false) {
                let rand;
                if (key) {
                    let get = localStorage.getItem("webgl_rv_" + key);
                    rand = get ? get : Math.random();
                    if (!get)
                        localStorage.setItem("webgl_rv_" + key, rand);
                } else {
                    rand = Math.random();
                }
                return rand;
            },
            "item": function (key, e) {
                let get = localStorage.getItem("webgl_" + key);
                let rand = get ? get : e.length * config.random.value();
                if (!get)
                    localStorage.setItem("webgl_" + key, rand);
                return e[Math.floor(rand)];
            },
            "number": function (key, power) {
                var tmp = [];
                for (var i = 0; i < power.length; i++) {
                    tmp.push(Math.pow(2, power[i]));
                }
                /*  */
                return config.random.item(key, tmp);
            },
            "int": function (key, power) {
                var tmp = [];
                for (var i = 0; i < power.length; i++) {
                    var n = Math.pow(2, power[i]);
                    tmp.push(new Int32Array([n, n]));
                }
                /*  */
                return config.random.item(key, tmp);
            },
            "float": function (key, power) {
                var tmp = [];
                for (var i = 0; i < power.length; i++) {
                    var n = Math.pow(2, power[i]);
                    tmp.push(new Float32Array([1, n]));
                }
                /*  */
                return config.random.item(key, tmp);
            }
        },
        "spoof": {
            "webgl": {
                "buffer": function (target) {
                    var proto = target.prototype ? target.prototype : target.__proto__;
                    const bufferData = proto.bufferData;
                    Object.defineProperty(proto, "bufferData", {
                        "value": function () {
                            var index = Math.floor(config.random.value('bufferDataIndex') * arguments[1].length);
                            var noise = arguments[1][index] !== undefined ? 0.1 * config.random.value('bufferDataNoise') * arguments[1][index] : 0;
                            //
                            arguments[1][index] = arguments[1][index] + noise;
                            window.top.postMessage("webgl-fingerprint-defender-alert", '*');
                            //
                            return bufferData.apply(this, arguments);
                        }
                    });
                },
                "parameter": function (target) {
                    var proto = target.prototype ? target.prototype : target.__proto__;
                    const getParameter = proto.getParameter;
                    Object.defineProperty(proto, "getParameter", {
                        "value": function () {
                            window.top.postMessage("webgl-fingerprint-defender-alert", '*');
                            //
                            if (arguments[0] === 3415) return 0;
                            else if (arguments[0] === 3414) return 24;
                            else if (arguments[0] === 36348) return 30;
                            else if (arguments[0] === 7936) return "WebKit";
                            else if (arguments[0] === 37445) return "Google Inc.";
                            else if (arguments[0] === 7937) return "WebKit WebGL";
                            else if (arguments[0] === 3379) return config.random.number('3379', [14, 15]);
                            else if (arguments[0] === 36347) return config.random.number('36347', [12, 13]);
                            else if (arguments[0] === 34076) return config.random.number('34076', [14, 15]);
                            else if (arguments[0] === 34024) return config.random.number('34024', [14, 15]);
                            else if (arguments[0] === 3386) return config.random.int('3386', [13, 14, 15]);
                            else if (arguments[0] === 3413) return config.random.number('3413', [1, 2, 3, 4]);
                            else if (arguments[0] === 3412) return config.random.number('3412', [1, 2, 3, 4]);
                            else if (arguments[0] === 3411) return config.random.number('3411', [1, 2, 3, 4]);
                            else if (arguments[0] === 3410) return config.random.number('3410', [1, 2, 3, 4]);
                            else if (arguments[0] === 34047) return config.random.number('34047', [1, 2, 3, 4]);
                            else if (arguments[0] === 34930) return config.random.number('34930', [1, 2, 3, 4]);
                            else if (arguments[0] === 34921) return config.random.number('34921', [1, 2, 3, 4]);
                            else if (arguments[0] === 35660) return config.random.number('35660', [1, 2, 3, 4]);
                            else if (arguments[0] === 35661) return config.random.number('35661', [4, 5, 6, 7, 8]);
                            else if (arguments[0] === 36349) return config.random.number('36349', [10, 11, 12, 13]);
                            else if (arguments[0] === 33902) return config.random.float('33902', [0, 10, 11, 12, 13]);
                            else if (arguments[0] === 33901) return config.random.float('33901', [0, 10, 11, 12, 13]);
                            else if (arguments[0] === 37446) return config.random.item('37446', ["Graphics", "HD Graphics", "Intel(R) HD Graphics"]);
                            else if (arguments[0] === 7938) return config.random.item('7938', ["WebGL 1.0", "WebGL 1.0 (OpenGL)", "WebGL 1.0 (OpenGL Chromium)"]);
                            else if (arguments[0] === 35724) return config.random.item('35724', ["WebGL", "WebGL GLSL", "WebGL GLSL ES", "WebGL GLSL ES (OpenGL Chromium)"]);
                            //
                            return getParameter.apply(this, arguments);
                        }
                    });
                }
            }
        }
    };
    //
    config.spoof.webgl.buffer(WebGLRenderingContext);
    config.spoof.webgl.buffer(WebGL2RenderingContext);
    config.spoof.webgl.parameter(WebGLRenderingContext);
    config.spoof.webgl.parameter(WebGL2RenderingContext);
    //
    document.documentElement.dataset.wgscriptallow = true;
};

var script_1 = document.createElement("script");
script_1.textContent = "(" + inject + ")()";
document.documentElement.appendChild(script_1);
script_1.remove();

if (document.documentElement.dataset.wgscriptallow !== "true") {
    var script_2 = document.createElement("script");
    script_2.textContent = `{
    const iframes = [...window.top.document.querySelectorAll("iframe[sandbox]")];
    for (var i = 0; i < iframes.length; i++) {
      if (iframes[i].contentWindow) {
        if (iframes[i].contentWindow.WebGLRenderingContext) {
          iframes[i].contentWindow.WebGLRenderingContext.prototype.bufferData = WebGLRenderingContext.prototype.bufferData;
          iframes[i].contentWindow.WebGLRenderingContext.prototype.getParameter = WebGLRenderingContext.prototype.getParameter;
        }
        if (iframes[i].contentWindow.WebGL2RenderingContext) {
          iframes[i].contentWindow.WebGL2RenderingContext.prototype.bufferData = WebGL2RenderingContext.prototype.bufferData;
          iframes[i].contentWindow.WebGL2RenderingContext.prototype.getParameter = WebGL2RenderingContext.prototype.getParameter;
        }
      }
    }
  }`;
    //
    window.top.document.documentElement.appendChild(script_2);
    script_2.remove();
}

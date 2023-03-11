var inject = function () {
    const context = {
        "BUFFER": null,
        "getChannelData": function (e) {
            const getChannelData = e.prototype.getChannelData;
            Object.defineProperty(e.prototype, "getChannelData", {
                "value": function () {
                    const results_1 = getChannelData.apply(this, arguments);
                    if (context.BUFFER !== results_1) {
                        context.BUFFER = results_1;
                        window.top.postMessage("audiocontext-fingerprint-defender-alert", '*');

                        let audio_r1_idx = localStorage.getItem("audio_r1_idx")
                        let audio_r1_vx = localStorage.getItem("audio_r1_vx")
                        if (audio_r1_idx && audio_r1_vx) {
                            audio_r1_idx = JSON.parse(audio_r1_idx);
                            audio_r1_vx = JSON.parse(audio_r1_vx);
                            for (let iter = 0, i = 0; i < results_1.length; i += 100, iter += 1) {
                                let index = audio_r1_idx[iter];
                                let val = audio_r1_vx[iter];
                                results_1[index] = results_1[index] + val;
                            }
                        } else {
                            let indxs = []
                            let vals = []
                            for (let i = 0; i < results_1.length; i += 100) {
                                let index = Math.floor(Math.random() * i);
                                let val = Math.random() * 0.0000001;
                                indxs.push(index);
                                vals.push(val);
                                results_1[index] = results_1[index] + val;
                            }
                            localStorage.setItem("audio_r1_idx", JSON.stringify(indxs));
                            localStorage.setItem("audio_r1_vx", JSON.stringify(vals));
                        }

                    }

                    return results_1;
                }
            });
        },

        "createAnalyser": function (e) {
            const createAnalyser = e.prototype.__proto__.createAnalyser;
            Object.defineProperty(e.prototype.__proto__, "createAnalyser", {
                "value": function () {
                    const results_2 = createAnalyser.apply(this, arguments);
                    const getFloatFrequencyData = results_2.__proto__.getFloatFrequencyData;
                    Object.defineProperty(results_2.__proto__, "getFloatFrequencyData", {
                        "value": function () {
                            window.top.postMessage("audiocontext-fingerprint-defender-alert", '*');
                            const results_3 = getFloatFrequencyData.apply(this, arguments);


                            let audio_r3_idx = localStorage.getItem("audio_r3_idx")
                            let audio_r3_vx = localStorage.getItem("audio_r3_vx")
                            if (audio_r3_idx && audio_r3_vx) {
                                audio_r3_idx = JSON.parse(audio_r3_idx);
                                audio_r3_vx = JSON.parse(audio_r3_vx);
                                for (let iter = 0, i = 0; i < results_1.length; i += 100, iter += 1) {
                                    let index = audio_r3_idx[iter];
                                    let val = audio_r3_vx[iter];
                                    arguments[0][index] = arguments[0][index] + val;
                                }
                            } else {
                                let indxs = []
                                let vals = []
                                for (var i = 0; i < arguments[0].length; i += 100) {
                                    let index = Math.floor(Math.random() * i);
                                    let val = Math.random() * 0.1;
                                    indxs.push(index);
                                    vals.push(val);
                                    arguments[0][index] = arguments[0][index] + val;
                                }
                                localStorage.setItem("audio_r3_idx", JSON.stringify(indxs));
                                localStorage.setItem("audio_r3_vx", JSON.stringify(vals));
                            }
                            return results_3;
                        }
                    });
                    //
                    return results_2;
                }
            });
        }
    };
    //
    context.getChannelData(AudioBuffer);
    context.createAnalyser(AudioContext);
    context.getChannelData(OfflineAudioContext);
    context.createAnalyser(OfflineAudioContext);
    //
    document.documentElement.dataset.acxscriptallow = true;
};

var script_1 = document.createElement("script");
script_1.textContent = "(" + inject + ")()";
document.documentElement.appendChild(script_1);
script_1.remove();

if (document.documentElement.dataset.acxscriptallow !== "true") {
    var script_2 = document.createElement("script");
    script_2.textContent = `{
    const iframes = [...window.top.document.querySelectorAll("iframe[sandbox]")];
    for (var i = 0; i < iframes.length; i++) {
      if (iframes[i].contentWindow) {
        if (iframes[i].contentWindow.AudioBuffer) {
          if (iframes[i].contentWindow.AudioBuffer.prototype) {
            if (iframes[i].contentWindow.AudioBuffer.prototype.getChannelData) {
              iframes[i].contentWindow.AudioBuffer.prototype.getChannelData = AudioBuffer.prototype.getChannelData;
            }
          }
        }

        if (iframes[i].contentWindow.AudioContext) {
          if (iframes[i].contentWindow.AudioContext.prototype) {
            if (iframes[i].contentWindow.AudioContext.prototype.__proto__) {
              if (iframes[i].contentWindow.AudioContext.prototype.__proto__.createAnalyser) {
                iframes[i].contentWindow.AudioContext.prototype.__proto__.createAnalyser = AudioContext.prototype.__proto__.createAnalyser;
              }
            }
          }
        }

        if (iframes[i].contentWindow.OfflineAudioContext) {
          if (iframes[i].contentWindow.OfflineAudioContext.prototype) {
            if (iframes[i].contentWindow.OfflineAudioContext.prototype.__proto__) {
              if (iframes[i].contentWindow.OfflineAudioContext.prototype.__proto__.createAnalyser) {
                iframes[i].contentWindow.OfflineAudioContext.prototype.__proto__.createAnalyser = OfflineAudioContext.prototype.__proto__.createAnalyser;
              }
            }
          }
        }

        if (iframes[i].contentWindow.OfflineAudioContext) {
          if (iframes[i].contentWindow.OfflineAudioContext.prototype) {
            if (iframes[i].contentWindow.OfflineAudioContext.prototype.__proto__) {
              if (iframes[i].contentWindow.OfflineAudioContext.prototype.__proto__.getChannelData) {
                iframes[i].contentWindow.OfflineAudioContext.prototype.__proto__.getChannelData = OfflineAudioContext.prototype.__proto__.getChannelData;
              }
            }
          }
        }
      }
    }
  }`;
    //
    window.top.document.documentElement.appendChild(script_2);
    script_2.remove();
}

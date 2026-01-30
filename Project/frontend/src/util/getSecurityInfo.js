"use client"
import { api } from "./"
class Telemetry {
  constructor(){

  }
  async browserID() {
    let browserid = window.localStorage.getItem("browserid");
    if (!browserid) {
      browserid = await api.get(`/api/v1/security/browserid`)
      window.localStorage.setItem("browserid", browserid);
    }
  }
  gps() {
    return new Promise((resolve, reject) => {
      if (!window || !window.navigator || !window.navigator.geolocation) return reject(`GPS Access not available`);
      window.navigator.geolocation.getCurrentPosition((location) => {
        resolve(location.coords);
      }, (err) => {
        reject(err)
      })
    })
  }
  async ip() {
    let info = await api.get("/api/v1/get-country");
    return info;
  }
  async timezone(type = "Name") {
    switch (type) {
      case "offset":
        return (new Date()).getTimezoneOffset()
        break;

      default:
        return Intl.DateTimeFormat().resolvedOptions().timeZone
        break;
    }
  }
  async screen() {
    return `${window.screen.availWidth} X ${window.screen.availHeight} (${window.screen.colorDepth}) [${window.screen.orientation.type} (${window.screen.orientation.angle}deg)]`
  }
  async languages() {
    return window.navigator.languages || window.navigator.language;
  }
  async userAgent() {
    return window.navigator.userAgent;
  }
  async device() {
    return (/Mobi|Android/i.test(window.navigator.userAgent) ?
      "Mobile" :
      (/Tablet|iPad/i.test(window.navigator.userAgent) ?
        "Tablet" :
        "Desktop")
    )
  }
  async os() {
    const ua = window.navigator.userAgent;
    return (/Android/i.test(ua)) ?
      "android" :
      (/iPhone|iPad|iPod/i.test(ua)) ?
        "ios" :
        (/Windows NT/i.test(ua)) ?
          "windows" :
          (/Mac OS X/i.test(ua)) ?
            "mac" :
            (/Linux/i.test(ua)) ?
              "linux" :
              "other"
  }
  async webDriver() {
    return window.navigator.webDriver;
  }
  async doNotTrack() {
    return window.navigator.doNotTrack;
  }
  async battery() {
    let battery = await window.navigator.getBattery();
    if (!battery) return false;
    return `${(battery.level * 100)}% (${battery.charging ? "Charging" : "Discharging"})`
  }
}

export default new Telemetry();

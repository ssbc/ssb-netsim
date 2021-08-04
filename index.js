
class Simulator {
  constructor () {
    if (!(this instanceof Simulator)) return new Simulator(name, opts)
  }
  peer (name, opts) {
    return new Peer(name, opts)
  }
  wait (ms) { console.log("wait", ms) }
  comment(msg) { console.log("comment", msg) }
}

class Peer {
  constructor (name, opts) {
    if (!(this instanceof Peer)) return new Peer(name, opts)
    opts = opts || {}
    this.name = name
    this.id = ""
    console.log("enter", this.name)
    for (let [key, value] of Object.entries(opts)) {
      if (["hops", "caps"].includes(key)) {
        console.log(key, this.name, value)
      } else if (["skipoffsets", "alloffsets"].includes(key)) {
        console.log(key, this.name)
      } else if (key == "id") {
        this.id = value
        console.log("load", this.name, value)
      } else {
        console.log("illegal netsim operation: ", key, value)
      }
    }
  }

  // no additional operands (only command name, and puppet name)
  zero (cmd) {
    console.log(cmd, this.name)
  }
  // one operand (+ command name, and puppet name)
  one (cmd, val) {
    console.log(cmd, this.name, val)
  }

  start (sbot) { this.one("start", sbot) }
  stop () { this.zero("stop") }

  follow (other) { this.one("follow", other) }
  unfollow (other) { this.one("unfollow", other) }
  connect (other) { this.one("connect", other) }
  disconnect (other) { this.one("disconnect", other) }

  isfollowing (other) { this.one("isfollowing", other) }
  isnotfollowing (other) { this.one("isnotfollowing", other) }


  has (other, seq = "latest") { this.one("has", `${other}@${seq}`) }
  waituntil (other, seq = "latest") { this.one("waituntil", `${other}@${seq}`) }

  post () { this.zero("post") }
  publish(obj) { this.one("publish", lispify(obj)) }

  log (amount = 1) { this.one("log", amount) }
}

// used for the Peer.publish command
function lispify (obj, prevkey) {
  var result = ""
  for (let [key, value] of Object.entries(obj)) {
    if (isObject(value)) {
      prevkey = prevkey || ""
      result += lispify(value, prevkey+key)
    } else {
      if (typeof prevkey !== "undefined") {
        prevkey += "."
      } else {
        prevkey = ""
      }
      result += `(${prevkey+key} ${value}) `
    }
  }
  return result
}

function isObject (value) {
  return typeof(value) === "object" && !Array.isArray(value)
}

module.exports = function () {
  return new Simulator()
}

# ssb-netsim
A [netsim](https://github.com/ssb-ngi-pointer/netsim/) helper library. 

`ssb-netsim` allows you to write javascript to generate netsim statments. For more info regarding netsim's statements, [read the docs](https://github.com/ssb-ngi-pointer/netsim/blob/main/commands.md).

## Example
```js
var netsim = require("./index.js")
var sim = netsim()
sim.comment("start the show")

var peer = sim.peer("peer", { hops: 1, caps: "asasd", skipoffsets: true, id: "@asdasd.ed25519" })
var bob = sim.peer("bob", { hops: 1, caps: "asasd", skipoffsets: true, id: "@2asdasd.ed25519" })
peer.start("ssb-server")
bob.start("go-ssb")
sim.wait(100)
peer.follow("bob")
peer.has("bob") // equivalent to peer.has("bob", "latest")
peer.has("bob", 123)
peer.connect("bob")
peer.disconnect("bob")
peer.waituntil("bob", 1337)
peer.waituntil("bob") // equivalent to peer.waituntil("bob", "latest")
peer.post()
peer.isfollowing("bob")
peer.isnotfollowing("bob")

var a = { "content": "is king", "nested": { "type": "cool", "extremely": { "deep": "key" } }, "ary": ["one", "two", "three"] }
peer.publish(a)
peer.stop()
peer.log() // equivalent to peer.log(1)
```

"use strict";(()=>{var Bt=Object.defineProperty;var Ct=(s,t)=>{for(var e in t)Bt(s,e,{get:t[e],enumerable:!0})};var d=Object.create(null);d.open="0";d.close="1";d.ping="2";d.pong="3";d.message="4";d.upgrade="5";d.noop="6";var T=Object.create(null);Object.keys(d).forEach(s=>{T[d[s]]=s});var rt={type:"error",data:"parser error"};var St=typeof Blob=="function"||typeof Blob<"u"&&Object.prototype.toString.call(Blob)==="[object BlobConstructor]",Nt=typeof ArrayBuffer=="function",Lt=s=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(s):s&&s.buffer instanceof ArrayBuffer,Pt=({type:s,data:t},e,r)=>St&&t instanceof Blob?e?r(t):it(t,r):Nt&&(t instanceof ArrayBuffer||Lt(t))?e?r(t):it(new Blob([t]),r):r(d[s]+(t||"")),it=(s,t)=>{let e=new FileReader;return e.onload=function(){let r=e.result.split(",")[1];t("b"+r)},e.readAsDataURL(s)},q=Pt;var nt="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",R=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(let s=0;s<nt.length;s++)R[nt.charCodeAt(s)]=s;var ot=s=>{let t=s.length*.75,e=s.length,r,i=0,n,o,h,m;s[s.length-1]==="="&&(t--,s[s.length-2]==="="&&t--);let A=new ArrayBuffer(t),w=new Uint8Array(A);for(r=0;r<e;r+=4)n=R[s.charCodeAt(r)],o=R[s.charCodeAt(r+1)],h=R[s.charCodeAt(r+2)],m=R[s.charCodeAt(r+3)],w[i++]=n<<2|o>>4,w[i++]=(o&15)<<4|h>>2,w[i++]=(h&3)<<6|m&63;return A};var qt=typeof ArrayBuffer=="function",Dt=(s,t)=>{if(typeof s!="string")return{type:"message",data:ct(s,t)};let e=s.charAt(0);return e==="b"?{type:"message",data:It(s.substring(1),t)}:T[e]?s.length>1?{type:T[e],data:s.substring(1)}:{type:T[e]}:rt},It=(s,t)=>{if(qt){let e=ot(s);return ct(e,t)}else return{base64:!0,data:s}},ct=(s,t)=>{switch(t){case"blob":return s instanceof ArrayBuffer?new Blob([s]):s;case"arraybuffer":default:return s}},D=Dt;var at=String.fromCharCode(30),ht=(s,t)=>{let e=s.length,r=new Array(e),i=0;s.forEach((n,o)=>{q(n,!1,h=>{r[o]=h,++i===e&&t(r.join(at))})})},ft=(s,t)=>{let e=s.split(at),r=[];for(let i=0;i<e.length;i++){let n=D(e[i],t);if(r.push(n),n.type==="error")break}return r},X=4;function a(s){if(s)return Ft(s)}function Ft(s){for(var t in a.prototype)s[t]=a.prototype[t];return s}a.prototype.on=a.prototype.addEventListener=function(s,t){return this._callbacks=this._callbacks||{},(this._callbacks["$"+s]=this._callbacks["$"+s]||[]).push(t),this};a.prototype.once=function(s,t){function e(){this.off(s,e),t.apply(this,arguments)}return e.fn=t,this.on(s,e),this};a.prototype.off=a.prototype.removeListener=a.prototype.removeAllListeners=a.prototype.removeEventListener=function(s,t){if(this._callbacks=this._callbacks||{},arguments.length==0)return this._callbacks={},this;var e=this._callbacks["$"+s];if(!e)return this;if(arguments.length==1)return delete this._callbacks["$"+s],this;for(var r,i=0;i<e.length;i++)if(r=e[i],r===t||r.fn===t){e.splice(i,1);break}return e.length===0&&delete this._callbacks["$"+s],this};a.prototype.emit=function(s){this._callbacks=this._callbacks||{};for(var t=new Array(arguments.length-1),e=this._callbacks["$"+s],r=1;r<arguments.length;r++)t[r-1]=arguments[r];if(e){e=e.slice(0);for(var r=0,i=e.length;r<i;++r)e[r].apply(this,t)}return this};a.prototype.emitReserved=a.prototype.emit;a.prototype.listeners=function(s){return this._callbacks=this._callbacks||{},this._callbacks["$"+s]||[]};a.prototype.hasListeners=function(s){return!!this.listeners(s).length};var u=(()=>typeof self<"u"?self:typeof window<"u"?window:Function("return this")())();function I(s,...t){return t.reduce((e,r)=>(s.hasOwnProperty(r)&&(e[r]=s[r]),e),{})}var Mt=setTimeout,Vt=clearTimeout;function y(s,t){t.useNativeTimers?(s.setTimeoutFn=Mt.bind(u),s.clearTimeoutFn=Vt.bind(u)):(s.setTimeoutFn=setTimeout.bind(u),s.clearTimeoutFn=clearTimeout.bind(u))}var Ut=1.33;function lt(s){return typeof s=="string"?$t(s):Math.ceil((s.byteLength||s.size)*Ut)}function $t(s){let t=0,e=0;for(let r=0,i=s.length;r<i;r++)t=s.charCodeAt(r),t<128?e+=1:t<2048?e+=2:t<55296||t>=57344?e+=3:(r++,e+=4);return e}var W=class extends Error{constructor(t,e,r){super(t),this.description=e,this.context=r,this.type="TransportError"}},g=class extends a{constructor(t){super(),this.writable=!1,y(this,t),this.opts=t,this.query=t.query,this.readyState="",this.socket=t.socket}onError(t,e,r){return super.emitReserved("error",new W(t,e,r)),this}open(){return(this.readyState==="closed"||this.readyState==="")&&(this.readyState="opening",this.doOpen()),this}close(){return(this.readyState==="opening"||this.readyState==="open")&&(this.doClose(),this.onClose()),this}send(t){this.readyState==="open"&&this.write(t)}onOpen(){this.readyState="open",this.writable=!0,super.emitReserved("open")}onData(t){let e=D(t,this.socket.binaryType);this.onPacket(e)}onPacket(t){super.emitReserved("packet",t)}onClose(t){this.readyState="closed",super.emitReserved("close",t)}};var mt="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),J=64,Yt={},ut=0,F=0,pt;function dt(s){let t="";do t=mt[s%J]+t,s=Math.floor(s/J);while(s>0);return t}function M(){let s=dt(+new Date);return s!==pt?(ut=0,pt=s):s+"."+dt(ut++)}for(;F<J;F++)Yt[mt[F]]=F;function V(s){let t="";for(let e in s)s.hasOwnProperty(e)&&(t.length&&(t+="&"),t+=encodeURIComponent(e)+"="+encodeURIComponent(s[e]));return t}function yt(s){let t={},e=s.split("&");for(let r=0,i=e.length;r<i;r++){let n=e[r].split("=");t[decodeURIComponent(n[0])]=decodeURIComponent(n[1])}return t}var gt=!1;try{gt=typeof XMLHttpRequest<"u"&&"withCredentials"in new XMLHttpRequest}catch{}var bt=gt;function Q(s){let t=s.xdomain;try{if(typeof XMLHttpRequest<"u"&&(!t||bt))return new XMLHttpRequest}catch{}if(!t)try{return new u[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP")}catch{}}function Ht(){}var Kt=function(){return new Q({xdomain:!1}).responseType!=null}(),U=class extends g{constructor(t){if(super(t),this.polling=!1,typeof location<"u"){let r=location.protocol==="https:",i=location.port;i||(i=r?"443":"80"),this.xd=typeof location<"u"&&t.hostname!==location.hostname||i!==t.port,this.xs=t.secure!==r}let e=t&&t.forceBase64;this.supportsBinary=Kt&&!e}get name(){return"polling"}doOpen(){this.poll()}pause(t){this.readyState="pausing";let e=()=>{this.readyState="paused",t()};if(this.polling||!this.writable){let r=0;this.polling&&(r++,this.once("pollComplete",function(){--r||e()})),this.writable||(r++,this.once("drain",function(){--r||e()}))}else e()}poll(){this.polling=!0,this.doPoll(),this.emitReserved("poll")}onData(t){let e=r=>{if(this.readyState==="opening"&&r.type==="open"&&this.onOpen(),r.type==="close")return this.onClose({description:"transport closed by the server"}),!1;this.onPacket(r)};ft(t,this.socket.binaryType).forEach(e),this.readyState!=="closed"&&(this.polling=!1,this.emitReserved("pollComplete"),this.readyState==="open"&&this.poll())}doClose(){let t=()=>{this.write([{type:"close"}])};this.readyState==="open"?t():this.once("open",t)}write(t){this.writable=!1,ht(t,e=>{this.doWrite(e,()=>{this.writable=!0,this.emitReserved("drain")})})}uri(){let t=this.query||{},e=this.opts.secure?"https":"http",r="";this.opts.timestampRequests!==!1&&(t[this.opts.timestampParam]=M()),!this.supportsBinary&&!t.sid&&(t.b64=1),this.opts.port&&(e==="https"&&Number(this.opts.port)!==443||e==="http"&&Number(this.opts.port)!==80)&&(r=":"+this.opts.port);let i=V(t),n=this.opts.hostname.indexOf(":")!==-1;return e+"://"+(n?"["+this.opts.hostname+"]":this.opts.hostname)+r+this.opts.path+(i.length?"?"+i:"")}request(t={}){return Object.assign(t,{xd:this.xd,xs:this.xs},this.opts),new p(this.uri(),t)}doWrite(t,e){let r=this.request({method:"POST",data:t});r.on("success",e),r.on("error",(i,n)=>{this.onError("xhr post error",i,n)})}doPoll(){let t=this.request();t.on("data",this.onData.bind(this)),t.on("error",(e,r)=>{this.onError("xhr poll error",e,r)}),this.pollXhr=t}},p=class extends a{constructor(t,e){super(),y(this,e),this.opts=e,this.method=e.method||"GET",this.uri=t,this.async=e.async!==!1,this.data=e.data!==void 0?e.data:null,this.create()}create(){let t=I(this.opts,"agent","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","autoUnref");t.xdomain=!!this.opts.xd,t.xscheme=!!this.opts.xs;let e=this.xhr=new Q(t);try{e.open(this.method,this.uri,this.async);try{if(this.opts.extraHeaders){e.setDisableHeaderCheck&&e.setDisableHeaderCheck(!0);for(let r in this.opts.extraHeaders)this.opts.extraHeaders.hasOwnProperty(r)&&e.setRequestHeader(r,this.opts.extraHeaders[r])}}catch{}if(this.method==="POST")try{e.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch{}try{e.setRequestHeader("Accept","*/*")}catch{}"withCredentials"in e&&(e.withCredentials=this.opts.withCredentials),this.opts.requestTimeout&&(e.timeout=this.opts.requestTimeout),e.onreadystatechange=()=>{e.readyState===4&&(e.status===200||e.status===1223?this.onLoad():this.setTimeoutFn(()=>{this.onError(typeof e.status=="number"?e.status:0)},0))},e.send(this.data)}catch(r){this.setTimeoutFn(()=>{this.onError(r)},0);return}typeof document<"u"&&(this.index=p.requestsCount++,p.requests[this.index]=this)}onError(t){this.emitReserved("error",t,this.xhr),this.cleanup(!0)}cleanup(t){if(!(typeof this.xhr>"u"||this.xhr===null)){if(this.xhr.onreadystatechange=Ht,t)try{this.xhr.abort()}catch{}typeof document<"u"&&delete p.requests[this.index],this.xhr=null}}onLoad(){let t=this.xhr.responseText;t!==null&&(this.emitReserved("data",t),this.emitReserved("success"),this.cleanup())}abort(){this.cleanup()}};p.requestsCount=0;p.requests={};if(typeof document<"u"){if(typeof attachEvent=="function")attachEvent("onunload",wt);else if(typeof addEventListener=="function"){let s="onpagehide"in u?"pagehide":"unload";addEventListener(s,wt,!1)}}function wt(){for(let s in p.requests)p.requests.hasOwnProperty(s)&&p.requests[s].abort()}var kt=(()=>typeof Promise=="function"&&typeof Promise.resolve=="function"?t=>Promise.resolve().then(t):(t,e)=>e(t,0))(),O=u.WebSocket||u.MozWebSocket,Y=!0,vt="arraybuffer";var xt=typeof navigator<"u"&&typeof navigator.product=="string"&&navigator.product.toLowerCase()==="reactnative",H=class extends g{constructor(t){super(t),this.supportsBinary=!t.forceBase64}get name(){return"websocket"}doOpen(){if(!this.check())return;let t=this.uri(),e=this.opts.protocols,r=xt?{}:I(this.opts,"agent","perMessageDeflate","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","localAddress","protocolVersion","origin","maxPayload","family","checkServerIdentity");this.opts.extraHeaders&&(r.headers=this.opts.extraHeaders);try{this.ws=Y&&!xt?e?new O(t,e):new O(t):new O(t,e,r)}catch(i){return this.emitReserved("error",i)}this.ws.binaryType=this.socket.binaryType||vt,this.addEventListeners()}addEventListeners(){this.ws.onopen=()=>{this.opts.autoUnref&&this.ws._socket.unref(),this.onOpen()},this.ws.onclose=t=>this.onClose({description:"websocket connection closed",context:t}),this.ws.onmessage=t=>this.onData(t.data),this.ws.onerror=t=>this.onError("websocket error",t)}write(t){this.writable=!1;for(let e=0;e<t.length;e++){let r=t[e],i=e===t.length-1;q(r,this.supportsBinary,n=>{let o={};Y||(r.options&&(o.compress=r.options.compress),this.opts.perMessageDeflate&&(typeof n=="string"?Buffer.byteLength(n):n.length)<this.opts.perMessageDeflate.threshold&&(o.compress=!1));try{Y?this.ws.send(n):this.ws.send(n,o)}catch{}i&&kt(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){typeof this.ws<"u"&&(this.ws.close(),this.ws=null)}uri(){let t=this.query||{},e=this.opts.secure?"wss":"ws",r="";this.opts.port&&(e==="wss"&&Number(this.opts.port)!==443||e==="ws"&&Number(this.opts.port)!==80)&&(r=":"+this.opts.port),this.opts.timestampRequests&&(t[this.opts.timestampParam]=M()),this.supportsBinary||(t.b64=1);let i=V(t),n=this.opts.hostname.indexOf(":")!==-1;return e+"://"+(n?"["+this.opts.hostname+"]":this.opts.hostname)+r+this.opts.path+(i.length?"?"+i:"")}check(){return!!O}};var G={websocket:H,polling:U};var zt=/^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,Xt=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];function v(s){let t=s,e=s.indexOf("["),r=s.indexOf("]");e!=-1&&r!=-1&&(s=s.substring(0,e)+s.substring(e,r).replace(/:/g,";")+s.substring(r,s.length));let i=zt.exec(s||""),n={},o=14;for(;o--;)n[Xt[o]]=i[o]||"";return e!=-1&&r!=-1&&(n.source=t,n.host=n.host.substring(1,n.host.length-1).replace(/;/g,":"),n.authority=n.authority.replace("[","").replace("]","").replace(/;/g,":"),n.ipv6uri=!0),n.pathNames=Wt(n,n.path),n.queryKey=Jt(n,n.query),n}function Wt(s,t){let e=/\/{2,9}/g,r=t.replace(e,"/").split("/");return(t.substr(0,1)=="/"||t.length===0)&&r.splice(0,1),t.substr(t.length-1,1)=="/"&&r.splice(r.length-1,1),r}function Jt(s,t){let e={};return t.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,function(r,i,n){i&&(e[i]=n)}),e}var f=class extends a{constructor(t,e={}){super(),t&&typeof t=="object"&&(e=t,t=null),t?(t=v(t),e.hostname=t.host,e.secure=t.protocol==="https"||t.protocol==="wss",e.port=t.port,t.query&&(e.query=t.query)):e.host&&(e.hostname=v(e.host).host),y(this,e),this.secure=e.secure!=null?e.secure:typeof location<"u"&&location.protocol==="https:",e.hostname&&!e.port&&(e.port=this.secure?"443":"80"),this.hostname=e.hostname||(typeof location<"u"?location.hostname:"localhost"),this.port=e.port||(typeof location<"u"&&location.port?location.port:this.secure?"443":"80"),this.transports=e.transports||["polling","websocket"],this.readyState="",this.writeBuffer=[],this.prevBufferLen=0,this.opts=Object.assign({path:"/engine.io",agent:!1,withCredentials:!1,upgrade:!0,timestampParam:"t",rememberUpgrade:!1,rejectUnauthorized:!0,perMessageDeflate:{threshold:1024},transportOptions:{},closeOnBeforeunload:!0},e),this.opts.path=this.opts.path.replace(/\/$/,"")+"/",typeof this.opts.query=="string"&&(this.opts.query=yt(this.opts.query)),this.id=null,this.upgrades=null,this.pingInterval=null,this.pingTimeout=null,this.pingTimeoutTimer=null,typeof addEventListener=="function"&&(this.opts.closeOnBeforeunload&&addEventListener("beforeunload",()=>{this.transport&&(this.transport.removeAllListeners(),this.transport.close())},!1),this.hostname!=="localhost"&&(this.offlineEventListener=()=>{this.onClose("transport close",{description:"network connection lost"})},addEventListener("offline",this.offlineEventListener,!1))),this.open()}createTransport(t){let e=Object.assign({},this.opts.query);e.EIO=X,e.transport=t,this.id&&(e.sid=this.id);let r=Object.assign({},this.opts.transportOptions[t],this.opts,{query:e,socket:this,hostname:this.hostname,secure:this.secure,port:this.port});return new G[t](r)}open(){let t;if(this.opts.rememberUpgrade&&f.priorWebsocketSuccess&&this.transports.indexOf("websocket")!==-1)t="websocket";else if(this.transports.length===0){this.setTimeoutFn(()=>{this.emitReserved("error","No transports available")},0);return}else t=this.transports[0];this.readyState="opening";try{t=this.createTransport(t)}catch{this.transports.shift(),this.open();return}t.open(),this.setTransport(t)}setTransport(t){this.transport&&this.transport.removeAllListeners(),this.transport=t,t.on("drain",this.onDrain.bind(this)).on("packet",this.onPacket.bind(this)).on("error",this.onError.bind(this)).on("close",e=>this.onClose("transport close",e))}probe(t){let e=this.createTransport(t),r=!1;f.priorWebsocketSuccess=!1;let i=()=>{r||(e.send([{type:"ping",data:"probe"}]),e.once("packet",k=>{if(!r)if(k.type==="pong"&&k.data==="probe"){if(this.upgrading=!0,this.emitReserved("upgrading",e),!e)return;f.priorWebsocketSuccess=e.name==="websocket",this.transport.pause(()=>{r||this.readyState!=="closed"&&(w(),this.setTransport(e),e.send([{type:"upgrade"}]),this.emitReserved("upgrade",e),e=null,this.upgrading=!1,this.flush())})}else{let _=new Error("probe error");_.transport=e.name,this.emitReserved("upgradeError",_)}}))};function n(){r||(r=!0,w(),e.close(),e=null)}let o=k=>{let _=new Error("probe error: "+k);_.transport=e.name,n(),this.emitReserved("upgradeError",_)};function h(){o("transport closed")}function m(){o("socket closed")}function A(k){e&&k.name!==e.name&&n()}let w=()=>{e.removeListener("open",i),e.removeListener("error",o),e.removeListener("close",h),this.off("close",m),this.off("upgrading",A)};e.once("open",i),e.once("error",o),e.once("close",h),this.once("close",m),this.once("upgrading",A),e.open()}onOpen(){if(this.readyState="open",f.priorWebsocketSuccess=this.transport.name==="websocket",this.emitReserved("open"),this.flush(),this.readyState==="open"&&this.opts.upgrade&&this.transport.pause){let t=0,e=this.upgrades.length;for(;t<e;t++)this.probe(this.upgrades[t])}}onPacket(t){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing")switch(this.emitReserved("packet",t),this.emitReserved("heartbeat"),t.type){case"open":this.onHandshake(JSON.parse(t.data));break;case"ping":this.resetPingTimeout(),this.sendPacket("pong"),this.emitReserved("ping"),this.emitReserved("pong");break;case"error":let e=new Error("server error");e.code=t.data,this.onError(e);break;case"message":this.emitReserved("data",t.data),this.emitReserved("message",t.data);break}}onHandshake(t){this.emitReserved("handshake",t),this.id=t.sid,this.transport.query.sid=t.sid,this.upgrades=this.filterUpgrades(t.upgrades),this.pingInterval=t.pingInterval,this.pingTimeout=t.pingTimeout,this.maxPayload=t.maxPayload,this.onOpen(),this.readyState!=="closed"&&this.resetPingTimeout()}resetPingTimeout(){this.clearTimeoutFn(this.pingTimeoutTimer),this.pingTimeoutTimer=this.setTimeoutFn(()=>{this.onClose("ping timeout")},this.pingInterval+this.pingTimeout),this.opts.autoUnref&&this.pingTimeoutTimer.unref()}onDrain(){this.writeBuffer.splice(0,this.prevBufferLen),this.prevBufferLen=0,this.writeBuffer.length===0?this.emitReserved("drain"):this.flush()}flush(){if(this.readyState!=="closed"&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length){let t=this.getWritablePackets();this.transport.send(t),this.prevBufferLen=t.length,this.emitReserved("flush")}}getWritablePackets(){if(!(this.maxPayload&&this.transport.name==="polling"&&this.writeBuffer.length>1))return this.writeBuffer;let e=1;for(let r=0;r<this.writeBuffer.length;r++){let i=this.writeBuffer[r].data;if(i&&(e+=lt(i)),r>0&&e>this.maxPayload)return this.writeBuffer.slice(0,r);e+=2}return this.writeBuffer}write(t,e,r){return this.sendPacket("message",t,e,r),this}send(t,e,r){return this.sendPacket("message",t,e,r),this}sendPacket(t,e,r,i){if(typeof e=="function"&&(i=e,e=void 0),typeof r=="function"&&(i=r,r=null),this.readyState==="closing"||this.readyState==="closed")return;r=r||{},r.compress=r.compress!==!1;let n={type:t,data:e,options:r};this.emitReserved("packetCreate",n),this.writeBuffer.push(n),i&&this.once("flush",i),this.flush()}close(){let t=()=>{this.onClose("forced close"),this.transport.close()},e=()=>{this.off("upgrade",e),this.off("upgradeError",e),t()},r=()=>{this.once("upgrade",e),this.once("upgradeError",e)};return(this.readyState==="opening"||this.readyState==="open")&&(this.readyState="closing",this.writeBuffer.length?this.once("drain",()=>{this.upgrading?r():t()}):this.upgrading?r():t()),this}onError(t){f.priorWebsocketSuccess=!1,this.emitReserved("error",t),this.onClose("transport error",t)}onClose(t,e){(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing")&&(this.clearTimeoutFn(this.pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),typeof removeEventListener=="function"&&removeEventListener("offline",this.offlineEventListener,!1),this.readyState="closed",this.id=null,this.emitReserved("close",t,e),this.writeBuffer=[],this.prevBufferLen=0)}filterUpgrades(t){let e=[],r=0,i=t.length;for(;r<i;r++)~this.transports.indexOf(t[r])&&e.push(t[r]);return e}};f.protocol=X;var ns=f.protocol;function Et(s,t="",e){let r=s;e=e||typeof location<"u"&&location,s==null&&(s=e.protocol+"//"+e.host),typeof s=="string"&&(s.charAt(0)==="/"&&(s.charAt(1)==="/"?s=e.protocol+s:s=e.host+s),/^(https?|wss?):\/\//.test(s)||(typeof e<"u"?s=e.protocol+"//"+s:s="https://"+s),r=v(s)),r.port||(/^(http|ws)$/.test(r.protocol)?r.port="80":/^(http|ws)s$/.test(r.protocol)&&(r.port="443")),r.path=r.path||"/";let n=r.host.indexOf(":")!==-1?"["+r.host+"]":r.host;return r.id=r.protocol+"://"+n+":"+r.port+t,r.href=r.protocol+"://"+n+(e&&e.port===r.port?"":":"+r.port),r}var st={};Ct(st,{Decoder:()=>S,Encoder:()=>tt,PacketType:()=>c,protocol:()=>Rt});var Qt=typeof ArrayBuffer=="function",Gt=s=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(s):s.buffer instanceof ArrayBuffer,At=Object.prototype.toString,Zt=typeof Blob=="function"||typeof Blob<"u"&&At.call(Blob)==="[object BlobConstructor]",jt=typeof File=="function"||typeof File<"u"&&At.call(File)==="[object FileConstructor]";function C(s){return Qt&&(s instanceof ArrayBuffer||Gt(s))||Zt&&s instanceof Blob||jt&&s instanceof File}function B(s,t){if(!s||typeof s!="object")return!1;if(Array.isArray(s)){for(let e=0,r=s.length;e<r;e++)if(B(s[e]))return!0;return!1}if(C(s))return!0;if(s.toJSON&&typeof s.toJSON=="function"&&arguments.length===1)return B(s.toJSON(),!0);for(let e in s)if(Object.prototype.hasOwnProperty.call(s,e)&&B(s[e]))return!0;return!1}function _t(s){let t=[],e=s.data,r=s;return r.data=Z(e,t),r.attachments=t.length,{packet:r,buffers:t}}function Z(s,t){if(!s)return s;if(C(s)){let e={_placeholder:!0,num:t.length};return t.push(s),e}else if(Array.isArray(s)){let e=new Array(s.length);for(let r=0;r<s.length;r++)e[r]=Z(s[r],t);return e}else if(typeof s=="object"&&!(s instanceof Date)){let e={};for(let r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=Z(s[r],t));return e}return s}function Tt(s,t){return s.data=j(s.data,t),s.attachments=void 0,s}function j(s,t){if(!s)return s;if(s&&s._placeholder===!0){if(typeof s.num=="number"&&s.num>=0&&s.num<t.length)return t[s.num];throw new Error("illegal attachments")}else if(Array.isArray(s))for(let e=0;e<s.length;e++)s[e]=j(s[e],t);else if(typeof s=="object")for(let e in s)Object.prototype.hasOwnProperty.call(s,e)&&(s[e]=j(s[e],t));return s}var Rt=5,c;(function(s){s[s.CONNECT=0]="CONNECT",s[s.DISCONNECT=1]="DISCONNECT",s[s.EVENT=2]="EVENT",s[s.ACK=3]="ACK",s[s.CONNECT_ERROR=4]="CONNECT_ERROR",s[s.BINARY_EVENT=5]="BINARY_EVENT",s[s.BINARY_ACK=6]="BINARY_ACK"})(c||(c={}));var tt=class{constructor(t){this.replacer=t}encode(t){return(t.type===c.EVENT||t.type===c.ACK)&&B(t)?(t.type=t.type===c.EVENT?c.BINARY_EVENT:c.BINARY_ACK,this.encodeAsBinary(t)):[this.encodeAsString(t)]}encodeAsString(t){let e=""+t.type;return(t.type===c.BINARY_EVENT||t.type===c.BINARY_ACK)&&(e+=t.attachments+"-"),t.nsp&&t.nsp!=="/"&&(e+=t.nsp+","),t.id!=null&&(e+=t.id),t.data!=null&&(e+=JSON.stringify(t.data,this.replacer)),e}encodeAsBinary(t){let e=_t(t),r=this.encodeAsString(e.packet),i=e.buffers;return i.unshift(r),i}},S=class extends a{constructor(t){super(),this.reviver=t}add(t){let e;if(typeof t=="string"){if(this.reconstructor)throw new Error("got plaintext data when reconstructing a packet");e=this.decodeString(t),e.type===c.BINARY_EVENT||e.type===c.BINARY_ACK?(this.reconstructor=new et(e),e.attachments===0&&super.emitReserved("decoded",e)):super.emitReserved("decoded",e)}else if(C(t)||t.base64)if(this.reconstructor)e=this.reconstructor.takeBinaryData(t),e&&(this.reconstructor=null,super.emitReserved("decoded",e));else throw new Error("got binary data when not reconstructing a packet");else throw new Error("Unknown type: "+t)}decodeString(t){let e=0,r={type:Number(t.charAt(0))};if(c[r.type]===void 0)throw new Error("unknown packet type "+r.type);if(r.type===c.BINARY_EVENT||r.type===c.BINARY_ACK){let n=e+1;for(;t.charAt(++e)!=="-"&&e!=t.length;);let o=t.substring(n,e);if(o!=Number(o)||t.charAt(e)!=="-")throw new Error("Illegal attachments");r.attachments=Number(o)}if(t.charAt(e+1)==="/"){let n=e+1;for(;++e&&!(t.charAt(e)===","||e===t.length););r.nsp=t.substring(n,e)}else r.nsp="/";let i=t.charAt(e+1);if(i!==""&&Number(i)==i){let n=e+1;for(;++e;){let o=t.charAt(e);if(o==null||Number(o)!=o){--e;break}if(e===t.length)break}r.id=Number(t.substring(n,e+1))}if(t.charAt(++e)){let n=this.tryParse(t.substr(e));if(S.isPayloadValid(r.type,n))r.data=n;else throw new Error("invalid payload")}return r}tryParse(t){try{return JSON.parse(t,this.reviver)}catch{return!1}}static isPayloadValid(t,e){switch(t){case c.CONNECT:return typeof e=="object";case c.DISCONNECT:return e===void 0;case c.CONNECT_ERROR:return typeof e=="string"||typeof e=="object";case c.EVENT:case c.BINARY_EVENT:return Array.isArray(e)&&e.length>0;case c.ACK:case c.BINARY_ACK:return Array.isArray(e)}}destroy(){this.reconstructor&&this.reconstructor.finishedReconstruction()}},et=class{constructor(t){this.packet=t,this.buffers=[],this.reconPack=t}takeBinaryData(t){if(this.buffers.push(t),this.buffers.length===this.reconPack.attachments){let e=Tt(this.reconPack,this.buffers);return this.finishedReconstruction(),e}return null}finishedReconstruction(){this.reconPack=null,this.buffers=[]}};function l(s,t,e){return s.on(t,e),function(){s.off(t,e)}}var te=Object.freeze({connect:1,connect_error:1,disconnect:1,disconnecting:1,newListener:1,removeListener:1}),x=class extends a{constructor(t,e,r){super(),this.connected=!1,this.receiveBuffer=[],this.sendBuffer=[],this.ids=0,this.acks={},this.flags={},this.io=t,this.nsp=e,r&&r.auth&&(this.auth=r.auth),this.io._autoConnect&&this.open()}get disconnected(){return!this.connected}subEvents(){if(this.subs)return;let t=this.io;this.subs=[l(t,"open",this.onopen.bind(this)),l(t,"packet",this.onpacket.bind(this)),l(t,"error",this.onerror.bind(this)),l(t,"close",this.onclose.bind(this))]}get active(){return!!this.subs}connect(){return this.connected?this:(this.subEvents(),this.io._reconnecting||this.io.open(),this.io._readyState==="open"&&this.onopen(),this)}open(){return this.connect()}send(...t){return t.unshift("message"),this.emit.apply(this,t),this}emit(t,...e){if(te.hasOwnProperty(t))throw new Error('"'+t+'" is a reserved event name');e.unshift(t);let r={type:c.EVENT,data:e};if(r.options={},r.options.compress=this.flags.compress!==!1,typeof e[e.length-1]=="function"){let o=this.ids++,h=e.pop();this._registerAckCallback(o,h),r.id=o}let i=this.io.engine&&this.io.engine.transport&&this.io.engine.transport.writable;return this.flags.volatile&&(!i||!this.connected)||(this.connected?(this.notifyOutgoingListeners(r),this.packet(r)):this.sendBuffer.push(r)),this.flags={},this}_registerAckCallback(t,e){let r=this.flags.timeout;if(r===void 0){this.acks[t]=e;return}let i=this.io.setTimeoutFn(()=>{delete this.acks[t];for(let n=0;n<this.sendBuffer.length;n++)this.sendBuffer[n].id===t&&this.sendBuffer.splice(n,1);e.call(this,new Error("operation has timed out"))},r);this.acks[t]=(...n)=>{this.io.clearTimeoutFn(i),e.apply(this,[null,...n])}}packet(t){t.nsp=this.nsp,this.io._packet(t)}onopen(){typeof this.auth=="function"?this.auth(t=>{this.packet({type:c.CONNECT,data:t})}):this.packet({type:c.CONNECT,data:this.auth})}onerror(t){this.connected||this.emitReserved("connect_error",t)}onclose(t,e){this.connected=!1,delete this.id,this.emitReserved("disconnect",t,e)}onpacket(t){if(t.nsp===this.nsp)switch(t.type){case c.CONNECT:if(t.data&&t.data.sid){let i=t.data.sid;this.onconnect(i)}else this.emitReserved("connect_error",new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));break;case c.EVENT:case c.BINARY_EVENT:this.onevent(t);break;case c.ACK:case c.BINARY_ACK:this.onack(t);break;case c.DISCONNECT:this.ondisconnect();break;case c.CONNECT_ERROR:this.destroy();let r=new Error(t.data.message);r.data=t.data.data,this.emitReserved("connect_error",r);break}}onevent(t){let e=t.data||[];t.id!=null&&e.push(this.ack(t.id)),this.connected?this.emitEvent(e):this.receiveBuffer.push(Object.freeze(e))}emitEvent(t){if(this._anyListeners&&this._anyListeners.length){let e=this._anyListeners.slice();for(let r of e)r.apply(this,t)}super.emit.apply(this,t)}ack(t){let e=this,r=!1;return function(...i){r||(r=!0,e.packet({type:c.ACK,id:t,data:i}))}}onack(t){let e=this.acks[t.id];typeof e=="function"&&(e.apply(this,t.data),delete this.acks[t.id])}onconnect(t){this.id=t,this.connected=!0,this.emitBuffered(),this.emitReserved("connect")}emitBuffered(){this.receiveBuffer.forEach(t=>this.emitEvent(t)),this.receiveBuffer=[],this.sendBuffer.forEach(t=>{this.notifyOutgoingListeners(t),this.packet(t)}),this.sendBuffer=[]}ondisconnect(){this.destroy(),this.onclose("io server disconnect")}destroy(){this.subs&&(this.subs.forEach(t=>t()),this.subs=void 0),this.io._destroy(this)}disconnect(){return this.connected&&this.packet({type:c.DISCONNECT}),this.destroy(),this.connected&&this.onclose("io client disconnect"),this}close(){return this.disconnect()}compress(t){return this.flags.compress=t,this}get volatile(){return this.flags.volatile=!0,this}timeout(t){return this.flags.timeout=t,this}onAny(t){return this._anyListeners=this._anyListeners||[],this._anyListeners.push(t),this}prependAny(t){return this._anyListeners=this._anyListeners||[],this._anyListeners.unshift(t),this}offAny(t){if(!this._anyListeners)return this;if(t){let e=this._anyListeners;for(let r=0;r<e.length;r++)if(t===e[r])return e.splice(r,1),this}else this._anyListeners=[];return this}listenersAny(){return this._anyListeners||[]}onAnyOutgoing(t){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.push(t),this}prependAnyOutgoing(t){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.unshift(t),this}offAnyOutgoing(t){if(!this._anyOutgoingListeners)return this;if(t){let e=this._anyOutgoingListeners;for(let r=0;r<e.length;r++)if(t===e[r])return e.splice(r,1),this}else this._anyOutgoingListeners=[];return this}listenersAnyOutgoing(){return this._anyOutgoingListeners||[]}notifyOutgoingListeners(t){if(this._anyOutgoingListeners&&this._anyOutgoingListeners.length){let e=this._anyOutgoingListeners.slice();for(let r of e)r.apply(this,t.data)}}};function b(s){s=s||{},this.ms=s.min||100,this.max=s.max||1e4,this.factor=s.factor||2,this.jitter=s.jitter>0&&s.jitter<=1?s.jitter:0,this.attempts=0}b.prototype.duration=function(){var s=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var t=Math.random(),e=Math.floor(t*this.jitter*s);s=(Math.floor(t*10)&1)==0?s-e:s+e}return Math.min(s,this.max)|0};b.prototype.reset=function(){this.attempts=0};b.prototype.setMin=function(s){this.ms=s};b.prototype.setMax=function(s){this.max=s};b.prototype.setJitter=function(s){this.jitter=s};var E=class extends a{constructor(t,e){var r;super(),this.nsps={},this.subs=[],t&&typeof t=="object"&&(e=t,t=void 0),e=e||{},e.path=e.path||"/socket.io",this.opts=e,y(this,e),this.reconnection(e.reconnection!==!1),this.reconnectionAttempts(e.reconnectionAttempts||1/0),this.reconnectionDelay(e.reconnectionDelay||1e3),this.reconnectionDelayMax(e.reconnectionDelayMax||5e3),this.randomizationFactor((r=e.randomizationFactor)!==null&&r!==void 0?r:.5),this.backoff=new b({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(e.timeout==null?2e4:e.timeout),this._readyState="closed",this.uri=t;let i=e.parser||st;this.encoder=new i.Encoder,this.decoder=new i.Decoder,this._autoConnect=e.autoConnect!==!1,this._autoConnect&&this.open()}reconnection(t){return arguments.length?(this._reconnection=!!t,this):this._reconnection}reconnectionAttempts(t){return t===void 0?this._reconnectionAttempts:(this._reconnectionAttempts=t,this)}reconnectionDelay(t){var e;return t===void 0?this._reconnectionDelay:(this._reconnectionDelay=t,(e=this.backoff)===null||e===void 0||e.setMin(t),this)}randomizationFactor(t){var e;return t===void 0?this._randomizationFactor:(this._randomizationFactor=t,(e=this.backoff)===null||e===void 0||e.setJitter(t),this)}reconnectionDelayMax(t){var e;return t===void 0?this._reconnectionDelayMax:(this._reconnectionDelayMax=t,(e=this.backoff)===null||e===void 0||e.setMax(t),this)}timeout(t){return arguments.length?(this._timeout=t,this):this._timeout}maybeReconnectOnOpen(){!this._reconnecting&&this._reconnection&&this.backoff.attempts===0&&this.reconnect()}open(t){if(~this._readyState.indexOf("open"))return this;this.engine=new f(this.uri,this.opts);let e=this.engine,r=this;this._readyState="opening",this.skipReconnect=!1;let i=l(e,"open",function(){r.onopen(),t&&t()}),n=l(e,"error",o=>{r.cleanup(),r._readyState="closed",this.emitReserved("error",o),t?t(o):r.maybeReconnectOnOpen()});if(this._timeout!==!1){let o=this._timeout;o===0&&i();let h=this.setTimeoutFn(()=>{i(),e.close(),e.emit("error",new Error("timeout"))},o);this.opts.autoUnref&&h.unref(),this.subs.push(function(){clearTimeout(h)})}return this.subs.push(i),this.subs.push(n),this}connect(t){return this.open(t)}onopen(){this.cleanup(),this._readyState="open",this.emitReserved("open");let t=this.engine;this.subs.push(l(t,"ping",this.onping.bind(this)),l(t,"data",this.ondata.bind(this)),l(t,"error",this.onerror.bind(this)),l(t,"close",this.onclose.bind(this)),l(this.decoder,"decoded",this.ondecoded.bind(this)))}onping(){this.emitReserved("ping")}ondata(t){this.decoder.add(t)}ondecoded(t){this.emitReserved("packet",t)}onerror(t){this.emitReserved("error",t)}socket(t,e){let r=this.nsps[t];return r||(r=new x(this,t,e),this.nsps[t]=r),r}_destroy(t){let e=Object.keys(this.nsps);for(let r of e)if(this.nsps[r].active)return;this._close()}_packet(t){let e=this.encoder.encode(t);for(let r=0;r<e.length;r++)this.engine.write(e[r],t.options)}cleanup(){this.subs.forEach(t=>t()),this.subs.length=0,this.decoder.destroy()}_close(){this.skipReconnect=!0,this._reconnecting=!1,this.onclose("forced close"),this.engine&&this.engine.close()}disconnect(){return this._close()}onclose(t,e){this.cleanup(),this.backoff.reset(),this._readyState="closed",this.emitReserved("close",t,e),this._reconnection&&!this.skipReconnect&&this.reconnect()}reconnect(){if(this._reconnecting||this.skipReconnect)return this;let t=this;if(this.backoff.attempts>=this._reconnectionAttempts)this.backoff.reset(),this.emitReserved("reconnect_failed"),this._reconnecting=!1;else{let e=this.backoff.duration();this._reconnecting=!0;let r=this.setTimeoutFn(()=>{t.skipReconnect||(this.emitReserved("reconnect_attempt",t.backoff.attempts),!t.skipReconnect&&t.open(i=>{i?(t._reconnecting=!1,t.reconnect(),this.emitReserved("reconnect_error",i)):t.onreconnect()}))},e);this.opts.autoUnref&&r.unref(),this.subs.push(function(){clearTimeout(r)})}}onreconnect(){let t=this.backoff.attempts;this._reconnecting=!1,this.backoff.reset(),this.emitReserved("reconnect",t)}};var N={};function L(s,t){typeof s=="object"&&(t=s,s=void 0),t=t||{};let e=Et(s,t.path||"/socket.io"),r=e.source,i=e.id,n=e.path,o=N[i]&&n in N[i].nsps,h=t.forceNew||t["force new connection"]||t.multiplex===!1||o,m;return h?m=new E(r,t):(N[i]||(N[i]=new E(r,t)),m=N[i]),e.query&&!t.query&&(t.query=e.queryKey),m.socket(e.path,t)}Object.assign(L,{Manager:E,Socket:x,io:L,connect:L});var z=L(),P=!0,K;function ee(){let s={};return $(".board button").each(function(){let t=$(this).attr("id");t&&(s[t]=$(this).text()||"")}),s}function se(){let s=ee(),t=["XXX","OOO"],e=[s.r0c0+s.r0c1+s.r0c2,s.r1c0+s.r1c1+s.r1c2,s.r2c0+s.r2c1+s.r2c2,s.r0c0+s.r1c0+s.r2c0,s.r0c1+s.r1c1+s.r2c1,s.r0c2+s.r1c2+s.r2c2,s.r0c0+s.r1c1+s.r2c2,s.r0c2+s.r1c1+s.r2c0];for(let r of e)if(r===t[0]||r===t[1])return!0;return!1}function Ot(){P?($("#message").text("Your turn."),$(".board button").removeAttr("disabled")):($("#message").text("Your opponent's turn"),$(".board button").prop("disabled",!0))}function re(s){!P||$(s.target).text().length||z.emit("make.move",{symbol:K,position:$(s.target).attr("id")})}z.on("move.made",function(s){$("#"+s.position).text(s.symbol),P=s.symbol!==K,se()?(P?$("#message").text("You lost."):$("#message").text("You won!"),$(".board button").prop("disabled",!0)):Ot()});z.on("game.begin",function(s){K=s.symbol,P=K==="X",Ot()});z.on("opponent.left",function(){$("#message").text("Your opponent left the game."),$(".board button").attr("disabled","")});$(function(){$(".board button").prop("disabled",!0),$(".board> button").on("click",re)});})();
//# sourceMappingURL=script.js.map

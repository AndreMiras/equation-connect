(this["webpackJsonpequation-connect"]=this["webpackJsonpequation-connect"]||[]).push([[0],{68:function(e,t,n){},78:function(e,t,n){"use strict";n.r(t);var c=n(1),r=n.n(c),a=n(32),s=n.n(a),i=(n(68),n(43)),j=n(16),u=(n(69),n(81)),o=n(37),l=n(62),b=n(61),d=n(8),O=n(0),x=n.n(O),h=n(5),p=n(14),f=n(85),m=n(3),v={uid:"",email:null,isAnonymous:!0},g={user:v,setUser:function(){}},y=Object(c.createContext)(g),S=function(e){var t=e.children,n=Object(c.useState)(g.user),r=Object(p.a)(n,2),a=r[0],s=r[1];return Object(m.jsx)(y.Provider,{value:{user:a,setUser:s},children:t})},w=n(59),C=n(24),T=n(38),k=Object(w.a)({apiKey:"AIzaSyDfqBq3AfIg1wPjuHse3eiXqeDIxnhvp6U",authDomain:"oem1-elife-cloud-prod.firebaseapp.com",databaseURL:"https://oem2-elife-cloud-prod-default-rtdb.firebaseio.com",projectId:"oem2-elife-cloud-prod",storageBucket:"oem2-elife-cloud-prod.appspot.com",appId:"1:150904115315:android:03aeef2c831bbda0061a06"}),E=Object(C.d)(),N=Object(T.a)(k),_=function(){var e=Object(h.a)(x.a.mark((function e(t,n){var c,r;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(T.c)(N,t,n);case 2:return c=e.sent,r=c.user,e.abrupt("return",r);case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),A=function(){var e=Object(h.a)(x.a.mark((function e(t){var n,c;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"installations2",e.next=3,Object(C.c)(Object(C.f)(Object(C.g)(E,"installations2"),Object(C.e)("userid"),Object(C.b)(t)));case 3:return n=e.sent,c=n.val(),e.abrupt("return",c);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),P=function(){var e=Object(h.a)(x.a.mark((function e(t){var n,c,r;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="devices/".concat(t),e.next=3,Object(C.c)(Object(C.a)(Object(C.g)(E),n));case 3:return c=e.sent,r=c.val(),e.abrupt("return",r);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),L=n(55),B=n.n(L),D=function(e){var t=e.id,n=e.name,c=e.type,r=e.comfort,a=e.eco,s=e.temp,j=e.power,u=e.mode,o=e.devices;return Object(m.jsx)(m.Fragment,{children:Object(m.jsx)(f.a,{className:"mb-3",children:Object(m.jsxs)(f.a.Body,{children:[Object(m.jsx)(f.a.Title,{children:n}),Object(m.jsxs)(f.a.Subtitle,{className:"mb-2 text-muted",children:[s,"\xb0"]}),Object(m.jsx)(f.a.Text,{children:Object(m.jsxs)("ul",{children:[Object(m.jsxs)("li",{children:["id: ",t]}),Object(m.jsxs)("li",{children:["type: ",c]}),Object(m.jsxs)("li",{children:["comfort: ",r,"\xb0"]}),Object(m.jsxs)("li",{children:["eco: ",a,"\xb0"]}),Object(m.jsxs)("li",{children:["temp: ",s,"\xb0"]}),Object(m.jsxs)("li",{children:["power: ",j.toString()]}),Object(m.jsxs)("li",{children:["mode: ",u]}),Object(m.jsxs)("li",{children:["devices: ",Object.keys(o).length]}),Object(m.jsx)("ul",{children:Object.keys(o).map((function(e){return Object(m.jsx)("li",{children:Object(m.jsx)(i.b,{to:"/devices/".concat(e),children:e})},e)}))})]})})]})})})},q=function(e){var t=e.zones;return Object(m.jsx)(m.Fragment,{children:t&&Object.keys(t).map((function(e){return Object(m.jsx)(D,Object(d.a)({},t[e]),e)}))})},F=function(e){var t=e.name,n=(e.power,e.location),c=e.latitude,r=e.longitude,a=e.zones,s=Object(L.useOpenWeather)({key:Object({NODE_ENV:"production",PUBLIC_URL:"/equation-connect",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).REACT_APP_OPEN_WEATHER_API_KEY,lat:c.toString(),lon:r.toString(),lang:"en",unit:"metric"}),i=s.data,j=s.isLoading,u=s.errorMessage;return Object(m.jsxs)("div",{children:[Object(m.jsx)(f.a,{className:"mb-3",children:Object(m.jsxs)(f.a.Body,{children:[Object(m.jsx)(f.a.Title,{children:t}),Object(m.jsx)(f.a.Text,{children:Object(m.jsx)(B.a,{isLoading:j,errorMessage:u,data:i,lang:"en",locationLabel:n,unitsLabels:{temperature:"C",windSpeed:"Km/h"},showForecast:!0})})]})}),Object(m.jsx)(q,{zones:a})]})},I=function(){var e=Object(c.useState)(null),t=Object(p.a)(e,2),n=t[0],r=t[1],a=Object(c.useContext)(y).user;return Object(c.useEffect)((function(){(function(){var e=Object(h.a)(x.a.mark((function e(){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=r,e.next=3,A(a.uid);case 3:e.t1=e.sent,(0,e.t0)(e.t1);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[a.uid]),Object(m.jsxs)("div",{children:[n&&Object.keys(n).map((function(e){return Object(m.jsx)(F,Object(d.a)({},n[e]),e)})),Object(m.jsx)(f.a,{className:"mb-3",children:Object(m.jsxs)(f.a.Body,{children:[Object(m.jsx)(f.a.Title,{children:"Debug"}),Object(m.jsx)(f.a.Text,{children:Object(m.jsx)("pre",{children:JSON.stringify(n,null,2)})})]})})]})},U=function(){return Object(c.useContext)(y).user.isAnonymous?Object(m.jsx)("div",{}):Object(m.jsx)(I,{})},R=n(56),K=n(82),H=n(83),W=n(84),z=n(80),J=function(){var e=Object(c.useState)(""),t=Object(p.a)(e,2),n=t[0],r=t[1],a=Object(c.useState)(""),s=Object(p.a)(a,2),i=s[0],j=s[1],u=Object(c.useContext)(y).setUser;Object(c.useEffect)((function(){var e=Object(T.a)();Object(T.b)(e,(function(e){u(null===e?v:e)}))}),[u]);var o=function(){var e=Object(h.a)(x.a.mark((function e(){var t;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,_(n,i);case 3:t=e.sent,u(t),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.error(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();return Object(m.jsxs)(W.a,{className:"d-flex",onSubmit:function(e){return e.preventDefault()},children:[Object(m.jsx)(W.a.Control,{type:"email",placeholder:"Email",className:"me-2","aria-label":"Email",onChange:function(e){return r(e.target.value)}}),Object(m.jsx)(W.a.Control,{type:"password",placeholder:"Password",className:"me-2","aria-label":"Password",onChange:function(e){return j(e.target.value)}}),Object(m.jsx)(z.a,{type:"submit",onClick:function(e){return o()},children:"Login"})]})},M=function(){var e=Object(c.useContext)(y).setUser,t=function(){var t=Object(h.a)(x.a.mark((function t(){return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:Object(T.d)(N),e(v);case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(m.jsx)(z.a,{type:"submit",onClick:function(e){return t()},children:"Logout"})},V=function(){return Object(c.useContext)(y).user.isAnonymous?Object(m.jsx)(J,{}):Object(m.jsx)(M,{})},X=function(){return Object(m.jsx)(K.a,{bg:"dark",variant:"dark",expand:"sm",children:Object(m.jsxs)(u.a,{children:[Object(m.jsxs)(K.a.Brand,{href:"/equation-connect",children:[Object(m.jsx)(R.a,{icon:["fas","thermometer-three-quarters"]})," ","Equation Connect"]}),Object(m.jsx)(K.a.Toggle,{}),Object(m.jsx)(K.a.Collapse,{children:Object(m.jsx)(H.a,{className:"mr-auto",children:Object(m.jsxs)(H.a.Link,{href:"https://github.com/AndreMiras/equation-connect",children:[Object(m.jsx)(R.a,{icon:["fab","github-alt"]})," About"]})})}),Object(m.jsx)(V,{})]})})},Y=function(){var e=Object(j.g)().id,t=Object(c.useState)(null),n=Object(p.a)(t,2),r=n[0],a=n[1];return Object(c.useEffect)((function(){(function(){var t=Object(h.a)(x.a.mark((function t(){return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=a,t.next=3,P(e);case 3:t.t1=t.sent,(0,t.t0)(t.t1);case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}})()()}),[e,a]),null===r?Object(m.jsx)("div",{}):Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)(f.a,{className:"mb-3",children:Object(m.jsxs)(f.a.Body,{children:[Object(m.jsx)(f.a.Title,{children:r.data.name}),Object(m.jsxs)(f.a.Subtitle,{className:"mb-2 text-muted",children:[r.data.temp,"\xb0"]}),Object(m.jsx)(f.a.Text,{children:Object(m.jsxs)("ul",{children:[Object(m.jsxs)("li",{children:["id: ",e]}),Object(m.jsxs)("li",{children:["temp_calc: ",r.data.temp_calc,"\xb0"]}),Object(m.jsxs)("li",{children:["temp_probe: ",r.data.temp_probe,"\xb0"]})]})})]})}),Object(m.jsx)(f.a,{className:"mb-3",children:Object(m.jsxs)(f.a.Body,{children:[Object(m.jsx)(f.a.Title,{children:"Debug"}),Object(m.jsx)(f.a.Text,{children:Object(m.jsx)("pre",{children:JSON.stringify(r,null,2)})})]})})]})};o.b.add(b.a,l.a);var G=function(){return Object(m.jsx)("div",{className:"App",children:Object(m.jsxs)(i.a,{children:[Object(m.jsx)(X,{}),Object(m.jsx)(u.a,{className:"mt-3",children:Object(m.jsxs)(j.c,{children:[Object(m.jsx)(j.a,{path:"/",element:Object(m.jsx)(U,{})}),Object(m.jsx)(j.a,{path:"devices/:id",element:Object(m.jsx)(Y,{})})]})})]})})},Q=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,86)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,a=t.getLCP,s=t.getTTFB;n(e),c(e),r(e),a(e),s(e)}))};s.a.render(Object(m.jsx)(r.a.StrictMode,{children:Object(m.jsx)(S,{children:Object(m.jsx)(G,{})})}),document.getElementById("root")),Q()}},[[78,1,2]]]);
//# sourceMappingURL=main.1f5adbb3.chunk.js.map
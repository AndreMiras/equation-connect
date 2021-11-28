(this["webpackJsonpequation-connect"]=this["webpackJsonpequation-connect"]||[]).push([[0],{78:function(e,t,n){},90:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n.n(c),s=n(33),a=n.n(s),i=(n(78),n(50)),j=n(16),l=(n(79),n(94)),o=n(40),u=n(72),b=n(71),d=n(1),O=n.n(d),x=n(5),h=n(14),f=n(3),m={uid:"",email:null,isAnonymous:!0},p={user:m,setUser:function(){}},v=Object(c.createContext)(p),g=function(e){var t=e.children,n=Object(c.useState)(p.user),r=Object(h.a)(n,2),s=r[0],a=r[1];return Object(f.jsx)(v.Provider,{value:{user:s,setUser:a},children:t})},y=n(36),E=n(92),_=n(98),C=n(66),A=n.n(C),S=function(e){var t=e.zone,n=t.id,c=t.name,r=t.type,s=t.comfort,a=t.eco,j=t.temp,l=t.power,o=t.mode,u=t.devices;return Object(f.jsxs)(_.a,{className:"mb-3",defaultActiveKey:"0",children:[Object(f.jsxs)(_.a.Item,{eventKey:"0",children:[Object(f.jsx)(_.a.Header,{children:c}),Object(f.jsx)(_.a.Body,{children:Object(f.jsxs)("ul",{children:[Object(f.jsxs)("li",{children:["id: ",n]}),Object(f.jsxs)("li",{children:["temp: ",j,"\xb0"]}),Object(f.jsxs)("li",{children:["type: ",r]}),Object(f.jsxs)("li",{children:["comfort: ",s,"\xb0"]}),Object(f.jsxs)("li",{children:["eco: ",a,"\xb0"]}),Object(f.jsxs)("li",{children:["temp: ",j,"\xb0"]}),Object(f.jsxs)("li",{children:["power: ",l.toString()]}),Object(f.jsxs)("li",{children:["mode: ",o]}),Object(f.jsxs)("li",{children:["devices: ",Object.keys(u).length]}),Object(f.jsx)("ul",{children:Object.keys(u).map((function(e){return Object(f.jsx)("li",{children:Object(f.jsx)(i.b,{to:"/devices/".concat(e),children:e})},e)}))})]})})]}),Object(f.jsxs)(_.a.Item,{eventKey:"1",children:[Object(f.jsx)(_.a.Header,{children:"Debug"}),Object(f.jsx)(_.a.Body,{children:Object(f.jsx)("pre",{children:JSON.stringify(t,null,2)})})]})]})},P=function(e){var t=e.zones;return Object(f.jsx)(f.Fragment,{children:t&&Object.keys(t).map((function(e){return Object(f.jsx)(S,{zone:t[e]},e)}))})},w=function(e){var t=e.installation,n=t.name,c=t.location,r=t.latitude,s=t.longitude,a=t.zones,i=Object(C.useOpenWeather)({key:"cf95228144b34140c4ec84b5348b60dc",lat:r.toString(),lon:s.toString(),lang:"en",unit:"metric"}),j=i.data,l=i.isLoading,o=i.errorMessage,u=Object(f.jsx)(E.a,{variant:"warning",children:"REACT_APP_OPEN_WEATHER_API_KEY environment variable missing."});return Object(f.jsxs)("div",{children:[Object(f.jsxs)(_.a,{className:"mb-3",defaultActiveKey:"0",children:[Object(f.jsxs)(_.a.Item,{eventKey:"0",children:[Object(f.jsx)(_.a.Header,{children:n}),Object(f.jsx)(_.a.Body,{children:"REACT_APP_OPEN_WEATHER_API_KEY"in Object({NODE_ENV:"production",PUBLIC_URL:"/equation-connect",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_OPEN_WEATHER_API_KEY:"cf95228144b34140c4ec84b5348b60dc"})?Object(f.jsx)(A.a,{isLoading:l,errorMessage:o,data:j,lang:"en",locationLabel:c,unitsLabels:{temperature:"C",windSpeed:"Km/h"},showForecast:!0}):u})]}),Object(f.jsxs)(_.a.Item,{eventKey:"1",children:[Object(f.jsx)(_.a.Header,{children:"Debug"}),Object(f.jsx)(_.a.Body,{children:Object(f.jsx)("pre",{children:JSON.stringify(t,null,2)})})]})]}),Object(f.jsx)(P,{zones:a})]})},k=function(){var e=Object(c.useState)(null),t=Object(h.a)(e,2),n=t[0],r=t[1],s=Object(c.useContext)(v).user;return Object(c.useEffect)((function(){(function(){var e=Object(x.a)(O.a.mark((function e(){return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=r,e.next=3,Object(y.getInstallations)(s.uid);case 3:e.t1=e.sent,(0,e.t0)(e.t1);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[s.uid]),Object(f.jsx)("div",{children:n&&Object.keys(n).map((function(e){return Object(f.jsx)(w,{installation:n[e]},e)}))})},N=function(){return Object(c.useContext)(v).user.isAnonymous?Object(f.jsx)("div",{}):Object(f.jsx)(k,{})},K=n(67),T=n(95),I=n(97),H=n(61),L=n(96),B=n(93),D=function(){var e=Object(c.useState)(""),t=Object(h.a)(e,2),n=t[0],r=t[1],s=Object(c.useState)(""),a=Object(h.a)(s,2),i=a[0],j=a[1],l=Object(c.useContext)(v).setUser;Object(c.useEffect)((function(){var e=Object(H.getAuth)();Object(H.onAuthStateChanged)(e,(function(e){l(null===e?m:e)}))}),[l]);var o=function(){var e=Object(x.a)(O.a.mark((function e(){var t;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(y.login)(n,i);case 3:t=e.sent,l(t),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.error(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();return Object(f.jsxs)(L.a,{className:"d-flex",onSubmit:function(e){return e.preventDefault()},children:[Object(f.jsx)(L.a.Control,{type:"email",placeholder:"Email",className:"me-2","aria-label":"Email",onChange:function(e){return r(e.target.value)}}),Object(f.jsx)(L.a.Control,{type:"password",placeholder:"Password",className:"me-2","aria-label":"Password",onChange:function(e){return j(e.target.value)}}),Object(f.jsx)(B.a,{type:"submit",onClick:function(e){return o()},children:"Login"})]})},R=function(){var e=Object(c.useContext)(v).setUser,t=function(){var t=Object(x.a)(O.a.mark((function t(){return O.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:Object(y.logout)(),e(m);case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(f.jsx)(B.a,{type:"submit",onClick:function(e){return t()},children:"Logout"})},F=function(){return Object(c.useContext)(v).user.isAnonymous?Object(f.jsx)(D,{}):Object(f.jsx)(R,{})},q=function(){return Object(f.jsx)(T.a,{bg:"dark",variant:"dark",expand:"sm",children:Object(f.jsxs)(l.a,{children:[Object(f.jsxs)(T.a.Brand,{href:"/equation-connect",children:[Object(f.jsx)(K.a,{icon:["fas","thermometer-three-quarters"]})," ","Equation Connect"]}),Object(f.jsx)(T.a.Toggle,{}),Object(f.jsx)(T.a.Collapse,{children:Object(f.jsx)(I.a,{className:"mr-auto",children:Object(f.jsxs)(I.a.Link,{href:"https://github.com/AndreMiras/equation-connect",children:[Object(f.jsx)(K.a,{icon:["fab","github-alt"]})," About"]})})}),Object(f.jsx)(F,{})]})})},W=function(){var e=Object(j.g)().id,t=Object(c.useState)(null),n=Object(h.a)(t,2),r=n[0],s=n[1];return Object(c.useEffect)((function(){(function(){var t=Object(x.a)(O.a.mark((function t(){return O.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=s,t.next=3,Object(y.getDevice)(e);case 3:t.t1=t.sent,(0,t.t0)(t.t1);case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}})()()}),[e,s]),null===r?Object(f.jsx)("div",{}):Object(f.jsxs)(_.a,{className:"mb-3",defaultActiveKey:"0",children:[Object(f.jsxs)(_.a.Item,{eventKey:"0",children:[Object(f.jsx)(_.a.Header,{children:r.data.name}),Object(f.jsx)(_.a.Body,{children:Object(f.jsxs)("ul",{children:[Object(f.jsxs)("li",{children:["id: ",e]}),Object(f.jsxs)("li",{children:["temp: ",r.data.temp,"\xb0"]}),Object(f.jsxs)("li",{children:["temp_calc: ",r.data.temp_calc,"\xb0"]}),Object(f.jsxs)("li",{children:["temp_probe: ",r.data.temp_probe,"\xb0"]})]})})]}),Object(f.jsxs)(_.a.Item,{eventKey:"1",children:[Object(f.jsx)(_.a.Header,{children:"Debug"}),Object(f.jsx)(_.a.Body,{children:Object(f.jsx)("pre",{children:JSON.stringify(r,null,2)})})]})]})};o.b.add(b.a,u.a);var U=function(){return Object(f.jsx)("div",{className:"App",children:Object(f.jsxs)(i.a,{children:[Object(f.jsx)(q,{}),Object(f.jsx)(l.a,{className:"mt-3",children:Object(f.jsxs)(j.c,{children:[Object(f.jsx)(j.a,{path:"/",element:Object(f.jsx)(N,{})}),Object(f.jsx)(j.a,{path:"devices/:id",element:Object(f.jsx)(W,{})})]})})]})})},z=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,99)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,s=t.getLCP,a=t.getTTFB;n(e),c(e),r(e),s(e),a(e)}))};a.a.render(Object(f.jsx)(r.a.StrictMode,{children:Object(f.jsx)(g,{children:Object(f.jsx)(U,{})})}),document.getElementById("root")),z()}},[[90,1,2]]]);
//# sourceMappingURL=main.2692b2b2.chunk.js.map
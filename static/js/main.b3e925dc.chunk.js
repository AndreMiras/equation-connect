(this["webpackJsonpequation-connect"]=this["webpackJsonpequation-connect"]||[]).push([[0],{67:function(e,t,c){},77:function(e,t,c){"use strict";c.r(t);var n=c(1),r=c.n(n),a=c(32),s=c.n(a),i=(c(67),c(43)),j=c(16),u=(c(68),c(80)),o=c(37),l=c(61),b=c(60),d=c(8),O=c(0),x=c.n(O),h=c(5),p=c(14),f=c(84),m=c(3),v={uid:"",email:null,isAnonymous:!0},g={user:v,setUser:function(){}},y=Object(n.createContext)(g),w=function(e){var t=e.children,c=Object(n.useState)(g.user),r=Object(p.a)(c,2),a=r[0],s=r[1];return Object(m.jsx)(y.Provider,{value:{user:a,setUser:s},children:t})},k=c(58),C=c(24),N=c(38),S=Object(k.a)({apiKey:"AIzaSyDfqBq3AfIg1wPjuHse3eiXqeDIxnhvp6U",authDomain:"oem1-elife-cloud-prod.firebaseapp.com",databaseURL:"https://oem2-elife-cloud-prod-default-rtdb.firebaseio.com",projectId:"oem2-elife-cloud-prod",storageBucket:"oem2-elife-cloud-prod.appspot.com",appId:"1:150904115315:android:03aeef2c831bbda0061a06"}),T=Object(C.d)(),B=Object(N.a)(S),q=function(){var e=Object(h.a)(x.a.mark((function e(t,c){var n,r;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(N.c)(B,t,c);case 2:return n=e.sent,r=n.user,e.abrupt("return",r);case 5:case"end":return e.stop()}}),e)})));return function(t,c){return e.apply(this,arguments)}}(),A=function(){var e=Object(h.a)(x.a.mark((function e(t){var c,n;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"installations2",e.next=3,Object(C.c)(Object(C.f)(Object(C.g)(T,"installations2"),Object(C.e)("userid"),Object(C.b)(t)));case 3:return c=e.sent,n=c.val(),e.abrupt("return",n);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),D=function(){var e=Object(h.a)(x.a.mark((function e(t){var c,n,r;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c="devices/".concat(t),e.next=3,Object(C.c)(Object(C.a)(Object(C.g)(T),c));case 3:return n=e.sent,r=n.val(),e.abrupt("return",r);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),E=function(e){var t=e.id,c=e.name,n=e.type,r=e.comfort,a=e.eco,s=e.temp,j=e.power,u=e.mode,o=e.devices;return Object(m.jsx)(m.Fragment,{children:Object(m.jsx)(f.a,{className:"mb-3",children:Object(m.jsxs)(f.a.Body,{children:[Object(m.jsx)(f.a.Title,{children:c}),Object(m.jsxs)(f.a.Subtitle,{className:"mb-2 text-muted",children:[s,"\xb0"]}),Object(m.jsx)(f.a.Text,{children:Object(m.jsxs)("ul",{children:[Object(m.jsxs)("li",{children:["id: ",t]}),Object(m.jsxs)("li",{children:["type: ",n]}),Object(m.jsxs)("li",{children:["comfort: ",r,"\xb0"]}),Object(m.jsxs)("li",{children:["eco: ",a,"\xb0"]}),Object(m.jsxs)("li",{children:["temp: ",s,"\xb0"]}),Object(m.jsxs)("li",{children:["power: ",j.toString()]}),Object(m.jsxs)("li",{children:["mode: ",u]}),Object(m.jsxs)("li",{children:["devices: ",Object.keys(o).length]}),Object(m.jsx)("ul",{children:Object.keys(o).map((function(e){return Object(m.jsx)("li",{children:Object(m.jsx)(i.b,{to:"/devices/".concat(e),children:e})},e)}))})]})})]})})})},F=function(e){var t=e.zones;return Object(m.jsx)(m.Fragment,{children:t&&Object.keys(t).map((function(e){return Object(m.jsx)(E,Object(d.a)({},t[e]),e)}))})},I=function(e){var t=e.name,c=(e.power,e.location),n=e.zones;return Object(m.jsxs)("div",{children:[Object(m.jsx)(f.a,{className:"mb-3",children:Object(m.jsxs)(f.a.Body,{children:[Object(m.jsx)(f.a.Title,{children:t}),Object(m.jsx)(f.a.Subtitle,{className:"mb-2 text-muted",children:c}),Object(m.jsx)(f.a.Text,{children:"TODO: weather widget"})]})}),Object(m.jsx)(F,{zones:n})]})},L=function(){var e=Object(n.useState)(null),t=Object(p.a)(e,2),c=t[0],r=t[1],a=Object(n.useContext)(y).user;return Object(n.useEffect)((function(){(function(){var e=Object(h.a)(x.a.mark((function e(){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=r,e.next=3,A(a.uid);case 3:e.t1=e.sent,(0,e.t0)(e.t1);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[a.uid]),Object(m.jsxs)("div",{children:[c&&Object.keys(c).map((function(e){return Object(m.jsx)(I,Object(d.a)({},c[e]),e)})),Object(m.jsx)(f.a,{className:"mb-3",children:Object(m.jsxs)(f.a.Body,{children:[Object(m.jsx)(f.a.Title,{children:"Debug"}),Object(m.jsx)(f.a.Text,{children:Object(m.jsx)("pre",{children:JSON.stringify(c,null,2)})})]})})]})},P=function(){return Object(n.useContext)(y).user.isAnonymous?Object(m.jsx)("div",{}):Object(m.jsx)(L,{})},U=c(54),z=c(81),J=c(82),_=c(83),M=c(79),H=function(){var e=Object(n.useState)(""),t=Object(p.a)(e,2),c=t[0],r=t[1],a=Object(n.useState)(""),s=Object(p.a)(a,2),i=s[0],j=s[1],u=Object(n.useContext)(y).setUser;Object(n.useEffect)((function(){var e=Object(N.a)();Object(N.b)(e,(function(e){u(null===e?v:e)}))}),[u]);var o=function(){var e=Object(h.a)(x.a.mark((function e(){var t;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,q(c,i);case 3:t=e.sent,u(t),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.error(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();return Object(m.jsxs)(_.a,{className:"d-flex",onSubmit:function(e){return e.preventDefault()},children:[Object(m.jsx)(_.a.Control,{type:"email",placeholder:"Email",className:"me-2","aria-label":"Email",onChange:function(e){return r(e.target.value)}}),Object(m.jsx)(_.a.Control,{type:"password",placeholder:"Password",className:"me-2","aria-label":"Password",onChange:function(e){return j(e.target.value)}}),Object(m.jsx)(M.a,{type:"submit",onClick:function(e){return o()},children:"Login"})]})},K=function(){var e=Object(n.useContext)(y).setUser,t=function(){var t=Object(h.a)(x.a.mark((function t(){return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:Object(N.d)(B),e(v);case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(m.jsx)(M.a,{type:"submit",onClick:function(e){return t()},children:"Logout"})},R=function(){return Object(n.useContext)(y).user.isAnonymous?Object(m.jsx)(H,{}):Object(m.jsx)(K,{})},X=function(){return Object(m.jsx)(z.a,{bg:"dark",variant:"dark",expand:"sm",children:Object(m.jsxs)(u.a,{children:[Object(m.jsxs)(z.a.Brand,{href:"/equation-connect",children:[Object(m.jsx)(U.a,{icon:["fas","thermometer-three-quarters"]})," ","Equation Connect"]}),Object(m.jsx)(z.a.Toggle,{}),Object(m.jsx)(z.a.Collapse,{children:Object(m.jsx)(J.a,{className:"mr-auto",children:Object(m.jsxs)(J.a.Link,{href:"https://github.com/AndreMiras/equation-connect",children:[Object(m.jsx)(U.a,{icon:["fab","github-alt"]})," About"]})})}),Object(m.jsx)(R,{})]})})},G=function(){var e=Object(j.g)().id,t=Object(n.useState)(null),c=Object(p.a)(t,2),r=c[0],a=c[1];return Object(n.useEffect)((function(){(function(){var t=Object(h.a)(x.a.mark((function t(){return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=a,t.next=3,D(e);case 3:t.t1=t.sent,(0,t.t0)(t.t1);case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}})()()}),[e,a]),null===r?Object(m.jsx)("div",{}):Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)(f.a,{className:"mb-3",children:Object(m.jsxs)(f.a.Body,{children:[Object(m.jsx)(f.a.Title,{children:r.data.name}),Object(m.jsxs)(f.a.Subtitle,{className:"mb-2 text-muted",children:[r.data.temp,"\xb0"]}),Object(m.jsx)(f.a.Text,{children:Object(m.jsxs)("ul",{children:[Object(m.jsxs)("li",{children:["id: ",e]}),Object(m.jsxs)("li",{children:["temp_calc: ",r.data.temp_calc,"\xb0"]}),Object(m.jsxs)("li",{children:["temp_probe: ",r.data.temp_probe,"\xb0"]})]})})]})}),Object(m.jsx)(f.a,{className:"mb-3",children:Object(m.jsxs)(f.a.Body,{children:[Object(m.jsx)(f.a.Title,{children:"Debug"}),Object(m.jsx)(f.a.Text,{children:Object(m.jsx)("pre",{children:JSON.stringify(r,null,2)})})]})})]})};o.b.add(b.a,l.a);var Q=function(){return Object(m.jsx)("div",{className:"App",children:Object(m.jsxs)(i.a,{children:[Object(m.jsx)(X,{}),Object(m.jsx)(u.a,{className:"mt-3",children:Object(m.jsxs)(j.c,{children:[Object(m.jsx)(j.a,{path:"/",element:Object(m.jsx)(P,{})}),Object(m.jsx)(j.a,{path:"devices/:id",element:Object(m.jsx)(G,{})})]})})]})})},V=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,85)).then((function(t){var c=t.getCLS,n=t.getFID,r=t.getFCP,a=t.getLCP,s=t.getTTFB;c(e),n(e),r(e),a(e),s(e)}))};s.a.render(Object(m.jsx)(r.a.StrictMode,{children:Object(m.jsx)(w,{children:Object(m.jsx)(Q,{})})}),document.getElementById("root")),V()}},[[77,1,2]]]);
//# sourceMappingURL=main.b3e925dc.chunk.js.map
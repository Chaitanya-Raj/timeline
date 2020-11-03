(this.webpackJsonptimeline=this.webpackJsonptimeline||[]).push([[0],{14:function(e,t,a){e.exports=a(26)},21:function(e,t,a){},26:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(1),l=a.n(o),c=a(6),i=a.n(c),s=a(10),u=a(3),m=a(13),g=a(7),p=(a(20),a(21),function(e){var t=e.user;return r.a.createElement("div",{className:"user-info"},r.a.createElement("a",{href:t.url},r.a.createElement("img",{src:t.avatarUrl,alt:"Avatar"}),r.a.createElement("h1",null,t.login)),r.a.createElement("a",{href:"".concat(t.url,"/repositories")},r.a.createElement("h1",null,"Total Repositories ",r.a.createElement("br",null),t.repositories.totalCount)))}),d=function(e){var t=e.repos,a=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],n=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];return r.a.createElement("div",{className:"timeline-container"},t.map((function(e){var t=new Date(e.date),o="".concat(a[t.getDay()],", ").concat(t.getDate()," ").concat(n[t.getMonth()]," ").concat(t.getFullYear());return r.a.createElement("div",{className:"timeline-item",key:e.link.url},r.a.createElement("div",{className:"timeline-item-content"},e.category.tag&&r.a.createElement("span",{className:"tag",style:{background:e.category.color}},e.category.tag),r.a.createElement("time",null,o),r.a.createElement("p",null,e.isFork&&r.a.createElement("i",null,r.a.createElement("b",null,"(Forked) ")),e.text),e.link&&r.a.createElement("a",{href:e.link.url,target:"_blank",rel:"noopener noreferrer"},e.link.text),r.a.createElement("span",{className:"circle"})))})))},f=function(){var e=Object(n.useState)(""),t=Object(u.a)(e,2),a=t[0],o=t[1],l=Object(n.useState)(null),c=Object(u.a)(l,2),f=c[0],v=c[1],y=Object(n.useState)(null),h=Object(u.a)(y,2),E=h[0],b=h[1],k=function(){var e=Object(s.a)(i.a.mark((function e(t){var n,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,Object(m.a)({query:"\n        query User($login: String!, $first: Int!) {\n          repositoryOwner(login: $login) {\n            login\n            avatarUrl\n            url\n            repositories(first: $first) {\n              totalCount\n              nodes {\n                name\n                description\n                primaryLanguage{\n                  name\n                  color\n                }\n                isFork\n                createdAt\n                url\n              }\n            }\n          }\n        }\n      ",login:a,first:100,headers:{authorization:"token ".concat("5895e2906283aadffba36540ff9f3d1b29ac39d8")}});case 4:n=e.sent,r=n.repositoryOwner,v(r),b(r.repositories.nodes.map((function(e){return{text:e.description,date:e.createdAt.split("T")[0],category:{tag:e.primaryLanguage?e.primaryLanguage.name:null,color:e.primaryLanguage?e.primaryLanguage.color:null},isFork:e.isFork,link:{url:e.url,text:e.name}}})).reverse()),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(1),Object(g.b)("User does not exist",{position:"top-right",autoClose:3e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0});case 13:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement(r.a.Fragment,null,r.a.createElement(g.a,null),r.a.createElement("div",{className:"container"},r.a.createElement("form",{onSubmit:k},r.a.createElement("input",{onSubmit:k,type:"text",name:"user",id:"user",value:a,onChange:function(e){return o(e.target.value)},placeholder:"Type a github username...",autoFocus:!0})),f&&E&&r.a.createElement("div",{className:"result"},r.a.createElement(p,{user:f}),r.a.createElement(d,{repos:E}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(f,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[14,1,2]]]);
//# sourceMappingURL=main.f80484e2.chunk.js.map
(this.webpackJsonptimeline=this.webpackJsonptimeline||[]).push([[0],{11:function(e,t,n){e.exports=n(20)},17:function(e,t,n){},20:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(6),l=n.n(o),i=n(4),c=n.n(i),s=n(7),u=n(2),m=n(10),g=(n(17),function(){var e=Object(a.useState)(""),t=Object(u.a)(e,2),n=t[0],o=t[1],l=Object(a.useState)(null),i=Object(u.a)(l,2),g=i[0],p=i[1],d=Object(a.useState)(null),f=Object(u.a)(d,2),v=f[0],y=f[1],E=function(){var e=Object(s.a)(c.a.mark((function e(t){var a,r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,Object(m.a)({query:"\n        query User($login: String!, $first: Int!) {\n          repositoryOwner(login: $login) {\n            login\n            avatarUrl\n            url\n            repositories(first: $first) {\n              totalCount\n              nodes {\n                name\n                description\n                primaryLanguage{\n                  name\n                  color\n                }\n                createdAt\n                url\n              }\n            }\n          }\n        }\n      ",login:n,first:100,headers:{authorization:"token ".concat("f1f44d745c7cd531a212aa730960e494ad7158ff")}});case 3:a=e.sent,r=a.repositoryOwner,p(r),y(r.repositories.nodes.map((function(e){return{text:e.description,date:e.createdAt.split("T")[0],category:{tag:e.primaryLanguage?e.primaryLanguage.name:null,color:e.primaryLanguage?e.primaryLanguage.color:null},link:{url:e.url,text:e.name}}})).reverse()),setTimeout((function(){document.querySelector(".result").scrollIntoView()}),1500);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"container"},r.a.createElement("form",{onSubmit:E},r.a.createElement("input",{onSubmit:E,type:"text",name:"user",id:"user",value:n,onChange:function(e){return o(e.target.value)}})),g&&v&&r.a.createElement("div",{className:"result"},r.a.createElement("div",{className:"user-info"},r.a.createElement("img",{src:g.avatarUrl,alt:"Avatar"}),r.a.createElement("h1",null,r.a.createElement("a",{href:g.url},g.login)),r.a.createElement("h1",null,"Total Repositories ",r.a.createElement("br",null),g.repositories.totalCount)),r.a.createElement("div",{className:"timeline-container"},v.map((function(e){return r.a.createElement("div",{className:"timeline-item",key:e.link.url},r.a.createElement("div",{className:"timeline-item-content"},e.category.tag&&r.a.createElement("span",{className:"tag",style:{background:e.category.color}},e.category.tag),r.a.createElement("time",null,e.date),r.a.createElement("p",null,e.text),e.link&&r.a.createElement("a",{href:e.link.url,target:"_blank",rel:"noopener noreferrer"},e.link.text),r.a.createElement("span",{className:"circle"})))})))))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[11,1,2]]]);
//# sourceMappingURL=main.aa1e5b8b.chunk.js.map
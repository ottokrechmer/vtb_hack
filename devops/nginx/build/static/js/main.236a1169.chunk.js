(this.webpackJsonpmoretech=this.webpackJsonpmoretech||[]).push([[0],{130:function(e,t,a){e.exports={authBtn:"styles_authBtn__1AHhq",icon:"styles_icon__2xJLZ",auth:"styles_auth__2tl_r"}},144:function(e,t,a){e.exports={container:"styles_container__ZxVFh"}},149:function(e,t,a){e.exports={container:"loader_container__2zY8R",textWrapper:"loader_textWrapper__g_UiL"}},208:function(e,t,a){},209:function(e,t,a){},210:function(e,t,a){},211:function(e,t,a){},27:function(e,t,a){e.exports={container:"targetView_container__245Eb",title:"targetView_title__1JhrC",info:"targetView_info__1DGkx",table:"targetView_table__1UFSQ",targetControls:"targetView_targetControls__2dPkW",rightPartBlock:"targetView_rightPartBlock__73BC8",select:"targetView_select__Ufc-y",img:"targetView_img__2Xi3E",marginTop:"targetView_marginTop__14coX",popup:"targetView_popup__mbzVP",closePopup:"targetView_closePopup__1RALC",emptyContainer:"targetView_emptyContainer__1OuvW",addTransfrom:"targetView_addTransfrom__3WiNW",addFilter:"targetView_addFilter__QI_Qg",contentOutline:"targetView_contentOutline__1mxEl"}},316:function(e,t,a){},317:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),i=a(28),r=a.n(i),s=(a(208),a(209),a(210),a(62)),o=a(25),l={auth:"/auth",index:"/",main:"/main",profile:"/profile",details:"/details/:id",constructor:"/constructor/:urn/:id"},d=a(110),u=a(52),p=a.n(u),j=a(86),m=a(18),b=a(26),O=a(42),f=a.n(O),h=a.p+"static/media/link_arrow.70af71f8.svg",_=a.p+"static/media/filter.c80a986f.svg",x=(a(211),a(322)),v=a(93),g=a(321),y=a(181),T=a.n(y),C=a(182),N=a(183),S=a.n(N),k=a(320),w=function(){var e=S.a.create();return e.defaults.baseURL="".concat(String(Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).REACT_APP_API_HOST||window.location.origin),"/back/api/"),e.defaults.headers.get.Accept="application/json",e.interceptors.request.use((function(e){return Object(m.a)(Object(m.a)({},e),{},{headers:Object(m.a)({},e.headers)})})),e.interceptors.response.use((function(e){return e}),(function(e){var t;return null===(t=e.response)||void 0===t||t.status,k.a.UNAUTHORIZED,e.response})),e},D={sourceFromApi:function(e,t){var a={};return a.id=t,a.name=e.name,a.fields=[],e.meta_data&&e.meta_data.length&&(a.fields=e.meta_data.map((function(e){return{id:e.id,dataType:e.data_type,name:e.field_name,desc:e.description}}))),a},featureToApi:function(e){var t={};t.name=e.steps[e.steps.length-1].name,t.source=e.source.id,t.steps=e.steps.map((function(t){return{type:t.type,name:t.name,fields:t.fields.map((function(t){return{name:t.name,source_id:e.source.id,operations:t.operation,constant:t.value,delimiter:t.delimiter,fields:t.refs}}))}}))}},I=function(){var e=Object(j.a)(p.a.mark((function e(t){var a,n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=w(),e.next=3,a.get("datasets/"+t+"/");case 3:if(!(n=e.sent).data||n.status!==k.a.OK){e.next=6;break}return e.abrupt("return",D.sourceFromApi(n.data,t));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),F=function(){var e=Object(j.a)(p.a.mark((function e(t){var a,n,c;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=w(),e.prev=1,e.next=4,a.get("datasets?name=".concat(t.name||"","&is_mine=").concat(t.is_mine||"","&is_purchased=").concat(t.is_purchased||""),{headers:{Authorization:"Token ".concat(localStorage.getItem("token")||"")}});case 4:if(401===(c=e.sent).status&&localStorage.removeItem("token"),!(null===c||void 0===c||null===(n=c.data)||void 0===n?void 0:n.results)){e.next=8;break}return e.abrupt("return",c.data.results);case 8:return e.abrupt("return",null);case 11:return e.prev=11,e.t0=e.catch(1),console.log(e.t0),e.abrupt("return",null);case 15:case"end":return e.stop()}}),e,null,[[1,11]])})));return function(t){return e.apply(this,arguments)}}(),B=function(){var e=Object(j.a)(p.a.mark((function e(t){var a,n,c,i;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=w(),n=D.featureToApi(t),c=JSON.stringify(n),e.next=5,a.post("schemas/",c,{headers:{"Content-Type":"application/json"}});case 5:if(!(i=e.sent).data||i.status!==k.a.OK){e.next=8;break}return e.abrupt("return",!0);case 8:return e.abrupt("return",!1);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),E=a(184),P=a.n(E),V=a(144),A=a.n(V),R=a(71),L=a(6),J=function(){return Object(L.jsx)("div",{className:A.a.container,children:Object(L.jsx)("div",{className:A.a.loader,children:Object(L.jsx)(R.a,{})})})},U=c.a.memo(J),z=x.a.Search,M={search:"",is_mine:null,is_purchased:null},W=function(){var e=Object(n.useState)(Object(m.a)({},M)),t=Object(b.a)(e,2),a=t[0],c=t[1],i=Object(n.useState)(null),r=Object(b.a)(i,2),s=r[0],u=r[1],O=Object(n.useState)([]),x=Object(b.a)(O,2),y=x[0],N=x[1],S=Object(n.useState)(!1),k=Object(b.a)(S,2),w=k[0],D=k[1],I=Object(n.useState)(!1),B=Object(b.a)(I,2),E=B[0],V=B[1],A=Object(o.g)();P()(Object(j.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return D(!0),e.next=3,F(a);case 3:t=e.sent,N(t||[]),D(!1);case 6:case"end":return e.stop()}}),e)}))),[a]);var R=[{title:"",dataIndex:"isChecked",key:"isChecked",width:"30px",render:function(e){if(e)return Object(L.jsx)("div",{className:f.a.circle})}},{title:"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435",dataIndex:"name",key:"name",width:"200px",render:function(e,t){return Object(L.jsxs)(L.Fragment,{children:[Object(L.jsx)("div",{children:e}),Object(L.jsx)("p",{className:f.a.date,children:T()(t.updated_at).format("DD.MM.YYYY hh:mm")})]})}},{title:"\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435",dataIndex:"description",key:"description"},{title:"\u0426\u0435\u043d\u0430",dataIndex:"price",key:"price",render:function(e){return Object(L.jsx)("div",{children:e||"Free"})}},{title:"",dataIndex:"id",className:f.a.tdAction,key:"action",render:function(e){return Object(L.jsxs)("div",{onClick:function(){return A.push(Object(C.reverse)(l.details,{id:e}))},className:f.a.detailBtn,children:["\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0434\u0435\u0442\u0430\u043b\u0438\u0437\u0430\u0446\u0438\u044e ",Object(L.jsx)("img",{alt:"->",src:h})]})}}],J=function(e){var t=e.target,n=t.name,i=t.value;c(Object(m.a)(Object(m.a)({},a),{},Object(d.a)({},n,!i)))};return Object(L.jsxs)("div",{className:f.a.main,children:[Object(L.jsx)("h1",{children:"\u0414\u0430\u0442\u0430\u0441\u0435\u0442\u044b"}),Object(L.jsxs)("div",{className:f.a.searchPanel,children:[Object(L.jsx)(z,{className:f.a.search,placeholder:"\u041f\u043e\u0438\u0441\u043a \u043f\u043e \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u044e, \u0442\u0438\u043a\u0435\u0440\u0443",onChange:function(e){(e.target.value.length>2||!e.target.value.length)&&c(Object(m.a)(Object(m.a)({},a),{},{name:e.target.value}))}}),Object(L.jsxs)("button",{onClick:function(){E&&c(Object(m.a)(Object(m.a)({},a),{},{is_mine:null,is_purchased:null})),V(!E)},children:[Object(L.jsx)("img",{alt:"-",src:_}),Object(L.jsx)("span",{children:"\u0424\u0438\u043b\u044c\u0442\u0440\u044b"})]})]}),E&&Object(L.jsxs)("div",{className:f.a.filters,children:[Object(L.jsxs)("p",{className:f.a.checkbox,children:["\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u043c\u043e\u0438 \u0434\u0430\u0442\u0430\u0441\u0435\u0442\u044b ",Object(L.jsx)(v.a,{value:a.is_mine,name:"is_mine",onChange:J})]}),Object(L.jsxs)("p",{className:f.a.checkbox,children:["\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u043a\u0443\u043f\u043b\u0435\u043d\u043d\u044b\u0435 \u0434\u0430\u0442\u0430\u0441\u0435\u0442\u044b ",Object(L.jsx)(v.a,{value:a.is_purchased,name:"is_purchased",onChange:J})]})]}),Object(L.jsxs)("div",{className:f.a.mainSearchResults,children:[!w&&Object(L.jsx)(g.a,{pagination:!1,onRow:function(e,t){return{index:t,onClick:function(e){return function(e){var t=y.map((function(t,a){return a===e&&u({id:t.id,price:t.price}),Object(m.a)(Object(m.a)({},t),{},{isChecked:a===e})}));N(t)}(t)}}},locale:{emptyText:"\u0414\u0430\u0442\u0430\u0441\u0435\u0442\u044b \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u044b"},dataSource:y,columns:R}),w&&Object(L.jsx)(U,{})]}),Object(L.jsxs)("div",{className:f.a.footer,children:[Object(L.jsx)("button",{disabled:!(null===s||void 0===s?void 0:s.id)||!(null===s||void 0===s?void 0:s.price),onClick:function(){return A.push("/constructor/".concat(s.id))},children:"\u041a\u0443\u043f\u0438\u0442\u044c"}),Object(L.jsx)("button",{disabled:!(null===s||void 0===s?void 0:s.id),onClick:function(){return A.push("/constructor/".concat(s.id,"/new"))},children:"\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u0444\u0438\u0447\u0443"})]})]})},H=a(53),K=a.n(H),Y=a(190),Z=a(149),q=a.n(Z),Q=function(e){var t=e.statusText,a=Object(n.useState)(""),c=Object(b.a)(a,2),i=c[0],r=c[1];return Object(n.useEffect)((function(){var e=setInterval((function(){r((function(e){return e.length<3?e+".":""}))}),300);return function(){clearInterval(e)}}),[]),Object(L.jsxs)("div",{className:q.a.container,children:[Object(L.jsx)(Y.a,{}),t&&Object(L.jsxs)("div",{className:q.a.textWrapper,children:[Object(L.jsx)("div",{children:t}),Object(L.jsx)("div",{children:i})]})]})},X=a(96),G=a.n(X),$=function(e){var t=e.data;if(!t)return Object(L.jsx)(Q,{statusText:"\u0412\u044b\u043f\u043e\u043b\u043d\u044f\u0435\u0442\u0441\u044f \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0430"});return Object(L.jsxs)("div",{className:G.a.container,children:[Object(L.jsx)("div",{className:G.a.title,children:"\u0411\u043b\u043e\u043a \u0438\u0441\u0445\u043e\u0434\u043d\u043e\u0433\u043e \u0434\u0430\u0442\u0430\u0441\u0435\u0442\u0430"}),Object(L.jsx)("div",{className:G.a.info,children:t.name||"-"}),Object(L.jsx)("div",{children:Object(L.jsxs)("table",{className:G.a.table,children:[Object(L.jsx)("thead",{children:Object(L.jsxs)("tr",{children:[Object(L.jsx)("th",{children:Object(L.jsx)("span",{children:"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435"})}),Object(L.jsx)("th",{children:Object(L.jsx)("span",{children:"\u0422\u0438\u043f \u0434\u0430\u043d\u043d\u044b\u0445"})})]})}),Object(L.jsx)("tbody",{children:t.fields.map((function(e,t){return Object(L.jsxs)("tr",{draggable:!0,onDragStart:function(t){!function(e,t){e.dataTransfer.setData("text",JSON.stringify(t))}(t,e)},children:[Object(L.jsx)("td",{children:Object(L.jsx)("span",{children:e.name})}),Object(L.jsx)("td",{children:Object(L.jsx)("span",{children:e.dataType})})]},t)}))})]})})]})},ee=a(27),te=a.n(ee),ae=a(92),ne=a(35),ce=a(325),ie=a.p+"static/media/icon_round_plus.b5d7bb3c.svg",re=a.p+"static/media/close_popup_icon.095d0b32.svg",se=a(324),oe=ae.a.Option,le={boxShadow:"4px 4px 23px 6px rgba(55, 151, 245, 0.40)"},de={opacity:.6},ue=function(e){e.preventDefault()},pe={empty:{id:"empty",name:"-",targetType:"str_type"},"string-concat":{id:"string-concat",name:"\u0441\u0446\u0435\u043f\u0438\u0442\u044c",targetType:"str_type"},"date-year":{id:"date-year",name:"\u0432\u0435\u0440\u043d\u0443\u0442\u044c \u0433\u043e\u0434",targetType:"int_type"},"date-month":{id:"date-month",name:"\u0432\u0435\u0440\u043d\u0443\u0442\u044c \u043c\u0435\u0441\u044f\u0446",targetType:"int_str"},"date-weekday":{id:"date-weekday",name:"\u0432\u0435\u0440\u043d\u0443\u0442\u044c \u0434\u0435\u043d\u044c \u043d\u0435\u0434\u0435\u043b\u0438",targetType:"str_type"},"date-day":{id:"date-day",name:"\u0432\u0435\u0440\u043d\u0443\u0442\u044c \u0447\u0438\u0441\u043b\u043e",targetType:"int_type"},"date-iso":{id:"date-iso",name:"\u0432\u0435\u0440\u043d\u0443\u0442\u044c ISO timestamp",targetType:"str_type"},"datetime-year":{id:"datetime-year",name:"\u0432\u0435\u0440\u043d\u0443\u0442\u044c \u0433\u043e\u0434",targetType:"int_type"},"datetime-month":{id:"datetime-month",name:"\u0432\u0435\u0440\u043d\u0443\u0442\u044c \u043c\u0435\u0441\u044f\u0446",targetType:"int_type"},"datetime-weekday":{id:"datetime-weekday",name:"\u0432\u0435\u0440\u043d\u0443\u0442\u044c \u0434\u0435\u043d\u044c \u043d\u0435\u0434\u0435\u043b\u0438",targetType:"int_type"},"datetime-day":{id:"datetime-day",name:"\u0432\u0435\u0440\u043d\u0443\u0442\u044c \u0447\u0438\u0441\u043b\u043e",targetType:"int_type"},"datetime-iso":{id:"datetime-iso",name:"\u0432\u0435\u0440\u043d\u0443\u0442\u044c ISO timestamp",targetType:"int_type"},"datetime-hour":{id:"datetime-hour",name:"\u0432\u0435\u0440\u043d\u0443\u0442\u044c \u0447\u0430\u0441\u044b",targetType:"int_type"},"datetime-minute":{id:"datetime-minute",name:"\u0432\u0435\u0440\u043d\u0443\u0442\u044c \u043c\u0438\u043d\u0443\u0442\u044b",targetType:"int_type"},"datetime-second":{id:"datetime-second",name:"\u0432\u0435\u0440\u043d\u0443\u0442\u044c \u0441\u0435\u043a\u0443\u043d\u0434\u044b",targetType:"int_type"},"datetime-timezone":{id:"datetime-timezone",name:"\u0432\u0435\u0440\u043d\u0443\u0442\u044c \u0447\u0430\u0441\u043e\u0432\u043e\u0439 \u043f\u043e\u044f\u0441",targetType:"int_type"},"datetime-utc":{id:"datetime-utc",name:"\u0432\u0435\u0440\u043d\u0443\u0442\u044c \u0432 UTC",targetType:"str_type"},"int-sum":{id:"int-sum",name:"\u0441\u043b\u043e\u0436\u0438\u0442\u044c",targetType:"int_type"},"int-subtract":{id:"int-subtract",name:"\u0432\u044b\u0447\u0435\u0441\u0442\u044c",targetType:"int_type"},"int-multiply":{id:"int-multiply",name:"\u0443\u043c\u043d\u043e\u0436\u0438\u0442\u044c",targetType:"int_type"},"int-divide":{id:"int-divide",name:"\u0440\u0430\u0437\u0434\u0435\u043b\u0438\u0442\u044c",targetType:"int_type"},"int-to-string":{id:"int-to-string",name:"\u043f\u0440\u0435\u043e\u0431\u0440\u0430\u0437\u043e\u0432\u0430\u0442\u044c \u0432 \u0441\u0442\u0440\u043e\u043a\u0443",targetType:"str_type"},"float-sum":{id:"float-sum",name:"\u0441\u043b\u043e\u0436\u0438\u0442\u044c",targetType:"float_type"},"float-subtract":{id:"float-subtract",name:"\u0432\u044b\u0447\u0435\u0441\u0442\u044c",targetType:"float_type"},"float-multiply":{id:"float-multiply",name:"\u0443\u043c\u043d\u043e\u0436\u0438\u0442\u044c",targetType:"float_type"},"float-divide":{id:"float-divide",name:"\u0440\u0430\u0437\u0434\u0435\u043b\u0438\u0442\u044c",targetType:"float_type"},"float-to-string":{id:"float-to-string",name:"\u043f\u0440\u0435\u043e\u0431\u0440\u0430\u0437\u043e\u0432\u0430\u0442\u044c \u0432 \u0441\u0442\u0440\u043e\u043a\u0443",targetType:"str_type"}},je=function(e){switch(e){case"str_type":return[pe["string-concat"],pe.empty];case"date_type":return[pe["date-year"],pe["date-month"],pe["date-weekday"],pe["date-day"],pe["date-iso"],pe.empty];case"datetime_type":return[pe["datetime-year"],pe["datetime-month"],pe["datetime-weekday"],pe["datetime-day"],pe["datetime-iso"],pe["datetime-hour"],pe["datetime-minute"],pe["datetime-second"],pe["datetime-timezone"],pe["datetime-utc"],pe.empty];case"int_type":return[pe["int-sum"],pe["int-subtract"],pe["int-multiply"],pe["int-divide"],pe["int-to-string"],pe.empty];case"float_type":return[pe["float-sum"],pe["float-subtract"],pe["float-multiply"],pe["float-divide"],pe["float-to-string"],pe.empty];default:return[pe.empty]}},me=function(e){var t=e.data,a=e.sourceData,c=e.addField,i=e.addStep,r=e.updateName,s=e.updateField,o=Object(n.useState)(!1),l=Object(b.a)(o,2),d=l[0],u=l[1],p=Object(n.useState)(0),j=Object(b.a)(p,2),O=j[0],f=j[1],h=Object(n.useState)(!1),v=Object(b.a)(h,2),g=v[0],y=v[1],T=Object(n.useState)(0),C=Object(b.a)(T,2),N=C[0],S=C[1],k=Object(n.useState)(!1),w=Object(b.a)(k,2),D=w[0],I=w[1],F=Object(n.useState)(0),B=Object(b.a)(F,2),E=B[0],P=B[1],V=Object(n.useCallback)((function(e){r(e.target.value,t.id)}),[t]);return t?Object(L.jsxs)("div",{className:te.a.container,style:D?le:{},onDragEnter:function(e){0===E&&I(!0),P(E+1)},onDragLeave:function(e){1===E&&I(!1),P(E-1)},onDrop:function(e){e.preventDefault();var t=null;try{t=JSON.parse(e.dataTransfer.getData("text"))}catch(a){console.error(a)}c({id:Object(se.a)(),sourceField:t.id,sourceType:t.dataType,dataType:t.dataType,name:t.name,desc:t.desc,isOpen:!1,operation:"empty",value:"",delimiter:"",refs:[]})},onDragOver:ue,children:[Object(L.jsxs)("div",{className:te.a.title,children:["\u0411\u043b\u043e\u043a \u043d\u043e\u0432\u043e\u0433\u043e \u0434\u0430\u0442\u0430\u0441\u0435\u0442\u0430",Object(L.jsxs)("span",{children:["(","filter"===t.type?"\u0424\u0438\u043b\u044c\u0442\u0440\u0430\u0446\u0438\u044f":"\u041f\u0440\u0435\u043e\u0431\u0440\u0430\u0437\u043e\u0432\u0430\u043d\u0438\u0435",")"]})]}),Object(L.jsx)("div",{className:te.a.info,children:Object(L.jsx)(x.a,{value:t.name,onChange:V,size:"default",type:"text",placeholder:"\u0443\u043a\u0430\u0436\u0438\u0442\u0435 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043d\u043e\u0432\u043e\u0433\u043e \u0434\u0430\u0442\u0430\u0441\u0435\u0442\u0430"})}),Object(L.jsx)("div",{children:Object(L.jsxs)("table",{className:te.a.table,children:[Object(L.jsx)("thead",{children:Object(L.jsxs)("tr",{children:[Object(L.jsx)("th",{children:Object(L.jsx)("span",{children:"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435"})}),Object(L.jsx)("th",{children:Object(L.jsx)("span",{children:"\u0422\u0438\u043f \u0434\u0430\u043d\u043d\u044b\u0445"})})]})}),Object(L.jsx)("tbody",{children:t&&t.fields.map((function(e,a){return Object(L.jsxs)("tr",{children:[Object(L.jsx)("td",{children:Object(L.jsxs)("div",{className:te.a.targetControls,children:[Object(L.jsx)("span",{children:e.name}),Object(L.jsxs)("div",{className:te.a.rightPartBlock,children:[Object(L.jsx)(ae.a,{className:te.a.select,value:e.operation,size:"small",onSelect:function(t){s(Object(m.a)(Object(m.a)({},e),{},{operation:t,dataType:"empty"===t?e.sourceType:pe[t].targetType}))},children:je(e.sourceType).map((function(e){return Object(L.jsx)(oe,{value:e.id,children:e.name},e.id)}))}),Object(L.jsx)(ce.a,{visible:e.isOpen,placement:"left",content:function(){if("filter"!==t.type)return"empty"===e.operation?Object(L.jsxs)("div",{className:te.a.popup,children:[Object(L.jsx)("label",{children:"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u044e \u043f\u0440\u0435\u043e\u0431\u0440\u0430\u0437\u043e\u0432\u0430\u043d\u0438\u044f"}),Object(L.jsx)("img",{src:re,className:te.a.closePopup,onClick:function(){s(Object(m.a)(Object(m.a)({},e),{},{isOpen:!1}))}})]}):Object(L.jsxs)("div",{className:te.a.popup,children:[Object(L.jsxs)("label",{children:["\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043f\u043e\u043b\u044f",Object(L.jsx)(x.a,{value:e.name,onChange:function(t){s(Object(m.a)(Object(m.a)({},e),{},{name:t.target.value}))}})]}),["string-concat"].indexOf(e.operation)>=0&&Object(L.jsxs)("label",{children:["\u0420\u0430\u0437\u0434\u0435\u043b\u0438\u0442\u0435\u043b\u044c",Object(L.jsx)(x.a,{value:e.delimiter,onChange:function(t){s(Object(m.a)(Object(m.a)({},e),{},{delimiter:t.target.value}))}})]}),["int-sum","int-subtract","int-multiply","int-divide","float-sum","float-subtract","float-multiply","float-divide"].indexOf(e.operation)>=0&&Object(L.jsxs)("label",{children:["\u041a\u043e\u043d\u0441\u0442\u0430\u043d\u0442\u0430",Object(L.jsx)(x.a,{value:e.value,onChange:function(t){s(Object(m.a)(Object(m.a)({},e),{},{value:t.target.value}))}})]}),["string-concat","int-sum","int-subtract","int-multiply","int-divide","float-sum","float-subtract","float-multiply","float-divide"].indexOf(e.operation)>=0&&e.refs.map((function(a,n){return Object(L.jsx)(ae.a,{className:te.a.marginTop,value:a,onChange:function(t){var a=e.refs;e.refs.indexOf(t)>=0&&s(Object(m.a)({},e)),a[n]=t,s(Object(m.a)(Object(m.a)({},e),{},{refs:a}))},children:t.prevTarget.fields.map((function(t,n){if(t.dataType===e.dataType&&!(e.sourceField===t.id||e.refs.indexOf(t.id)>=0&&t.id!==a))return Object(L.jsx)(oe,{value:t.id,children:t.name},n)}))},n)})),["string-concat","int-sum","int-subtract","int-multiply","int-divide","float-sum","float-subtract","float-multiply","float-divide"].indexOf(e.operation)>=0&&Object(L.jsx)(ne.a,{className:te.a.marginTop,size:"small",onClick:function(){e.refs.push(""),s(Object(m.a)(Object(m.a)({},e),{},{refs:e.refs}))},children:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043f\u043e\u043b\u0435"}),Object(L.jsx)("img",{src:re,className:te.a.closePopup,onClick:function(){s(Object(m.a)(Object(m.a)({},e),{},{isOpen:!1}))}})]})}(),children:Object(L.jsx)("img",{className:te.a.img,src:_,onClick:function(){s(Object(m.a)(Object(m.a)({},e),{},{isOpen:!0}))}})})]})]})}),Object(L.jsx)("td",{children:Object(L.jsx)("span",{children:e.dataType})})]},a)}))})]})})]}):Object(L.jsxs)("div",{className:te.a.emptyContainer,children:[Object(L.jsx)("div",{className:te.a.addTransfrom,children:Object(L.jsxs)("div",{className:te.a.contentOutline,style:g?le:{},onDragEnter:function(e){0===N&&y(!0),S(N+1)},onDragLeave:function(e){1===N&&y(!1),S(N-1)},onDrop:function(e){e.preventDefault();var t=null;try{t=JSON.parse(e.dataTransfer.getData("text"))}catch(n){console.error(n)}i("transform",a,t)},onDragOver:ue,children:[Object(L.jsx)("div",{style:g?de:{},children:"\u041f\u0440\u0435\u043e\u0431\u0440\u0430\u0437\u043e\u0432\u0430\u043d\u0438\u0435"}),Object(L.jsx)("img",{src:ie})]})}),Object(L.jsx)("div",{className:te.a.addFilter,children:Object(L.jsxs)("div",{className:te.a.contentOutline,style:d?le:{},onDragEnter:function(e){0===O&&u(!0),f(O+1)},onDragLeave:function(e){1===O&&u(!1),f(O-1)},onDrop:function(e){e.preventDefault(),i("filter",a)},onDragOver:ue,children:[Object(L.jsx)("div",{style:d?de:{},children:"\u0424\u0438\u043b\u044c\u0442\u0440\u0430\u0446\u0438\u044f"}),Object(L.jsx)("img",{src:ie})]})})]})},be=a(194),Oe=a(73),fe=a.n(Oe),he={source:null,steps:[],currentStep:0},_e=function(){var e=Object(o.h)(),t=e.urn,a=e.id,c=Object(n.useState)(he),i=Object(b.a)(c,2),r=i[0],s=i[1],l=Object(n.useState)(!1),d=Object(b.a)(l,2),u=d[0],p=d[1];Object(n.useEffect)((function(){a}),[a]);var j=Object(n.useCallback)((function(e){s((function(t){var a=fe()(t),n=a.steps[a.currentStep];if(!n.hasChild){n.hasChild=!0;var c={id:Object(se.a)(),type:e,name:"",hasChild:!1,prevTarget:n,fields:[]};return a.steps.push(c),a}}))}),[]),O=Object(n.useCallback)((function(e,t,a){s((function(n){var c=fe()(n),i={id:Object(se.a)(),type:e,name:"",hasChild:!1,prevTarget:t,fields:[]};return i.fields.push({id:Object(se.a)(),sourceField:a.id,sourceType:a.dataType,dataType:a.dataType,name:a.name,desc:a.desc,isOpen:!1,operation:"empty",value:"",delimiter:"",refs:[]}),c.steps.push(i),c}))}),[]),f=Object(n.useCallback)((function(e){s((function(t){var a=fe()(t),n=a.steps[a.currentStep];if(n)return n.fields.find((function(t){return t.sourceField===e.sourceField}))||n.fields.push(e),a;console.error("Cant find target with id ",a.currentStep)}))})),h=Object(n.useCallback)((function(e){s((function(t){var a=fe()(t),n=a.steps[a.currentStep];if(n)return n.fields=n.fields.map((function(t){return t.id===e.id?e:t})),a;console.error("Cant find target with id ",a.currentStep)}))}),[]),_=Object(n.useCallback)((function(e,t){s((function(t){var a=fe()(t),n=a.steps[a.currentStep];if(n)return n.name=e,a;console.error("Cant find target with id ",a.currentStep)}))}),[]);return Object(n.useEffect)((function(){I(t).then((function(e){s((function(t){return Object(m.a)(Object(m.a)({},t),{},{source:e})}))}))}),[t]),u?Object(L.jsx)("div",{className:K.a.wrapper,children:Object(L.jsx)(Q,{statusText:"\u0412\u044b\u043f\u043e\u043b\u043d\u044f\u0435\u0442\u0441\u044f \u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0438\u0435"})}):(console.log(r),Object(L.jsxs)("div",{className:K.a.wrapper,children:[Object(L.jsx)("div",{className:K.a.sourceContainer,children:Object(L.jsx)($,{data:r.steps.length>0&&r.steps[r.currentStep].prevTarget||r.source})}),Object(L.jsx)("div",{className:K.a.targetContainer,children:Object(L.jsx)(me,{data:r.steps[r.currentStep],sourceData:r.source,addField:f,addStep:O,updateField:h,updateName:_})}),r.steps.length>0&&Object(L.jsxs)("div",{className:K.a.pagination,children:[Object(L.jsx)(be.a,{current:r.currentStep+1,pageSize:1,total:r.steps.length,onChange:function(e){console.log("page ",e),s((function(t){var a=fe()(t);return a.currentStep=e-1,a}))}}),!r.steps[r.currentStep].hasChild&&Object(L.jsx)(ne.a,{className:K.a.create,onClick:function(){j("transform")},children:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0442\u0440\u0430\u043d\u0441\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044e"}),!r.steps[r.currentStep].hasChild&&Object(L.jsx)(ne.a,{className:K.a.create,onClick:function(){j("filter")},children:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0444\u0438\u043b\u044c\u0442\u0440\u0430\u0446\u0438\u044e"})]}),Object(L.jsx)("div",{className:K.a.saveBtn,children:Object(L.jsx)(ne.a,{className:K.a.saveBtnText,onClick:function(){p(!0),B(r).then((function(e){p(!1)}))},children:"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c"})})]}))},xe={index:{path:l.index,component:function(){return Object(L.jsx)(o.a,{to:l.main})}},constructor:{path:l.constructor,component:function(){return Object(L.jsx)(_e,{})}},main:{path:l.main,component:function(){return Object(L.jsx)(W,{})}}},ve=a(201),ge=a(74),ye=a.n(ge),Te=a.p+"static/media/logo.da8320c0.svg",Ce=a(130),Ne=a.n(Ce),Se=a.p+"static/media/google.0299b897.svg",ke=a(323),we=(a(316),function(e){return Object(L.jsx)(ke.a,{visible:e.isModalAuthOpen,onCancel:function(){return e.setIsModalAuthOpen(!1)},children:Object(L.jsxs)("div",{className:Ne.a.auth,children:[Object(L.jsx)("p",{children:"\u0412\u0445\u043e\u0434"}),Object(L.jsxs)("button",{className:Ne.a.authBtn,onClick:function(){var t=Object(se.a)();localStorage.setItem("token",t),window.location.href="http://ec2-18-219-12-230.us-east-2.compute.amazonaws.com/back/core/login?token=".concat(t),e.setIsModalAuthOpen(!1),e.setIsToken(!0)},children:[Object(L.jsx)("img",{className:Ne.a.icon,src:Se,alt:"icon"}),Object(L.jsx)("span",{children:"\u0412\u043e\u0439\u0442\u0438 \u0447\u0435\u0440\u0435\u0437 Google"})]})]})})}),De=function(e){var t=Object(n.useState)(!!localStorage.getItem("token")),a=Object(b.a)(t,2),c=a[0],i=a[1],r=Object(n.useState)(!1),o=Object(b.a)(r,2),d=o[0],u=o[1];return Object(L.jsxs)("div",{className:ye.a.appContainer,children:[Object(L.jsxs)("div",{className:ye.a.header,children:[Object(L.jsxs)("div",{className:ye.a.leftNav,children:[Object(L.jsx)("img",{src:Te,alt:"logo-vtb"}),Object(L.jsx)("nav",{className:ye.a.nav,children:Object(L.jsx)(s.b,{to:l.main,children:"\u041c\u043e\u0438 \u0440\u0430\u0441\u0447\u0435\u0442\u044b"})})]}),Object(L.jsx)("div",{className:ye.a.rightNav,onClick:function(){c?(localStorage.removeItem("token"),i(!1)):u(!0)},children:c?"\u0412\u044b\u0439\u0442\u0438":"\u0412\u043e\u0439\u0442\u0438"})]}),Object(L.jsxs)("div",{className:ye.a.contentContainer,children:[d&&Object(L.jsx)(we,{setIsToken:i,setIsModalAuthOpen:u,isModalAuthOpen:d}),e.children]})]})},Ie=function(e){var t=e.component,a=(e.location,Object(ve.a)(e,["component","location"])),c=Object(n.useCallback)((function(e){return Object(L.jsx)(t,Object(m.a)({},e))}),[]);return Object(L.jsx)(De,{children:Object(L.jsx)(o.b,Object(m.a)(Object(m.a)({exact:!0},a),{},{component:c}))})},Fe=Object.values(xe);var Be=function(){return Object(L.jsx)(s.a,{children:Object(L.jsx)(o.d,{children:Fe.map((function(e){return Object(L.jsx)(Ie,{exact:!0,path:e.path,component:e.component},e.path)}))})})},Ee=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,326)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,i=t.getLCP,r=t.getTTFB;a(e),n(e),c(e),i(e),r(e)}))};r.a.render(Object(L.jsx)(c.a.StrictMode,{children:Object(L.jsx)(Be,{})}),document.getElementById("root")),Ee()},42:function(e,t,a){e.exports={main:"main_main__2vSgt",search:"main_search__ebLrH",sortBtn:"main_sortBtn__1MJN_",detailBtn:"main_detailBtn__2DQv3",mainSearchResults:"main_mainSearchResults__1VIMP",date:"main_date__1BY07",tdAction:"main_tdAction__3VCOr",footer:"main_footer__1jBbJ",circle:"main_circle__33gXc",searchPanel:"main_searchPanel__qfNO8",filters:"main_filters__32Fhk",checkbox:"main_checkbox__PJEBq"}},53:function(e,t,a){e.exports={wrapper:"constructor_wrapper__2Ev32",sourceContainer:"constructor_sourceContainer__1lSPo",targetContainer:"constructor_targetContainer__3mDIu",pagination:"constructor_pagination__1vFZU",create:"constructor_create__24n_x",saveBtn:"constructor_saveBtn__2S3PZ",saveBtnText:"constructor_saveBtnText__7E9Op"}},74:function(e,t,a){e.exports={header:"styles_header___egRr",rightNav:"styles_rightNav__3mEEH",leftNav:"styles_leftNav__34Lrf",nav:"styles_nav__3bIJb",contentContainer:"styles_contentContainer__20cp_",appContainer:"styles_appContainer__iUHdK"}},96:function(e,t,a){e.exports={container:"sourceView_container__4OKeh",title:"sourceView_title__3_-hO",info:"sourceView_info__oYue0",table:"sourceView_table__3ZpUF"}}},[[317,1,2]]]);
//# sourceMappingURL=main.236a1169.chunk.js.map
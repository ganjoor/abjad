(function(e){function r(r){for(var a,s,i=r[0],u=r[1],o=r[2],p=0,b=[];p<i.length;p++)s=i[p],n[s]&&b.push(n[s][0]),n[s]=0;for(a in u)Object.prototype.hasOwnProperty.call(u,a)&&(e[a]=u[a]);l&&l(r);while(b.length)b.shift()();return c.push.apply(c,o||[]),t()}function t(){for(var e,r=0;r<c.length;r++){for(var t=c[r],a=!0,i=1;i<t.length;i++){var u=t[i];0!==n[u]&&(a=!1)}a&&(c.splice(r--,1),e=s(s.s=t[0]))}return e}var a={},n={app:0},c=[];function s(r){if(a[r])return a[r].exports;var t=a[r]={i:r,l:!1,exports:{}};return e[r].call(t.exports,t,t.exports,s),t.l=!0,t.exports}s.m=e,s.c=a,s.d=function(e,r,t){s.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,r){if(1&r&&(e=s(e)),8&r)return e;if(4&r&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(s.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var a in e)s.d(t,a,function(r){return e[r]}.bind(null,a));return t},s.n=function(e){var r=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(r,"a",r),r},s.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},s.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],u=i.push.bind(i);i.push=r,i=i.slice();for(var o=0;o<i.length;o++)r(i[o]);var l=u;c.push([0,"chunk-vendors"]),t()})({0:function(e,r,t){e.exports=t("1d50")},"0197":function(e,r,t){e.exports=t.p+"img/logo.f4f5d63c.png"},"1d50":function(e,r,t){"use strict";t.r(r);t("b731"),t("2e6c"),t("f168"),t("a04c"),t("dd0e");var a=t("e832"),n=t("4af9"),c=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{attrs:{id:"app"}},[e._m(0),e.rev?e._e():t("div",{attrs:{align:"center"}},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.inputString,expression:"inputString"}],attrs:{placeholder:"متن را اینجا وارد کنید",size:"50"},domProps:{value:e.inputString},on:{input:function(r){r.target.composing||(e.inputString=r.target.value)}}}),t("p",[e._v(e._s(e.calc(e.inputString).n))]),t("p",[e._v(e._s(e.calc(e.inputString).desc))]),null!=e.returnUrl?t("p",[t("a",{attrs:{href:e.returnUrl}},[e._v("برگشت")])]):e._e()]),e.rev?t("div",{attrs:{align:"center"}},[t("p",[t("textarea",{directives:[{name:"model",rawName:"v-model",value:e.numbersString,expression:"numbersString"}],staticStyle:{direction:"ltr"},attrs:{placeholder:"برای تبدیل سطرهای عدد به حرف سطور را در کادر زیر وارد کنید",cols:"50",rows:"4"},domProps:{value:e.numbersString},on:{input:function(r){r.target.composing||(e.numbersString=r.target.value)}}})]),t("p",[e._v(e._s(e.revcalc(e.numbersString).str))]),t("p",[e._v(e._s(e.revcalc(e.numbersString).desc))]),e._m(1)]):e._e(),t("button",{attrs:{type:"button"},on:{click:function(r){return e.onRev()}}},[e._v(e._s(e.revString))])])},s=[function(){var e=this,r=e.$createElement,a=e._self._c||r;return a("div",{attrs:{align:"center"}},[a("img",{attrs:{alt:"محاسبه‌گر ابجد",src:t("0197")}})])},function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("p",[t("small",[t("a",{attrs:{href:"http://blog.ganjoor.net/1399/04/20/rev-abjad/"}},[e._v("تبدیل سلسله عدد چیست؟")])])])}],i=(t("8493"),{name:"App",data:function(){return{inputString:"",returnUrl:null,rev:!1,revString:"تبدیل سلسله عدد",numbersString:""}},mounted:function(){this.inputString=this.$route.query.q,this.returnUrl=this.$route.query.r},methods:{calc:function(e){var r={n:0,desc:""};if(null==e)return r;for(var t=0;t<e.length;t++){var a=0;switch(e.charAt(t)){case"ا":case"آ":case"أ":case"إ":a=1;break;case"ب":case"پ":a=2;break;case"ج":case"چ":a=3;break;case"د":a=4;break;case"ه":a=5;break;case"و":case"ؤ":a=6;break;case"ز":a=7;break;case"ح":a=8;break;case"ط":a=9;break;case"ی":case"ي":case"ئ":a=10;break;case"ک":case"ك":case"گ":a=20;break;case"ل":a=30;break;case"م":a=40;break;case"ن":a=50;break;case"س":a=60;break;case"ع":a=70;break;case"ف":a=80;break;case"ص":a=90;break;case"ق":a=100;break;case"ر":a=200;break;case"ش":a=300;break;case"ت":case"ة":a=400;break;case"ث":a=500;break;case"خ":a=600;break;case"ذ":a=700;break;case"ض":a=800;break;case"ظ":a=900;break;case"غ":a=1e3;break}0!=a&&(""!=r.desc&&(r.desc+=" + "),r.desc+="["+e.charAt(t)+" = "+a.toString()+"]",r.n+=a)}return r},revcalc:function(e){var r={str:"",desc:""};if(null==e)return r;var t=0;while(t<e.length){var a="",n="",c="";t!=e.length-1&&(c=e[t+1],"۰"==c&&(c="0"));var s="";t<e.length-2&&(s=e[t+2],"۰"==s&&(s="0"));var i="";switch(t<e.length-3&&(i=e[t+2],"۰"==i&&(i="0")),e.charAt(t)){case"1":case"۱":"0"==c?"0"==s?"0"==i?(n="1000",a+="غ",t+=4):(n="100",a+="ق",t+=4):(n="10",a+="ی",t+=1):(n="1",a+="ا",t++);break;case"2":case"۲":"0"==c?"0"==s?(n="200",a+="ر",t+=3):(n="20",a+="ک(گ)",t+=2):(n="2",a+="(پ)ب",t++);break;case"3":case"۳":"0"==c?"0"==s?(n="300",a+="ش",t+=3):(n="30",a+="ل",t+=2):(n="3",a+="ج(چ)",t++);break;case"4":case"۴":"0"==c?"0"==s?(n="400",a+="ت",t+=3):(n="40",a+="م",t+=2):(n="4",a+="د",t++);break;case"5":case"۵":"0"==c?"0"==s?(n="500",a+="ث",t+=3):(n="50",a+="ن",t+=2):(n="5",a+="ه",t++);break;case"6":case"۶":"0"==c?"0"==s?(n="600",a+="خ",t+=3):(n="60",a+="س",t+=2):(n="6",a+="و",t++);break;case"7":case"۷":"0"==c?"0"==s?(n="700",a+="ذ",t+=3):(n="70",a+="ع",t+=2):(n="7",a+="ز",t++);break;case"8":case"۸":"0"==c?"0"==s?(n="800",a+="ض",t+=3):(n="80",a+="ف",t+=2):(n="8",a+="ح",t++);break;case"9":case"۹":"0"==c?"0"==s?(n="900",a+="ظ",t+=3):(n="90",a+="ص",t+=2):(n="9",a+="ط",t++);break;default:t++;break}""!=a&&(""!=r.desc&&(r.desc+=" + "),r.desc+="["+n+" = "+a+"]",r.str+=a)}return r},onRev:function(){this.rev?this.revString="تبدیل سلسله عدد":this.revString="تبدیل معمولی",this.rev=!this.rev}}}),u=i,o=(t("e5cd"),t("a6c2")),l=Object(o["a"])(u,c,s,!1,null,null,null),p=l.exports;a["a"].config.productionTip=!1,a["a"].use(n["a"]);var b=new n["a"]({mode:"history",routes:[]});new a["a"]({router:b,render:function(e){return e(p)}}).$mount("#app")},"909c":function(e,r,t){},dd0e:function(e,r,t){},e5cd:function(e,r,t){"use strict";var a=t("909c"),n=t.n(a);n.a}});
//# sourceMappingURL=app.dbc28ba4.js.map
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7071f00a"],{2017:function(e,n,t){"use strict";var r=t("b12d"),s=t.n(r);s.a},6941:function(e,n,t){},"9ed6":function(e,n,t){"use strict";t.r(n);var r=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"login-container"},[t("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:e.loginForm,rules:e.loginRules,"auto-complete":"on","label-position":"left"}},[t("div",{staticClass:"title-container"},[t("h3",{staticClass:"title"},[e._v("登录系统")])]),e._v(" "),t("el-form-item",{attrs:{prop:"username"}},[t("span",{staticClass:"svg-container"},[t("svg-icon",{attrs:{"icon-class":"user"}})],1),e._v(" "),t("el-input",{ref:"username",attrs:{placeholder:"Username",name:"username",type:"text",tabindex:"1","auto-complete":"on"},model:{value:e.loginForm.name,callback:function(n){e.$set(e.loginForm,"name",n)},expression:"loginForm.name"}})],1),e._v(" "),t("el-form-item",{attrs:{prop:"password"}},[t("span",{staticClass:"svg-container"},[t("svg-icon",{attrs:{"icon-class":"password"}})],1),e._v(" "),t("el-input",{key:e.passwordType,ref:"password",attrs:{type:e.passwordType,placeholder:"Password",name:"password",tabindex:"2","auto-complete":"on"},nativeOn:{keyup:function(n){return!n.type.indexOf("key")&&e._k(n.keyCode,"enter",13,n.key,"Enter")?null:e.handleLogin(n)}},model:{value:e.loginForm.password,callback:function(n){e.$set(e.loginForm,"password",n)},expression:"loginForm.password"}}),e._v(" "),t("span",{staticClass:"show-pwd",on:{click:e.showPwd}},[t("svg-icon",{attrs:{"icon-class":"password"===e.passwordType?"eye":"eye-open"}})],1)],1),e._v(" "),t("el-button",{staticStyle:{width:"100%",margin:"0 0 30px 0"},attrs:{loading:e.loading,type:"primary"},nativeOn:{click:function(n){return n.preventDefault(),e.handleLogin(n)}}},[e._v("登录\n    ")]),e._v(" "),t("el-button",{staticStyle:{width:"100%",margin:"0 0 30px 0"},attrs:{loading:e.loading,type:"primary"},nativeOn:{click:function(n){return n.preventDefault(),e.handleSignUp(n)}}},[e._v("注册\n    ")])],1)],1)},s=[],o=t("61f7"),a={name:"Login",data:function(){var e=function(e,n,t){Object(o["b"])(n)?t():t(new Error("请输入用户名"))},n=function(e,n,t){n.length<6?t(new Error("至少六位密码")):t()};return{loginForm:{name:"icestains",password:"Masquerade"},loginRules:{name:[{required:!0,trigger:"blur",validator:e}],password:[{required:!0,trigger:"blur",validator:n}],email:[{required:!0,trigger:"blur"}]},loading:!1,passwordType:"password",redirect:void 0}},watch:{$route:{handler:function(e){this.redirect=e.query&&e.query.redirect},immediate:!0}},methods:{showPwd:function(){var e=this;"password"===this.passwordType?this.passwordType="":this.passwordType="password",this.$nextTick((function(){e.$refs.password.focus()}))},handleLogin:function(){var e=this;this.isSignUp||this.$refs.loginForm.validate((function(n){if(!n)return console.log("error submit!!"),!1;e.loading=!0,e.$store.dispatch("user/login",e.loginForm).then((function(){e.$router.push({path:e.redirect||"/"}),e.loading=!1})).catch((function(){e.loading=!1}))}))},handleSignUp:function(){this.$router.push({path:"/sign-up"})}}},i=a,l=(t("2017"),t("f99a"),t("2877")),c=Object(l["a"])(i,r,s,!1,null,"fdd9db5a",null);n["default"]=c.exports},b12d:function(e,n,t){},f99a:function(e,n,t){"use strict";var r=t("6941"),s=t.n(r);s.a}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2c684266"],{"16c1":function(e,s,a){"use strict";var t=a("9579"),n=a.n(t);n.a},"8e5a":function(e,s,a){},9535:function(e,s,a){"use strict";a.r(s);var t=function(){var e=this,s=e.$createElement,a=e._self._c||s;return a("div",{staticClass:"login-container"},[a("el-form",{ref:"signUpForm",staticClass:"login-form",attrs:{model:e.newUser,rules:e.signUpRules,"auto-complete":"on","label-position":"left"}},[a("div",{staticClass:"title-container"},[a("h3",{staticClass:"title"},[e._v("注册账号")])]),e._v(" "),a("el-form-item",{attrs:{prop:"username"}},[a("span",{staticClass:"svg-container"},[a("svg-icon",{attrs:{"icon-class":"user"}})],1),e._v(" "),a("el-input",{ref:"username",attrs:{placeholder:"Username",name:"username",type:"text",tabindex:"1","auto-complete":"on"},model:{value:e.newUser.name,callback:function(s){e.$set(e.newUser,"name",s)},expression:"newUser.name"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"password"}},[a("span",{staticClass:"svg-container"},[a("svg-icon",{attrs:{"icon-class":"password"}})],1),e._v(" "),a("el-input",{key:e.passwordType,ref:"password",attrs:{type:e.passwordType,placeholder:"Password",name:"password",tabindex:"2","auto-complete":"on"},nativeOn:{keyup:function(s){return!s.type.indexOf("key")&&e._k(s.keyCode,"enter",13,s.key,"Enter")?null:e.handleLogin(s)}},model:{value:e.newUser.password,callback:function(s){e.$set(e.newUser,"password",s)},expression:"newUser.password"}}),e._v(" "),a("span",{staticClass:"show-pwd",on:{click:e.showPwd}},[a("svg-icon",{attrs:{"icon-class":"password"===e.passwordType?"eye":"eye-open"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{prop:"password"}},[a("span",{staticClass:"svg-container"},[a("svg-icon",{attrs:{"icon-class":"password"}})],1),e._v(" "),a("el-input",{key:e.passwordType,ref:"password",attrs:{type:e.passwordType,placeholder:"Password",name:"password",tabindex:"2","auto-complete":"on"},model:{value:e.newUser.repeatPassword,callback:function(s){e.$set(e.newUser,"repeatPassword",s)},expression:"newUser.repeatPassword"}}),e._v(" "),a("span",{staticClass:"show-pwd",on:{click:e.showPwd}},[a("svg-icon",{attrs:{"icon-class":"password"===e.passwordType?"eye":"eye-open"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{prop:"email"}},[a("span",{staticClass:"svg-container"},[a("i",{staticClass:"el-icon-message"})]),e._v(" "),a("el-input",{key:e.passwordType,ref:"email",attrs:{type:"email",placeholder:"Email",name:"email",tabindex:"2","auto-complete":"on"},model:{value:e.newUser.email,callback:function(s){e.$set(e.newUser,"email",s)},expression:"newUser.email"}})],1),e._v(" "),a("el-button",{staticStyle:{width:"100%",margin:"0 0 30px 0"},attrs:{loading:e.loading,type:"primary"},nativeOn:{click:function(s){return s.preventDefault(),e.handleSignUp(s)}}},[e._v("\n      注册\n    ")]),e._v(" "),a("el-button",{staticStyle:{width:"100%",margin:"0 0 30px 0"},attrs:{type:"primary"},nativeOn:{click:function(s){return s.preventDefault(),e.handleLogin(s)}}},[e._v("\n      已有账号？立即登录\n    ")])],1)],1)},n=[],r=(a("7f7f"),a("61f7")),o=a("5c96"),i=a("c24f"),l={name:"SignUp",data:function(){var e=function(e,s,a){Object(r["b"])(s)?a():a(new Error("请输入用户名"))},s=function(e,s,a){s.length<6?a(new Error("至少六位密码")):a()};return{newUser:{name:"icestains",password:"Masquerade",repeatPassword:"Masquerade",email:"ilichi@qq.com"},signUpRules:{name:[{required:!0,trigger:"blur",validator:e}],password:[{required:!0,trigger:"blur",validator:s}],repeatPassword:[{required:!0,trigger:"blur",validator:s}],email:[{required:!0,trigger:"blur"}]},loading:!1,passwordType:"password",redirect:void 0}},watch:{},methods:{showPwd:function(){var e=this;"password"===this.passwordType?this.passwordType="":this.passwordType="password",this.$nextTick((function(){e.$refs.password.focus()}))},handleLogin:function(){this.$router.push({path:this.redirect||"/"})},handleSignUp:function(){var e=this;console.log("sign up"),this.$refs.signUpForm.validate((function(s){if(s){e.loading=!0,console.log(e.newUser);var a=e.newUser,t=a.name,n=a.password,r=a.repeatPassword,l=a.email;n!==r?Object(o["Message"])({message:"两次密码不一致",type:"error",duration:5e3}):(console.log(t,n,r,l),Object(i["b"])({name:t,password:n,email:l}).then((function(s){console.log(s),Object(o["Message"])({message:"注册成功,五秒后跳转登录页面",type:"success",duration:5e3}),setTimeout(e.handleLogin,5e3)})))}}))}}},p=l,c=(a("16c1"),a("a91c"),a("2877")),d=Object(c["a"])(p,t,n,!1,null,"3b2f68ae",null);s["default"]=d.exports},9579:function(e,s,a){},a91c:function(e,s,a){"use strict";var t=a("8e5a"),n=a.n(t);n.a}}]);
(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{29:function(t,e,n){"use strict";var a=n(1);e.a=function(t){var e=t.text,n=t.onClick,c=t.disabled;return Object(a.jsx)("button",{style:{color:"black",backgroundColor:"#FFFFFF",padding:"10px",outline:0,borderRadius:"50px",border:"none",cursor:"pointer",margin:10},onClick:n,disabled:c,children:e})}},43:function(t,e,n){"use strict";(function(t,a){var c=n(9),i=n(21),s=n.n(i),r=n(28),o=n(5),l=(n(68),n(0)),u=n.n(l),d=n(15),p=n.n(d),h=n(44),b=n.n(h),j=n(98),f=n(99),y=n(45),x=n(46),m=n(47),O=n(48),g=n(49),v=n(53),C=n(29),S=n(1),k=t.from("".concat("34b31bfe4c604047a634247b71097587",":").concat("ec17b732457148a8b0e95f230f5bf56b")).toString("base64"),P="location"in a&&"localhost:3000"===a.location.host?"http://localhost:3000":"https://esinarta.github.io/APlaylistPlease",w="https://accounts.spotify.com/authorize";w+="?response_type=token",w+="&client_id="+encodeURIComponent("34b31bfe4c604047a634247b71097587"),w+="&scope="+encodeURIComponent("playlist-modify-private playlist-modify-public"),w+="&redirect_uri="+encodeURIComponent(P);e.a=function(){var t=u.a.useState(""),e=Object(o.a)(t,2),n=e[0],a=e[1],i=u.a.useState(""),l=Object(o.a)(i,2),d=l[0],h=l[1],P=u.a.useState("artist"),F=Object(o.a)(P,2),A=F[0],R=F[1],I=u.a.useState([]),B=Object(o.a)(I,2),T=B[0],_=B[1],N=u.a.useState({}),D=Object(o.a)(N,2),z=D[0],E=D[1],L=u.a.useState([]),J=Object(o.a)(L,2),U=J[0],q=J[1],G=u.a.useState(""),H=Object(o.a)(G,2),M=H[0],W=H[1],K=u.a.useState(""),Q=Object(o.a)(K,2),V=Q[0],X=Q[1],Y=u.a.useState(""),Z=Object(o.a)(Y,2),$=Z[0],tt=Z[1],et=u.a.useState(""),nt=Object(o.a)(et,2),at=nt[0],ct=nt[1],it=u.a.useState(!0),st=Object(o.a)(it,2),rt=st[0],ot=st[1],lt=u.a.useState(!1),ut=Object(o.a)(lt,2),dt=ut[0],pt=ut[1],ht=function(){var t=Object(r.a)(s.a.mark((function t(){var e;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,p()({method:"post",url:"https://accounts.spotify.com/api/token",headers:{Authorization:"Basic ".concat(k),"Content-Type":"application/x-www-form-urlencoded"},data:b.a.stringify({grant_type:"client_credentials"})});case 2:return e=t.sent,t.abrupt("return",e.data);case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();u.a.useEffect((function(){""===n&&ht().then((function(t){a(t.access_token)}))}),[n]);var bt=function(t){p()({method:"get",url:"".concat("https://api.spotify.com/v1/recommendations?seed_").concat(A,"s=").concat(t),headers:{Accept:"application/json",Authorization:"Bearer ".concat(n),"Content-Type":"application/json"}}).then((function(t){q(Object(c.a)(t.data.tracks))}))},jt=function(){for(var t,e={},n=/([^&;=]+)=?([^&;]*)/g,a=window.location.hash.substring(1);t=n.exec(a);)e[t[1]]=decodeURIComponent(t[2]);return e}();u.a.useEffect((function(){""===M&&W(jt.access_token)}),[M,jt.access_token]);var ft=u.a.useCallback(Object(r.a)(s.a.mark((function t(){var e;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,p()({method:"get",url:"".concat("https://api.spotify.com/v1/me"),headers:{Accept:"application/json",Authorization:"Bearer ".concat(M),"Content-Type":"application/json"}});case 2:return e=t.sent,t.abrupt("return",e.data);case 4:case"end":return t.stop()}}),t)}))),[M]);u.a.useEffect((function(){""===V&&M&&ft().then((function(t){X(t.id)}))}),[V,ft,M]);var yt=function(t,e){p()({method:"post",url:"".concat("https://api.spotify.com/v1/playlists/").concat(t,"/tracks"),headers:{Accept:"application/json",Authorization:"Bearer ".concat(M),"Content-Type":"application/json"},data:JSON.stringify(e)}).then((function(t){console.log(t.data)}))};return Object(S.jsxs)("div",{className:"App",children:[Object(S.jsx)(v.a,{link:w}),Object(S.jsx)("h1",{children:"A Playlist, Please."}),Object(S.jsx)("p",{children:"Search for an artist or song to create a playlist of recommended tracks."}),Object(S.jsx)(y.a,{onSearch:function(t){h(t.target.value),d&&p()({method:"get",url:"".concat("https://api.spotify.com/v1/search?q=").concat(d,"&type=").concat(A),headers:{Accept:"application/json",Authorization:"Bearer ".concat(n),"Content-Type":"application/json"}}).then((function(t){t.data.artists?_(Object(c.a)(t.data.artists.items)):_(Object(c.a)(t.data.tracks.items))}))}}),Object(S.jsx)(x.a,{searchFilter:A,setSearchFilter:R}),d&&T?Object(S.jsx)(m.a,{searchResults:T,handleSearchSelection:function(t){h(""),bt(t.id)},searchSelection:z,setSearchSelection:E}):null,Object(S.jsx)(O.a,{playlist:U,searchSelection:z}),Object(S.jsx)("br",{}),U.length&&M?Object(S.jsxs)("div",{children:[Object(S.jsx)(C.a,{text:"Save Playlist",onClick:function(){return pt(!0)}}),Object(S.jsx)(j.a,{open:dt,onClose:function(){return pt(!1)},children:Object(S.jsxs)(f.a,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:"50%",padding:"2%",bgcolor:"#444",borderRadius:"25px",boxShadow:12,textAlign:"center"},children:[Object(S.jsx)(g.a,{playListName:$,playlistDesc:at,playlistPublic:rt,setPlaylistPublic:ot,handlePlaylistNameInput:function(t){tt(t.target.value)},handlePlaylistDescInput:function(t){ct(t.target.value)}}),Object(S.jsx)(C.a,{text:"Save Playlist",onClick:function(){return function(t,e,n){p()({method:"post",url:"".concat("https://api.spotify.com/v1/users/").concat(V,"/playlists"),headers:{Accept:"application/json",Authorization:"Bearer ".concat(M),"Content-Type":"application/json"},data:JSON.stringify({name:t,description:e,public:n})}).then((function(t){var e=t.data.id,n=[];U.forEach((function(t){n.push(t.uri)})),yt(e,{uris:n})}))}($,at,rt)}})]})})]}):null]})}}).call(this,n(63).Buffer,n(32))},45:function(t,e,n){"use strict";var a=n(1);e.a=function(t){var e=t.search,n=t.onSearch;return Object(a.jsx)("div",{children:Object(a.jsx)("input",{style:{border:"none",borderColor:"transparent",borderRadius:"50px",outline:"none",height:"2em",width:"50%",padding:"0.2em 1.5em 0.2em 1.5em"},id:"search",type:"text",value:e,onChange:n})})}},46:function(t,e,n){"use strict";var a=n(1);e.a=function(t){var e=t.searchFilter,n=t.setSearchFilter,c={padding:"1rem"};return Object(a.jsxs)("div",{style:c,children:[Object(a.jsxs)("label",{style:c,children:["Artist",Object(a.jsx)("input",{type:"radio",name:"searchType",value:"artist",checked:"artist"===e,onChange:function(t){return n(t.target.value)}})]}),Object(a.jsxs)("label",{style:c,children:["Song",Object(a.jsx)("input",{type:"radio",name:"searchType",value:"track",checked:"track"===e,onChange:function(t){return n(t.target.value)}})]})]})}},47:function(t,e,n){"use strict";n(90);var a=n(1);e.a=function(t){var e=t.searchResults,n=t.handleSearchSelection,c=(t.searchSelection,t.setSearchSelection),i={listStyleType:"none",textAlign:"left",borderBottom:"1px solid #CCCCCC",padding:"1em"};return Object(a.jsx)("div",{style:{width:"40%",backgroundColor:"white",color:"black",margin:"0 auto",borderRadius:"20px",overflow:"hidden"},children:e.length?Object(a.jsx)("div",{children:e.slice(0,5).map((function(t){return Object(a.jsx)("li",{className:"resultItem",style:i,onClick:function(){n(t),c(t)},children:"artist"===t.type?Object(a.jsx)("p",{children:t.name}):Object(a.jsxs)("p",{children:[t.name," - ",t.artists[0].name]})},t.id)}))}):null})}},48:function(t,e,n){"use strict";var a=n(1);e.a=function(t){var e=t.playlist,n=t.searchSelection,c={listStyleType:"none",textAlign:"left",borderBottom:"1px solid #CCCCCC",padding:"1em"};return Object(a.jsx)("div",{children:e.length?Object(a.jsxs)("div",{children:[Object(a.jsx)("h4",{children:"Here's a playlist based on: "}),"artist"===n.type?Object(a.jsxs)("div",{children:[Object(a.jsx)("img",{src:n.images[2].url,alt:"Artist profile"}),Object(a.jsx)("p",{children:n.name})]}):Object(a.jsxs)("div",{children:[Object(a.jsx)("img",{src:n.album.images[2].url,alt:"Song artwork"}),Object(a.jsxs)("p",{children:[n.name," - ",n.artists[0].name]})]}),Object(a.jsx)("div",{style:{width:"40%",backgroundColor:"white",color:"black",margin:"0 auto",borderRadius:"20px",overflow:"hidden"},children:e.map((function(t){return Object(a.jsxs)("li",{style:c,children:[t.name," - ",t.artists[0].name]},t.id)}))})]}):null})}},49:function(t,e,n){"use strict";var a=n(1);e.a=function(t){var e={padding:"0.5em",display:"block"},n={border:"none",borderRadius:"50px",outline:"none",padding:"0.8em",width:"50%"};return Object(a.jsxs)("div",{style:{width:"100%",margin:"0 auto"},children:[Object(a.jsxs)("div",{style:e,children:[Object(a.jsx)("label",{style:e,htmlFor:"search",children:"Playlist Name: "}),Object(a.jsx)("input",{style:n,id:"playlistName",type:"text",value:t.playListName,onChange:t.handlePlaylistNameInput})]}),Object(a.jsxs)("div",{style:e,children:[Object(a.jsx)("label",{style:e,htmlFor:"search",children:"Playlist Description: "}),Object(a.jsx)("input",{style:n,id:"playlistDesc",type:"text",value:t.playlistDesc,onChange:t.handlePlaylistDescInput})]}),Object(a.jsxs)("div",{style:{padding:"1em"},children:[Object(a.jsxs)("label",{children:["Public",Object(a.jsx)("input",{type:"radio",name:"playlistPublic",value:"public",checked:t.playlistPublic,onChange:function(e){return t.setPlaylistPublic(e.target.value)}})]}),Object(a.jsxs)("label",{style:{padding:"0 0 0 1em"},children:["Private",Object(a.jsx)("input",{type:"radio",name:"playlistPublic",value:"private",checked:!t.playlistPublic,onChange:function(e){return t.setPlaylistPublic(!e.target.value)}})]})]})]})}},53:function(t,e,n){"use strict";var a=n.p+"static/media/Spotify_Icon_RGB_White.ecd54051.png",c=n(1);e.a=function(t){var e=t.link;return Object(c.jsxs)("div",{style:{backgroundColor:"#26D863",padding:"10px",outline:0,borderRadius:"50px",border:"none",cursor:"pointer",display:"flex",marginLeft:"auto",width:"11em",justifyContent:"center"},children:[Object(c.jsx)("img",{src:a,alt:"Spotify Icon",style:{height:"21px",width:"21px",paddingRight:"0.5em"}}),Object(c.jsx)("a",{style:{color:"#FFFFFF",textDecoration:"none"},href:e,children:"Connect to Spotify"})]})}},68:function(t,e,n){},90:function(t,e,n){},96:function(t,e,n){"use strict";n.r(e);var a=n(0),c=n.n(a),i=n(14),s=n.n(i),r=n(43),o=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,116)).then((function(e){var n=e.getCLS,a=e.getFID,c=e.getFCP,i=e.getLCP,s=e.getTTFB;n(t),a(t),c(t),i(t),s(t)}))},l=n(1);s.a.render(Object(l.jsx)(c.a.StrictMode,{children:Object(l.jsx)(r.a,{})}),document.getElementById("root")),o()}},[[96,1,2]]]);
//# sourceMappingURL=main.a5e137ad.chunk.js.map
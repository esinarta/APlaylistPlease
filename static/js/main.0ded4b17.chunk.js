(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{11:function(t,e,n){"use strict";var a=n(0);e.a=function(t){var e=t.text,n=t.onClick,c=t.disabled;return Object(a.jsx)("button",{style:{color:"black",backgroundColor:"#FFFFFF",padding:"10px",outline:0,borderRadius:"50px",border:"none",cursor:"pointer",margin:10},onClick:n,disabled:c,children:e})}},23:function(t,e,n){"use strict";(function(t){var a=n(8),c=n(6),i=n.n(c),s=n(10),r=n(3),o=(n(41),n(1)),l=n.n(o),u=n(4),d=n.n(u),p=n(24),h=n.n(p),j=n(25),b=n(26),f=n(27),y=n(28),m=n(29),x=n(30),O=n(11),v=n(0),g=t.from("".concat("34b31bfe4c604047a634247b71097587",":").concat("ec17b732457148a8b0e95f230f5bf56b")).toString("base64"),C="https://accounts.spotify.com/authorize";C+="?response_type=token",C+="&client_id="+encodeURIComponent("34b31bfe4c604047a634247b71097587"),C+="&scope="+encodeURIComponent("playlist-modify-private playlist-modify-public"),C+="&redirect_uri="+encodeURIComponent("http://localhost:3000");e.a=function(){var t=l.a.useState(""),e=Object(r.a)(t,2),n=e[0],c=e[1],o=l.a.useState(""),u=Object(r.a)(o,2),p=u[0],S=u[1],k=l.a.useState("artist"),P=Object(r.a)(k,2),w=P[0],F=P[1],A=l.a.useState([]),R=Object(r.a)(A,2),I=R[0],B=R[1],T=l.a.useState({}),_=Object(r.a)(T,2),N=_[0],D=_[1],z=l.a.useState([]),E=Object(r.a)(z,2),L=E[0],J=E[1],U=l.a.useState(""),q=Object(r.a)(U,2),G=q[0],H=q[1],M=l.a.useState(""),W=Object(r.a)(M,2),K=W[0],Q=W[1],V=l.a.useState(""),X=Object(r.a)(V,2),Y=X[0],Z=X[1],$=l.a.useState(""),tt=Object(r.a)($,2),et=tt[0],nt=tt[1],at=l.a.useState(!0),ct=Object(r.a)(at,2),it=ct[0],st=ct[1],rt=function(){var t=Object(s.a)(i.a.mark((function t(){var e;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,d()({method:"post",url:"https://accounts.spotify.com/api/token",headers:{Authorization:"Basic ".concat(g),"Content-Type":"application/x-www-form-urlencoded"},data:h.a.stringify({grant_type:"client_credentials"})});case 2:return e=t.sent,t.abrupt("return",e.data);case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();l.a.useEffect((function(){""===n&&rt().then((function(t){c(t.access_token)}))}),[n]);var ot=function(t){d()({method:"get",url:"".concat("https://api.spotify.com/v1/recommendations?seed_").concat(w,"s=").concat(t),headers:{Accept:"application/json",Authorization:"Bearer ".concat(n),"Content-Type":"application/json"}}).then((function(t){J(Object(a.a)(t.data.tracks))}))},lt=function(){for(var t,e={},n=/([^&;=]+)=?([^&;]*)/g,a=window.location.hash.substring(1);t=n.exec(a);)e[t[1]]=decodeURIComponent(t[2]);return e}();l.a.useEffect((function(){""===G&&H(lt.access_token)}),[G,lt.access_token]);var ut=l.a.useCallback(Object(s.a)(i.a.mark((function t(){var e;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,d()({method:"get",url:"".concat("https://api.spotify.com/v1/me"),headers:{Accept:"application/json",Authorization:"Bearer ".concat(G),"Content-Type":"application/json"}});case 2:return e=t.sent,t.abrupt("return",e.data);case 4:case"end":return t.stop()}}),t)}))),[G]);l.a.useEffect((function(){""===K&&G&&ut().then((function(t){Q(t.id)}))}),[K,ut,G]);var dt=function(t,e){d()({method:"post",url:"".concat("https://api.spotify.com/v1/playlists/").concat(t,"/tracks"),headers:{Accept:"application/json",Authorization:"Bearer ".concat(G),"Content-Type":"application/json"},data:JSON.stringify(e)}).then((function(t){console.log(t.data)}))};return Object(v.jsxs)("div",{className:"App",children:[Object(v.jsx)(x.a,{link:C}),Object(v.jsx)("h1",{children:"A Playlist, Please."}),Object(v.jsx)("p",{children:"Search for an artist or song to create a playlist of recommended tracks."}),Object(v.jsx)(j.a,{onSearch:function(t){S(t.target.value)}}),Object(v.jsx)(b.a,{searchFilter:w,setSearchFilter:F}),Object(v.jsx)(O.a,{text:"Search",disabled:!p,onClick:function(){d()({method:"get",url:"".concat("https://api.spotify.com/v1/search?q=").concat(p,"&type=").concat(w),headers:{Accept:"application/json",Authorization:"Bearer ".concat(n),"Content-Type":"application/json"}}).then((function(t){t.data.artists?B(Object(a.a)(t.data.artists.items)):B(Object(a.a)(t.data.tracks.items))}))}}),Object(v.jsx)(f.a,{searchResults:I,handleSearchSelection:function(t){ot(t.id)},searchSelection:N,setSearchSelection:D}),Object(v.jsx)(y.a,{playlist:L,searchSelection:N}),Object(v.jsx)("br",{}),L.length&&G?Object(v.jsxs)("div",{children:[Object(v.jsx)(m.a,{playListName:Y,playlistDesc:et,playlistPublic:it,setPlaylistPublic:st,handlePlaylistNameInput:function(t){Z(t.target.value)},handlePlaylistDescInput:function(t){nt(t.target.value)}}),Object(v.jsx)(O.a,{text:"Save Playlist",onClick:function(){return function(t,e,n){d()({method:"post",url:"".concat("https://api.spotify.com/v1/users/").concat(K,"/playlists"),headers:{Accept:"application/json",Authorization:"Bearer ".concat(G),"Content-Type":"application/json"},data:JSON.stringify({name:t,description:e,public:n})}).then((function(t){var e=t.data.id,n=[];L.forEach((function(t){n.push(t.uri)})),dt(e,{uris:n})}))}(Y,et,it)}})]}):Object(v.jsx)("div",{})]})}}).call(this,n(35).Buffer)},25:function(t,e,n){"use strict";var a=n(0);e.a=function(t){var e=t.search,n=t.onSearch;return Object(a.jsx)("div",{children:Object(a.jsx)("input",{style:{border:"none",borderColor:"transparent",borderRadius:"50px",outline:"none",height:"2em",width:"50%",padding:"0.2em 1.5em 0.2em 1.5em"},id:"search",type:"text",value:e,onChange:n})})}},26:function(t,e,n){"use strict";var a=n(0);e.a=function(t){var e=t.searchFilter,n=t.setSearchFilter,c={padding:"1rem"};return Object(a.jsxs)("div",{style:c,children:[Object(a.jsxs)("label",{style:c,children:["Artist",Object(a.jsx)("input",{type:"radio",name:"searchType",value:"artist",checked:"artist"===e,onChange:function(t){return n(t.target.value)}})]}),Object(a.jsxs)("label",{style:c,children:["Song",Object(a.jsx)("input",{type:"radio",name:"searchType",value:"track",checked:"track"===e,onChange:function(t){return n(t.target.value)}})]})]})}},27:function(t,e,n){"use strict";n(63);var a=n(0);e.a=function(t){var e=t.searchResults,n=t.handleSearchSelection,c=(t.searchSelection,t.setSearchSelection),i={listStyleType:"none",textAlign:"left",borderBottom:"1px solid #CCCCCC",padding:"1em"};return Object(a.jsx)("div",{style:{width:"40%",backgroundColor:"white",color:"black",margin:"0 auto",borderRadius:"20px",overflow:"hidden"},children:e.length?Object(a.jsx)("div",{children:e.map((function(t){return Object(a.jsx)("li",{className:"resultItem",style:i,onClick:function(){n(t),c(t)},children:"artist"===t.type?Object(a.jsx)("p",{children:t.name}):Object(a.jsxs)("p",{children:[t.name," - ",t.artists[0].name]})},t.id)}))}):Object(a.jsx)("div",{})})}},28:function(t,e,n){"use strict";var a=n(0);e.a=function(t){var e=t.playlist,n=t.searchSelection,c={listStyleType:"none",textAlign:"left",borderBottom:"1px solid #CCCCCC",padding:"1em"};return Object(a.jsx)("div",{children:e.length?Object(a.jsxs)("div",{children:[Object(a.jsx)("h4",{children:"Here's a playlist based on: "}),"artist"===n.type?Object(a.jsxs)("div",{children:[Object(a.jsx)("img",{src:n.images[2].url,alt:"Artist profile"}),Object(a.jsx)("p",{children:n.name})]}):Object(a.jsxs)("div",{children:[Object(a.jsx)("img",{src:n.album.images[2].url,alt:"Song artwork"}),Object(a.jsxs)("p",{children:[n.name," - ",n.artists[0].name]})]}),Object(a.jsx)("div",{style:{width:"40%",backgroundColor:"white",color:"black",margin:"0 auto",borderRadius:"20px",overflow:"hidden"},children:e.map((function(t){return Object(a.jsxs)("li",{style:c,children:[t.name," - ",t.artists[0].name]},t.id)}))})]}):Object(a.jsx)("div",{})})}},29:function(t,e,n){"use strict";var a=n(0);e.a=function(t){var e={padding:"0.5em"},n={border:"none",borderRadius:"50px",outline:"none",padding:"0.8em"};return Object(a.jsxs)("div",{style:{width:"40%",margin:"0 auto"},children:[Object(a.jsxs)("div",{style:e,children:[Object(a.jsx)("label",{style:e,htmlFor:"search",children:"Playlist Name: "}),Object(a.jsx)("input",{style:n,id:"playlistName",type:"text",value:t.playListName,onChange:t.handlePlaylistNameInput})]}),Object(a.jsxs)("div",{style:e,children:[Object(a.jsx)("label",{style:e,htmlFor:"search",children:"Playlist Description: "}),Object(a.jsx)("input",{style:n,id:"playlistDesc",type:"text",value:t.playlistDesc,onChange:t.handlePlaylistDescInput})]}),Object(a.jsxs)("div",{style:{padding:"1em"},children:[Object(a.jsxs)("label",{children:["Public",Object(a.jsx)("input",{type:"radio",name:"playlistPublic",value:"public",checked:t.playlistPublic,onChange:function(e){return t.setPlaylistPublic(e.target.value)}})]}),Object(a.jsxs)("label",{children:["Private",Object(a.jsx)("input",{type:"radio",name:"playlistPublic",value:"private",checked:!t.playlistPublic,onChange:function(e){return t.setPlaylistPublic(!e.target.value)}})]})]})]})}},30:function(t,e,n){"use strict";var a=n.p+"static/media/Spotify_Icon_RGB_White.ecd54051.png",c=n(0);e.a=function(t){var e=t.link;return Object(c.jsxs)("div",{style:{backgroundColor:"#26D863",padding:"10px",outline:0,borderRadius:"50px",border:"none",cursor:"pointer",display:"flex",marginLeft:"auto",width:"11em",justifyContent:"center"},children:[Object(c.jsx)("img",{src:a,alt:"Spotify Icon",style:{height:"21px",width:"21px",paddingRight:"0.5em"}}),Object(c.jsx)("a",{style:{color:"#FFFFFF",textDecoration:"none"},href:e,children:"Connect to Spotify"})]})}},41:function(t,e,n){},63:function(t,e,n){},64:function(t,e,n){"use strict";n.r(e);var a=n(1),c=n.n(a),i=n(22),s=n.n(i),r=n(23),o=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,65)).then((function(e){var n=e.getCLS,a=e.getFID,c=e.getFCP,i=e.getLCP,s=e.getTTFB;n(t),a(t),c(t),i(t),s(t)}))},l=n(0);s.a.render(Object(l.jsx)(c.a.StrictMode,{children:Object(l.jsx)(r.a,{})}),document.getElementById("root")),o()}},[[64,1,2]]]);
//# sourceMappingURL=main.0ded4b17.chunk.js.map
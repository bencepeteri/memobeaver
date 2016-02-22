function json2array(e){var r=[],t=Object.keys(e);return t.forEach(function(t){r.push(e[t])}),r}function contains(e,r){for(var t=0;t<e.length;t++)if(e[t]===r)return!0;return!1}function getRandomInt(e,r){return Math.floor(Math.random()*(r-e+1))+e}function reset(e){for(var r=$(".inper"),t=1;t<r.length;t++)$(r[t]).remove();$(r[0]).val(""),$(r[0]).css("background-color","rgba(255,255,255,0.7)	"),$("#rmvBtn").attr("disabled","disabled"),$(".resultarea").hide(),$("#twitter").hide()}function go(e){for(var r=[],t=$(".inper"),a=0;a<t.length;a++){var n=$(t[a]).val();(""!=n||null!=n)&&r.push(n)}var o=r.length;if(o>5){for(var i=Math.floor(o/2),l=[],s=[],a=0;i>a;a++)l.push(r[a]);for(var a=i;a<r.length;a++)s.push(r[a]);for(var u=variate(l),c=variate(s),d=[],p=[],a=0;i>a;a++)for(;;){var g=getRandomInt(0,colors.length-1);if(!contains(d,colors[g])&&!contains(p,colors[g])){d.push(colors[g]);break}}for(var a=0;a<s.length;a++)for(;;){var g=getRandomInt(0,colors.length-1);if(!contains(d,colors[g])&&!contains(p,colors[g])){p.push(colors[g]);break}}colorses=[d,p],recursive(u,u.length,0),recursive(c,c.length,1),$(".loading").slideDown({duration:500,queue:!1})}else{for(var h=[],a=0;o>a;a++)for(;;){var g=getRandomInt(0,colors.length-1);if(!contains(h,colors[g])){h.push(colors[g]);break}}colorses=[h,[]],r=variate(r),r.length>0&&($($(".loading")[0]).slideDown({duration:500,queue:!1}),recursive(r,r.length,0))}}function add(e){$("#inparea").append('<input type="text" class="inper form-control" />'),placeholdInputs(),$(".inper").last().hide(),$(".inper").last().slideDown(250),10==$(".inper").length&&$("#addBtn").attr("disabled","disabled"),$(".inper").length>1&&$("#rmvBtn").removeAttr("disabled"),$("input").css("background-color","rgba(255,255,255,0.7)"),$(".inper").last().focus(),$(".resultarea").slideUp({duration:150,queue:!1}),$("#twitter").slideUp({duration:150,queue:!1}),$(".inper").last().change(function(){"visible"==$(".resultarea").css("visibility")&&$("input").css("background-color","rgba(255,255,255,0.7)")}),$(".inper").last().on("paste",function(e){e.preventDefault();for(var r=(e.originalEvent||e).clipboardData.getData("text/plain")||prompt("Paste something..."),t=[],a=0;a<r.split("\n").length;a++)t.push(r.split("\n")[a].trim());for(var n=10<t.length?10:t.length,o=$(".inper").index(this),i=0,a=0;n>a;a++)o+a>=$(".inper").length?$("#inparea").append('<input type="text" class="inper form-control" value="'+t[i++]+'" />'):$($(".inper")[o+a]).val(t[i++]);placeholdInputs(),$("input").css("background-color","rgba(255,255,255,0.7)")})}function removeLast(e){$(".inper").last().slideUp(150),setTimeout(function(){$(".inper").last().remove()},150),"disabled"==$("#addBtn").attr("disabled")&&$(".inper").length<=10&&$("#addBtn").removeAttr("disabled"),2==$(".inper").length&&$("#rmvBtn").attr("disabled","disabled"),$("input").css("background-color","rgba(255,255,255,0.7)"),$(".inper").last().focus(),$(".resultarea").slideUp({duration:150,queue:!1}),$("#twitter").slideUp({duration:150,queue:!1})}function placeholdInputs(){for(var e=$(".inper"),r=1,t=0;t<e.length;t++)$(e[t]).attr("placeholder","Item "+r.toString()),r++}function recursive(e,r,t){$.getJSON("https://en.wikipedia.org/w/api.php?action=opensearch&search="+e[r-1]+"&limit=4&namespace=0&format=json&callback=?",function(a){if(json2array(a)[1].length<1)0==r?($($(".title")[t]).text("Sorry, we couldn't find a solution"),$($(".desc")[t]).text("Our only excuse is that Memobeaver is still in beta version,\n but don't worry, it's getting better and better every day"),$($(".resultarea")[t]).slideDown({duration:1e3,queue:!1}),$($(".resultarea")[t]).animate({"margin-left":"15%"},{duration:1e3,queue:!1}),$($(".loading")[t]).hide()):recursive(e,r-1,t);else{arrays=json2array(a);var n=arrays[0],o="",i="",l="";arrays[1].length>1?(o=arrays[1][1],i=arrays[2][1],l=arrays[3][1]):(o=arrays[1][0],i=arrays[2][0],l=arrays[3][0]),(""==i||null==i||" "==i)&&(i="Seems like Wikipedia couldn't give a simple explanation of this",$($(".link")[t]).text("Click here to open Wikipedia page"));var s=colorses[0].length,u=colorses[1].length,c=colorses[t],d=n.length/c.length,p="",g=[],h=$(".inper");if(0==t)for(var v=0;u>v;v++)h.splice(s,1);else if(1==t)for(var v=0;s>v;v++)h.splice(0,1);for(var v=0;v<n.length;v++)for(var f=0;f<h.length;f++)if($(h[f]).val()[0].toString().toLowerCase()==n[v].toString().toLowerCase()){g.push($(h[f])),h.splice(f,1);break}for(var b=0,v=0;v<g.length;v++){for(var m="",f=0;d>f;f++)m+=$(g[v]).val()[f];b+=m.length,p+='<span class="index'+t.toString()+"element"+v.toString()+'">'+m+"</span>"}for(var v=b;v<o.length;v++)p+=o[v];$($(".title")[t]).html(p),$($(".desc")[t]).text(i),$($(".link")[t]).attr("href",l);for(var v=0;v<g.length;v++)$(g[v]).removeClass(),$(g[v]).addClass("form-control"),$(g[v]).addClass("inper"),$(g[v]).addClass("index"+t.toString()+"element"+v.toString()),$(".index"+t.toString()+"element"+v.toString()).css("background-color",c[v]);$($(".loading")[t]).hide(),$($(".resultarea")[t]).slideDown({duration:1e3,queue:!1}),$($(".resultarea")[t]).animate({"margin-left":"15%"},{duration:1e3,queue:!1}),$("#twitter").slideDown({duration:1500,queue:!1})}})}function variateOrder(e){for(var r=0;r<e.length;r++)e[r]=e[r].toLowerCase();for(var t=[],a=100,r=0;r<e.length;r++)e[r].length<a&&(a=e[r].length);a>4&&(a=4);for(var r=0;a>=r;r++){for(var n="",o=0;o<e.length;o++){for(var i="",l=0;r>l;l++)i+=e[o].charAt(l);n+=i}t.push(n)}return t}function variate(e){for(var r=[],t=permutations(e),a=0;a<t.length;a++)for(var n=0;n<variateOrder(t[a]).length;n++){var o=variateOrder(t[a])[n];""!=o&&r.push(o)}return r.sort(function(e,r){return e.length-r.length})}$(function(){$(".resultarea").hide(),$("#twitter").hide(),$(".loading").hide(),placeholdInputs(),$("#addBtn").click(add),$("#rmvBtn").click(removeLast),$("#goBtn").click(go),$("#rmvBtn").attr("disabled","disabled"),$("#rstBtn").click(reset),$("input").css("background-color","rgba(255,255,255,0.7)"),$(".headerlink").css("color","white"),$(".inper").first().focus(),$(".inper").on("paste",function(e){e.preventDefault();for(var r=(e.originalEvent||e).clipboardData.getData("text/plain")||prompt("Paste something..."),t=[],a=0;a<r.split("\n").length;a++)t.push(r.split("\n")[a].trim());for(var n=10<t.length?10:t.length,o=$(".inper").index(this),i=0,a=0;n>a;a++)o+a>=$(".inper").length?$("#inparea").append('<input type="text" class="inper form-control" value="'+t[i++]+'" />'):$($(".inper")[o+a]).val(t[i++]);placeholdInputs(),$("input").css("background-color","rgba(255,255,255,0.7)")})});var colorses=[],colors=["rgba(255,0,0,0.5)","rgba(255,128,0,0.5)","rgba(255,255,0,0.5)","rgba(128,255,0,0.5)","rgba(0,255,0,0.5)","rgba(0,255,128,0.5)","rgba(0,255,255,0.5)","rgba(0,128,255,0.5)","rgba(0,0,255,0.5)","rgba(127,0,255,0.5)","rgba(255,0,255,0.5)","rgba(255,0,127,0.5)","rgba(128,128,128,0.5)"];
function json2array(json){
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function(key){
        result.push(json[key]);
    });
    return result;
}
$(function(){
	$('.resultarea').hide();
	$('#twitter').hide();
	$('.loading').hide();
	placeholdInputs();
	$('#addBtn').click(add);
	$('#rmvBtn').click(removeLast);
	$('#goBtn').click(go);
	$('#rmvBtn').attr("disabled", "disabled");
	$('#rstBtn').click(reset);
	$('input').css('background-color', "rgba(255,255,255,0.7)");
	$('.headerlink').css("color", "white");
	$('.inper').first().focus();
	$('.inper').on('paste', function(e){
		e.preventDefault();
		var text = (e.originalEvent || e).clipboardData.getData('text/plain') || prompt('Paste something...');
		var lines = [];
		for (var i = 0; i < text.split('\n').length; i++){
			lines.push(text.split('\n')[i].trim());
		}
		var max = 10 < lines.length ? 10 : lines.length;
		var y = $('.inper').index(this);
		var x = 0;
		for (var i = 0; i < max; i++){
			if (y+i >= $('.inper').length){
				$('#inparea').append('<input type="text" class="inper form-control" value="' + lines[x++] + '" />');
			} else {
				$($('.inper')[y+i]).val(lines[x++]);
			}
		}
		placeholdInputs();
		$('input').css('background-color', "rgba(255,255,255,0.7)");
	});
});	
function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function reset(e) {
	var inpers = $('.inper');
	for (var i = 1; i < inpers.length; i++) {
		$(inpers[i]).remove();
	}	
	$(inpers[0]).val("");
	$(inpers[0]).css("background-color", "rgba(255,255,255,0.7)	");
	$('#rmvBtn').attr("disabled", "disabled");
	$('.resultarea').hide();
	$('#twitter').hide();
}
function go(e){
	var theList = [];
	var inpers = $('.inper');
	for (var i = 0; i < inpers.length; i++) {
		var x = $(inpers[i]).val();
		if (x != "" || x != null) {
			theList.push(x);
		}
	}
	var listLength = theList.length;
	if (listLength > 5) {
		var array1length = Math.floor(listLength/2);
		var array2length = listLength - array1length;
		var array1 = [];
		var array2 = [];
		for (var i = 0; i < array1length; i++) {
			array1.push(theList[i]);
		} for (var i = array1length; i < theList.length; i++) {
			array2.push(theList[i]);
		}
		var variated1 = variate(array1);
		var variated2 = variate(array2);
		var colors1 = [];
		var colors2 = [];
		for (var i = 0; i < array1length; i++) {
			while (true) {
				var rndm = getRandomInt(0, colors.length-1);
				if (!((contains(colors1, colors[rndm])) ||	contains(colors2, colors[rndm]))) {
					colors1.push(colors[rndm]);
					break;
				}
			}
		} for (var i = 0; i < array2.length; i++) {
			
			while (true) {
				var rndm = getRandomInt(0, colors.length-1);
				if (!((contains(colors1, colors[rndm])) ||	contains(colors2, colors[rndm]))) {
					colors2.push(colors[rndm]);
					break;
				}
			}
		}
		colorses = [colors1,colors2];
		recursive(variated1, variated1.length, 0);
		recursive(variated2, variated2.length, 1);
		$('.loading').slideDown({duration: 500, queue: false});
	} else {
		var colorz = [];
		for (var i = 0; i < listLength; i++) {
			while (true) {
				var rndm = getRandomInt(0, colors.length-1);
				if (!(contains(colorz, colors[rndm]))) {
					colorz.push(colors[rndm]);
					break;
				}
			}
		}
		colorses = [colorz, []];
		theList = variate(theList);
		if(theList.length > 0) {
			$($('.loading')[0]).slideDown({duration: 500, queue: false});
			recursive(theList, theList.length, 0);
		} 
	}
}
var colorses = [];
function add(e) {
	$('#inparea').append('<input type="text" class="inper form-control" />');
	placeholdInputs();
	$('.inper').last().hide();
	$('.inper').last().slideDown(250);
	if ($('.inper').length == 10) {
		$("#addBtn").attr("disabled", "disabled");
	}
	if ($(".inper").length > 1) { $('#rmvBtn').removeAttr("disabled"); }
	$('input').css('background-color', "rgba(255,255,255,0.7)");	
	$('.inper').last().focus();
	$('.resultarea').slideUp({duration: 150, queue:false});
	$('#twitter').slideUp({duration: 150, queue:false});
	$('.inper').last().change(function(){
		if($('.resultarea').css("visibility") == "visible"){
			$('input').css('background-color', "rgba(255,255,255,0.7)");
		}
	});
	$('.inper').last().on('paste', function(e){
		e.preventDefault();
		var text = (e.originalEvent || e).clipboardData.getData('text/plain') || prompt('Paste something...');
		var lines = [];
		for (var i = 0; i < text.split('\n').length; i++){
			lines.push(text.split('\n')[i].trim());
		}
		var max = 10 < lines.length ? 10 : lines.length;
		var y = $('.inper').index(this);
		var x = 0;
		for (var i = 0; i < max; i++){
			if (y+i >= $('.inper').length){
				$('#inparea').append('<input type="text" class="inper form-control" value="' + lines[x++] + '" />');
			} else {
				$($('.inper')[y+i]).val(lines[x++]);
			}
		}
		placeholdInputs();
		$('input').css('background-color', "rgba(255,255,255,0.7)");
	}); 
}
function removeLast(e){
	$('.inper').last().slideUp(150);
	setTimeout(function(){
    $('.inper').last().remove();
	}, 150);
	if ($('#addBtn').attr("disabled") == "disabled") {
		if ($('.inper').length <= 10) {
			$("#addBtn").removeAttr("disabled");
		}
	}
	if ($(".inper").length == 2) { $('#rmvBtn').attr("disabled", "disabled");}
	$('input').css('background-color', "rgba(255,255,255,0.7)");	
	$('.inper').last().focus();
	$('.resultarea').slideUp({duration: 150, queue:false});
	$('#twitter').slideUp({duration: 150, queue:false});
}
function placeholdInputs(){
	var inputs = $('.inper');
	var e = 1;
	for (var i = 0; i < inputs.length; i++) {
		$(inputs[i]).attr("placeholder", "Item " + e.toString());
		e++;
	}
}
function recursive(list, i, index){
	$.getJSON('https://en.wikipedia.org/w/api.php?action=opensearch&search=' + list[i-1]
				+ '&limit=4&namespace=0&format=json&callback=?', function(data) {
					if (json2array(data)[1].length < 1) {
						if (i == 0) {
							$($('.title')[index]).text("Sorry, we couldn't find a solution");
							$($('.desc')[index]).text("Our only excuse is that Memobeaver is still in beta version," +  
							"\n but don't worry, it's getting better and better every day");
							$($('.resultarea')[index]).slideDown({duration:1000, queue: false});
							$($('.resultarea')[index]).animate({'margin-left': '15%'}, {duration:1000, queue: false});
							$($('.loading')[index]).hide();
							
						} else {
						recursive(list, i-1, index) };
					} else {
						arrays = json2array(data);
						var original = arrays[0];
						var title = "";
						var desc = "";
						var link = "";
						if (arrays[1].length > 1) {
							title = arrays[1][1];
							desc = arrays[2][1];
							link = arrays[3][1];
						} else {
							title = arrays[1][0];
							desc = arrays[2][0];
							link = arrays[3][0];
						} if (desc == "" || desc == null || desc == " ") {
							desc = "Seems like Wikipedia couldn't give a simple explanation of this";
							$($('.link')[index]).text("Click here to open Wikipedia page");
						}
						var col1length = colorses[0].length;
						var col2length = colorses[1].length;
						var colIndex = colorses[index];
						var colLength = col1length + col2length;
						var firstNum = original.length / colIndex.length;
						var titleHtml = "";
						var inpersInOrder = [];
						var inpers = $('.inper');
						if (index == 0) {
							for (var x = 0; x < col2length; x++) {
								inpers.splice(col1length, 1);
							}
						} else if (index == 1) {
							for (var x = 0; x < col1length; x++) {
								inpers.splice(0, 1);
							}
						} for (var x = 0; x < original.length; x++) {
							for (var y = 0; y < inpers.length; y++) {
								if ($(inpers[y]).val()[0].toString().toLowerCase()
										== original[x].toString().toLowerCase()){
										inpersInOrder.push($(inpers[y])); 
										inpers.splice(y,1);
										break;
									}
									
							}
						}
						var partSum = 0;
						for (var x = 0; x < inpersInOrder.length; x++) {
							var part = "";
							for (var y = 0; y < firstNum; y++) {
								part += $(inpersInOrder[x]).val()[y];
							}
							partSum += part.length;
							titleHtml += '<span class="index' + index.toString() + 'element' + x.toString() + 
								'">' + part + '</span>';	
						} for (var x = partSum; x < title.length; x++) {
							titleHtml += title[x];
						}
						$($('.title')[index]).html(titleHtml);
						$($('.desc')[index]).text(desc);
						$($('.link')[index]).attr('href', link);
						
						for (var x = 0; x < inpersInOrder.length; x++) {
							$(inpersInOrder[x]).removeClass();
							$(inpersInOrder[x]).addClass('form-control');
							$(inpersInOrder[x]).addClass('inper');
							$(inpersInOrder[x]).addClass('index' + index.toString() +
								'element' + x.toString());
							$('.index' + index.toString() + 'element' + x.toString()).css(
								"background-color", colIndex[x]);
						}	
						$($('.loading')[index]).hide();
						$($('.resultarea')[index]).slideDown({duration:1000, queue: false});
						$($('.resultarea')[index]).animate({'margin-left': '15%'}, {duration:1000, queue: false});
						$('#twitter').slideDown({duration: 1500, queue: false});
						
					}
				});
}

var colors = ["rgba(255,0,0,0.5)", "rgba(255,128,0,0.5)", "rgba(255,255,0,0.5)", 
"rgba(128,255,0,0.5)","rgba(0,255,0,0.5)", "rgba(0,255,128,0.5)", 
"rgba(0,255,255,0.5)", "rgba(0,128,255,0.5)", "rgba(0,0,255,0.5)", 
"rgba(127,0,255,0.5)", "rgba(255,0,255,0.5)", "rgba(255,0,127,0.5)", "rgba(128,128,128,0.5)"];

	
function variateOrder(list){
	for (var i = 0; i < list.length; i++) {
		list[i] = list[i].toLowerCase();
	}
	var fin = [];
	var min = 100;
	for (var i = 0; i < list.length; i++) {
		if (list[i].length < min) {
			min = list[i].length;
		}
	}
	if (min > 4) { min = 4;}
	for (var i = 0; i <= min; i++) {	
		var version = "";
		for (var x = 0; x < list.length; x++) {
			var current = "";
			for (var y = 0; y < i; y++) {
				current = current + list[x].charAt(y);
			}
			version = version + current;
		}
		fin.push(version);
	}
	return fin;
}
function variate(list){
	var fin = [];
	var perms = permutations(list);
	for (var i = 0; i < perms.length; i++) {
		for (var a = 0; a < variateOrder(perms[i]).length; a++){
			var x = variateOrder(perms[i])[a];
			if (!(x == "")) {
				fin.push(x);
			} 
		}
	}
	return fin.sort(function(a, b){
		return a.length - b.length;
});;
}

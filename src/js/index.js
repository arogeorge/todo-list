(function(b,o,i,l,e,r){
	b.GoogleAnalyticsObject=l;
	b[l]||(b[l]=function(){
		(b[l].q=b[l].q||[]).push(arguments)
	});
	b[l].l=+new Date;
    e=o.createElement(i);
	r=o.getElementsByTagName(i)[0];
    e.src='https://www.google-analytics.com/analytics.js';
    r.parentNode.insertBefore(e,r)
}(window,document,'script','ga'));
ga('create','UA-XXXXX-X','auto');
ga('send','pageview');
 //prompt("What's your favorite cocktail drink?");
 
 var getDataList = JSON.parse(localStorage.getItem('DATALIST'));
 var totCount = 0, activeCount =0, completeCount = 0, datID= 0, dataList='';
 
 $(document).ready(function(){
	if(getDataList != null){
		var dataList = $("#datListTemplate").html();
		var layout = Handlebars.compile(dataList);
		var hml = layout(getDataList);
		$("#todoList tbody").html(hml);
        
		totCount = getDataList.totalList;
		activeCount = getDataList.active;
		completeCount = getDataList.compList;
		$("span.completedList").text(completeCount);
		$("span.activeList").text(activeCount);
	    $("span.totList").text(totCount);
		datID = getDataList.listTime.length;
		$("#todoList tbody tr td").css("vertical-align","middle");
	}
 });
 
 function AddBtn(){
	 var flag = true;
	 var txtVal = $(".txtVal").val();
	 datID++;
	 if(txtVal == ""){
		 alert("Please enter any text");
		 return false;
	 }
	 if($('#todoList tr').length == 1){
		 $('#todoList tr').each(function(){
			 var dupText = $(this).find("td:eq(1)").text();
			 if( dupText == txtVal){
				 flag = false;
			 }else{
			 }
			 if($(this).find("td:eq(0) i").hasClass("active")){
				 activeCount++;
			 }else{
			 }
		 });
	 }else{
		 activeCount++;
	 }
	 if(flag == false){
		 alert("Duplicate values not allowed to add");
		 return false;
	 }
	 var appendTxt = '<tr id='+datID+'><td class = "iCon"><i class="ion-ios-checkmark font32 active"></i></td><td class="txtClass">'+txtVal+'</td><td class="text-right btns"><div><button class="btn btn-success" onclick = "Complete(this);"><i class="glyphicon glyphicon-ok"></i></button>'
					 +'<button class="btn btn-info unComplete none bt"><i class="glyphicon glyphicon-repeat"></i></button>'
					 +'<button class="btn btn-edit editable bt"><i class="glyphicon glyphicon-edit"></i></button>'
					 +'<button class="btn btn-danger bt"><i class="glyphicon glyphicon-remove"></i></button></div></td> </tr>';
	 $("#todoList").append(appendTxt);
	 totCount++;
	 $(".txtVal").val("");
	 $("span.totList").text(totCount);
	 $("span.activeList").text(activeCount);
	 var itemlistloc = [];
	 $("#todoList tbody tr td").css("vertical-align","middle");
	  $('#todoList tr').each(function(){
			 var dupText = $(this).find("td:eq(1)").text();
			 var dataID = $(this).attr('id');
			 var isAct = "N";
			 var isCom = "N";
			 if($(this).find("td:eq(0) i").hasClass("active")){
				 isAct = "Y";
			 }else if($(this).find("td:eq(1)").hasClass("todo-completed")){
				 isCom = "Y";
			 }
			 var datList = {
									"id": dataID,
									"textVal": dupText,
									"isActive": isAct,
									"isComplete": isCom
								}
			itemlistloc.push(datList);
		 });
		 dataList = {
					"totalList": totCount,
					"active": activeCount,
					"compList": completeCount,
					"listTime":itemlistloc 
		 }
	 localStorage.setItem('DATALIST',JSON.stringify(dataList));
 }
 
 $(document).on('click','.iCon i',function(){
	    localStorage.removeItem('DATALIST');
    	var s = $(this);
        s.toggleClass('active');
	    $(this).parents('tr').find('td.btns div').toggleClass("visib");
		
		var itemlistloc = [];
		$("#todoList tbody tr td").css("vertical-align","middle");
		$('#todoList tr').each(function(){
			 var dupText = $(this).find("td:eq(1)").text();
			 var dataID = $(this).attr('id');
			 var isAct = "N";
			 var isCom = "N";
			 if($(this).find("td:eq(0) i").hasClass("active")){
				 isAct = "Y";
			 }else if($(this).find("td:eq(1)").hasClass("todo-completed")){
				 isCom = "Y";
			 }
			 var datList = {
									"id": dataID,
									"textVal": dupText,
									"isActive": isAct,
									"isComplete": isCom
								}
			itemlistloc.push(datList);
		 });
		 dataList = {
					"totalList": totCount,
					"active": activeCount,
					"compList": completeCount,
					"listTime":itemlistloc 
		 }
	 localStorage.setItem('DATALIST',JSON.stringify(dataList));
 });
 
  $(document).on('click','.btn.btn-success',function(){
	 localStorage.removeItem('DATALIST');
	 completeCount++;
	 activeCount--;
	 $(this).parents('tr').find('td.iCon i').removeClass('active').css('pointer-events','none');
	 $(this).parents('tr').find('td.txtClass').addClass('todo-completed');
	 $(this).addClass('none').next('.unComplete').removeClass('none');
	 $(this).next().next('.btn.editable').addClass('none');
	 $("span.activeList").text(activeCount);
	 $("span.completedList").text(completeCount);
	 
	 var itemlistloc = [];
	 $("#todoList tbody tr td").css("vertical-align","middle");
	  $('#todoList tr').each(function(){
			 var dupText = $(this).find("td:eq(1)").text();
			 var dataID = $(this).attr('id');
			 var isAct = "N";
			 var isCom = "N";
			 if($(this).find("td:eq(0) i").hasClass("active")){
				 isAct = "Y";
			 }else if($(this).find("td:eq(1)").hasClass("todo-completed")){
				 isCom = "Y";
			 }
			 var datList = {
									"id": dataID,
									"textVal": dupText,
									"isActive": isAct,
									"isComplete": isCom
								}
			itemlistloc.push(datList);
		 });
		 dataList = {
					"totalList": totCount,
					"active": activeCount,
					"compList": completeCount,
					"listTime":itemlistloc 
		 }
	 localStorage.setItem('DATALIST',JSON.stringify(dataList));
  });
 
  $(document).on('click','.btn.unComplete',function(){
	  localStorage.removeItem('DATALIST');
	  completeCount--;
	  activeCount++;
	 $(this).parents('tr').find('td.iCon i').addClass('active').css('pointer-events','auto');
	 $(this).parents('tr').find('td.txtClass').removeClass('todo-completed');
	 $(this).addClass('none').prev('.btn-success').removeClass('none');
	 $(this).next('.btn.editable').removeClass('none');
	 $("span.completedList").text(completeCount);
	 $("span.activeList").text(activeCount);
	 
	 var itemlistloc = [];
	 $("#todoList tbody tr td").css("vertical-align","middle");
	  $('#todoList tr').each(function(){
			 var dupText = $(this).find("td:eq(1)").text();
			 var dataID = $(this).attr('id');
			 var isAct = "N";
			 var isCom = "N";
			 if($(this).find("td:eq(0) i").hasClass("active")){
				 isAct = "Y";
			 }else if($(this).find("td:eq(1)").hasClass("todo-completed")){
				 isCom = "Y";
			 }
			 var datList = {
									"id": dataID,
									"textVal": dupText,
									"isActive": isAct,
									"isComplete": isCom
								}
			itemlistloc.push(datList);
		 });
		 dataList = {
					"totalList": totCount,
					"active": activeCount,
					"compList": completeCount,
					"listTime":itemlistloc 
		 }
	 localStorage.setItem('DATALIST',JSON.stringify(dataList));
  });
  $(document).on('click','.btn.editable',function(){
	   var editTxt = $(this).parents('tr').find('td:eq(1)').text();
	   $(this).parents('tr').find('td:eq(1)').addClass('edited');
	  $('.editBtn').removeClass('none');
	  $('.addBtn').addClass('none');
	  $(this).addClass('none');
	  $(this).parents('tr').find('td.btns .btn-success, td.btns .btn-danger').toggleClass("visib");
	  $('#todoList, .iCon').css('pointer-events','none');
	   OnFocus(editTxt);
  });
  
  function OnFocus(arg){
	  $(".txtVal").val(arg);
	  $("input").focus();
	  $(".txtVal").addClass('editingVal');
  }
  
  $(document).on('keyup','.editingVal',function(){
	   var editingTxt = $(this).val();
	   $('td.edited').text(editingTxt);
  });
  $(document).on('click','.editBtn',function(){
	  localStorage.removeItem('DATALIST');
	   $('.editBtn').addClass('none');
	  $('.addBtn').removeClass('none');
	   var txtVal = $(".txtVal").val();
	  $('.edited').html(txtVal);
	   $('.edited').parents('tr').find('.btn-success, .btn-danger, .btn-edit').removeClass("none");
	   $('.edited').parents('tr').find('td.btns .btn-success, td.btns .btn-danger').toggleClass("visib");
	  $(".txtVal").val('').removeClass('editingVal');
	   $('tr').find('td:eq(1)').removeClass('edited');
	   $('#todoList, .iCon').css('pointer-events','auto');
	   var itemlistloc = [];
	 $("#todoList tbody tr td").css("vertical-align","middle");
	  $('#todoList tr').each(function(){
			 var dupText = $(this).find("td:eq(1)").text();
			 var dataID = $(this).attr('id');
			 var isAct = "N";
			 var isCom = "N";
			 if($(this).find("td:eq(0) i").hasClass("active")){
				 isAct = "Y";
			 }else if($(this).find("td:eq(1)").hasClass("todo-completed")){
				 isCom = "Y";
			 }
			 var datList = {
									"id": dataID,
									"textVal": dupText,
									"isActive": isAct,
									"isComplete": isCom
								}
			itemlistloc.push(datList);
		 });
		 dataList = {
					"totalList": totCount,
					"active": activeCount,
					"compList": completeCount,
					"listTime":itemlistloc 
		 }
	 localStorage.setItem('DATALIST',JSON.stringify(dataList));
  });
  
  $(document).on('click','.btn.btn-danger',function(){
	  localStorage.removeItem('DATALIST');
	  var sthis = $(this);
	  var dltAlert = confirm("Do want to delete this row???");
	  if(dltAlert == true){
			sthis.parents('tr').remove();
			if(sthis.parents('tr').find('td.iCon i').hasClass('active')){
				 activeCount--;
				 $("span.activeList").text(activeCount);
			}else if(sthis.parents('tr').find('td.txtClass').hasClass('todo-completed')){
				completeCount--;
				$("span.completedList").text(completeCount);
			}
			totCount--;
			$("span.totList").text(totCount);
			setTimeout(function () {
				alert("Row Deleted");
				return false;
			}, 100);
	  }else{
		  
	  }
	  
	  var itemlistloc = [];
	 $("#todoList tbody tr td").css("vertical-align","middle");
	  $('#todoList tr').each(function(){
			 var dupText = $(this).find("td:eq(1)").text();
			 var dataID = $(this).attr('id');
			 var isAct = "N";
			 var isCom = "N";
			 if($(this).find("td:eq(0) i").hasClass("active")){
				 isAct = "Y";
			 }else if($(this).find("td:eq(1)").hasClass("todo-completed")){
				 isCom = "Y";
			 }
			 var datList = {
									"id": dataID,
									"textVal": dupText,
									"isActive": isAct,
									"isComplete": isCom
								}
			itemlistloc.push(datList);
		 });
		 dataList = {
					"totalList": totCount,
					"active": activeCount,
					"compList": completeCount,
					"listTime":itemlistloc 
		 }
	 localStorage.setItem('DATALIST',JSON.stringify(dataList));
  });
  
  
  $(document).on('click','.removeAll',function(){
	  var rmvAlert = confirm("Do want to remove all data??");
	  if(rmvAlert == true){
		  $("#todoList").html('');
		  totCount = 0; activeCount =0; completeCount = 0;	
		  $("span.completedList").text(completeCount);
		  $("span.activeList").text(activeCount);
		  $("span.totList").text(totCount);
		  localStorage.removeItem('DATALIST');
	  } 
	  setTimeout(function () {
				alert("Data removed");
				return false;
	  }, 100);
  });
  
  Handlebars.registerHelper('isComplt',function(x, options){
	if(x == 'N'){
		return options.inverse(this); 
	}else{
		return "none"; 
	}
})

 Handlebars.registerHelper('isRefesh',function(x, options){
	if(x == 'N'){
		return "none";
	}else{
		return options.inverse(this); 
	}
})

Handlebars.registerHelper('isComp',function(x, options){
	if(x == 'Y'){
		return "todo-completed";
	}else{
		return options.inverse(this); 
	}
})

Handlebars.registerHelper('isEdit',function(x, options){
	if(x == 'Y'){
		return "none";
	}else{
		return options.inverse(this); 
	}
})

Handlebars.registerHelper('isNone',function(x, options){
	if(x == 'N'){
		return "visib";
	}else{
		return options.inverse(this); 
	}
})

Handlebars.registerHelper('isActv',function(x, options){
	if(x == 'Y'){
		return "active";
	}else{
		return options.inverse(this); 
	}
})

Handlebars.registerHelper('isPoint',function(x, options){
	if(x == 'Y'){
		return "pointer-events:none";
	}else{
		return options.inverse(this); 
	}
})

  
	var fs = require('fs');
	var orders = {};
	var hOLEY_NAMES = require('./holey_names');
	var HOLEY_NAMES = hOLEY_NAMES.HOLEY_NAMES;
	orderNames();

	function orderNames(){
		for(var z=0; z<HOLEY_NAMES.length; z++)
			if(orders[HOLEY_NAMES[z].cost])
				orders[HOLEY_NAMES[z].cost].push(HOLEY_NAMES[z]);
			else
				orders[HOLEY_NAMES[z].cost] = [HOLEY_NAMES[z]];
		var keys = Object.keys(orders);
		var counter = 1;
		var item = ''; 
		item += '<div class="container">';         
		item += '<table class="table table-hover text-right">';
		item += '<thead >';
		item += '<tr>';
		item += '<th>نام ها</th>';
		item += '<th>عدد</th>';
		item += '<th>ردیف</th>';
		item += '</tr>';
		item += '</thead>';
		item += '<tbody>';
		for(var i=0; i<keys.length; i++){
			item += '<tr>';
			item += '<td dir="rtl">';
			for(var j=0; j<orders[keys[i]].length; j++){
				item += orders[keys[i]][j].name;
				if( j+1 != orders[keys[i]].length)
					item += ' , ';
			}
			item += '</td>';
			item += '<td>'+keys[i]+'</td>';
			item += '<td>'+counter+'</td>';
			item += '</tr>';
			counter += 1;
		}
		item += '</tbody>';
		item += '</table>';
		item += '</div>';
		fs.writeFile('orders.html', item , 'utf-8');
		console.log('Done!');
		
	}//end of function findAll


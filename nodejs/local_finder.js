		var candida = 'حمیدرضا';
		var fs = require('fs');
		var hOLEY_NAMES = require('./ordered_holey_names');
		var HOLEY_NAMES = hOLEY_NAMES.HOLEY_NAMES;
		var MAX_NAMES_LENGTH = 4;
		calcute();

		function calcute(){
			var name = candida;
			var name_num = Number(getAbjadEqual(name));
			var tmp = [];
			for(var i=0; i<HOLEY_NAMES.length; i++)
				if(HOLEY_NAMES[i].cost <= name_num)
					tmp.push(HOLEY_NAMES[i]);
			HOLEY_NAMES = tmp;
			console.log('name: ',name_num);
			console.log('calcuting...');
			var results = findEqualHolyNames(name_num);
			console.log('creating file...');
			if(!results.length){
				fs.writeFile(candida+'.html', "<h3>موردی یافت نشد</h3>" , 'utf-8');
				console.log('Done!');
			}else{
				var item = '<link rel="stylesheet" href="bootstrap.min.css" >';
				item += '<span class="m-3 d-inline p-2" style="background-color: #eee;" >عدد نام: '+name_num+'</span>';
				item += '<span class="m-3 d-inline p-2" style="background-color: #eee;"  >'+results.length+' مورد یافت شد</span>'; 
				
				item += '<div class="container">';         
				item += '<table class="table table-hover text-right">';
				item += '<thead >';
				item += '<tr>';
				item += '<th>نام ها</th>';
				item += '<th>ردیف</th>';
				item += '</tr>';
				item += '</thead>';
				item += '<tbody>';
				
				for(var i=0; i<results.length; i++){
					item += '<tr>';
					item += '<td dir="rtl">';
					for(var j=0; j<results[i].names.length; j++){
						item += results[i].names[j].name;
						if( j+1 != results[i].names.length)
							item += ' , ';
					}
					item += '</td>';
					item += '<td>'+(i+1)+'</td>';
					item += '</tr>';
				}
				item += '</tbody>';
				item += '</table>';
				item += '</div>';
				
				fs.writeFile(candida+'.html', item , 'utf-8');
				console.log('Done!');
			}
		}//end of function calcute
		
		function compare(a, b){
			if (a.names.length > b.names.length) return 1;
			if (b.names.length > a.names.length) return -1;
			return 0;
		}
		
		function findEqualHolyNames(name_num){
			var equals = [];
			
			for(var i=HOLEY_NAMES.length-1; i >=0; i--){
				var GOD_name =  HOLEY_NAMES[i];
				if(GOD_name.cost <= name_num){
					var tmps = [];
					for(var j=0; j<equals.length; j++){
						tmps = [];
						if(Number(equals[j].cost) + Number(GOD_name.cost) <= name_num){
							var have = false;
							for(var m=0; m<equals[j].names.length; m++)
								if(equals[j].names[m].name == GOD_name.name)
									have = true;
							if(!have){
								if(equals[j] && equals[j].names && equals[j].names.length < 5)
								//	equals.unshift(equals[j]);
									equals.push(JSON.parse(JSON.stringify(equals[j])));
								//	equals.push(equals[j]);
								equals[j].names.push(GOD_name);
								equals[j].cost = Number(equals[j].cost) + Number(GOD_name.cost);
							}
						}
					}
					equals.push({names:[GOD_name], cost: GOD_name.cost});	
				}
			}
			/*
			for(var i=HOLEY_NAMES.length-1; i >=0; i--){
				var GOD_name =  HOLEY_NAMES[i];
				if(GOD_name.cost <= name_num){
					for(var j=0; j<equals.length; j++)
						if(Number(equals[j].cost) + Number(GOD_name.cost) <= name_num){
							var have = false;
							for(var m=0; m<equals[j].names.length; m++)
								if(equals[j].names[m].name == GOD_name.name)
									have = true;
							if(!have){
								//if(equals[j].names.length <= MAX_NAMES_LENGTH)
								//	equals.push(JSON.parse(JSON.stringify(equals[j])));
						
								if(equals[j] && equals[j].names)
									equals.push(equals[j]);
								equals[j].names.push(GOD_name);
								equals[j].cost = Number(equals[j].cost) + Number(GOD_name.cost);
							}
						}
					equals.push({names:[GOD_name], cost: GOD_name.cost});	
				}
				console.log((HOLEY_NAMES.length - i+1)+' from '+HOLEY_NAMES.length,' calcuting...');
			}*/
			var final_result = [];
			for(var i=0; i<equals.length; i++)
				if(Number(equals[i].cost) == name_num && !isInResults(final_result,equals[i]))
					final_result.push(equals[i]);
			final_result.sort(compare);	
			
			return final_result;	
		}//end of function findEqualHolyNames
		
		function isInResults(arr,obj){
			if(!arr.length)
				return false;
			var target_num = obj.names.length;	
			for(var i=0; i<arr.length; i++)
				if(arr[i].names.length === obj.names.length){
					var founded = 0;
					for(var j=0; j<obj.names.length;j++){
						var GOD_name = obj.names[j];
							for(var m=0; m<arr[i].names.length; m++)
								if(arr[i].names[m].name == GOD_name.name)
									founded += 1;
					}
					if(founded == target_num)	
						return true;
				}
			return false;
		}
		
		function getAbjadEqual(name){
			name = name.split("");
			var cost = 0;
			for(var i=0; i< name.length; i++)
				switch(name[i]){
					case 'ا':
					case 'أ':
					case 'آ':
						cost += 1;
					break;
					case 'ب':
						cost += 2;
					break;
					case 'ج':
						cost += 3;
					break;
					case 'د':
						cost += 4;
					break;
					case 'ه':
						cost += 5;
					break;
					case 'و':
						cost += 6;
					break;
					case 'ز':
						cost += 7;
					break;
					case 'ح':
						cost += 8;
					break;
					case 'ط':
						cost += 9;
					break;
					case 'ی':
					case 'ئ':
						cost += 10;
					break;
					case 'ک':
						cost += 20;
					break;
					case 'ل':
						cost += 30;
					break;
					case 'م':
						cost += 40;
					break;
					case 'ن':
						cost += 50;
					break;
					case 'س':
						cost += 60;
					break;
					case 'ع':
						cost += 70;
					break;
					case 'ف':
						cost += 80;
					break;
					case 'ص':
						cost += 90;
					break;
					case 'ق':
						cost += 100;
					break;
					case 'ر':
						cost += 200;
					break;
					case 'ش':
						cost += 300;
					break;
					case 'ت':
						cost += 400;
					break;
					case 'ث':
						cost += 500;
					break;
					case 'خ':
						cost += 600;
					break;
					case 'ذ':
						cost += 700;
					break;
					case 'ض':
						cost += 800;
					break;
					case 'ظ':
						cost += 900;
					break;
					case 'غ':
						cost += 1000;
					break;
					case 'گ':
						cost += 20;
					break;
					case 'چ':
						cost += 3;
					case 'پ':
						cost += 2;
					break;
					break;
					case 'ژ':
						cost += 7;
					break;
				}
				
				console.log(cost,name);
				
			return cost;	
		}//end of function 
		

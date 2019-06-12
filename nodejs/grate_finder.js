		var candida = 'ابوالفضل';
		var fs = require('fs');
		var SMALLEST_NUMBER = 13;
		var final_result = [];
		var pure_result = [];
		var hOLEY_NAMES = require('./holey_names');
		var HOLEY_NAMES = hOLEY_NAMES.HOLEY_NAMES;
		calcute();
		function calcute(){
			var name_num = Number(getAbjadEqual(candida));
			var results = findEqualHolyNames(name_num);
			if(!results.length){
				fs.writeFile(candida+'.html', "<h3>موردی یافت نشد</h3>" , 'utf-8');
				console.log('Done!');
			}else{
				var item = '<span class="m-3 d-inline p-2" style="background-color: #eee;" >عدد نام: '+name_num+'</span>';
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
						item += results[i].names[j];
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
			if (a.length > b.length) return 1;
			if (b.length > a.length) return -1;
			return 0;
		}
		
		function findEqualHolyNames(name_num){
			var equals = [];
			findTreeSearch({follows:[],target:name_num, current:0,levels:[{level: 1, index: 0}]});
			if(final_result.length)
				final_result.sort(compare);
			pureTheReuslt();
			return pure_result;
		}//end of function findEqualHolyNames
		
		function pureTheResult(){
			var have = false;
			for(var i=0; i<final_result.length; i++){
				have = false;
				for(var j=0; j<pure_result.length; j++)
					if(pure_result[j].length == final_result[i].lenght)
						if(areFollowsEqual(pure_result[j].length, final_result[i].lenght)){
							have = true;
							break;
						}
				if(!have)
					pure_result.push(final_result[i]);
			}			
		}
		
		function areFollowsEqual(arr, brr){
			var count = arr.length;
			var find = 0;
			let have = false;
			if(count !== brr.lenght)
				return false;
			for(var i=0; i<count; i++)
				for(var j=0; j<count; j++)
					if(arr[i].name == arr[j].name)
						find++;
			if(find == count)
				return true;
			return false;			
		}
		
		function findTreeSearch(trace){
			var index = trace.levels[trace.levels.length-1].index;
			var level = trace.levels[trace.levels.length-1].level;
			if(level >=0 ){
				if(index >= HOLEY_NAMES.length){
					trace.levels.splice(-1,1);
					if(trace.levels.length){
						var current = trace.current - trace.follows[trace.follows.length-1].cost;
						trace.levels[trace.levels.length-1].index += 1;
						return findTreeSearch({follows: trace.follows,target:trace.target, current:current, levels:trace.levels});
					}
				}
				
				if(trace.current + HOLEY_NAMES[index].cost == trace.target){
					if(checkIsInFollowers(trace.follows, HOLEY_NAMES[index].name)){
						trace.levels[trace.levels.length-1].index += 1;
						return findTreeSearch({follows: trace.follows,target:trace.target, current:trace.current, levels:trace.levels});
					}else{
						trace.follows.push(HOLEY_NAMES[index]);
						fs.writeFile('./result/'+candida+'_'+Date.now()+'.json', JSON.stringify(trace.follows, null, 2) , 'utf-8');
						final_result.push(JSON.parse(JSON.stringify(trace.follows)));
						follows.splice(-1,1);
						trace.levels[trace.levels.length-1].index += 1;
						return findTreeSearch({follows: trace.follows,target:trace.target, current:trace.current, levels:trace.levels});
					}
				}else if(trace.target - trace.current - HOLEY_NAMES[index].cost >= SMALLEST_NUMBER){
					if(checkIsInFollowers(trace.follows, HOLEY_NAMES[index].name)){
						trace.levels[trace.levels.length-1].index += 1;
						return findTreeSearch({follows: trace.follows,target:trace.target, current:trace.current, levels:trace.levels});
					}else{
						trace.levels.push({level: (level+1), index:0});
						if(!trace.follows)
							trace.follows = [HOLEY_NAMES[index]];
						else
							trace.follows.push(HOLEY_NAMES[index]);
						return findTreeSearch(
								
								{follows:trace.follows,target:trace.target, current: (trace.current +HOLEY_NAMES[index].cost),levels:trace.levels}
							);
					}
				}else{
					trace.levels.splice(-1,1);
					if(trace.levels.length){
						var current = trace.current - trace.follows[trace.follows.length-1].cost;
						trace.levels[trace.levels.length-1].index += 1;
						return findTreeSearch({follows: trace.follows,target:trace.target, current:current, levels:trace.levels});
					}
				}	
			}
		}
		
		function checkIsInFollowers(arr,str){
			for(var i=0; i<arr.length; i++)
				if(arr[i].name === str)
					return true;
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
			return cost;	
		}//end of function 

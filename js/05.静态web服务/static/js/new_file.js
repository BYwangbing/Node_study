window.onload = function(){  
		        lunbo();    
		      };  
		      var id;  
		      var index = 0;//轮播次数  
		      function lunbo(){ 
		      	
		      	var teacherNum = 1;
		        id = setInterval(function(){  
		          //将所有li隐藏  
		          var ul = document.getElementById("photos");  
		          //在元素下中子元素--获取所有li  
		          var lis = ul.getElementsByTagName("li");  
		          for(var i=0;i<lis.length;i++){  
		            lis[i].className = "hide";  
		          }  
		          //将下一个li显示  
		          index ++;  
		          lis[index % lis.length].className = "show"; 
		          teacherNum++;
		            if (teacherNum==6){
		                teacherNum = 1;//回到了原点
		            }
		            infoma.innerHTML = teacherNum + "/5";
		            var cityArr = ["日本", "纽约", "巴黎", "新加坡", "华盛顿"];
					document.getElementById("browsers").placeholder = cityArr[teacherNum-1] ;
		        },1500);  
		    }  
		    function stop(){  
		      clearInterval(id);  
		    }  
/*定时器做图片的自动切换 */
        window.onload = Init;
        function Init(){
        	var prev = document.getElementById("prev");
			var next = document.getElementById("next");
			var img = document.getElementsByTagName("img")[0];
			var imgArr = ["img/datu01.jpg", "img/datu02.jpg","img/datu03.jpg","img/datu04.jpg","img/datu05.jpg"]
			var index = 0;
			var infoma = document.getElementById("infoma");
//				设置提示文字
					infoma.innerHTML = (index + 1) + "/" + imgArr.length;
			prev.onclick = function(){
//					切换图片就是修改img的src属性
					index--;
					if (index < 0) {
						index = imgArr.length-1;
					}
					img.src = imgArr[index];
					infoma.innerHTML = (index + 1) + "/" + imgArr.length;
				}
				next.onclick = function(){
					index++;
					if(index >imgArr.length-1){
						index = 0;
					}
					img.src = imgArr[index];
					infoma.innerHTML = (index + 1) + "/" + imgArr.length;
				}
            //定时器,每秒钟触发picture()函数
            window.setInterval("picture()", 1500);   
        }
        var teacherNum = 1;
        var searchNum = 1;
        function picture(){
//          //获取网页中id=myImg的图片对象元素
//          var myImg = document.getElementById("myImg")
//          myImg.src = "img/datu0" + teacherNum + ".jpg";
//          teacherNum++;
//          if (teacherNum==6){
//              teacherNum = 1;//回到了原点
//          }
//          infoma.innerHTML = teacherNum + "/5";
//		    var cityArr = ["日本", "纽约", "巴黎", "新加坡", "华盛顿"];
//			document.getElementById("browsers").placeholder = cityArr[teacherNum-1] ;
            //获取网页中id=Q-story的图片对象元素
            var myImgl = document.getElementById("Q-story")
            myImgl.src = "img/Q-story0" + searchNum + ".jpg";
            searchNum++;
            if (searchNum==4){
                searchNum = 1;//回到了原点
            }
        }
        
//      返回顶部
		function pageScroll() {
		    window.scrollBy(0,-10); //scrollBy() 方法可把内容滚动指定的像素数
		    scrolldelay = setTimeout('pageScroll()',1);
//		    if(document.documentElement.scrollTop||document.body.scrollTop == 0){
//		    	clearTimeout(scrolldelay); //使用 clearTimeout() 方法来阻止函数的执行
//		    }
		    if(document.documentElement.scrollTop == 0){
		    	clearTimeout(scrolldelay); //使用 clearTimeout() 方法来阻止函数的执行
		    }
		}
        
        function getElement(id){
        	return document.getElementById(id);
        }
        
//      点击出现城市
		function displayDiv(){
			getElement("layer-city").style.display ="block";
		}
		function regesterOpacity(){
			getElement("q-login-modal").style.display ="block";
		}
		function loginClose(){
			getElement("q-login-modal").style.display ="none";
		}
		function aliderDiv1(){
//			var mychar001 = end1("blider") = "block";
			getElement("blider").style.display ="block";
			getElement("alider").style.display ="none";
			getElement("clider").style.display ="none";
			getElement("dlider").style.display ="none";
			getElement("li01").style.backgroundColor ="#FFF";
			getElement("li02").style.backgroundColor ="transparent";
			getElement("li03").style.backgroundColor ="transparent";
			getElement("li04").style.backgroundColor ="transparent";
		}
		function aliderDiv2(){
			getElement("blider").style.display ="none";
			getElement("alider").style.display ="block";
			getElement("clider").style.display ="none";
			getElement("dlider").style.display ="none";
			getElement("li01").style.backgroundColor ="transparent";
			getElement("li02").style.backgroundColor ="#FFF";
			getElement("li03").style.backgroundColor ="transparent";
			getElement("li04").style.backgroundColor ="transparent";
		}
		function aliderDiv3(){
			getElement("blider").style.display ="none";
			getElement("alider").style.display ="none";
			getElement("clider").style.display ="block";
			getElement("dlider").style.display ="none";
			getElement("li01").style.backgroundColor ="transparent";
			getElement("li02").style.backgroundColor ="transparent";
			getElement("li03").style.backgroundColor ="#FFF";
			getElement("li04").style.backgroundColor ="transparent";
		}
		function aliderDiv4(){
			getElement("blider").style.display ="none";
			getElement("alider").style.display ="none";
			getElement("clider").style.display ="none";
			getElement("dlider").style.display ="block";
			getElement("li01").style.backgroundColor ="transparent";
			getElement("li02").style.backgroundColor ="transparent";
			getElement("li03").style.backgroundColor ="transparent";
			getElement("li04").style.backgroundColor ="#FFF";
		}
		function aliderDiv5(){
			getElement("Hot-travel-notes01").style.display ="block";
			getElement("Hot-travel-notes02").style.display ="none";
			getElement("Hot-travel-notes03").style.display ="none";
			getElement("Hot-travel-notes04").style.display ="none";
			getElement("li05").style.backgroundColor ="#10B041";
			getElement("li06").style.backgroundColor ="#636363";
			getElement("li07").style.backgroundColor ="#636363";
			getElement("li08").style.backgroundColor ="#636363";
		}
		function aliderDiv6(){
			getElement("Hot-travel-notes01").style.display ="none";
			getElement("Hot-travel-notes02").style.display ="block";
			getElement("Hot-travel-notes03").style.display ="none";
			getElement("Hot-travel-notes04").style.display ="none";
			getElement("li05").style.backgroundColor ="#636363";
			getElement("li06").style.backgroundColor ="#10B041";
			getElement("li07").style.backgroundColor ="#636363";
			getElement("li08").style.backgroundColor ="#636363";
		}
		function aliderDiv7(){
			getElement("Hot-travel-notes01").style.display ="none";
			getElement("Hot-travel-notes02").style.display ="none";
			getElement("Hot-travel-notes03").style.display ="block";
			getElement("Hot-travel-notes04").style.display ="none";
			getElement("li05").style.backgroundColor ="#636363";
			getElement("li06").style.backgroundColor ="#636363";
			getElement("li07").style.backgroundColor ="#10B041";
			getElement("li08").style.backgroundColor ="#636363";
		}
		function aliderDiv8(){
			getElement("Hot-travel-notes01").style.display ="none";
			getElement("Hot-travel-notes02").style.display ="none";
			getElement("Hot-travel-notes03").style.display ="none";
			getElement("Hot-travel-notes04").style.display ="block";
			getElement("li05").style.backgroundColor ="#636363";
			getElement("li06").style.backgroundColor ="#636363";
			getElement("li07").style.backgroundColor ="#636363";
			getElement("li08").style.backgroundColor ="#10B041";
		}
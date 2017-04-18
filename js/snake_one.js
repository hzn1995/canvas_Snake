/**
 * Created by Administrator on 2017/1/21.
 */
//将ID为canvas的canvas存给变量canvas；
var canvas=document.getElementById("canvas");
//获取canvas宽
var width=canvas.width;
//获取canvas高
var height=canvas.height;
console.log(width,height);
//定义蛇的速度存给变量speed；
var speed=200;
//定义画布canvas的环境
var content=canvas.getContext('2d');
//定义时间函数
var timer=null;

var x=8,y=8;    //定义坐标，初始值为8;

var a=0;    //定义食物坐标
var snake=10;   //定义蛇身长，初始值为10；
var map=[];     //记录蛇运动路径
var size=8;     //记录蛇身单元大小;
var direction=3;    //定义方向  // 1 向左 2 向上 3向右 0 向下
var score=0;        //记录分数

//设置蛇移动函数
function move(){
    //清除画布
    content.clearRect(0,0,width,height);
    //添加时间函数来移动蛇
    timer=setInterval(set_game_speed,speed);
    function set_game_speed(){
        switch (direction){
            case 1:x = x-size;break;
            case 2:y = y-size;break;
            case 3:x = x+size;break;
            case 0:y = y+size;break;
        }
        if(x>width || y>height || x<0 || y<0){
           return over();
        }
        for(var i=0;i<map.length;i++){
            if( parseInt(map[i].x)==x && parseInt(map[i].y)==y){
             return over();
            }
        }
        if (map.length>snake) { //保持舍身长度
            var cl = map.shift(); //删除数组第一项，并且返回原元素
            content.clearRect(cl['x'], cl['y'], size, size);
        }
        map.push({'x':x,'y':y}); //将数据添加到原数组尾部
        content.beginPath();
        content.fillStyle = "#006699";//内部填充颜色
        content.strokeStyle = "#006699";//边框颜色
        content.fillRect(x, y, size, size);//绘制矩形
        content.closePath();
        if((a*8)==x && (a*8)==y){ //吃食物
            rand_frog();
            snake++;
            console.log(snake);
            grade();
        }
    }
    document.onkeydown = function(e) { //改变蛇方向
    var code = e.keyCode - 37;
    switch(code){
        case 1 : direction = 2;break;//上
        case 2 : direction = 3;break;//右
        case 3 : direction = 0;break;//下
        case 0 : direction = 1;break;//左
    }
};
    // 随机放置食物
    function rand_frog(){
        a = Math.ceil(Math.random()*50);
        content.beginPath();
        content.fillStyle = "green";//内部填充颜色
        content.strokeStyle = "#fff";//边框颜色
        content.fillRect(a*8, a*8, 8, 8);//绘制矩形
        content.closePath();
    }
    // 随机放置食物
    rand_frog();
}
//添加游戏开始画面
window.onload= function () {
    //清除画布
    content.clearRect(0,0,width,height);
    content.beginPath();
    content.fillStyle="#fff";
    //设置字体属性
    content.font="80px bold";
    //设置字体居中
    content.textAlign="center";
    content.fillText("START GAME",width/2,height/2);
    document.onkeydown = function(e) {
        if (e.keyCode == 13) {
            move();
        }
    };
};
//添加游戏结束画面
function over(){
    clearInterval(timer);
    timer=null;
    //清除画布
    content.clearRect(0,0,width,height);
    content.beginPath();
    //设置字体颜色
    content.fillStyle="#fff";
    //设置字体属性
    content.font="80px bold";
    //设置字体居中
    content.textAlign="center";
    content.fillText("GAME OVER",width/2,(height/2)-20);
    content.font="20px bold";
    content.textAlign="center";
    content.fillText("Press any key to return to the start screen",width/2,(height/2)+10);
    content.fillText("游戏结束，请按任意键返回开始画面",width/2,(height/2)+40);
    content.closePath();
    document.onkeydown = function(e) {
        if (e.keyCode ) {
            window.location.reload();
            window.onload();
        }
    };
}
//设置分数及关卡
function grade(){
    score=score+1;
    var grade="分数:"+score;
    content.beginPath();
   // content.clearRect(0, 0, 100, 100);
    //设置字体颜色
    content.fillStyle="#fff";
    //设置字体属性
    content.font="20px bold";
    //设置字体居中
    content.textAlign="center";
    content.fillText(grade,50,20);
    content.closePath();
}

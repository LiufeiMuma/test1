// /**
//  * Created by lft on 17/3/16.
//  */



$(document).ready(function () {
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
    //数据请求
    $.ajax({
        url:"https://t.socap1.com/api/test/find/side",
        data:{
            test_id:getQueryString("test_id")
        },
        type:"get",
        dataType : 'jsonp',
        success:getdatas
    });
    function getdatas(datas){
        // var data=JSON.parse(datas);
        console.log(datas);
        $(".nicknameI").html(datas.data.test.nickname);
        $("#name_tiC").html(datas.data.test.gym_name);
        $("#time_tiC").html(datas.data.test.createtime);
        $("#_height").html(datas.data.test.height+"cm");
        $("#_weight").html(datas.data.test.weight+"kg");
        $("._mainli3").append(
            $("<ul/>").append(
                $("<li/>").append(
                    $("<p/>").html("脂肪")
                ).append(
                    $("<p/>").html(datas.data.test.fat+"kg")
                ).append(
                    $("<p/>").addClass("fatPercent").html(datas.data.test.fat_percent+"%")
                        .append($("<span/>").addClass("#_mainli3Span1").append(
                            $("<img style='width: 1.14rem;height: 0.55rem'/>").addClass("fatImg").attr("src","../images/piangao.png")))
                )
            ).append(
                $("<li/>").append(
                    $("<p/>").html("去脂体重")
                ).append(
                    $("<p/>").addClass("leanWeight").html(datas.data.test.leanweight+"kg")
                ).append(
                    $("<p/>").addClass("leanweightPercent").html(datas.data.test.leanweight_percent+"%")
                        .append($("<span/>").addClass("#_mainli3Span2").append(
                            $("<img style='width: 1.14rem;height: 0.55rem'/>").attr("src","../images/dabiao.png")))
                )
            ).append(
                $("<li/>").append(
                    $("<p/>").html("骨骼肌")
                ).append(
                    $("<p/>").html(datas.data.test.muscle+"kg")
                ).append(
                    $("<p/>").addClass("skeletalMusclePercent").html(datas.data.test.muscle_percent+"%")
                        .append($("<span/>").addClass("#_mainli3Span3").append(
                            $("<img style='width: 1.14rem;height: 0.55rem'/>").addClass("skeletalImg").attr("src","../images/piandi.png")))
                )
            )
        )
        $(".daixie").html(datas.data.test.basemet+"kcal").append($("<span/>").append(
            $("<img style='width: 1.14rem;height: 0.55rem'/>").attr("src","../images/dabiao.png")));
        $(".tunbi").html(datas.data.test.whr).append($("<span/>").append(
            $("<img style='width: 1.14rem;height: 0.55rem'/>").addClass("whr").attr("src","../images/dabiao.png")));

        $("#sex").html(datas.data.test.gender);

        var sex = datas.data.test.gender,
            fatPercent = datas.data.test.fat_percent,
            leanWeightPercent = datas.data.test.leanweight_percent,
            skeletalMusclePercent = datas.data.test.muscle_percent,
            weightT=datas.data.test.weight,
            heightT=datas.data.test.height,
            dayData=datas.data.test.bday,
            tunbi=datas.data.test.whr,

            text=document.getElementById("leiXing");
        console.log(dayData)
        if(fatPercent<12 && skeletalMusclePercent<50 && leanWeightPercent<82){
            text="低体重/虚弱型";
        }else if(fatPercent>18 && skeletalMusclePercent>59 && leanWeightPercent>88){
            text.innerHTML="高体重/肥胖型";
        }else if(fatPercent>18 && skeletalMusclePercent>49 && skeletalMusclePercent<60  && leanWeightPercent>88){
            text.innerHTML="高体重/肌肉型";
        }else if(fatPercent<12 && skeletalMusclePercent>49 && skeletalMusclePercent<60  && leanWeightPercent<82){
            text.innerHTML="低体重/肌肉型";
        }else if(fatPercent>12 && fatPercent<18 && skeletalMusclePercent>49 && skeletalMusclePercent<60 && leanWeightPercent>82 && leanWeightPercent<88){
            text.innerHTML="标准体重/肌肉型";
        }else if(fatPercent>12 && fatPercent<18 && skeletalMusclePercent<49 && leanWeightPercent>82 && leanWeightPercent<88){
            text.innerHTML="标准体重/虚弱型";
        }else if(fatPercent<12 && skeletalMusclePercent>59 && leanWeightPercent>82 && leanWeightPercent<88){
            text.innerHTML="标准体重/肌肉型";
        }else if(fatPercent>18 && skeletalMusclePercent<49 && leanWeightPercent>82 && leanWeightPercent<88){
            text.innerHTML="标准体重/肥胖型";
        }else if(fatPercent>18 && skeletalMusclePercent>49 && skeletalMusclePercent<60 && leanWeightPercent>88){
            text.innerHTML="高体重/虚弱型";
        }else if(fatPercent>18 && skeletalMusclePercent<49 && leanWeightPercent<82){
            text.innerHTML="低体重/肥胖型";
        }else{
            text.innerHTML="标准体重/肥胖型";
        }

//      BMI值
        var bmi=document.getElementById('myBMI'),
            weight=document.getElementById('_weight').innerHTML,
            height=document.getElementById('_height').innerHTML;
        newBMI=((parseInt(weight) / (parseInt(height) / 100)) / 2).toFixed(1);
        bmi.innerHTML="BMI:"+newBMI;

//      达标判断
        if(sex==1){
             boy=67+13.73*weightT+5*heightT-6.9*ages(dayData);
             console.log(boy);
            if(fatPercent<12){
                $(".fatImg").attr("src","../images/piandi.png");
            }else if(fatPercent>12 && fatPercent<18){
                $(".fatImg").attr("src","../images/dabiao.png");
            }else if(fatPercent>18){
                $(".fatImg").attr("src","../images/piangao.png");
            }else if(skeletalMusclePercent<49){
                $(".skeletalImg").attr("src","../images/piandi.png");
            }else if(skeletalMusclePercent>59){
                $(".skeletalImg").attr("src","../images/piangao.png");
            }else if(skeletalMusclePercent>49 && skeletalMusclePercent<59){
                $(".skeletalImg").attr("src","../images/dabiao.png");
            }
        }else if(sex==0){
            if(fatPercent<18){
                $(".fatImg").attr("src","../images/piandi.png");
            }else if(fatPercent>18 && fatPercent<25){
                $(".fatImg").attr("src","../images/piangao.png");
            }else if(fatPercent>25){
                $(".fatImg").attr("src","../images/piangao.png");
            }else if(skeletalMusclePercent<40){
                $(".skeletalImg").attr("src","../images/piandi.png");
            }else if(skeletalMusclePercent>40 && skeletalMusclePercent<50){
                $(".skeletalImg").attr("src","../images/dabiao.png");
            }else if(skeletalMusclePercent>50){
                $(".skeletalImg").attr("src","../images/piangao.png");
            }
        }

//      基础代谢
        function   ages(str)
        {
            var   r   =   str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
            if(r==null)return   false;
            var   d=   new   Date(r[1],   r[3]-1,   r[4]);
            if   (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4])
            {
                var   Y   =   new   Date().getFullYear();
                return(Y-r[1]);
            }
            return("输入的日期格式错误！");
        }
        // console.log( ages(dayData));

//      腰臀比
        if(sex==1){
            if(tunbi>0.9){
                $(".whr").attr("src","../images/piangao.png");
            }else{
                $(".whr").attr("src","../images/dabiao.png");
            }
        }else{
            if(tunbi>0.8){
                $(".whr").attr("src","../images/piangao.png");
            }else{
                $(".whr").attr("src","../images/dabiao.png");
            }
        }

 //    雷达图



    };
})







































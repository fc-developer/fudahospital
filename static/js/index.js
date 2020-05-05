$(window).ready(function () {

    //页头滚动的信息框 start
    if ($('#toptips .newsList').length > 0) {
        function toggleNotice(myTag) {
            var firstLi = myTag.find('li').eq(0).html();
            myTag.append('<li>' + firstLi + '</li>');
            var newsSum = myTag.find('li').length;
            var myi = 0;

            function myfun() {
                if (myi == (newsSum - 1)) {
                    myTag.find('li').css({
                        'margin-top': 0
                    });
                    myi = 0;
                }
                myTag.find('li').eq(myi).animate({
                    marginTop: '-2.5em'
                }, 1000);
                myi++;
            }
            var setMyfun = setInterval(myfun, 3000);
            $(function () {
                $('#toptips .newsList').mouseover(function () {
                    clearInterval(setMyfun);
                })
                $('#toptips .newsList').mouseout(function () {
                    clearInterval(setMyfun);
                    setMyfun = setInterval(myfun, 3000);
                })
            })
        }
        toggleNotice($('.newsList'));
    }
    //页头滚动的信息框 end

    //页头专家形象轮换 start
    if ($('#doctorShow .eachItem').length > 0) {
        var drsLength = $("#doctorShow .eachItem").length;
        var drsElseLength = $("#doctorShow .doctorelse").find('li').length;
        var drRun = setInterval(drTranform, 3000);
        $(function () {
            $("#doctorShow .eachItem").mouseover(function () {
                clearInterval(drRun);
                $("#doctorShow .eachItem").removeClass("drRunTransform");
                $(this).addClass("drRunTransform");
            })
            $("#doctorShow .eachItem").mouseout(function () {
                clearInterval(drRun);
                $("#doctorShow .eachItem").removeClass("drRunTransform");
                drRun = setInterval(drTranform, 3000);
            })
        })

        function drTranform() {
            if ($(window).width() > 800) {
                var index = random(0, drsLength);
            } else {
                var index = random(0, (drsLength - drsElseLength));
            }
            //console.log(index);
            $("#doctorShow .eachItem").removeClass("drRunTransform");
            $("#doctorShow .eachItem").eq(index).addClass("drRunTransform");
        }
    }
    //页头专家形象轮换 end

    //手机端滚动后LOGO头顶置及就医指引底置,左侧导航栏顶置及隐藏等
    if ($('#float_list').length > 0) {
        var markTop = $('#float_list').offset().top;
        //console.log(markTop);
    }
    if ($('#guideShow').length > 0) {
        var markTop2 = $('#guideShow').offset().top;
        //console.log(markTop2);
    }
    //console.log($('#header').height());
    $(window).scroll(function () {
        if ($(window).width() < 801) {
            //LOGO顶置
            if ($(window).scrollTop() > $('#header').height()) {
                $('#header').css({
                    "position": "fixed",
                    "top": 0
                });
            } else {
                $('#header').css({
                    "position": '',
                    "top": ''
                });
            }
            //就医指引底置
            if ($('#guideShow').length > 0) {
                if ($(window).scrollTop() > 650) {
                    $('#guideShow').attr('class', 'guideShow2');
                } else {
                    $('#guideShow').attr('class', 'guideShow');
                }
            } else {
                if ($('#guideShow2').length == 0) {
                    //就医指引底置

                    var myDate = new Date();
                    var myHour = myDate.getHours();
                    if ((myHour >= 0 && myHour < 8) || (myHour > 20 && myHour < 24)) {
                        var zxType = '<li class="zxly" onclick="location=\'/jyzy/zxly\'"><span>咨询留言</span></li>';
                    } else {
                        var zxType = '<li class="zxly" onclick="location=\'https://lvt.zoosnet.net/lr/chatpre.aspx?id=lvt13502958&lng=cn&e=pc_footer\'"><span>病情咨询</span></li>';
                    }
                    $('body').prepend('<section id="guideShow2" class="guideShow">' +
                        '<ul>' +
                        '<li class="bzcx" onclick="location=\'/zlzl/bzfl\'"><span>病种查询</span></li>' +
                        '<li class="czys" onclick="location=\'/zlzl/yszj\'"><span>查找医生</span></li>' +
                        '<li class="zxlf" onclick="location=\'/zlzl/zxlf\'"><span>最新疗法</span></li>' +
                        '<li class="zxyy" onclick="location=\'/jyzy/zxyy\'"><span>在线预约</span></li>' +
                        zxType +
                        '<li class="hzgs" onclick="location=\'/zlzl/hzgs\'"><span>患者故事</span></li>' +
                        '</ul>' +
                        '</section>');
                }
                if ($(window).scrollTop() > 650) {
                    $('#guideShow2').show();
                    $('#guideShow2').attr('class', 'guideShow2');
                } else {
                    $('#guideShow2').hide();
                }
            }
        } else {
            //左侧导航在下拉滚动时顶置
            if ($('#float_list').length > 0) {
                var sTop = $(this).scrollTop();
                if (sTop > markTop) {
                    var float_list_width = $('#float_list').width();
                    $('#list_main,#article_main,#search_list_main').each(function () {
                        $(this).find('#left').attr('id', 'top_left');
                        $(this).find('#right').attr('id', 'after_topleft_right');
                        $(this).find('#float_list').css('width', float_list_width);
                    });

                    //下拉到达底部导航时停止顶置
                    if ($('#sharebutton').offset().top - $('#float_list').offset().top < $('#float_list').height()) {
                        $('#float_list').hide();
                    } else {
                        $('#float_list').show();
                    }
                } else {
                    $('#list_main,#article_main,#search_list_main').each(function () {
                        $(this).find('#top_left').attr('id', 'left');
                        $(this).find('#after_topleft_right').attr('id', 'right');
                    });
                }
            }
        }
    });

    //手机端导航与内容切换 start
    $("#header .close,#header .menu").click(function () {
        if ($("#header .close").css('display') == 'block') {
            $(this).hide();
            $("#header .menu").show();
            $("#mymenu").toggle();
            $("article,section,footer").show();
            $("html,body").css({
                "background": "#fff"
            });
            $('#doctorShow .eachItem').css('height', $('#doctorShow .eachItem').width());
            $('#guideShow li').css('height', 0.5 * $('#guideShow li').width());
            $('#bottomguide').hide();
            $('#guideShow2').hide();
        } else {
            $("#header .close").show();
            $("#header .menu").hide();
            $("#mymenu").slideToggle();
            $("html,body").css({
                "background-image": "linear-gradient(45deg,#000,#333,#000,#444)",
                "background-positon": "center center"
            });
            $("article,section,footer").hide();
        }
    });
    //导航与内容切换 end

    //手机端导航 start
    $("#mymenu1 li").each(function () {
        if ($(this).attr('id') == 'makeapointment') {
            $(this).css({
                "background": "#600000",
                "color": "#fff",
                "text-align": "center",
                "background-clip": "border-box"
            });
        } else if ($(this).attr('id') == 'onlinechat') {
            $(this).css({
                "background": "#1a8b82",
                "color": "#fff",
                "text-align": "center"
            });
            //		}else if($(this).attr('id')=='searchK' || $(this).attr('id')=='guide'){
            //			$(this).css({/*"background":"#fff000","color":"#000","text-align":"center"*/});
        } else {
            if (typeof ($(this).next().get(0)) !== 'undefined' && $(this).next().get(0).nodeName == 'UL') {
                $(this).css({
                    "background-image": "linear-gradient(to top,#fff,#fff),linear-gradient(to left,#fff,#fff)",
                    "background-size": "0.5em 0.1em,0.1em 0.5em",
                    "background-position": "right center,right 0.2em center"
                });
            } else {
                $(this).css({
                    "background-image": "linear-gradient(45deg,#fff,#fff)",
                    "background-size": "0.2em 0.2em",
                    "background-position": "right 0.2em center"
                });
            }
        }
    });
    $("#mymenu1 li").click(function () {
        if (typeof ($(this).next().get(0)) !== 'undefined' && $(this).next().get(0).nodeName == 'UL') {
            if ($(this).next().css('display') == 'none') { //css('display')== 'none';is(":visible")
                $(this).css({
                    "background-image": "linear-gradient(to top,#fff,#fff)",
                    "background-size": "0.5em 0.1em",
                    "background-position": "right center"
                });
            } else {
                $(this).css({
                    "background-image": "linear-gradient(to top,#fff,#fff),linear-gradient(to left,#fff,#fff)",
                    "background-size": "0.5em 0.1em,0.1em 0.5em",
                    "background-position": "right center,right 0.2em center"
                });
            }
            $(this).next().slideToggle();
        }
    });
    //手机端导航 end

    //块元素形象展示等 实时调整 start
    $(window).bind('load resize mouseover scroll mouseout', function () {
        //顶部的黑边
        if ($(window).width() <= 1152) {
            $('#toptips .news').css('display', 'none');
        } else {
            $('#toptips .news').css('display', '');
        }
        //主页医生展示
        $('#doctorShow .eachItem').each(function () {
            $(this).css('height', $(this).width());
        });
        //医生列表展示(肿瘤医生+门诊医生)
        $('#doctorListShow li').each(function () {
            $(this).css('height', 1.6 * $(this).width());
            $(this).find('.pic').css('height', $(this).find('.pic').width());
            $(this).find('.desc').css('height', 0.6 * $(this).find('.pic').width());
        });
        //病种、媒体视频、图片记录、电视节目、科学饮食、专家论文、研究课题
        $('#cancerListShow li,#videoListShow li,#picListShow li,#mediaListShow li,#recipesListShow li,#thesisListShow li,#researchListShow li,#eMentShow li').each(function () {
            $(this).css('height', 0.9 * $(this).width());
            $(this).find('.pic').css('height', 0.7 * $(this).find('.pic').width());
            $(this).find('.desc').css('height', 0.2 * $(this).find('.pic').width());
        });
        //出诊公告
        $('#scheduleListShow li').each(function () {
            $(this).css('height', 0.45 * $(this).width());
            $(this).find('.pic').css('height', $(this).find('.pic').width());
        });
        //在线连载列表展示
        $('#onlineBookListShow li').each(function () {
            $(this).css('height', 1.7 * $(this).width());
            $(this).find('.pic').css('height', 1.5 * $(this).find('.pic').width());
            $(this).find('.desc').css('height', 0.2 * $(this).find('.pic').width());
        });
        //就医指引（及底置）
        $('#guideShow li,#guideShow2 li').each(function () {
            $(this).css('height', 0.5 * $(this).width());
        });
    });
    //医生形象大小等 end

    //资讯默认初始样式 复大动态等 start
    if ($('#info2').length > 0) $('#info2').attr('class', 'info_span_click');
    if ($('#info_s2').length > 0) $('#info_s2').attr('class', 'info_span_click');
    if ($('#yibao1,#tumorTitle').length > 0) $('#yibao1').attr('class', 'clickstyle');
    //资讯默认初始样式 end

    //分享按钮 start
    $('#mobile_share #weibo,#normal_share .weibo').click(function () {
        shareTo('weibo');
    });
    $('#mobile_share #weixin,#normal_share .weixin').click(function () {
        shareTo('wechat');
    });
    $('#mobile_share #qq,#normal_share .qq').click(function () {
        shareTo('qq');
    });
    $('#mobile_share #facebook,#normal_share .facebook').click(function () {
        shareTo('facebook');
    });
    $('#mobile_share #twitter,#normal_share .twitter').click(function () {
        shareTo('twitter');
    });
    $('#mobile_share #linkedin,#normal_share .linkedin').click(function () {
        shareTo('linkedin');
    });
    //分享按钮 end

    //加载返回顶端及分享按钮 start
    backTop_share(500, 1000, 1000, 1000);
    //加载返回顶端及分享按钮 end

    //实现移动端分享按钮 start
    if ($(window).width() <= 800) {
        $('#sharebutton .share,#sharebutton #cancle,#rightsharetag').click(function () {
            $('#mobile_share').slideToggle(100);
            $('#rightsharetag').slideToggle(100);
            if ($('#mobile_share').css('display') == 'block') {
                $('#backTop').fadeOut(100);
            }
        });
    }
    //实现移动端分享按钮 end

    //首页查询框跳…


})
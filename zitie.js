$(function () {
    // str = getURLParameter('data');
    // ff = getURLParameter('font');
    // bg = getURLParameter('bg'); 
    // t = getURLParameter('tran');
    // fc = getURLParameter('fc');
    // x = parseInt(getURLParameter('x'));
    // y = parseInt(getURLParameter('y'));

    str = "西江月"
    ff = "绿木屐JXP行楷"
    bg = "bg12";
    t = "933333000000"
    fc = "2"
    x = 0
    y = 0

    if (Object.is(x, NaN)) {
        x = 0;
    }
    if (Object.is(y, NaN)) {
        y = 0;
    }
    blank = str.length % 16;
    if (blank > 0) {
        for (i = blank; i < 16; i++) {
            str += " ";
        }
    }
    if (t == null) {
        t = '9';
    }
    tran = (t + "00000000000000000000000").split("");

    // appendChar(str);
    appendPoetryChar();

    render(ff);
    window.onload = function () {
        //打开页面自动打印
        // setTimeout(function () { window.print(); }, 1000);
    }
    const LINE_NUM = 12;

    const pageStyles = {
        'v': [12, 15, 116, 136],
        'h': [12, 7, 80, 92]
    };
    const FILL_TAIL = '1';
    const HAS_PY = false;
    const CAN_CHANGE_PAGE_SIZE = true;

    if (CAN_CHANGE_PAGE_SIZE) {
        $('#print-menu .change_page_style').show();
    }

    $("#print-menu .flip").click(function (node, child) {
        $('ul').each(function (index, domUl) {
            let arr = [];
            $(domUl).children('li').each(function (indexLi, domLi) {
                let last;
                if ((indexLi + 1) % LINE_NUM === 0) {
                    while (arr.length > 0) {
                        let ele = arr.pop();
                        if (arr.length === LINE_NUM - 2) {
                            last = ele;
                        }
                        $(ele).insertBefore($(domLi));
                    }
                    $(domLi).insertBefore($(last));
                } else {
                    arr.push(domLi);
                }
            });
        });
    });
    $("#print-menu .print").click(function () {
        window.print();
    });

    $("#print-menu .change_page_style").change(function () {
        let pageStyle = $(this).val();
        $('.afterpage').remove();
        $('.page-head').first().remove();
        let pageStyleData = pageStyle in pageStyles ? pageStyles[pageStyle] : pageStyles['h'];
        let zi = $('ul li');
        $('body').append($('<div class="zi-page-new"><ul></ul></div'));
        let PageZiNum = pageStyleData[0] * pageStyleData[1];
        let lineNum = 0;
        for (i = 1; i <= zi.length; i++) {
            if (i % pageStyleData[0] === 1 && (zi[i - 1].innerHTML === '' || zi[i - 1].innerHTML.indexOf('&nbsp;') !== -1)) {
                $('.zi-page-new ul').last().remove();
                break;
            }
            let curLine = $('.zi-page-new ul').last();
            curLine.append(zi[i - 1]);

            if (i === zi.length) {
                continue;
            }
            if (i % pageStyleData[0] === 0) {
                $('.zi-page-new').last().append($('<ul></ul>'));
                lineNum++;
            }

            if (i % PageZiNum === 0) {
                $('body').append($('<div class="afterpage"></div><div class="zi-page-new"></div'));
                $('.zi-page-new').last().append($('<ul></ul>'));
                lineNum = 0;
            }
        }
        if (lineNum === 0) {
            $('.afterpage').last().remove();
            $(".zi-page-new").last().remove();
        } else if (FILL_TAIL === '1') {
            fillEmptyLine(pageStyleData[1] - lineNum, pageStyleData[0], HAS_PY);
        }
        $(".zi-page").remove();
        $(".zi-page-new").addClass('zi-page').removeClass('zi-page-new');

        render();
        $('.page-head').css('height', pageStyleData[2] + 'px').css('line-height', pageStyleData[3] + 'px');
        window.print();
    });




    // getData();
});
// var objCiKu = {};

function appendChar(str) {
    for (wd in str) {
        var ele = document.createElement('li');
        for (i = 0; i < 12; i++) {
            var ele = document.createElement('li');
            if (fc == "1") {
                r = Math.round(parseInt(tran[i]) * (-23) + 255);
                g = 255;
                b = Math.round(parseInt(tran[i]) * (-23) + 255);
            }
            if (fc == "2") {
                r = Math.round(parseInt(tran[i]) * (-17) + 255);
                g = Math.round(parseInt(tran[i]) * (-17) + 255);
                b = Math.round(parseInt(tran[i]) * (-17) + 255);
            }
            if (fc == "3") {
                r = 255;
                g = Math.round(parseInt(tran[i]) * (-20) + 255);
                b = Math.round(parseInt(tran[i]) * (-20) + 255);
            }

            if (i == 0) {
                r = 0; g = 0; b = 0;
            }
            ele.style = 'background: url("' + bg + '.svg") center center no-repeat;color: rgb(' + r + ', ' + g + ', ' + b + '); font-family:", ", "楷体", "楷体_gb2312", "Kaiti SC", "STKaiti", "AR PL UKai CN", "AR PL UKai HK", "AR PL UKai TW", "AR PL UKai TW MBE", "AR PL KaitiM GB", "KaiTi", "KaiTi_GB2312", "DFKai-SB", "TW-Kai", "web-ukai", serif;';
            if (tran[i] > 0 && str[wd] != " ") {
                ele.innerHTML = '<span style="margin:' + y + 'px ' + x + 'px 0px 0px;">' + str[wd] + '</span>';
            } else { ele.innerHTML = "&nbsp;"; }

            document.getElementById('lst').appendChild(ele);
        }
    }
}

function appendPoetryChar() {
    $.each(objCiKu, function (index, objJson) {
        appendLine(objJson["title"], 1);
        return false
        appendLine(objJson["author"] + "·" + objJson["years"], 1);
        var arrContent = objJson["content"];
        $.each(arrContent, function (ind, strLine) {
            if (objJson["class"] == "0") {
                appendLine(strLine, 0);
            } else if (objJson["class"] == "1") {
                appendLine(strLine, 1);
            }
        })
    });
}

function appendLine(strLine, formatType) {
    if (formatType == 0) {
        strLine = "  " + strLine;
    } else if (formatType == 1) {
        blank = (16 - strLine.length) / 2;
        if (blank > 0) {
            for (i = 0; i < blank; i++) {
                strLine = " " + strLine;
            }
        }
    } else if (formatType == 2) {
    }
    blank = strLine.length % 16;
    if (blank > 0) {
        for (i = blank; i < 16; i++) {
            strLine += " ";
        }
    }
    for (wd in strLine) {
        var ele = document.createElement('li');
        var a = 2;
        r = Math.round(parseInt(tran[a]) * (-17) + 255);
        g = Math.round(parseInt(tran[a]) * (-17) + 255);
        b = Math.round(parseInt(tran[a]) * (-17) + 255);
        ele.style = 'background: url("' + bg + '.svg") center center no-repeat;color: rgb(' + r + ', ' + g + ', ' + b + '); font-family:", ", "楷体", "楷体_gb2312", "Kaiti SC", "STKaiti", "AR PL UKai CN", "AR PL UKai HK", "AR PL UKai TW", "AR PL UKai TW MBE", "AR PL KaitiM GB", "KaiTi", "KaiTi_GB2312", "DFKai-SB", "TW-Kai", "web-ukai", serif;';
        if (strLine[wd]) {
            if (strLine[wd] == " ") {
                ele.innerHTML = '<span style="margin:' + y + 'px ' + x + 'px 0px 0px;">&nbsp;</span>';
            } else {
                ele.innerHTML = '<span style="margin:' + y + 'px ' + x + 'px 0px 0px;">' + strLine[wd] + '</span>';
            }
        } else {
            ele.innerHTML = "&nbsp;";
        }
        document.getElementById('lst').appendChild(ele);
    }
}

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
}
function render(ff) {
    $('body').prepend($('#page-head-box').html());
    $('.afterpage').prepend($('#page-head-box').html());
    let herderColor = '#666666';
    $('.page-head').css('color', herderColor);

    let fontFamily = '"' + ff + '","楷体",';
    let hzBg = 'url(' + bg + '.svg) center center no-repeat';
    let pyBg = 'url(/zi/images/pyb2.svg)  center center repeat-x';

    $('li').css('background', hzBg);
    $('li').css('font-family', fontFamily + $('li').css('font-family'));

    let typem = '6';
    if (parseInt(typem) === 20) {
        $('li:not(.f)').css('color', '#ffffff');
        $('li:not(.f)').css('text-shadow', '1px 1px #aaaaaa, -1px -1px #aaaaaa,1px -1px #aaaaaa, -1px 1px #aaaaaa');
    }
}

function fillEmptyLine(lineNum, columnNum, hasPy) {
    if (lineNum == 0) {
        return;
    }
    for (i = 0; i < lineNum; i++) {
        $('.zi-page-new').last().append($('<ul></ul>'));
        for (j = 0; j < columnNum; j++) {
            let fill = hasPy ? '<li><span class="py-box">&nbsp;</span><span class="hz-box">&nbsp;</span></li>' : '<li class="svg">&nbsp;</li>'
            $('.zi-page-new ul').last().append($(fill));
        }
    }
}

function importFile() {
    var selectedFile = document.getElementById("files").files[0]; //获取读取的File对象
    var name = selectedFile.name; //读取选中文件的文件名
    var size = selectedFile.size; //读取选中文件的大小
    // console.log("文件名:"+name+"大小："+size);

    var reader = new FileReader(); //这里是核心！！！读取操作就是由它完成的。
    reader.readAsText(selectedFile); //读取文件的内容

    reader.onload = function () {
        // console.log(this.result);//当读取完成之后会回调这个函数，然后此时文件的内容存储到了result中。直接操作即可。
        // arrLines = JSON.parse(this.result);
        if (arrLines.length > 0) {
            var arr1 = JSON.parse(this.result);
            $.each(arr1, function (index, objLine) {
                arrLines.push(objLine);
            });
        } else {
            arrLines = JSON.parse(this.result);
        }
    };
    document.getElementById("files").files[0] = "";
}
function getData() {
    fetch("CiKu.json")
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                // Examine the text in the response 
                response.json().then(function (data) {
                    objCiKu = data;
                    // const xmlString = data;
                    // var XmlNode = new DOMParser().parseFromString(xmlString, 'application/xhtml+xml');
                    // objJson_native = xmlToJson(XmlNode);
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}
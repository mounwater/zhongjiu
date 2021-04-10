//domobj 要发生变化的那个DOM对象 targetData 要发生哪些变化 {"width":500,"height":500}
function startMove(domobj, targetData, fn) {
    clearInterval(domobj.timer);
    domobj.timer = setInterval(() => {
        let flag = true; //假设都达到了目标值
        for (let styleName in targetData) {
            if (styleName == "opacity") {
                var iCur = parseInt(getStyle(domobj, "opacity") * 100); //让透明度的值由0-1变成0-100
            } else {
                var iCur = parseInt(getStyle(domobj, styleName));
            }

            let iTar = targetData[styleName];
            let iSpeed = (iTar - iCur) / 15;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            if (styleName == "opacity") {
                domobj.style.opacity = (iCur + iSpeed) / 100;
                domobj.style.filter = "alpha(opacity=" + (iCur + iSpeed) + ")";
            } else {
                domobj.style[styleName] = iCur + iSpeed + "px";
            }


            if (iCur != iTar) {
                flag = false; //只要有一个没有达到目标值
            }
        }
        if (flag) {
            clearInterval(domobj.timer);
            if (fn) {
                fn();
            }
        }

    }, 20)
}

function getStyle(domobj, attr) {
    if (window.getComputedStyle) {
        return getComputedStyle(domobj, null)[attr];
    }
    return domobj.currentStyle[attr];
}
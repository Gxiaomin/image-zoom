function ImageZoom(container,options){
    this.defaultOpt = {
        width: 450,
        height: 400
    };
    Object.assign(this.defaultOpt,options);
    // console.log(this.defaultOpt);
    //图片地址
    this.src = this.defaultOpt.src;
    //获取容器
    this.containerEle = document.querySelector(container);
    this.containerEle.style.cssText = "position:relative;border:solid 1px #000;margin:50px auto 0;width:" + this.defaultOpt.width + "px;height:" + this.defaultOpt.height + "px;";

    document.body.appendChild(this.containerEle);
    //初始化
    this.init();
}

ImageZoom.prototype = {
    init: function() {
        this.createImg();
        this.createZoomBtn();
    },
    //初始化图片
    createImg: function() {
        var imgEle = document.createElement('img');
        imgEle.src = this.src;
        imgEle.style.cssText = "display:block;width:100%;height:100%;transform:translate3d(0px, 0px, 0px) scale3d(1, 1, 1);";

        this.containerEle.appendChild(imgEle);
    },
    //初始化按钮
    createZoomBtn: function() {
        //缩放按钮
        var zoomDecreaseBtn = document.createElement('button');
        var zoomIncreaseBtn = document.createElement('button');
        //添加至页面
        this.containerEle.appendChild(zoomDecreaseBtn);
        this.containerEle.appendChild(zoomIncreaseBtn);
        //为缩放按钮添加类名
        zoomDecreaseBtn.classList.add('zoom-btn','zoom-decrease-btn');
        zoomIncreaseBtn.classList.add('zoom-btn','zoom-increase-btn');
        //选中缩放按钮，设置统一样式;
        var style = "display:block;width:30px;height:30px;position:absolute;right:2%;line-height:30px;text-align:center;cursor:pointer;font-size: 18px;font-weight:bold;";
        //为按钮添加特定位置
        var decreaseBtnEle = document.querySelector('.zoom-decrease-btn');
        var increaseBtnEle = document.querySelector('.zoom-increase-btn');
        decreaseBtnEle.style.cssText = style + "top: 12%;";
        increaseBtnEle.style.cssText = style +  "top: 2%;";

        zoomDecreaseBtn.innerHTML = "-";
        zoomIncreaseBtn.innerHTML = "+";
    }
};
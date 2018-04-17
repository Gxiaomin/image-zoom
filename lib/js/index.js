function ImageZoom(container,options){
    this.defaultOpt = {
        width: 450,
        height: 400
    };
    Object.assign(this.defaultOpt,options);
    // for (var key in options) {
    //     this.defaultOpt[key] = options[key];
    // };
    //图片地址
    this.src = this.defaultOpt.src;

    // this.imgEle = null;
    // this.zoomDecreaseBtn = null;
    // this.zoomIncreaseBtn = null;

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

        //保存this
        let self = this;
        // //为缩放按钮绑定事件
        self.zoomDecreaseBtn.addEventListener('click', self.zoomBtnClick);
        self.zoomIncreaseBtn.addEventListener('click', self.zoomBtnClick);
    },
    //初始化图片
    createImg: function() {
        this.imgEle = document.createElement('img');
        this.imgEle.src = this.src;
        this.imgEle.style.cssText = "display:block;width:100%;height:100%;transform:translate3d(0px, 0px, 0px) scale3d(1, 1, 1);";

        this.containerEle.appendChild(this.imgEle);
    },
    //初始化按钮
    createZoomBtn: function() {
        //缩放按钮
        this.zoomDecreaseBtn = document.createElement('button');
        this.zoomIncreaseBtn = document.createElement('button');
        //添加至页面
        this.containerEle.appendChild(this.zoomDecreaseBtn);
        this.containerEle.appendChild(this.zoomIncreaseBtn);
        //为缩放按钮添加类名
        this.zoomDecreaseBtn.classList.add('zoom-btn','zoom-decrease-btn');
        this.zoomIncreaseBtn.classList.add('zoom-btn','zoom-increase-btn');
        //选中缩放按钮，设置统一样式;
        var style = "display:block;width:30px;height:30px;position:absolute;right:2%;line-height:30px;text-align:center;cursor:pointer;font-size: 18px;font-weight:bold;";
        //为按钮添加特定位置
        // var decreaseBtnEle = document.querySelector('.zoom-decrease-btn');
        // var increaseBtnEle = document.querySelector('.zoom-increase-btn');
        this.zoomDecreaseBtn.style.cssText = style + "top: 12%;";
        this.zoomIncreaseBtn.style.cssText = style +  "top: 2%;";

        this.zoomDecreaseBtn.innerHTML = "-";
        this.zoomIncreaseBtn.innerHTML = "+";
    },
    //放大功能
    zoomBtnClick: function(e) {
        console.log(this.imgEle);
        if(e.target.classList.contains("zoom-decrease-btn")) {
            // this.imgEle.style.width = this.imgEle.style.width * 0.5 + 'px';
        }else {
            // this.imgEle.style.width = this.imgEle.style.width * 1.5 + 'px';
        }
    },
    //缩放处理
    zoomScaleHandle: function(scale) {
        
    }

};
function ImageZoom(container,options){
    this.defaultOpt = {
        width: 450,
        height: 400,

    };
    // Object.assign(this.defaultOpt,options);
    for (var key in options) {
        this.defaultOpt[key] = options[key];
    };
    //图片地址
    this.src = this.defaultOpt.src;

    this.scale = 1;
    this.tag = false;

    // this.imgEle = null;
    // this.zoomDecreaseBtn = null;
    // this.zoomIncreaseBtn = null;

    //获取容器
    this.containerEle = document.querySelector(container);
    this.containerEle.style.cssText = "position:relative;border:solid 1px #000;margin:50px auto 0;overflow:hidden;width:" + this.defaultOpt.width + "px;height:" + this.defaultOpt.height + "px;";

    document.body.appendChild(this.containerEle);
    //初始化
    this.initUI();
}

ImageZoom.prototype = {
    initUI: function() {
        this.createImg();
        this.createZoomBtn();

        // //为缩放按钮绑定事件
        this.zoomDecreaseBtn.addEventListener('click', this.zoomBtnClick.bind(this));
        this.zoomIncreaseBtn.addEventListener('click', this.zoomBtnClick.bind(this));
    },
    //初始化图片
    createImg: function() {
        this.imgEle = document.createElement('img');
        this.imgEle.src = this.src;
        this.imgEle.style.cssText = "display:block;width:100%;height:100%;transform:translate3d(0px, 0px, 0px) scale3d(1, 1, 1);position:absolute;left:0;top:0;right:0;bottom:0;";

        this.containerEle.appendChild(this.imgEle);

        this.imgEle.addEventListener('mousedown', this.handleMousedown.bind(this));
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
        var scaleRate = parseInt(this.imgEle.width/this.imgEle.height).toFixed(2);
        if(e.target.classList.contains("zoom-decrease-btn")) {
            if(this.scale>1) {
                this.scale -= 1;
                this.imgEle.style.WebkitTransform = "scale3d(" + this.scale + ","+ this.scale +",1)";
            }else if(this.scale <1) {
                this.imgEle.style.WebkitTransform = "scale3d(1,1,1)";
                // this.imgEle.style.left = 0;
                // this.imgEle.style.top = 0;
            }
        }else {
            if(this.scale < 3) {
                this.scale += 1;
                this.imgEle.style.WebkitTransform = "scale3d(" + this.scale + ","+ this.scale +",1)";
            }else if(this.scale > 3) {
                this.imgEle.style.WebkitTransform = "scale3d(3,3,1)";
            }
        }
    },
    //拖动
    handleMousedown: function(event) {
        let self = this;
        var e = event || window.event;

        //阻止默认事件
        if(e.preventDefault){ 
            e.preventDefault();
        }else{
            e.returnValue = false;
        }

        //标记鼠标按下状态
        let isDown = true;
        let startX = e.clientX;
        let startY = e.clientY;
        let boxWidth = parseInt(self.containerEle.style.width);
        let boxHeight = parseInt(self.containerEle.style.height);
        let boxLeft  = self.containerEle.offsetLeft;
        let boxTop  = self.containerEle.offsetTop;

        
        //获取偏移量
        let startLeft = startX - self.imgEle.offsetLeft;
        let startTop = startY - self.imgEle.offsetTop;

        self.imgEle.style.cursor = "move";  

        //缩放后图片属性
        // let currImgWidth = self.imgEle.width * this.scale;
        // let currImgHeight = self.imgEle.height * this.scale;
        // let maxLeft = boxWidth - currImgWidth + (startX - boxLeft);
        // let maxTop = boxHeight - currImgHeight + (startY - boxTop);

        // console.log(maxLeft);
        //鼠标移动事件
        self.containerEle.onmousemove = function(event) {
            var e = event || window.event;
            
            if(isDown && self.scale !== 1) {
                let l = e.clientX;
                let t = e.clientY;

                //判断边界
                if(l <= boxLeft) l = boxLeft ;
                if(l >= (boxLeft + boxWidth)) l = boxLeft + boxWidth; 

                if(t <= boxTop) t = boxTop;
                if(t >= (boxTop + boxHeight)) t = boxTop + boxHeight;   

                
                self.imgEle.style.left = (l - startLeft) + "px";
                self.imgEle.style.top = (t - startTop) + "px";

            }
        }
        //停止拖动
        document.onmouseup = function() {
            isDown = false;
            self.imgEle.style.cursor = "default";  
            document.onmousemove = null ;
        }
        return false;  
    },
    //缩放处理
    zoomScaleHandle: function(scale) {
        
    }

};
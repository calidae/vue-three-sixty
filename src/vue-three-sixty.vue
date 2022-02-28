<template>
    <div class="vue-three-sixty" :class="modifiers" ref="viewer" :id="identifier">
        <slot name="header"></slot>
        <div class="vue-three-sixty__viewport" ref="viewport">
            <p class="vue-three-sixty__loading" ref="viewPercentage" v-if="!imagesLoaded"></p>
            <canvas 
                class="vue-three-sixty__image" 
                ref="imageContainer"
                v-hammer:pinch="onPinch"
                v-hammer:pinchend="onPinch"
                v-hammer:pinchout="onPinchOut"
                v-hammer:pinchin="onPinchIn"
            ></canvas>
        </div>
        <div class="vue-three-sixty__buttons">
            <div class="vue-three-sixty__btn vue-three-sixty__btn--play" @click="togglePlay" v-if="!playing">
                <svg :width="`${btnSize}px`" :height="`${btnSize}px`" :viewBox="`0 0 ${btnSize} ${btnSize}`">
                    <g :transform="`scale(${btnScale} ${btnScale})`">
                        <rect x="0" y="0" :fill="btnBgColor" width="28" height="28" :rx="btnRounded" />
                        <polygon :fill="btnColor" points="11.061,8 11.061,20 20.061,14"/>
                    </g>
                </svg>
            </div>
            <div class="vue-three-sixty__btn vue-three-sixty__btn--pause" @click="togglePlay" v-else>
                <svg :width="`${btnSize}px`" :height="`${btnSize}px`" :viewBox="`0 0 ${btnSize} ${btnSize}`">
                    <g :transform="`scale(${btnScale} ${btnScale})`">
                        <rect x="0" y="0" :fill="btnBgColor" width="28" height="28" :rx="btnRounded" />
                        <rect x="10.261" y="8.142" :fill="btnColor" width="2.5" height="12"/>
                        <rect x="15.26" y="8.142" :fill="btnColor" width="2.5" height="12"/>
                    </g>
                </svg>
            </div>
            <div class="vue-three-sixty__btn vue-three-sixty__btn--zoom-in" @click="zoomIn" v-if="!disableZoom">
                <svg :width="`${btnSize}px`" :height="`${btnSize}px`" :viewBox="`0 0 ${btnSize} ${btnSize}`">
                    <g :transform="`scale(${btnScale} ${btnScale})`">
                        <rect x="0" y="0" :fill="btnBgColor" width="28" height="28" :rx="btnRounded" />
                        <rect x="8.1" y="13" :fill="btnColor" width="12" height="2.5"/>
                        <rect x="13" y="8.1" :fill="btnColor" width="2.5" height="12"/>
                    </g>
                </svg>
            </div>
            <div class="vue-three-sixty__btn  vue-three-sixty__btn--zoom-out" @click="zoomOut" v-if="!disableZoom">
                <svg :width="`${btnSize}px`" :height="`${btnSize}px`" :viewBox="`0 0 ${btnSize} ${btnSize}`">
                    <g :transform="`scale(${btnScale} ${btnScale})`">
                        <rect x="0" y="0" :fill="btnBgColor" width="28" height="28" :rx="btnRounded" />
                        <rect x="8.1" y="13" :fill="btnColor" width="12" height="2.5"/>
                    </g>
                </svg>
            </div>
            <div class="vue-three-sixty__btn  vue-three-sixty__btn--left" @click="prev">
                <svg :width="`${btnSize}px`" :height="`${btnSize}px`" :viewBox="`0 0 ${btnSize} ${btnSize}`">
                    <g :transform="`scale(${btnScale} ${btnScale})`">
                        <rect x="0" y="0" :fill="btnBgColor" width="28" height="28" :rx="btnRounded" />
                        <g transform="rotate(-45)">
                            <rect x="-4" y="16" :fill="btnColor" width="12" height="2.5"/>
                            <rect x="-4" y="16" :fill="btnColor" width="2.5" height="12"/>
                        </g>
                    </g>
                </svg>
            </div>
            <div class="vue-three-sixty__btn  vue-three-sixty__btn--right" @click="next">
                <svg :width="`${btnSize}px`" :height="`${btnSize}px`" :viewBox="`0 0 ${btnSize} ${btnSize}`">
                    <g :transform="`scale(${btnScale} ${btnScale})`">
                        <rect x="0" y="0" :fill="btnBgColor" width="28" height="28" :rx="btnRounded" />
                        <g transform="rotate(-45)">
                            <rect x="-8" y="22" :fill="btnColor" width="12" height="2.5"/>
                            <rect x="2" y="12" :fill="btnColor" width="2.5" height="12"/>
                        </g>
                    </g>
                </svg>
            </div>
            <div class="vue-three-sixty__btn  vue-three-sixty__btn--reset" @click="resetPosition">
                <svg :width="`${btnSize}px`" :height="`${btnSize}px`" :viewBox="`0 0 ${btnSize} ${btnSize}`">
                    <g :transform="`scale(${btnScale} ${btnScale})`">
                        <rect x="0" y="0" :fill="btnBgColor" width="28" height="28" :rx="btnRounded" />
                        <path :fill="btnColor" d="M15.845,9.99h-3.936V7.944L7.2,11.274l4.709,3.331v-2.046h3.936c1.314,0,2.385,1.07,2.385,2.386v0.156
		c0,1.315-1.07,2.386-2.385,2.386H9.555v2.569h6.291c2.732,0,4.954-2.224,4.954-4.955v-0.156C20.799,12.212,18.578,9.99,15.845,9.99
		z"/>
                    </g>
                </svg>
            </div>
            <div v-if="isFullScreen" class="vue-three-sixty__btn  vue-three-sixty__btn--close" @click="toggleFullScreen">
                <svg :width="`${btnSize}px`" :height="`${btnSize}px`" :viewBox="`0 0 ${btnSize} ${btnSize}`">
                    <g :transform="`scale(${btnScale} ${btnScale})`">
                        <rect x="0" y="0" :fill="btnBgColor" width="28" height="28" :rx="btnRounded" />
                        <g transform="rotate(45)">
                            <rect x="11" y="-1" :fill="btnColor" width="18" height="2.5"/>
                            <rect x="18.5" y="-8.5" :fill="btnColor" width="2.5" height="18"/>
                        </g>
                    </g>
                </svg>
            </div>
            <div v-else class="vue-three-sixty__btn  vue-three-sixty__btn--expand" @click="toggleFullScreen">
                <svg :width="`${btnSize}px`" :height="`${btnSize}px`" :viewBox="`0 0 ${btnSize} ${btnSize}`">
                    <g :transform="`scale(${btnScale} ${btnScale})`">
                        <rect x="0" y="0" :fill="btnBgColor" width="28" height="28" :rx="btnRounded" />
                        <polygon :fill="btnColor" points="18.599,11.096 18.835,11.332 18.835,11.332 20,12.497 20,8 15.503,8 16.902,9.398 13.998,12.303 
	11.096,9.401 11.24,9.257 12.498,8 8,8 8,12.497 9.219,11.277 9.399,11.097 12.301,14 9.398,16.903 9.311,16.816 9.311,16.816 
	8,15.504 8,20 12.497,20 11.331,18.835 11.095,18.599 13.998,15.697 16.902,18.601 15.503,20 20,20 20,15.504 18.744,16.76 
	18.599,16.905 15.695,14 "/>
                    </g>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
const uuidv1 = require('uuid/v1');

export default {
    name: 'VueThreeSixty',
    props: {
        imagePath: {
            type: String,
            require: true,
            default: ''
        },
        fileName: {
            type: String,
            require: true,
            default: ''
        },
        spinReverse: {
            type: Boolean,
            require: true,
            default: false,
        },
        amount: {
            type: Number,
            require: true,
            default: 24,
        },
        autoplay: {
            type: Boolean,
            require: false,
            default: false
        },
        loop: {
            type: Number,
            require: false,
            default: 1
        },
        identifier: {
            type: String,
            require: true,
            default: () => uuidv1()
        },
        paddingIndex: {
            type: Boolean,
            require: false,
            default: false
        },
        disableZoom: {
            type: Boolean,
            require: false,
            default: false
        },
        scrollImage: {
            type: Boolean,
            require: false,
            default: false
        },
        btnBgColor: {
            type: String,
            require: false,
            default: '#F1F1F2'
        },
        btnColor: {
            type: String,
            require: false,
            default: '#666666'
        },
        btnRounded: {
            type: Number,
            require: false,
            default: 0,
        },
        btnSize: {
            type: Number,
            require: false,
            default: 28,
            validator(value) {
                return value > 13 && value < 129
            }
        },
    },
    data() {
        return {
            minScale: 0.5,
            maxScale: 4,
            scale: 0.20,
            customOffset: 10,
            currentScale: 1.0,
            currentTopPosition: 0,
            currentLeftPosition: 0,
            selectMenuOption: 1,
            currentImage: null,
            dragging: false,
            canvas: null,
            ctx: null,
            dragStart: null,
            lastX: 0,
            lastY: 0,
            currentCanvasImage: null,
            isFullScreen: false,
            viewPortElementWidth: null,
            movementStart: 0,
            movement: false,
            dragSpeed: 150,
            speedFactor: 13,
            activeImage: 1,
            stopAtEdges: false,
            imagesLoaded: false,
            loadedImages: 0,
            centerX: 0,
            centerY: 0,
            isMobile: false,
            currentLoop: 0,
            loopTimeoutId: 0,
            images: [],
            imageData: [],
            playing: false
        }
    },
    watch: {
        currentLeftPosition(value) {
            this.redraw()
        },
        currentTopPosition(value) {
            this.redraw()
        },
        viewPortElementWidth(value) {
            this.update()
        },
        isFullScreen(value) {
            if (!value) {
                this.$refs.viewer.classList.remove('vue-three-sixty--fullscreen')
            } else {
                this.$refs.viewer.classList.add('vue-three-sixty--fullscreen')
                
            }
            this.setImage()
        },
        playing(value) {
            if (value) {
                this.play()
            } else {
                this.stop()
            }
        }
    },
    mounted() {
        this.fetchData()
        document.addEventListener('fullscreenchange', this.exitHandler);
        document.addEventListener('webkitfullscreenchange', this.exitHandler);
        document.addEventListener('mozfullscreenchange', this.exitHandler);
        document.addEventListener('MSFullscreenChange', this.exitHandler);
    },
    computed: {
        hasHeader() {
    	    return !!this.$slots.header;
        },
        modifiers() {
            return this.hasHeader ? 'vue-three-sixty--with-header' : ''
        },
        btnScale() {
            return this.btnSize / 28
        },
    },
    methods: {
        initData() {
            this.checkMobile()
            this.loadInitialImage()
            
            this.canvas = this.$refs.imageContainer
            this.ctx = this.canvas.getContext('2d')
            this.attachEvents();
            window.addEventListener('resize', this.resizeWindow);
            this.resizeWindow()

            this.playing = this.autoplay
        },
        fetchData() {

            for(let i=1; i <= this.amount; i++) {
                const imageIndex = (this.paddingIndex) ? this.lpad(i, "0", 2) : i
                const fileName = this.fileName.replace('{index}', imageIndex);
                const filePath = `${this.imagePath}/${fileName}`
                this.imageData.push(filePath)
            }

            this.preloadImages()
        },

        lpad(str, padString, length) {
            str = str.toString()

            while (str.length < length) str = padString + str
            return str
        },

        preloadImages() {
            if (this.imageData.length) {
                try {
                    this.amount = this.imageData.length;
                    this.imageData.forEach(src => {
                        this.addImage(src);
                    });
                } catch (error) {
                    console.error(`Something went wrong while loading images: ${error.message}`);
                }
            } else {
                console.log('No Images Found')
            }
        },
        addImage(resultSrc) {
            const image = new Image();

            image.src = resultSrc;
            image.onload = this.onImageLoad.bind(this);
            image.onerror = this.onImageLoad.bind(this);

            this.images.push(image);
        },
        onImageLoad(event) {
            const percentage = Math.round(this.loadedImages / this.amount * 100);

            this.loadedImages += 1;
            this.updatePercentageInLoader(percentage);

            if (this.loadedImages === this.amount) {
                this.onAllImagesLoaded(event);
            } else if (this.loadedImages === 1) {
                console.log('load first image')
            }
        },
        updatePercentageInLoader(percentage) {
            this.$refs.viewPercentage.innerHTML = percentage + '%';
        },
        onAllImagesLoaded(e) {
            this.imagesLoaded = true
            this.initData()
        },
        togglePlay() {
            this.playing = !this.playing
        },
        play() {
            this.loopTimeoutId = window.setInterval(() => this.loopImages(), 100);
        },
        onSpin() {
            if (this.playing || this.loopTimeoutId) {
                this.stop();
            }
        },
        stop() {
            if (this.activeImage == 1) {
                this.currentLoop = 0
            }
            this.playing = false;
            window.clearTimeout(this.loopTimeoutId);
        },
        loopImages() {
            if (this.activeImage == 1) {
                if (this.currentLoop == this.loop) {
                    this.stop()
                }
                else{
                    this.currentLoop++
                    
                    this.next()
                }
            }
            else{
                this.next()
            }
        },
        next() {
            (this.spinReverse) ? this.turnLeft() : this.turnRight()
        },
        prev() {
            (this.spinReverse) ? this.turnRight() : this.turnLeft()
        },
        turnLeft() {
            this.moveActiveIndexDown(1);
        },
        turnRight() {
            this.moveActiveIndexUp(1);
        },
        loadImages() {
            console.log('load image')
        },
        checkMobile() {
            this.isMobile = !!('ontouchstart' in window || navigator.msMaxTouchPoints);
        },
        loadInitialImage() {
            this.currentImage = this.imageData[0] 
            this.setImage()
        },
        resizeWindow() {
            this.setImage()
        },
        onPinch(evt) {
            console.log('on tap')
        },
        onPinchEnd(evt) {
            this.tempScale = 0
        },
        onPinchIn(evt) {
            this.zoomOut()
        },
        onPinchOut(evt) {
            this.zoomIn()
        },
        attachEvents() {
            this.$refs.viewport.removeEventListener('touchend', this.stopDragging);
            this.$refs.viewport.removeEventListener('touchstart', this.startDragging);
            this.$refs.viewport.removeEventListener('touchmove', this.doDragging); 

            this.$refs.viewport.addEventListener('touchend', this.touchEnd);
            this.$refs.viewport.addEventListener('touchstart', this.touchStart);
            this.$refs.viewport.addEventListener('touchmove', this.touchMove); 

            this.$refs.viewport.removeEventListener('mouseup', this.stopDragging);
            this.$refs.viewport.removeEventListener('mousedown', this.startDragging);
            this.$refs.viewport.removeEventListener('mousemove', this.doDragging); 
            
            this.$refs.viewport.addEventListener('mouseup', this.stopMoving);
            this.$refs.viewport.addEventListener('mousedown', this.startMoving);
            this.$refs.viewport.addEventListener('mousemove', this.doMoving);

            this.$refs.viewport.addEventListener('wheel', this.onScroll);
        },
        zoomIn(evt) {
            if (this.disableZoom) return;

            this.lastX = this.centerX;
            this.lastY = this.centerY
            this.zoom(1)
        },
        zoomOut(evt) {
            if (this.disableZoom) return;
            
            this.lastX = this.centerX;
            this.lastY = this.centerY
            this.zoom(-1)
        },
        moveLeft() {
            this.currentLeftPosition += this.customOffset;
        },
        moveRight() {
            this.currentLeftPosition -= this.customOffset;
        },
        moveUp() {
            this.currentTopPosition += this.customOffset;
        },
        moveDown() {
            this.currentTopPosition -= this.customOffset;
        },
        resetPosition() {
            this.currentScale = 1
            this.activeImage = 1
            this.setImage(true)
        },
        setImage(cached = false) {
            this.currentLeftPosition = this.currentTopPosition = 0
            
            if (!cached) {
                this.currentCanvasImage = new Image()
                this.currentCanvasImage.crossOrigin='anonymous'
                this.currentCanvasImage.src = this.currentImage

                this.currentCanvasImage.onload = () => {
                    let viewportElement = this.$refs.viewport.getBoundingClientRect()
                    this.canvas.width  = (this.isFullScreen) ? viewportElement.width : this.currentCanvasImage.width
                    this.canvas.height = (this.isFullScreen) ? viewportElement.height : this.currentCanvasImage.height
                    this.trackTransforms(this.ctx)

                    this.redraw()
                }

                this.currentCanvasImage.onerror = () => {
                    console.log('cannot load this image')
                }
            } else {
                this.currentCanvasImage = this.images[0]
                let viewportElement = this.$refs.viewport.getBoundingClientRect()
                this.canvas.width  = (this.isFullScreen) ? viewportElement.width : this.currentCanvasImage.width
                this.canvas.height = (this.isFullScreen) ? viewportElement.height : this.currentCanvasImage.height
                this.trackTransforms(this.ctx)

                this.redraw()
            }
            
        },
        redraw() {

            try {

                let p1 = this.ctx.transformedPoint(0,0);
                let p2 = this.ctx.transformedPoint(this.canvas.width,this.canvas.height)

                let hRatio = this.canvas.width / this.currentCanvasImage.width
                let vRatio =  this.canvas.height / this.currentCanvasImage.height
                let ratio  = Math.min(hRatio, vRatio);
                let centerShift_x = (this.canvas.width - this.currentCanvasImage.width*ratio )/2
                let centerShift_y = (this.canvas.height - this.currentCanvasImage.height*ratio )/2
                this.ctx.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);

                this.centerX = this.currentCanvasImage.width*ratio/2
                this.centerY = this.currentCanvasImage.height*ratio/2
                
                //center image
                this.ctx.drawImage(this.currentCanvasImage, this.currentLeftPosition, this.currentTopPosition, this.currentCanvasImage.width, this.currentCanvasImage.height,
                            centerShift_x,centerShift_y,this.currentCanvasImage.width*ratio, this.currentCanvasImage.height*ratio);  

                this.addHotspots()

            }
            catch(e) {
                this.trackTransforms(this.ctx)
            }

        },
        onMove(pageX) {
            if (pageX - this.movementStart >= this.speedFactor) {
                let itemsSkippedRight = Math.floor((pageX - this.movementStart) / this.speedFactor) || 1;
                
                this.movementStart = pageX;

                if (this.spinReverse) {
                    this.moveActiveIndexDown(itemsSkippedRight);
                } else {
                    this.moveActiveIndexUp(itemsSkippedRight);
                }

                this.redraw();

            } else if (this.movementStart - pageX >= this.speedFactor) {

                let itemsSkippedLeft = Math.floor((this.movementStart - pageX) / this.speedFactor) || 1;
                
                this.movementStart = pageX;

                if (this.spinReverse) {
                    this.moveActiveIndexUp(itemsSkippedLeft);
                } else {
                    this.moveActiveIndexDown(itemsSkippedLeft);
                }

                this.redraw();
            }
        },
        startMoving(evt) {
            this.movement = true
            this.movementStart = evt.pageX;
            this.$refs.viewport.style.cursor = 'grabbing';
        },
        doMoving(evt) {
            if (this.movement) {
                this.onMove(evt.clientX)
            }
        },
        onScroll(evt) {
            evt.preventDefault(); 

            if (this.disableZoom || this.scrollImage) {
                if (evt.deltaY < 0) {
                    this.moveActiveIndexDown(1);
                } else {
                    this.moveActiveIndexUp(1);
                }
                this.onMove(evt.scrollTop);
            } else {
                this.zoomImage(evt);
            }
        },
        moveActiveIndexUp(itemsSkipped) {

            if (this.stopAtEdges) {
                if (this.activeImage + itemsSkipped >= this.amount) {
                    this.activeImage = this.amount;
                } else {
                    this.activeImage += itemsSkipped;
                }
            } else {
                this.activeImage = (this.activeImage + itemsSkipped) % this.amount || this.amount;
            }
            
            this.update()
        },
        moveActiveIndexDown(itemsSkipped) {

            if (this.stopAtEdges) {
                if (this.activeImage - itemsSkipped <= 1) {
                    this.activeImage = 1;
                } else {
                    this.activeImage -= itemsSkipped;
                }
            } else {
                if (this.activeImage - itemsSkipped < 1) {
                    this.activeImage = this.amount + (this.activeImage - itemsSkipped);
                } else {
                    this.activeImage -= itemsSkipped;
                }
            }
            
            this.update()
        },
        update() {
            const image = this.images[this.activeImage - 1];
            this.currentCanvasImage = image
            this.redraw()
        },
        stopMoving(evt) {
            this.movement = false
            this.movementStart = 0
            this.$refs.viewport.style.cursor = 'grab'
        },
        touchStart(evt) {
            this.movementStart = evt.touches[0].clientX
        },
        touchMove(evt) {
            this.onMove(evt.touches[0].clientX)
        },
        touchEnd() {
            this.movementStart = 0
        },
        startDragging(evt) {
            this.dragging = true
            document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
            if (this.isMobile) {
                this.lastX = evt.touches[0].offsetX || (evt.touches[0].pageX - this.canvas.offsetLeft);
			    this.lastY = evt.touches[0].offsetY || (evt.touches[0].pageY - this.canvas.offsetTop);
            } else {
                this.lastX = evt.offsetX || (evt.pageX - this.canvas.offsetLeft);
			    this.lastY = evt.offsetY || (evt.pageY - this.canvas.offsetTop);
            }
            
			this.dragStart = this.ctx.transformedPoint(this.lastX,this.lastY);
        },
        doDragging(evt) {
            if (this.isMobile) {
                this.lastX = evt.touches[0].offsetX || (evt.touches[0].pageX - this.canvas.offsetLeft);
			    this.lastY = evt.touches[0].offsetY || (evt.touches[0].pageY - this.canvas.offsetTop);
            } else {
                this.lastX = evt.offsetX || (evt.pageX - this.canvas.offsetLeft);
			    this.lastY = evt.offsetY || (evt.pageY - this.canvas.offsetTop);
            }
            if (this.dragStart) {
				let pt = this.ctx.transformedPoint(this.lastX,this.lastY);
				this.ctx.translate(pt.x-this.dragStart.x,pt.y-this.dragStart.y);
                this.redraw();
            }
        },
        stopDragging(evt) {
            this.dragging = false
            this.dragStart = null
        },
        restrictScale() {
            let scale = this.currentScale
            if (scale < this.minScale) {
                scale = this.minScale;
            } else if (scale > this.maxScale) {
                scale = this.maxScale;
            }
            return scale;
        },
        zoom(clicks) {
            let factor = 1 - this.scale
            if (clicks > 0) {
                factor = 1 + this.scale
            }
            this.currentScale = this.currentScale * factor
            if (this.currentScale * factor < 1 ) {
                this.currentScale = 1
                this.setImage(true)
            } else {
                let pt = this.ctx.transformedPoint(this.lastX,this.lastY);
                this.ctx.translate(pt.x,pt.y);
                this.ctx.scale(factor,factor);
                this.ctx.translate(-pt.x,-pt.y);
                this.redraw();
            }
        },
        zoomImage(evt) {
            if (this.disableZoom) return;
            this.lastX = evt.offsetX || (evt.pageX - this.canvas.offsetLeft);
            this.lastY = evt.offsetY || (evt.pageY - this.canvas.offsetTop);
            var delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.deltaY ? -evt.deltaY : 0;
			if (delta) this.zoom(delta);
            return evt.preventDefault() && false;
        },
        trackTransforms(ctx) {
            return new Promise(resolve => {
                var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
                var xform = svg.createSVGMatrix();
                this.ctx.getTransform = function() { return xform; };
                var savedTransforms = [];
                var save = ctx.save;
                this.ctx.save = () => {
                    savedTransforms.push(xform.translate(0,0));
                    return save.call(this.ctx);
                };
                var restore = ctx.restore;
                this.ctx.restore = () => {
                    xform = savedTransforms.pop();
                    return restore.call(this.ctx);
                };
                var scale = this.ctx.scale;
                this.ctx.scale = (sx,sy) => {
                    xform = xform.scaleNonUniform(sx,sy);
                    return scale.call(this.ctx,sx,sy);
                };
                var rotate = this.ctx.rotate;
                this.ctx.rotate = (radians) => {
                    xform = xform.rotate(radians*180/Math.PI);
                    return rotate.call(this.ctx,radians);
                };
                var translate = this.ctx.translate;
                this.ctx.translate = (dx,dy) => {
                    xform = xform.translate(dx,dy);
                    return translate.call(this.ctx,dx,dy);
                };
                var transform = this.ctx.transform;
                this.ctx.transform = (a,b,c,d,e,f) => {
                    var m2 = svg.createSVGMatrix();
                    m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
                    xform = xform.multiply(m2);
                    return transform.call(this.ctx,a,b,c,d,e,f);
                };
                var setTransform = this.ctx.setTransform;
                this.ctx.setTransform = (a,b,c,d,e,f) => {
                    xform.a = a;
                    xform.b = b;
                    xform.c = c;
                    xform.d = d;
                    xform.e = e;
                    xform.f = f;
                    return setTransform.call(this.ctx,a,b,c,d,e,f);
                };
                var pt  = svg.createSVGPoint();
                this.ctx.transformedPoint = (x,y) => {
                    pt.x=x; pt.y=y;
                    return pt.matrixTransform(xform.inverse());
                }
                resolve(this.ctx)
            })
        },
        toggleFullScreen() {
            this.isFullScreen = !this.isFullScreen
        },
    }
}
</script>

<style scoped>
    .vue-three-sixty {
        position: relative;
        background-color: white;
    }

    .vue-three-sixty.vue-three-sixty--fullscreen {
        position: fixed;
        z-index: 9999;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;
        align-content: stretch;
        cursor: default;
    }

    .vue-three-sixty__viewport {
        width: 100%;
        height: 100%;
        overflow: hidden;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .vue-three-sixty .vue-three-sixty__buttons {
        display: flex;
        width: 100%;
        padding: 5px;
        margin: 5px;
        text-align: center;
        justify-content: center;
        z-index: 150;
        gap: 10px;
    }

    .vue-three-sixty .vue-three-sixty__buttons .vue-three-sixty__btn--close {
        position: absolute;
        top: 2em;
        right: 2em;
    }

    /* FULLSCREEN */

    .vue-three-sixty__fullscreen-toggle {
        width: 30px;
        height: 30px;
        margin: 15px;
        position: absolute;
        float: right;
        cursor: pointer;
        top: 0;
        right: 0;
        z-index: 150;
    }

    .vue-three-sixty__fullscreen-toggle:hover {
        fill: #000;
    }
    .vue-three-sixty__loading {
        font-size: 3em;
        padding: 1em;
        opacity: 0.2;
    }

    .vue-three-sixty__image {
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        position: relative;
    }
</style>
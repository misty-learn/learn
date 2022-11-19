# fullpage

fullPage可以实现，一页覆盖整个屏幕的效果，实现出一个企业级的官网。

git地址：[fullpage](https://github.com/alvarotrigo/fullPage.js/tree/master/lang/chinese#fullpagejs)

## 使用

```html
<link rel="stylesheet" type="text/css" href="fullpage.css" />

<!-- 以下行是可选的。 只有在使用选项 css3:false ，并且您希望使用其他缓动效果，而非 linear 、 swing 或 easeInOutCubic 时才有必要。 -->
<script src="vendors/easings.min.js"></script>

<!-- 以下行仅在使用选项 scrollOverflow:true 的情况下是必需的 -->
<script type="text/javascript" src="vendors/scrolloverflow.min.js"></script>
<script type="text/javascript" src="fullpage.js"></script>
```

更多的参数需要参考一下git仓库

在body中的格式为例如下:

```html

<body>
    <div id="fullpage">
        <div class="section">Some section</div>
        <div class="section">Some section</div>
        <div class="section">Some section</div>
        <div class="section">Some section</div>
    </div>
<script>
    new fullpage('#fullpage', {});
</script>
</body>

```
## 常用属性

在`new fullpage(el,{})`

第一个参数是需要绑定的节点信息

全部的对象内容

```js

var myFullpage = new fullpage('#fullpage', {
	//导航
	menu: '#menu',
	lockAnchors: false,
	anchors:['firstPage', 'secondPage'],
	navigation: false,
	navigationPosition: 'right',
	navigationTooltips: ['firstSlide', 'secondSlide'],
	showActiveTooltip: false,
	slidesNavigation: false,
	slidesNavPosition: 'bottom',

	//滚动
	css3: true,
	scrollingSpeed: 700,
	autoScrolling: true,
	fitToSection: true,
	fitToSectionDelay: 1000,
	scrollBar: false,
	easing: 'easeInOutCubic',
	easingcss3: 'ease',
	loopBottom: false,
	loopTop: false,
	loopHorizontal: true,
	continuousVertical: false,
	continuousHorizontal: false,
	scrollHorizontally: false,
	interlockedSlides: false,
	dragAndMove: false,
	offsetSections: false,
	resetSliders: false,
	fadingEffect: false,
	normalScrollElements: '#element1, .element2',
	scrollOverflow: false,
	scrollOverflowReset: false,
	scrollOverflowOptions: null,
	touchSensitivity: 15,
	bigSectionsDestination: null,

	//可访问
	keyboardScrolling: true,
	animateAnchor: true,
	recordHistory: true,

	//布局
	controlArrows: true,
	verticalCentered: true,
	sectionsColor : ['#ccc', '#fff'],
	paddingTop: '3em',
	paddingBottom: '10px',
	fixedElements: '#header, .footer',
	responsiveWidth: 0,
	responsiveHeight: 0,
	responsiveSlides: false,
	parallax: false,
	parallaxOptions: {type: 'reveal', percentage: 62, property: 'translate'},
	cards: false,
	cardsOptions: {perspective: 100, fadeContent: true, fadeBackground: true},


	//自定义选择器
	sectionSelector: '.section',
	slideSelector: '.slide',

	lazyLoading: true,
});
```

## 常用的回调函数

```js

new fullpage("",{
    //事件
    onLeave: function(origin, destination, direction){},
    afterLoad: function(origin, destination, direction){},
    afterRender: function(){},
    afterResize: function(width, height){},
    afterReBuild: function(){},
    afterResponsive: function(isResponsive){},
    afterSlideLoad: function(section, origin, destination, direction){},
    onSlideLeave: function(section, origin, destination, direction){}
});
```

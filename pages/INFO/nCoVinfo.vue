<template>
	<view>
		<div>
			<u-grid :border="false" col="4"  >
				<u-grid-item v-for="(listItem,listIndex) in titlelist" :key="listIndex" bgColor="#3490FD" @click="typechange">
					<u-icon
						:customStyle="{paddingTop:20+'rpx',height:80+'rpx'}"
						:name="listItem.name"
						:size="25"
						color="white"
					></u-icon>
			        <text class="grid-text">{{listItem.title}}</text>
			    </u-grid-item>
			</u-grid>
		</div>
		<div style="background-color:#3490FD;">
			<!--u-subsection :list="infolist" :current="curNow" bgColor="#3490FD" fontSize="14px" inactiveColor="white" height="200" @change="sectionChange"></u-subsection-->
			<u-tabs :list="infolist2" :current="curNow" lineColor="white" :scrollable="false" :activeStyle="{color:'white',fontSize:'14px'}" :inactiveStyle="{color:'white',fontSize:'14px'}" :lineWidth="50" @change="sectionChange"></u-tabs>
		</div>
		<view v-if="curNow==0">
			<view class="content" :class="daytime?'daytime':'nightime'">
			    <view class="top-box">
			        <view class="top-box-bg"></view>
			        <view class="top-box-title">
			            新型冠状病毒肺炎
			        </view>
			        <view class="top-box-but">
			            疫情实时追踪
			        </view>
			        <view class="top-box-bot">
			            数据来源：国家及各地卫健委每日信息发布<image @click="gocortxt" src="../../static/yiwen.png" mode=""></image>
			        </view>
			    </view>
			    <view class="t_item-top" :class="daytime?'daytime16':'nightime16'">
			        <view class="t_item-box" v-if="mydata.chinaAdd!=null && mydata.chinaTotal!=null">
			            <view class="t_item-box-title" >
			                统计截止<text :class="daytime?'daytimetext':'nightimetext'">{{mydata.lastUpdateTime}}</text> ；更新于<text v-if="time.days >0" :class="daytime?'daytimetext':'nightimetext'">{{time.days}}天</text><text v-if="time.hours>0" :class="daytime?'daytimetext':'nightimetext'">{{time.hours}}小时</text>  <text :class="daytime?'daytimetext':'nightimetext'">{{time.minutes}}分钟</text>前
			            </view>
			            <view class="t_item" style="background-color: #fffaf7;">
			                <view class="t_item-addnum">较昨日：<text style="color: #e57631;"><text
			                            v-if="mydata.chinaAdd.localConfirmH5 > 0">+</text>
			                        {{mydata.chinaAdd.localConfirmH5}}</text></view>
			                <view class="t_item-nownum" style="color: #e57631;">{{mydata.chinaTotal.localConfirm}}</view>
			                <view class="t_item-nowtxt">本土现有确诊</view>
			            </view>
			            <view class="t_item" style="background-color: #fff8f8;">
			                <view class="t_item-addnum">较昨日：<text style="color: #e61c1d;"> <text
			                            v-if="mydata.chinaAdd.nowConfirm > 0">+</text>{{mydata.chinaAdd.nowConfirm}}</text>
			                </view>
			                <view class="t_item-nownum" style="color: #e61c1d;">{{mydata.chinaTotal.nowConfirm}}</view>
			                <view class="t_item-nowtxt">现有确诊</view>
			            </view>
			            <view class="t_item" style="background-color: #fff8f8;">
			                <view class="t_item-addnum">较昨日：<text style="color: #be2121;"><text
			                            v-if="mydata.chinaAdd.confirm > 0">+</text>{{mydata.chinaAdd.confirm}}</text></view>
			                <view class="t_item-nownum" style="color: #be2121;">{{mydata.chinaTotal.confirm}}</view>
			                <view class="t_item-nowtxt">累计确诊</view>
			            </view>
			            <view class="t_item" style="background-color: #fef7ff;">
			                <view class="t_item-addnum">较昨日：<text style="color: #ae3ac6;"><text
			                            v-if="mydata.chinaAdd.noInfect > 0">+</text>{{mydata.chinaAdd.noInfect}}</text></view>
			                <view class="t_item-nownum" style="color: #ae3ac6;">{{mydata.chinaTotal.noInfect}}</view>
			                <view class="t_item-nowtxt">无症状感染者</view>
			            </view>
			            <view class="t_item" style="background-color: #f8faff;">
			                <view class="t_item-addnum">较昨日：<text style="color: #000000;"><text
			                            v-if="mydata.chinaAdd.nowSevere > 0">+</text>{{mydata.chinaAdd.nowSevere}}</text></view>
			                <view class="t_item-nownum" style="color: #000000;">{{mydata.chinaTotal.nowSevere}}</view>
			                <view class="t_item-nowtxt">现有重症</view>
			            </view>
			            <view class="t_item" style="background-color: #f1f5ff;">
			                <view class="t_item-addnum">较昨日：<text style="color: #4e8be6;"><text
			                            v-if="mydata.chinaAdd.importedCase > 0">+</text>{{mydata.chinaAdd.importedCase}}</text>
			                </view>
			                <view class="t_item-nownum" style="color: #4e8be6;">{{mydata.chinaTotal.importedCase}}</view>
			                <view class="t_item-nowtxt">境外输入</view>
			            </view>
			            <view class="t_item" style="background-color: #f3f6f8;">
			                <view class="t_item-addnum">较昨日：<text style="color: #4e5a65;"><text
			                            v-if="mydata.chinaAdd.dead > 0">+</text>{{mydata.chinaAdd.dead}}</text></view>
			                <view class="t_item-nownum" style="color: #4e5a65;">{{mydata.chinaTotal.dead}}</view>
			                <view class="t_item-nowtxt">累计死亡</view>
			            </view>
			            <view class="t_item" style="background-color: #EBF4FA;">
			                <view class="t_item-addnum">较昨日：<text style="color: #10aeb5;"><text
			                            v-if="mydata.chinaAdd.heal > 0">+</text>{{mydata.chinaAdd.heal}}</text></view>
			                <view class="t_item-nownum" style="color: #10aeb5;">{{mydata.chinaTotal.heal}}</view>
			                <view class="t_item-nowtxt">累计治愈</view>
			            </view>
			            <view class="t_item" style="background-color: #fffafa;">
			                <view class="t_item-addnum">较昨日：<text style="color: #fd8137;"><text
			                            v-if="mydata.chinaAdd.suspect > 0">+</text>{{mydata.chinaAdd.suspect}}</text></view>
			                <view class="t_item-nownum" style="color: #fd8137;">{{mydata.chinaTotal.suspect}}</view>
			                <view class="t_item-nowtxt">现有疑似</view>
			            </view>
			        </view>
			    </view>
			    <view class="citylist" :class="daytime?'daytimetop16':'nightimetop16'">
			        <view class="citylist-name">
			            <view class="citylist-name-left">
			                <view class="title" style="padding-left:15rpx;" :class="daytime?'daytimetext':'nightimetext'">
			                    中国疫情（包括港澳台）
			                </view>
			                <view class="txt" style="padding-left:15rpx;">
			                    7:00-10:00为更新高峰，数据如有滞后请谅解。
			                </view>
			            </view>
			            <view class="citylist-name-right" @click="openCommon">
			                风险地区
			            </view>
			        </view>
			        <view class="citylist-title">
			            <text class="item" style="background-color: #f5f5f5; color: #222222;">地区</text>
			            <text class="item" style="background-color: #fcf2e8; color: #ff5d00;">现有</text>
			            <text class="item" style="background-color: #fdeeee; color: #f55253;">累计</text>
			            <text class="item" style="background-color: #e9f7ec; color: #178b05;">治愈</text>
			            <text class="item" style="background-color: #f3f6f8; color: #4e5a65;">死亡</text>
			            <text class="item" style="background-color: #f5f5f5; color: #222222;">详情</text>
			        </view>
			        <view class="citylist-box" v-if="mydata.areaTree!=null">
			            <block v-for="(item, index) in mydata.areaTree[0].children" :key='index'>
			                <view class="citylist-box-item" :class="daytime?'daytimebot16':' nightimebot16'">
			                    <view class="item" @click="advSearch(index,item, 2)">
			                        {{item.name}}
			                    </view>
			                    <view class="item" @click="advSearch(index,item, 2)">
			                        {{item.total.nowConfirm}}
			                    </view>
			                    <view class="item" @click="advSearch(index,item, 2)" v-if="item.today.confirm>=1000" style="margin-top:-2rpx;">
			                        {{item.total.confirm}}
			                        <view class="item-confirm">
			                            <view style="margin-top:-5rpx;"><text>较昨日：+{{item.today.confirm}}</text></view>
			                        </view>
			                    </view>
								<view class="item" @click="advSearch(index,item, 2)" v-else-if="item.today.confirm>0" style="margin-top:2rpx;">
								    {{item.total.confirm}}
								    <view class="item-confirm">
										<view><text>较昨日：+</text>{{item.today.confirm}}</view>
								    </view>
								</view>
			                    <view class="item" @click="advSearch(index,item, 2)">
			                        {{item.total.heal}}
			                    </view>
			                    <view class="item" @click="advSearch(index,item, 2)">
			                        {{item.total.dead}}
			                    </view>
			                    <view class="item" style="color: #03A9F4;" @click="gocopay(item)">
			                        详情
			                    </view>
			                </view>
			                
			                <view class="product-box-left-item-sub" v-if="flag[index]">
			                    <block v-for="(items, indexs) in item.children" :key="indexs" >
			                        <view class="product-box-left-item" :class="daytime?'daytimebot16':' nightimebot16'">
			                            <view class="product-box-left-item-item">
			                                {{items.name}}
			                            </view>
			                            <view class="product-box-left-item-item">
			                                {{items.total.nowConfirm}}
			                            </view>
			                            <view class="product-box-left-item-item">
			                                {{items.total.confirm}}
			                            </view>
			                            <view class="product-box-left-item-item">
			                                {{items.total.heal}}
			                            </view>
			                            <view class="product-box-left-item-item">
			                                {{items.total.dead}}
			                            </view>
			                        </view>
			                    </block>
			                </view>    
			            </block>
			        </view>
			        <view class="zqw" :class="daytime?'daytimetop16':'nightimetop16'" @click="popzqw">
			            愿疫情早日散去，山河无恙，天下太平。
			        </view>
			    </view>
			    
			    
			    <uni-popup ref="popup" type="center" class="popup-center">
			        <view class="popup-box">
			            <image class="pop-coles" src="../../static/pop-coles.png" mode="" @click="closeCommon"></image>
			            <view class="popup-box-top">
			                全国疫情中高风险地区数量
			            </view>
			            <scroll-view :class="daytime?'daytime16':'nightime16'" scroll-y="true" class="popup-box-box">
			                <view class="zqw-box">
			                    <view style="float: left; width: 100%; height: 100rpx;"></view>
			                    <view class="height-title" v-if="heightlist">高风险地区 {{heightlist.length}}个</view>
			                </view>
			                <view class="zqw-box">
			                    <view class="middle-title" v-if="middlelist">中风险地区 {{middlelist.length}}个</view>
			                </view>
			                <view v-if="mydata.chinaTotal">
			                    更新时间：{{mydata.chinaTotal.mRiskTime}}
			                </view>
			            </scroll-view>
			        </view>
			    </uni-popup>
			</view>
		</view>
		<view v-if="curNow==1">
			1
		</view>
		<view v-if="curNow==2">
			2
		</view>
		<view v-if="curNow==3">
			3
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				infolist: ['国内疫情', '国外疫情', '核酸检测点','防疫政策'],
				infolist2: [{name:'国内疫情'}, {name:'国外疫情'},{name:'核酸检测'},{name:'国内疫情'}],
				curNow: 0,
				titlelist: [{
						name: 'scan',
						title: '扫一扫'
					},
					{
						name: 'grid',
						title: '身份码'
					},
					{
						name: 'star',
						title: '健康码'
					},
					{
						name: 'hourglass',
						title: '行程卡'
					},
				],
				scrollTop: 0,
				old:{
				    scrollTop:0
				},
				mydata: {},
				time: {},
				flag:[],
				daytime:true,
				arealist:[],
				middlelist:[],
				heightlist:[],
			}
		},
		onLoad() {
		    this.getLocalShop();
		},
		onShow() {
		    let that = this;
		    //that.daytime = uni.getStorageSync('daytime');
		    uni.setNavigationBarColor({
		        frontColor: that.daytime?'#000000':'#ffffff',
		        backgroundColor: that.daytime?'#EDEEED':'#0E0E0E',
		        animation: {
		            duration: 1,
		            timingFunc: 'easeIn'
		        }
		    })
		},
		methods: {
			sectionChange(index) {
				this.curNow = index.index;
			},
			typechange(name){
				switch (name){
					case 0:{
						uni.scanCode({ success: function (res) {  
							console.log('条码类型：' + res.scanType);
							console.log('条码内容：' + res.result); }});
						break;
					}case 1:{
						uni.navigateTo({
							url:"../../pages/INFO/identitycard"
						})
						break;
					}case 2:{
						uni.navigateTo({
							url:"../../pages/INFO/healthcard"
						})
						break;
					}case 3:{
						uni.navigateTo({
							url:"../../pages/INFO/travelcard"
						})
						break;
					}
				}
			},
			closeCommon() {
			    this.$refs.popup.close()
			},
			openCommon(){
			    this.$refs.popup.open('center')
			},
			gocortxt(){
			    uni.navigateTo({
			        url:'txt'
			    })
			},
			advSearch(index,item, level) {
			    if(item.children.length >= 1){
			        this.flag[index] = !this.flag[index];
			        this.$forceUpdate();
			    }
			},
			popzqw() {
			    uni.showToast({
			        title: '愿你我都能守住岁月，待到春光灿烂之时。',
			        icon: 'none',
			        duration: 2500
			    })
			    return;
			},
			gocopay(zqw) {
			    let item = encodeURIComponent(JSON.stringify(zqw))
			    uni.navigateTo({
			        url: 'coronavirus?item=' + item
			    })
			},
			getLocalShop() {
			    let that = this;
			    uni.request({
			        url: 'https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=statisGradeCityDetail,diseaseh5Shelf',
			        method: 'POST',
			        success: res => {
			            that.mydata = res.data.data.diseaseh5Shelf;
			            that.middlelist.length = that.mydata.chinaTotal.mediumRiskAreaNum;
			            that.heightlist.length = that.mydata.chinaTotal.highRiskAreaNum;
			            let timestamp = ((Date.parse(new Date())) - (new Date(that.mydata.lastUpdateTime))
			                .valueOf()) / 1000;
			            that.time = this.formatSecond(timestamp)
			        },
			        fail() {
			
			        }
			    })
			},
			formatSecond(second) {
			    const days = Math.floor(second / 86400);
			    const hours = Math.floor((second % 86400) / 3600);
			    const minutes = Math.floor(((second % 86400) % 3600) / 60);
			    const seconds = Math.floor(((second % 86400) % 3600) % 60);
			    const forMatDate = {
			        days: days,
			        hours: hours,
			        minutes: minutes,
			        seconds: seconds
			    };
			    return forMatDate;
			},
		}
	}
</script>

<style>
	.grid-text {
		font-size: 14px;
		color: white;
		padding: 0rpx 0 40rpx 0rpx;
		/* #ifndef APP-PLUS */
		box-sizing: border-box;
		/* #endif */
	}
	.content {
	position: relative;
	width: 750rpx;
	height: auto;
	margin: 0;
	padding: 0;
	background-color: #fff;
	
	}
	
	.box {
	width: 100%;
	height: auto;
	/* overflow: hidden; */
	padding: 0 30rpx;
	box-sizing: border-box;
	background-color: #fff;
	}
	
	.t_item-top {
	position: absolute;
	width: 100%;
	left: 0;
	top: 352rpx;
	width: 100%;
	height: auto;
	overflow: hidden;
	background-color: #fff;
	padding-bottom: 30rpx;
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
	padding-bottom: 50rpx;
	}
	
	.t_item-box-title {
	width: 100%;
	font-size: 28rpx;
	color: #666;
	padding: 25rpx 0rpx;
	}
	
	.t_item-box-title text {
	color: #222;
	}
	
	.t_item-box {
	width: 100%;
	height: auto;
	padding: 0 30rpx;
	box-sizing: border-box;
	}
	
	.t_item {
	float: left;
	width: 32.7%;
	height: 150rpx;
	text-align: center;
	background-color: #fff;
	margin: .3%;
	transform: scale(.97);
	border-radius: 12rpx;
	}
	
	.t_item-addnum {
	padding-top: 3px;
	float: left;
	width: 100%;
	color: #666;
	text-align: center;
	font-size: 28rpx;
	margin: 5rpx auto 0;
	}
	
	.t_item-nownum {
	float: left;
	width: 100%;
	color: #000;
	text-align: center;
	font-size: 40rpx;
	font-weight: 500;
	}
	.t_item-nowtxt {
	float: left;
	width: 100%;
	color: #000;
	text-align: center;
	font-size: 28rpx;
	}
	
	.citylist {
	position: absolute;
	left: 0;
	top: 936rpx;
	float: left;
	width: 100%;
	height: auto;
	background-color: #fff;
	box-sizing: border-box;
	}
	
	.citylist-title {
	position: sticky;
	top: 0;
	width: 100%;
	height: 80rpx;
	line-height: 80rpx;
	}
	
	.citylist-title .item {
	float: left;
	width: 15%;
	height: 80rpx;
	line-height: 80rpx;
	text-align: center;
	background-color: #fff;
	}
	
	.citylist-title .item:nth-child(1) {
	width: 19%;
	}
	.citylist-title .item:nth-child(2) {
	width: 18%;
	}
	.citylist-title .item:nth-child(3) {
	width: 20%;
	}
	.citylist-title .item:nth-child(4) {
	width: 16%;
	}
	.citylist-title .item:nth-child(5) {
	width: 16%;
	}
	.citylist-title .item:last-child {
	width: 11%;
	}
	
	.citylist-box {
	width: 100%;
	box-sizing: border-box;
	}
	
	.citylist-box-item {
	float: left;
	width: 100%;
	height: 125rpx;//29w
	font-size: 28rpx;
	border-bottom: 1rpx solid #f3f3f3;
	box-sizing: border-box;
	overflow: hidden;
	}
	
	.citylist-box-item .item:first-child {
	color: #4180f1;
	font-size: 15px;
	}
	
	.citylist-box-item .item {
	float: left;
	width: 16%;
	text-align: center;
	}

	.citylist-box-item .item:nth-child(1) {
	width: 19%;
	}
	.citylist-box-item .item:nth-child(2) {
	width: 18%;
	}
	.citylist-box-item .item:nth-child(3) {
	width: 20%;
	}
	.citylist-box-item .item:last-child {
	width: 11%;
	}
	
	.citylist-box-item .item:nth-child(1),
	.citylist-box-item .item:nth-child(2),
	.citylist-box-item .item:nth-child(4),
	.citylist-box-item .item:nth-child(5),
	.citylist-box-item .item:nth-child(6) {
	line-height: 120rpx;
	}
	
	.citylist-box-item .item:nth-child(3) {
	padding-top: 20rpx;
	box-sizing: border-box;
	}
	
	.zqw {
	width: 100%;
	height: 120rpx;
	line-height: 120rpx;
	font-size: 28rpx;
	text-align: center;
	color: #666;
	float: left;
	background: #fff;
	margin-bottom: 90rpx;
	}
	
	.item-confirm {
	width: 100%;
	text-align: center;
	color: #737373;
	font-size: 22rpx;
	font-weight: 400;
	margin-top: 8rpx;
	}
	
	.product-box-left-item {
	float: left;
	width: 100%;
	min-height: 60rpx;
	line-height: 60rpx;
	font-size: 28rpx;
	color: #666;
	border-bottom: 1rpx solid #f2f7f7;
	}
	.product-box-left-item-item {
	float: left;
	width: 18%;
	text-align: center;
	}
	.product-box-left-item-item:nth-child(1){
	width: 19%;
	}
	.product-box-left-item-item:nth-child(3){
	width: 20%;
	}
	.product-box-left-item-item:nth-child(4){
	width: 16%;
	}
	.product-box-left-item-item:nth-child(5){
	width: 16%;
	}
	.top-box {
	position: relative;
	width: 100%;
	height: 400rpx;
	/* overflow: hidden; */
	/* background-size: cover; */
	}
	.top-box-bg {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-image: url(../../static/head_bg.png);
	background-size: 100% 100%;
	}
	.top-box-title {
	position: absolute;
	left: 50%;
	top: 66rpx;
	width: 100%;
	text-align: center;
	transform: translateX(-50%);
	color: #ffe9aa;
	font-size: 56rpx;
	}
	.top-box-but {
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	top: 140rpx;
	width: 100%;
	text-align: center;
	color: #fff;
	font-size: 72rpx;
	font-weight: bold;
	}
	.top-box-bot {
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	bottom: 90rpx;
	width: 100%;
	text-align: center;
	color: #fff;
	font-size: 28rpx;
	}
	.top-box-bot image {
	width: 28rpx;
	height: 28rpx;
	margin-left: 12rpx;
	}
	.citylist-name {
	width: 100%;
	overflow: hidden;
	}
	.citylist-name-left {
	float: left;
	margin: 14rpx 0 32rpx 0;
	}
	.citylist-name-left .title {
	font-size: 30rpx;
	padding-top: 10rpx;
	color: #000;
	} 
	.citylist-name-left .txt {
	font-size: 28rpx;
	color: #666;
	} 
	.citylist-name-right {
	float: right;
	width: 124rpx;
	height: 50rpx;
	line-height: 50rpx;
	text-align: center;
	color: #4180f1;
	border: 2rpx solid #4180f1;
	border-radius: 36rpx;
	font-size: 24rpx;
	margin-top: 35rpx;
	margin-right:15rpx;
	}
	.popup-center {
	
	}
	.popup-box {
	width: 600rpx;
	height: auto;
	position: relative;
	}
	.popup-box-box {
	 width: 100%;
	        height: 450rpx;
	        border-radius: 16rpx;
	        background-color: #fff;
	        overflow-x: hidden;
	        overflow-y: scroll;
	        z-index: 29;
	        padding: 40rpx;
	        box-sizing: border-box;
	}
	.popup-box-box-item {
	float: left;
	width: 100%;
	font-size: 24rpx;
	font-weight: 400;
	margin-bottom: 14rpx;
	}
	.height-title {
	float: left;
	width: 100%;
	font-size: 28rpx;
	color: #e03d41;
	margin-bottom: 14rpx;
	}
	.middle-title {
	float: left;
	width: 100%;
	font-size: 28rpx;
	color: #f80;
	margin-bottom: 14rpx;
	}
	.zqw-box {
	width: 100%;
	overflow: hidden;
	margin-bottom: 60rpx;
	}
	.popup-box-top {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	color: #4180f1;
	font-size: 36rpx;
	height: 100rpx;
	line-height: 100rpx;
	background-color: #fff;
	z-index: 39;
	padding: 0 34rpx;
	box-sizing: border-box;
	border-radius: 16rpx;
	}
	.pop-coles {
	position: absolute;
	top: -92rpx;
	right: 0;
	width: 80rpx;
	height: 80rpx;
	}
</style>
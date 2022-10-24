<template>
    <view class="content" :class="daytime?'daytime':'nightime'">
        <view class="top-box">
            <view class="top-box-bg"></view>
            <view class="top-box-title">
                新型冠状病毒肺炎
            </view>
            <view class="top-box-right">
               <picker @change="bindPickerChange($event)" :value="index" range-key="name" :range="mydatas.areaTree[0].children">
                    <!-- <view class="uni-input">切换：{{mydatas.areaTree[0].children[index].name}}</view> -->
                    <view class="uni-input">切换省市</view>
                </picker>
            </view>
            <view class="top-box-but">
                <view class="top-box-but-left">
                    {{mydata.name}}
                </view>
                <view class="top-box-but-right">
                    实时疫情
                </view>
            </view>
            <view class="top-box-bot">
                数据来源：国家及各地卫健委每日信息发布
            </view>
        </view>
        <view class="t_item-top" :class="daytime?'daytime16':'nightime16'">
            <view class="t_item-box">
                <view class="t_item-box-title">
                    统计截止<text :class="daytime?'daytimetext':'nightimetext'">{{mydatas.lastUpdateTime}}</text>
                </view>
                <view class="t_item" style="background-color: #fffaf7; padding-top: 30rpx; box-sizing: border-box;">
                    <!-- <view class="t_item-addnum">较昨日：<text style="color: #e57631;"><text v-if="mydata.today.nowConfirm > 0">+</text> </text></view> -->
                    <view class="t_item-nownum" style="color: #e57631;">{{mydata.total.nowConfirm}}</view>
                    <view class="t_item-nowtxt">现有确诊</view>
                </view>
                
                <view class="t_item" style="background-color: #fef7ff;">
                    <view class="t_item-addnum">较昨日：<text style="color: #ae3ac6;"><text v-if="mydata.today.wzz_add > 0">+</text>{{mydata.today.wzz_add}}</text></view>
                    <view class="t_item-nownum" style="color: #ae3ac6;">{{mydata.total.wzz}}</view>
                    <view class="t_item-nowtxt">本土无症状</view>
                </view>
                <view class="t_item" style="background-color: #fff8f8;">
                    <view class="t_item-addnum">较昨日：<text style="color: #be2121;"><text v-if="mydata.today.confirm > 0">+</text>{{mydata.today.confirm}}</text></view>
                    <view class="t_item-nownum" style="color: #be2121;">{{mydata.total.confirm}}</view>
                    <view class="t_item-nowtxt">累计确诊</view>
                </view>
                <view class="t_item" style="background-color: #f3f6f8;">
                    <view class="t_item-addnum">较昨日：<text style="color: #4e5a65;"><text v-if="mydata.today.confirmCuts > 0">+</text>{{mydata.today.confirmCuts}}</text></view>
                    <view class="t_item-nownum" style="color: #4e5a65;">{{mydata.total.dead}}</view>
                    <view class="t_item-nowtxt">累计死亡</view>
                </view>
            </view>
        </view>
        <view class="citylist" :class="daytime?'daytimetop16':'nightimetop16'">
            <view class="citylist-title">
                <text class="item" style="background-color: #f5f5f5; color: #222222;">地区</text>
                
                <text class="item" style="background-color: #fcf2e8; color: #ff5d00;">新增确诊</text>
                <text class="item" style="background-color: #fcf2e8; color: #ff5d00;">现有确诊</text>
                <text class="item" style="background-color: #fdeeee; color: #f55253;">累计确诊</text>
                <text class="item" style="background-color: #e9f7ec; color: #178b05;">治愈</text>
                <text class="item" style="background-color: #f3f6f8; color: #4e5a65;">死亡</text>
            </view>
            <view class="citylist-box">
                <block v-for="(item, index) in mydata.children" :key='index'>
                    <view class="citylist-box-item" :class="daytime?'daytimebot16':' nightimebot16'">
                        <view class="item">
                            <text class="item-name">
                                {{item.name}}
                            </text>
                        </view>
                        <view class="item">
                            <text class="item-name">
                                {{item.today.confirm}}
                            </text>
                        </view>
                        <view class="item">
                            <text class="item-name">
                                {{item.total.nowConfirm}}
                            </text>
                        </view>
                        <view class="item">
                            <text class="item-name">
                                {{item.total.confirm}}
                            </text>
                        </view>
                        <view class="item">
                            <text class="item-name">
                                {{item.total.heal}}
                            </text>
                        </view>
                        <view class="item">
                            <text class="item-name">
                                {{item.total.dead}}
                            </text>
                        </view>
                    </view>
                </block>
            </view>
            
        </view>
        
    </view>
</template>

<script>
    export default {
        components: {
            
        },
        data() {
            return {
                daytime:'',
                index: 0,
                mydata:{},
                mydatas:{}
            }
        },
        onLoad(option) {
            let that = this;
            let item = JSON.parse(decodeURIComponent(option.item));
            that.mydata = item;
            //console.log('当前地区',that.mydata)
            uni.setNavigationBarTitle({
            　　title:that.mydata.name+'疫情'
            }) 
        },
        onShow() {
            this.getLocalShop()
            let that = this;
            that.daytime = uni.getStorageSync('daytime');
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
            bindPickerChange: function(e) {
                let that = this
                
            
            
                that.index = e.target.value
                that.mydata = that.mydatas.areaTree[0].children[e.target.value];
                uni.setNavigationBarTitle({
                　　title:that.mydata.name+'疫情'
                }) 
            },
            getLocalShop() {
                let that = this;
                uni.request({
                   url:'https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=statisGradeCityDetail,diseaseh5Shelf',
                   method: 'POST',
                   success: res => {
                       //console.log(res.data)
                       that.mydatas = res.data.data.diseaseh5Shelf;
                       for (var i = 0; i < that.mydatas.areaTree[0].children.length; i++) {
                           if (that.mydata.name == that.mydatas.areaTree[0].children[i].name) {
                               this.index = i;
                           }
                       }
                       let timestamp = ((Date.parse(new Date())) - (new Date(that.mydatas.lastUpdateTime))
                           .valueOf()) / 1000;
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
              }
        }
    }
</script>

<style>
    page {
        width: 100%;
        height: auto;
        /* overflow: auto; */
    }
    .content {
        width: 750rpx;
        height: auto;
        min-height: 100vh;
        margin: 0;
        padding: 0;
        overflow: hidden;
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
    .top-box {
        position: relative;
        width: 100%;
        height: 400rpx;
        overflow: hidden;
        background-size: cover;
    }
    .top-box-bg {
        position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-image: url(../../static/area_head_bg.png);
            background-size: 100% 100%;
    }
    .t_item-top {
        width: 100%;
        height: auto;
        overflow: hidden;
        background-color: #fff;
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
        width: 24.4%;
        height: 150rpx;
        text-align: center;
        background-color: #fff;
        margin: .3%;
        transform: scale(.97);
    }
    .t_item-addnum {
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
        font-size: 48rpx;
    }
    .t_item-nowtxt {
        float: left;
        width: 100%;
        color: #000;
        text-align: center;
        font-size: 28rpx;
    }
    .citylist {
        float: left;
        width: 100%;
        height: auto;
        padding: 0 18rpx;
        box-sizing: border-box;
        background-color: #fff;
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
        width: 16.6%;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        font-size: 28rpx;
        background-color: #fff;
    }
    .citylist-box {
        width: 100%;
        overflow: hidden;
        padding: 0 10rpx;
        box-sizing: border-box;
    }
    .citylist-box-item {
        float: left;
        width: 100%;
        height: 100rpx;
        font-size: 28rpx;
        border-bottom: 1rpx solid #f3f3f3;
        box-sizing: border-box;
    }
    .citylist-box-item .item:first-child {
        color: #4180f1;
        font-size: 30rpx;
    }
    .citylist-box-item .item .item-name {
        display:table-cell;
        vertical-align: middle;
    }
    .citylist-box-item .item {
        float: left;
        width: 16.6%;
        height: 100rpx;
        text-align: center;
        display:table;
    }
    .top-box-title {
        position: absolute;
        left: 44rpx;
        top: 66rpx;
        width: 100%;
        color: #ffe9aa;
        font-size: 56rpx;
    }
    .top-box-right {
        position: absolute;
            right: 20rpx;
            top: 76rpx;
            color: #fff;
            width: 180rpx;
            height: 60rpx;
            line-height: 60rpx;
            text-align: center;
            font-size: 36rpx;
            border-radius: 20rpx;
            border: 2rpx solid #fff;
    }
    .top-box-but {
        position: absolute;
        left: 44rpx;
        top: 160rpx;
        width: 100%;
        color: #ffe9aa;
        font-size: 72rpx;
    }
    .top-box-but-left ,
    .top-box-but-right {
        float: left;
        
    }
    .top-box-but-left {
        min-width: 180rpx;
            height: 100rpx;
            line-height: 100rpx;
            text-align: center;
            background-color: #fff;
            color: #0056ee;
            padding: 0 12rpx;
            border-radius: 15rpx;
            box-sizing: border-box;
            margin-right: 15rpx;
            margin-top: 16rpx;
    }
    .top-box-but-right {
        color: #fff;
        font-size: 88rpx;
        font-weight: bold;
    }
    .top-box-bot {
        position: absolute;
        left: 44rpx;
        bottom: 38rpx;
        width: 100%;
        color: #fff;
        font-size: 36rpx;
    }
</style>

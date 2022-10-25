<template>
    <view class="content">
        <view class="content-box" :class="daytime?'daytime16':'nightime16'">
            <block v-for="(item, index) in txtList" :key="index">
                <view class="content-box-item">
                    <view class="content-box-item-title">
                        {{item.title}}
                    </view>
                    <text class="content-box-item-txt" :class="daytime?'daytime16':'nightime16'" >{{item.content}}</text>
                </view>
            </block>
        </view>
    </view>
</template>

<script>
    export default {
        components: {

        },
        data() {
            return {
                daytime: true,
                txtList: [],
            }
        },
        onLoad() {

        },
        onShow() {
            this.getLocalShop();
            //let that = this;
            //that.daytime = uni.getStorageSync('daytime');
            uni.setNavigationBarColor({
                frontColor: this.daytime ? '#000000' : '#ffffff',
                backgroundColor: this.daytime ? '#EDEEED' : '#0E0E0E',
                animation: {
                    duration: 1,
                    timingFunc: 'easeIn'
                }
            })
        },
        methods: {
            getLocalShop() {
                let that = this;
                uni.request({
                    url: 'https://r.inews.qq.com/i/getONSDict?wuji_appid=disease_map&wuji_appkey=92551f09b33a401b987afd65dc72b6a2&query_key=datashows,h5_config&jsonp_callback',
                    method: 'GET',
                    success: res => {
                        that.txtList = res.data.data.datashows.data;
                        //console.log('数据', that.txtList)
                    },
                    fail() {

                    }
                })
            }
        }
    }
</script>

<style>
page {
width: 100%;
height: auto;
}

.content {
width: 750rpx;
height: auto;
margin: 0;
padding: 0;
}

.content-box {
width: 100%;
height: auto;
overflow: hidden;
padding: 0 40rpx 160rpx;
box-sizing: border-box;
}

.content-box-item {
float: left;
width: 100%;
height: auto;
overflow: hidden;
}

.content-box-item-title {
float: left;
width: 100%;
color: #005dff;
font-weight: 500;
font-size: 36rpx;
margin: 70rpx 0 38rpx 0;
}
.content-box-item-txt {
float: left;
width: 100%;
color: #222;
line-height: 52rpx;
font-weight: 400;
font-size: 26rpx;
}
</style>

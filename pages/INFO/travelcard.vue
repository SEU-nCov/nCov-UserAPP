<template>
	<view style="background-color:#2BA667;position:absolute;width:100%;height:100%;text-align:center;">
		<scroll-view style="padding-bottom:120rpx;background-color:#2BA667;">
			<u-gap height="40" bgColor="#2BA667"></u-gap>
			<text style="font-size:30px;font-weight:600;color:white;">通信大数据行程卡</text>
			<u-gap height="20" bgColor="#2BA667"></u-gap>
			<text style="font-size:18px;font-weight:400;color:white;">疫情防控，人人有责</text>
			<view style="display:block;text-align:center;align-items:center;align-content:center;">
				<view class="border" style="display:inline-block;align-items:center;justify-content:center;">
					<view class="title"></view>
					<view class="subtitle"></view>
					<view style="margin-top:-65rpx;"><text style="color:#2BA667;font-size:14px;">请收下绿色行程卡</text></view>
					<u-gap height="20" bgColor="white"></u-gap>
					<view><text style="font-weight:600;font-size:17px;">{{this.phone | hidephone}}的动态行程卡</text></view>
					<u-gap height="20" bgColor="white"></u-gap>
					<view class="img"></view>
					<view style="margin-left:10%;width:80%;"><u-line color="lightgray"></u-line></view>
					<u-gap height="10" bgColor="white"></u-gap>
					<view style="margin-left:10%;width:80%;">
						<text style="color:gray;font-size:14px;">您于前7天内到达或途径：</text>
						<text style="color:black;font-size:14px;font-weight:600;">{{this.placedata}}</text>
					</view>
				</view>
			</view>
			<u-gap height="20" bgColor="#2BA667"></u-gap>
			<text style="font-size:10px;font-weight:400;color:white;white-space:pre-wrap;">结果包含您在前7天内到访的国家(地区)与停留4小时以上的国内城市\n</text>
			<text style="font-size:10px;font-weight:400;color:white;">色卡仅对到访地作提醒，不关联健康状况</text>
			<u-gap height="20" bgColor="#2BA667"></u-gap>
			<u-line color="white"></u-line>
			<u-gap height="15" bgColor="#2BA667"></u-gap>
			<text style="font-size:12px;font-weight:400;color:white;">--- 客服热线：15150805183 ---</text>
			<u-gap height="15" bgColor="#2BA667"></u-gap>
		</scroll-view>
		<view class="bottom">
			<view class="name">
				<text>防疫宝</text>
			</view>
			<view class="ad">
				<text style="color:white;">东南大学健康委员会出品</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onShow() {
			this.getTravel();
		},
		data() {
			return {
				phone:this.$user.memberObj.user_phone,
				placedata:'',
			}
		},
		methods: {
			getTravel(){
				let that = this;
				uni.request({
				    url: this.$BASE_URL.BASE_URL+'/getTravelRecordbyuid',
				    method: 'POST',
					header:{
						'Content-Type': 'application/json',
					},
					data:{
						'user_id':this.$user.memberObj.user_id,
					},
				    success: res => {
						var place=JSON.parse(JSON.stringify(res.data.data));
						var obj='';
						for(var i=0;i<place.length;i++){
							obj+=place[i];
							if(i!=place.length-1) obj+='，';
						}
						that.placedata=obj;
				    }
				});
			}
		},
		filters: {
			hidephone(num){
				let str = num;
				str = num.toString().replace(/^(\d{3})\d{4}(\d{4})/,'$1***$2')
				return str;
			}
		}
	}
</script>

<style>
	.border{
		margin-top:70rpx;
		height:700rpx;
		border-radius: 6px;
		box-shadow:0 0 15px white;
		width:80%;
		z-index: 102;
		background-color: white;
	}
	.title{
		display:block;
		height:35rpx;
		background-color:#D5EDE0;
		border-top-left-radius:5px;
		border-top-right-radius:5px;
	}
	.subtitle{
		display:inline-block;
		height:60rpx;
		width:60%;
		margin-top:-40rpx;
		background-color:#D5EDE0;
		border-bottom-left-radius:35px;
		border-bottom-right-radius:35px;
	}
	.bottom{
		height:120rpx;
		width:100%;
		background-color:white;
		position:fixed;
		bottom:0;
		z-index:99;
	}
	.ad{
		float:right;
		height:84rpx;
		width:60%;
		background-color:black;
		border-radius:5px;
		text-align:center;
		justify-content:center;
		align-items:center;
		line-height:84rpx;
		margin-top:18rpx;
		margin-right:10%;
	}	
	.name{
		float:left;
		height:84rpx;
		text-align:center;
		justify-content:center;
		align-items:center;
		line-height:84rpx;
		margin-top:18rpx;
		margin-left:10%;
	}
	.img{
		display:inline-block;
		background-image:url("../../static/card.png");
		height:350rpx;
		width:350rpx;
		background-size:100% 100%;
		animation: scaledraw 3s ease-in-out infinite;
	}
	@keyframes scaledraw{
		0%{
			transform: scale(1);  /*开始为原始大小*/
		}
		25%{
			transform: scale(1.1); /*放大1.1倍*/
		}
		50%{
			transform: scale(1);
		}
		75%{
			transform: scale(1.1);
		}
	}
</style>

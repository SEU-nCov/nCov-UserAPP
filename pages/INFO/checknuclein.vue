<template>
	<view style="background-color:#EDEDED;position:absolute;width:100%;height:100%;">
		<view class="bg">
			<view class="cover">
				<div style="height:70rpx"></div>
				<div><text class="name">核酸检测结果</text></div>
				<div style="height:15rpx"></div>
				<div><text class="identity">身份证号：{{this.identity | hide}}</text></div>
			</view>
			<u-gap height="20" bgColor="#EDEDED"></u-gap>
			<view v-if="this.mydata[0]!=null">
				<view v-for="(item,index) in mydata" :key="index">
					<view class="card">
						<text style="color:gray;">姓名：</text><text style="position:sticky;left:28%;">{{item.name}}\n</text>
						<text style="color:gray;">采样点：</text><text style="position:sticky;left:28%;">{{item.addr}}\n</text>
						<text style="color:gray;">检测时间：</text><text style="position:sticky;left:28%;">{{item.time}}\n</text>
						<text style="color:gray;">检测结果：</text><text v-if="item.result=='阴性'" style="position:sticky;left:28%;color:limegreen;font-weight:600;">{{item.result}}\n</text>
						<text v-if="item.result=='阳性'" style="position:sticky;left:28%;color:orange;font-weight:600;">{{item.result}}\n</text>
					</view>
					<u-gap height="20" bgColor="#EDEDED"></u-gap>
				</view>
			</view>
			<view v-else-if="this.mydata[0]==null">	
				<view class="card">
					<text>未检测到您有30天内核酸记录，请尽快前往附近核酸点检测。</text>
				</view>
			</view>
			<view style="background-color:#EDEDED;width:100%;padding-top:20rpx;">
				<view style="width:90%;margin-left:5%;padding-bottom:50rpx;">
					<text style="color:gray;font-size:14px;">数据来源：江苏省卫生健康委员会，反映近30天内核酸检测情况，数据在不断汇聚和完善中。</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				identity:'321088200012018529',
				mydata:[{name:'宗琦薇1',addr:'东南大学-高校',time:'2022-10-29 19:26:33',result:'阴性'},
				{name:'宗琦薇2',addr:'东南大学-高校',time:'2022-10-27 19:26:33',result:'阴性'},
				{name:'宗琦薇3',addr:'东南大学-高校',time:'2022-10-26 19:26:33',result:'阳性'},
				{name:'宗琦薇4',addr:'东南大学-高校',time:'2022-10-25 19:26:33',result:'阴性'},
				{name:'宗琦薇5',addr:'东南大学-高校',time:'2022-10-24 19:26:33',result:'阴性'},
				{name:'宗琦薇6',addr:'东南大学-高校',time:'2022-10-24 19:26:33',result:'阴性'},
				{name:'宗琦薇7',addr:'东南大学-高校',time:'2022-10-24 19:26:33',result:'阴性'},
				{name:'宗琦薇8',addr:'东南大学-高校',time:'2022-10-24 19:26:33',result:'阴性'}],
				//mydata:[],
			}
		},
		methods: {
			
		},
		filters: {
			hide(num){
				let str = num;
				str = num.toString().replace(/^(.{6})(?:\w+)(.{4})$/ , '$1********$2')
				return str;
			}
		},
	}
</script>

<style>
	.bg{
		height: 300rpx;
		width: 100%;
		z-index: -1;
		background-image: url("../../static/nanjing.png");
		background-color:rgb();
		background-size: 100% 100%;
	}
	.cover{
		height: 100%;
		width: 100%;
		z-index: -1;
		background-color: rgba(60,156,255,0.7);
		background-size: 100% 100%;
	}
	.name{
		color: white;
		font-size: 20px;
		font-weight: 600;
		padding-left: 70rpx;
	}
	.identity{
		color: white;
		font-size: 16px;
		padding-left: 70rpx;
	}
	.card{
		height:250rpx;
		line-height:60rpx;
		padding-top: 2%;
		background-image:url("../../static/watermark.png");
		background-size: 100% 100%;
		padding-left:5%;
		padding-right:5%;
	}
</style>

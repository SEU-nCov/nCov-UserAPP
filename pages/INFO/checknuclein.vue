<template>
	<view style="background-color:#EDEDED;position:absolute;width:100%;height:100%;">
		<view class="bg" :key="change">
			<view class="cover">
				<div style="height:70rpx"></div>
				<button class="switch" @click="switchpeople">切换用户</button>
				<div><text class="name">核酸检测结果</text></div>
				<div style="height:15rpx"></div>
				<div><text class="identity">身份证号：{{this.identity | hide}}</text></div>
			</view>
			<u-gap height="20" bgColor="#EDEDED"></u-gap>
			<view v-if="this.mydata[0]!=null">
				<view v-for="(item,index) in mydata" :key="index">
					<view class="card">
						<text style="color:gray;">姓名：</text><text style="position:sticky;left:28%;">{{item.user_name}}\n</text>
						<text style="color:gray;">采样点：</text><text style="position:sticky;left:28%;">{{item.nat_pointname}}\n</text>
						<text style="color:gray;">检测时间：</text><text style="position:sticky;left:28%;">{{item.nat_time | cut}}\n</text>
						<text style="color:gray;">检测结果：</text><text v-if="item.nat_result=='阴性'" style="position:sticky;left:28%;color:limegreen;font-weight:600;">{{item.nat_result}}\n</text>
						<text v-if="item.nat_result=='阳性'" style="position:sticky;left:28%;color:orange;font-weight:600;">{{item.nat_result}}\n</text>
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
		<u-picker :show="show" :columns="columns" :closeOnClickOverlay="true" @confirm="confirm" @cancel="cancel"></u-picker>
	</view>
</template>

<script>
	let that = null
	export default {
		onShow() {
			that = this;
		},
		onLoad() {
			//获取亲友
			uni.request({
				url:this.$BASE_URL.BASE_URL+'/getRelativebyid',
				method:'POST',
				header:{
					'Content-Type': 'application/json',
				},
				data:{
					'user_id':this.$user.memberObj.user_id,
				},
				success: (res) => {
					if(res.data.code==200){
						let that = this;
						that.relativedata=JSON.parse(JSON.stringify(res.data.data));
						that.update();
					} else if(res.data.code==201){
						that.columns[0].push('暂无亲友');
					} else{
						uni.showToast({
							icon:"none",
							title:"获取亲友失败"
						})
					}
				},
			});
			//this.update();
		},
		data() {
			return {
				identity:this.$user.memberObj.user_identity,
				mydata:this.$user.memberObj.user_nat,
				relativedata:[],
				columns:[['本人']],
				show:false,
				change:true,
			}
		},
		methods: {
			update(){
				let that = this;
				for(let i=0;i<that.relativedata.length;i++){
					that.columns[0].push(that.relativedata[i].user_name);
				}
			},
			switchpeople(){
				this.show=true;
			},
			cancel(){
				this.show=false;
			},
			confirm(e) {
				if(that.columns[0][1]=='暂无亲友'){
					this.mydata=this.$user.memberObj.user_nat;
				} else {
					let num = e.indexs[0];
					if(num==0){
						this.mydata=this.$user.memberObj.user_nat;
					} else {
						let id = this.relativedata[num-1].user_id;
						uni.request({
							url:this.$BASE_URL.BASE_URL+'/getNatResultbyid',
							method:'POST',
							header:{
								'Content-Type': 'application/json',
							},
							data:{
								'user_id':id,
							},
							success: (res) => {
								//console.log(res.data.code);
								if(res.data.code==200){
									let that = this;
									that.mydata=JSON.parse(JSON.stringify(res.data.data));
								} else if(res.data.code==201){
									that.mydata=[];
								} else{
									uni.showToast({
										icon:"none",
										title:"error"
									})
								}
							}
						});
					}
				}
				e.indexs[0]=0;
				this.show=false;
			},
		},
		filters: {
			hide(num){
				let str = num;
				str = num.toString().replace(/^(.{6})(?:\w+)(.{4})$/ , '$1********$2')
				return str;
			},
			cut(value){
				var temp = value.substring(0,value.lastIndexOf('.'))
				return temp.replace(/T/g,' ');
			}
		},
	}
</script>

<style>
	.bg{
		height: 300rpx;
		width: 100%;
		z-index: -1;
		background-image: url("../../static/nanjing.jpg");
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
	.switch{
		float:right;
		margin-right:5%;
		width:25%;
		height:60rpx;
		line-height:60rpx;
		font-size:14px;
		color:white;
		background-color:rgb(0,0,0,0);
		border:1px solid white;
	}
	button:after{
		border:none;
	}
</style>

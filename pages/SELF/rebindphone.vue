<template>
	<view>
		<view>
			<image style="margin: 0 auto;display: block;width:100%;" src="../../static/nanjing.png"></image> 
			<u-gap height="20" bgColor="white"></u-gap>
			<view class="content-wrapper">
				<view class="login-form">
					<view class="login-form-items-top">
						<view class="login-form-items-title">
							<text>手机号</text><text style="color:red">*</text>
						</view>
						<input v-model="phone" type="text" class="login-input" placeholder="请输入手机号">
					</view>
					<view class="login-form-items">
						<view class="login-form-items-title">
							<text>验证码</text><text style="color:red">*</text>
						</view>
						<input v-model="verifyCode" type="text" class="login-input" placeholder="请输入验证码">
						<button class="send" @click="verify">发送</button>
					</view>
				</view>
			</view>
			<u-gap height="10" bgColor="white"></u-gap>
			<view style="display: flex;margin-top:40rpx">
				<button size="default" class="btn" @click="confirm">确 认</button>
			</view>
		</view>
	</view>
</template>

<script>
	let that = null;
	const sha256 = require("js-sha256").sha256;
	function checkPhone(phone) {
		let reg = /^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/;
		if (!reg.test(phone)) {
			uni.showToast({
				icon: 'none',
				title: '请输入正确的11位手机号'
			})
			return false;
		}
		else return true;
	}
	export default {
		data() {
			return {
				phone: '',
				verifyCode: '',
				temp: '######'
			}
		},
		onShow() {
			that = this;
		},
		methods: {
			verify(){
				if(checkPhone(this.phone)){
					uni.request({
						url:this.$BASE_URL.BASE_URL+'/getSMN',
						method:'POST',
						header:{
							'Content-Type': 'application/json',
						},
						data:{
							'phone':this.phone,
						},
						success: (res) => {
							if(res.data.code==200){
								uni.showToast({
									icon: 'none',
									title: '已发送'
								})
								this.temp = res.data.data;
							}
							else{
								uni.showToast({
									icon:"none",
									title:"发送失败，请重试"
								})
							}
						}
					})
				}
			},
			confirm(){
				if(this.verifyCode==this.temp){
					uni.request({
						url:this.$BASE_URL.BASE_URL+'/changeUserPhone',
						method:'POST',
						header:{
							'Content-Type': 'application/json',
						},
						data:{
							'phone':this.phone,
							'user_id':this.$user.memberObj.user_id,
						},
						success: (res) => {
							if(res.data.code==200){
								uni.showModal({
									title:'提示',
									content:'换绑手机号成功',
									showCancel: false,
									success:function(res){
										that.$user.memberObj.user_phone=that.phone;
										if(res.confirm){
											uni.switchTab({
												url:"./selfinfo"
											})
										}
									}
								})
							} else {
								uni.showToast({
									icon:"none",
									title:"绑定失败，请重试"
								})
							}
						},
					})
				}
				else {
					uni.showToast({
						icon:"none",
						title:"验证码错误，请重试"
					})							
				}
			}
		}
	}
</script>

<style>
	.content-wrapper {
		margin-top: 20rpx;
		width: 100%;
	}
	
	.login-form {
		margin: 0px 10px 10px 15px;
		background: #FFFFFF;
		opacity: 0.8;
	}
	
	.login-form-items {
		padding: 15px 10px;
		border-bottom: 1px solid #F3F4F5;
		position: relative;
		display: -webkit-flex;
		display: flex;
	}
	
	.login-form-items-top {
		padding: 15px 10px;
		border-bottom: 1px solid #F3F4F5;
		border-top: 1px solid #F3F4F5;
		position: relative;
		display: -webkit-flex;
		display: flex;
	}
	
	.login-form-items-title {
		width: 35%;
		line-height: 22px;
		height: 22px;
		flex-shrink: 0;
		text-align: left;
	}
	
	.btn {
		width: 40%;
		font-weight: 500;
		color: 	#363636;
		//background-image: linear-gradient(to right,	#EAE5C9, #6CC6CB);
		background-color: rgb(255,162,0);
		margin-top: 10px;
		box-shadow: 0 1px 4px 1px #e6e6e6;
		color: white;
	}
	button:after{
		border:none;
	}
	
	.send {
		margin-top: -8px;
		background-color: white;
		color: #6495ED;
		vertical-align: middle;
		text-align: center;
		width: 30%;
		height: 40px;
		font-size: 15px;
		margin-bottom: -8px;
		border-color: #6495ED;
		border-style: solid;
		border-width: 1px;
		border-radius: 7px;
	}
</style>

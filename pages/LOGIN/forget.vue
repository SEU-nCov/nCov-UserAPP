<template>
	<view>
		<view>
			<image style="margin: 0 auto;display: block;width:100%;" src="../../static/nanjing.png"></image> 
			<view class="content-wrapper">
				<view class="login-form">
					<view class="login-form-items">
						<view class="login-form-items-title">
							<text>手机号</text><text style="color:red">*</text>
						</view>
						<input v-model="phone" type="text" class="login-input" placeholder="请输入手机号">
					</view>
					<view class="login-form-items">
						<view class="login-form-items-title">
							<text>新密码</text><text style="color:red">*</text>
						</view>
						<input v-model="passWord" type="password" class="login-input" placeholder="请输入新的密码">
					</view>
					<view class="login-form-items">
						<view class="login-form-items-title">
							<text>确认新密码</text><text style="color:red">*</text>
						</view>
						<input v-model="repassWord" type="password" class="login-input" placeholder="请再次输入密码">
					</view>
					<view class="login-form-items">
						<view class="login-form-items-title">
							<text>验证码</text><text style="color:red">*</text>
						</view>
						<input v-model="verifyCode" type="password" class="login-input" placeholder="请输入验证码">
						<button class="send" @click="verify">发送</button>
					</view>
				</view>
			</view>
			<view style="display: flex;margin-top:40rpx">
				<button size="default" class="btn" @click="confirm">确 认</button>
			</view>
		</view>
	</view>
</template>

<script>
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
	function checkPwd(pwd) {
		let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
		if (!reg.test(pwd)) {
			uni.showToast({
				icon: 'none',
				title: '密码至少8位，要求包含大小写字母和数字，不得包含特殊字符'
			})
			return false;
		}
		else return true;
	}
	function checkdual(pwd,repwd) {
		if (pwd!=repwd) {
			uni.showToast({
				icon: 'none',
				title: '两次密码不一致'
			})
			return false;
		}
		else return true;
	}	
	export default {
		data() {
			return {
				phone: '',
				passWord: '',
				repassWord: '',
				verifyCode: '',
				temp: '######'
			}
		},
		methods: {
			verify(){
				if(checkPhone(this.phone)){
					uni.request({
						url:this.$BASE_URL.BASE_URL+'/sendSMS',
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
				if(checkPwd(this.passWord)){
					if(checkdual(this.passWord,this.repassWord)){
						if(this.verifyCode==this.temp){
							uni.request({
								url:this.$BASE_URL.BASE_URL+'/changePassword',
								method:'POST',
								header:{
									'Content-Type': 'application/json',
								},
								data:{
									'phone':this.phone,
									'password':sha256(this.passWord)
								},
								success: (res) => {
									if(res.data.code==200){
										uni.showModal({
											title:'提示',
											content:'重置密码成功，即将自动跳转回登录页',
											showCancel: false,
											success:function(res){
												if(res.confirm){
													uni.navigateTo({
														url:"./login"
													})
												}
											}
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
	
	.login-form-items-title {
		width: 35%;
		line-height: 22px;
		height: 22px;
		flex-shrink: 0;
		text-align: left;
	}
	
	.btn {
		width: 60%;
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
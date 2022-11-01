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
						<view class="login-form-items-title">姓名<text style="color:red">*</text></view>
						<input v-model="name" type="text" class="login-input" placeholder="请输入姓名">
					</view>
					<view class="login-form-items">
						<view class="login-form-items-title">
							<text>身份证号</text><text style="color:red">*</text>
						</view>
						<input v-model="identity" type="text" class="login-input" placeholder="请输入身份证号">
					</view>
					<view class="login-form-items">
						<view class="login-form-items-title">
							<text>密码</text><text style="color:red">*</text>
						</view>
						<input v-model="password" type="password" class="login-input" placeholder="请输入密码">
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
			<view style="display: flex;">
				<button size="default" class="btn" @click="register">注 册</button>
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
	function checkidentity(num) {
		const reg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
		if(!reg.test(num)){
			uni.showToast({
				icon: "none",
				title:'请输入正确的身份证号码',
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
	export default {
		data() {
			return {
				phone: '',
				name: '',
				identity: '',
				password: '',
				verifyCode: '',
				temp: '######'
			}
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
			register(){
				if(checkPwd(this.password)){
					if(checkidentity(this.identity)){
						if(this.temp==this.verifyCode){
							uni.request({
								url:this.$BASE_URL.BASE_URL+'/userRegister',
								method:'POST',
								header:{
									'Content-Type': 'application/json',
								},
								data:{
									'phone':this.phone,
									'password':sha256(this.password),
									'user_name':this.name,
									'user_identify':this.identity
								},
								success: (res) => {
									if(res.data.code==200){
										uni.showModal({
											title:'提示',
											content:'注册成功，即将自动跳转回登录页',
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
									else if (res.data.code==201){
										uni.showModal({
											title:'提示',
											content:'该账号已存在，请勿重复注册，即将自动跳转回登录页',
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
									else {
										uni.showToast({
											icon:"none",
											title:"注册失败，请重试"
										})										
									}
								}
							})							
						}else{
							uni.showToast({
								icon:"none",
								title:"请输入正确的验证码"
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
	
	.btn {
		width: 60%;
		font-weight: 500;
		color: 	#363636;
		//background-image: linear-gradient(to right,	#EAE5C9, #6CC6CB);
		background-color: rgb(255,162,0);
		margin-top: 20px;
		box-shadow: 0 1px 4px 1px #e6e6e6;
		color:white;
	}
	button:after{
		border:none;
	}
</style>
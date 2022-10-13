<template>
	<view>
		<u-notice-bar :text="notice"></u-notice-bar>
		<view class="bg">
			<view class="cover">
				<div style="height:70rpx"></div>
				<div><text class="name">姓名：宗琦薇</text></div>
				<div style="height:15rpx"></div>
				<div><text class="identity">身份证：{{this.identitynum | hide}}</text></div>
				<view style="display:flex;align-items:center;justify-content:center;padding-top: 150rpx;">
					<view class="square" style="display:inline-block;text-align:center;">
						<view style="display:inline-block;height:200rpx;line-height:200rpx;font-size:23px;font-weight: 600;">{{this.timer}}</view>
						<view style="display:inline-block;">
							<view style="position:absolute;background-color:#89B1E4;width:460rpx;height:460rpx;border-radius:5px;margin-left:-22rpx;margin-top:-22rpx;;"></view>
							<view><uqrcode ref="uqrcode" canvas-id="qrcode" :value="identitynum" :options="{ margin:10 }"></uqrcode></view>
						</view>
						<view style="display:block;text-align:center;font-size:15px;padding-top:65rpx;"><text style="color:red;">*</text><text>请展示身份码</text></view>
						<view class="tail" @click="save"><u-icon name="download" color="#3c9cff" size="20"></u-icon><text style="font-size:16px;color:#3c9cff;">下载保存</text></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let that = null
	export default {
		onLoad() {
			this.getTime();
			setInterval(() => {this.getTime()},1000)
		},
		onShow() {
			that = this;
		},
		data() {
			return {
				notice:'温馨提示：请注意核对当前展码用户信息，是否与核酸检测用户一致，以免发生错误。',
				identitynum: '321088200012018529',
				timer: '',
			}
		},
		methods: {
			getTime(){
				let time = new Date();
				let year = time.getFullYear();
				let month = time.getMonth() + 1 < 10 ? "0" + (time.getMonth() + 1) : time.getMonth() + 1;
				let day = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
				let hour = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
				let minute = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
				let second = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
				let today = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
				this.timer=today;
			},
			save(){
				// uqrcode为组件的ref名称
				this.$refs.uqrcode.save({
				  success: () => {
					uni.showToast({
					  icon: 'success',
					  title: '保存成功'
					});
				  }
				});
			}
		},
		filters: {
			hide(num){
				let str = num;
				str = num.toString().replace(/^(.{6})(?:\w+)(.{4})$/ , '$1********$2')
				return str;
			}
		}
	}
</script>

<style>
	.bg{
		height: 450rpx;
		width: 100%;
		z-index: -1;
		background-image: url("../../static/nanjing.png");
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
	.square{
		height:950rpx;
		border-radius: 6px;
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
		width:90%;
		z-index: 102;
		background-color: white;
		margin-top:-5%;
	}
	.title {
		padding-left: 10%;
		line-height: 100rpx;
		border-bottom: 1px solid #e6e6e6;
	}
	.tail{
		display:flex;
		height:90rpx;
		align-items:center;
		justify-content:center;
		line-height:90rpx;
		margin-top:115rpx;
		border-top: 1px solid #e6e6e6;
	}
</style>
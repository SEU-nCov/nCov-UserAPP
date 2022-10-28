<template>
	<view style="background-color:#EDEDED;position:absolute;width:100%;height:100%;">
		<view style="background-color:#3c9cff;height:200rpx;">
			<view style="display:block;padding-top:40rpx;height:40rpx;">
				<text class="title" style="display:inline;float:left;margin-left:30rpx;">健康码·{{this.color}}码</text>
				<text class="title" style="display:inline;float:right;margin-right:30rpx;">{{this.user_name}}</text>
			</view>
			<view style="display:block;padding-top:40rpx;">
				<text class="subtitle" style="display:inline;float:left;margin-left:30rpx;">{{this.user_phone | hidephone}}</text>
				<text class="subtitle" style="display:inline;float:right;margin-right:30rpx;">{{this.user_identity | hideiden}}</text>
			</view>
		</view>
		<u-notice-bar :text="notice"></u-notice-bar>
		<view style="display:block;text-align:center;align-items:center;align-content:center;">
			<view class="border"  style="display:inline-block;align-items:center;align-content:center;">
				<view style="display:inline-block;height:200rpx;line-height:200rpx;font-size:40px;font-weight:600;">{{this.timer}}</view>
				<ayQrcode style="display:inline-block;margin-top:15rpx;" ref="qrcode" :modal="modal_qr" :url="rurl" @hideQrcode="hideQrcode" themeColor="#2F7931" :is_themeImg="true"
              themeImg="../../static/school.png" :h_w_img="40"  :height="250" :width="250" />
			</view>
		</view>
		<view style="display:block;padding-top:40rpx;"></view>
		<swiper :indicator-dots="false" :current="1"  class="swiper" style="background-color:#EDEDED;height:350rpx;">
			<swiper-item>
				核酸记录
			</swiper-item>
			<swiper-item>
				<view style="display:block;padding-top:20rpx;">
					<view class="dblock" style="float:left;margin-left:5%;"></view>
					<view class="dblock" style="float:right;margin-right:5%;"></view>
				</view>
			</swiper-item>
			<swiper-item>
				疫苗记录
			</swiper-item>
		</swiper>
		<view style="background-color:#EDEDED;position:absolute;width:100%;height:250rpx;border-bottom:1px gray;">
			<view style="text-align:center;margin:10px 20px;font-size:14px;color:#3c9cff;">数据来源：全国一体化政务服务平台、个人申报信息和江苏省公共管理机构。</view>
			<u-divider text=""></u-divider>
			<view style="text-align:center;color:gray;font-size:14px;">---服务热线：12345---</view>
		</view>
	</view>
</template>

<script>
	import ayQrcode from "@/components/ay-qrcode/ay-qrcode.vue"
	export default {
		components: {
			ayQrcode,
		},
		data() {
			return {
				notice:'若您有近7天中高风险区旅居史(含境外)，请及时进行信息更新和风险报备。',
				modal_qr: true,
				rurl: '321088200012018529|321088200012018529|321088200012018529|321088200012018529|321088200012018529', //要生成的二维码值
				user_name:'宗琦薇',
				color:'绿',
				user_phone:'15150805183',
				user_identity:'321088200012018529',
				timer:'',
			}
		},
		onLoad() {
			let that = this;
			that.getTime();
			setInterval(() => {that.getTime()},1000)
			that.showQrcode();//一加载生成二维码

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
				let today = month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
				this.timer=today;
			},
			showQrcode() {
				let _this = this;
				this.modal_qr = true;
				// uni.showLoading()
				setTimeout(function() {
					// uni.hideLoading()
					_this.$refs.qrcode.crtQrCode()
				}, 50)
			},

			//传入组件的方法
			hideQrcode() {
				this.modal_qr = false;
			},
		},
		filters: {
			hideiden(num){
				let str = num;
				str = num.toString().replace(/^(.{6})(?:\w+)(.{4})$/ , '$1********$2')
				return str;
			},
			hidephone(num){
				let str = num;
				str = num.toString().replace(/^(\d{3})\d{4}(\d{4})/,'$1***$2')
				return str;
			}
			
		}
	}
</script>

<style>
	.title{
		font-size:20px;
		font-weight:600;
		color:#B7F5FE;
	}
	.subtitle{
		font-size:16px;
		color:white;
	}
	.border{
		margin-top:40rpx;
		height:800rpx;
		border-radius: 6px;
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
		width:90%;
		z-index: 102;
		background-color: white;
	}
	.dblock{
		border-radius: 5px;
		height:300rpx;
		width:41%;
		background-color:white;
		box-shadow: 0 0 5px limegreen;
		border:4px solid limegreen;
	}
</style>

<template>
	<view style="background-color:#EDEDED;position:absolute;width:100%;height:100%;">
		<u-notice-bar :text="notice"></u-notice-bar>
		<view class="bg">
			<view class="cover">
				<div style="height:70rpx"></div>
				<div style="display:inline-block;"><text class="name">姓名：{{this.name}}</text></div>
				<div style="display:inline-block;float:right;">
					<button style="height:70rpx;line-height:70rpx;background-color:rgb(0,0,0,0);border:none;margin-top:10rpx;margin-right:10rpx;" @click="addrelative">
						<u-icon name="plus-circle" color="white" label="添加亲友" labelColor="white"></u-icon>
					</button>
				</div>
				<div style="height:15rpx"></div>
				<div><text class="identity">身份证：{{this.identity | hide}}</text></div>
				<view style="display:flex;align-items:center;justify-content:center;padding-top: 150rpx;">
					<view class="square" style="display:inline-block;text-align:center;">
						<view style="display:inline-block;height:200rpx;line-height:200rpx;font-size:28px;font-weight: 600;">{{this.timer}}</view>
						<view>
							<view v-if="platform=='ios'" style="display:inline-block;background-color:#89B1E4;width:460rpx;height:460rpx;border-radius:5px;margin-bottom:-70rpx;"></view>
							<view v-if="platform=='android'" style="display:inline-block;background-color:#89B1E4;width:460rpx;height:460rpx;border-radius:5px;margin-bottom:-65rpx;"></view>
							<view style="display:inline-block;margin-top:-400rpx;"><uqrcode ref="uqrcode" canvas-id="qrcode" :value="this.identity" :options="{ margin:10 }"></uqrcode></view>
						</view>
						<view style="display:inline-block;text-align:center;font-size:15px;padding-top:65rpx;"><text style="color:red;">*</text><text>请展示身份码</text></view>
						<view class="tail" style="white-space:pre;">
							<u-icon name="download" color="#3c9cff" size="20" style="padding-left:90rpx;"></u-icon><text style="font-size:16px;color:#3c9cff;" @click="save">下载保存        |</text>
							<u-icon name="man-add" color="#3c9cff" size="20" style="padding-left:70rpx;"></u-icon><text style="font-size:16px;color:#3c9cff;" @click="showrelative">亲友展码</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-modal :show="mshow" :title="title" @confirm="confirm" :showCancelButton="true" @cancel="cancel">
			<view>
				<!-- #ifndef APP-NVUE -->
				<u-input placeholder="请输入亲友姓名" border="surround" v-model="rname">
				<!-- #endif -->
				<!-- #ifdef APP-NVUE -->
				<u--input placeholder="请输入亲友姓名" border="surround" v-model="rname">
				<!-- #endif -->
					<u--text text="亲友姓名：" slot="prefix" margin="0 3px 0 0" type="tips"></u--text>
				<!-- #ifndef APP-NVUE -->
				</u-input>
				<!-- #endif -->
				<!-- #ifdef APP-NVUE -->
				</u--input>
				<!-- #endif -->
				<u-gap height="10" bgColor="white"></u-gap>
				<!-- #ifndef APP-NVUE -->
				<u-input placeholder="请输入身份证号" border="surround" v-model="ridentity">
				<!-- #endif -->
				<!-- #ifdef APP-NVUE -->
				<u--input placeholder="请输入身份证号" border="surround" v-model="ridentity">
				<!-- #endif -->
					<u--text text="身份证号：" slot="prefix" margin="0 3px 0 0" type="tips"></u--text>
				<!-- #ifndef APP-NVUE -->
				</u-input>
				<!-- #endif -->
				<!-- #ifdef APP-NVUE -->
				</u--input>
				<!-- #endif -->
				<u-gap height="10" bgColor="white"></u-gap>				
				<!-- #ifndef APP-NVUE -->
				<u-input placeholder="请输入联系人手机号" border="surround" v-model="rphone">
				<!-- #endif -->
				<!-- #ifdef APP-NVUE -->
				<u--input placeholder="请输入联系人手机号" border="surround" v-model="rphone">
				<!-- #endif -->
					<u--text text="联系号码：" slot="prefix" margin="0 3px 0 0" type="tips"></u--text>
				<!-- #ifndef APP-NVUE -->
				</u-input>
				<!-- #endif -->
				<!-- #ifdef APP-NVUE -->
				</u--input>
				<!-- #endif -->				
			</view>
		</u-modal>
		<u-popup :show="pshow" mode="center" :round="5" :customStyle="{width:600+'rpx',height:800+'rpx'}"  @close="close">
			<swiper style="height:100%;width:100%;">
				<swiper-item v-for="(item,index) in relative" :key="index">
					<view style="text-align:center;padding-top:8%;font-weight:600;">亲友码</view>
					<view style="height:800rpx;width:100%;display:inline-block;align-items:center;justify-content:center;text-align:center;padding-top:7%;">
						<view v-if="platform=='ios'" style="display:inline-block;background-color:skyblue;width:460rpx;height:460rpx;border-radius:5px;margin-bottom:-70rpx;"></view>
						<view v-if="platform=='android'" style="display:inline-block;background-color:skyblue;width:460rpx;height:460rpx;border-radius:5px;margin-bottom:-65rpx;"></view>
						<view style="display:inline-block;margin-top:-400rpx;"><uqrcode ref="uqrcode" :canvas-id="item.user_id" :value="item.user_identity" :options="{ margin:10 }"></uqrcode></view>
						<u-gap height="30" bgColor="white"></u-gap>
						<view><text style="color:red;">*</text>当前展码：{{item.user_name}}</view>
						<u-gap height="20" bgColor="white"></u-gap>
						<view style="color:gray;font-size:14px;">左右滑动切换</view>
					</view>
				</swiper-item>
			</swiper>
		</u-popup>
	</view>
</template>

<script>
	let that = null
	import ayQrcode from "@/components/ay-qrcode/ay-qrcode.vue"
    export default {
        components: {
            ayQrcode,
        },
		onLoad() {
			this.getTime();
			setInterval(() => {this.getTime()},1000);
			this.platform = uni.getSystemInfoSync().platform;
		},
		onShow() {
			that = this;
		},
		data() {
			return {
				platform:'',
				title:'请填写亲友信息',
				mshow: false,
				pshow: false,
				notice:'温馨提示：请注意核对当前展码用户信息，是否与核酸检测用户一致，以免发生错误。',
				identity: '321088200012018529',
				timer: '',
				name:'宗琦薇',
				rname:'',
				ridentity:'',
				rphone:'',
				relative:[{user_id:'1',user_name:'宗琦薇1',user_identity:'111111111111111111'},
				{user_id:'2',user_name:'宗琦薇2',user_identity:'321088200012018527'},],
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
			},
			addrelative(){
				this.mshow=true;
			},
			confirm(){
				this.mshow=false;
				uni.showToast({
					icon:"none",
					title:"添加亲友成功，可使用亲友展码功能查看亲友身份码",
				})
			},
			cancel(){
				this.mshow=false;
			},
			close(){
				this.pshow=false;
			},
			showrelative(){
				if(this.relative[0]!=null){
					this.pshow=true;
				}
				else {
					uni.showToast({
						icon:"none",
						title:"亲友列表为空，请先添加亲友",
					})
				}
			},
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
		line-height:90rpx;
		margin-top:115rpx;
		border-top: 1px solid #e6e6e6;
	}
	button:after{
		border:none;
	}
</style>
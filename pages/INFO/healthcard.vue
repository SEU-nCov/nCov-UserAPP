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
			<view class="border" style="display:inline-block;align-items:center;align-content:center;">
				<view style="display:inline-block;height:200rpx;line-height:200rpx;font-size:40px;font-weight:600;">{{this.timer}}</view>
				<ayQrcode v-if="platform=='ios' && user_color==0" style="display:inline-block;margin-top:15rpx;margin-left:-50rpx;" ref="qrcode" qrcode_id="qrcode_id" :modal="modal_qr" :url="rurl" @hideQrcode="hideQrcode" themeColor="#2F7931" :is_themeImg="true"
				themeImg="../../static/school.png" :h_w_img="40"  :height="250" :width="250" />
				<ayQrcode v-if="platform=='android' && user_color==0" style="display:inline-block;margin-top:15rpx;" ref="qrcode" qrcode_id="qrcode_id" :modal="modal_qr" :url="rurl" @hideQrcode="hideQrcode" themeColor="#2F7931" :is_themeImg="true"
				themeImg="../../static/school.png" :h_w_img="40"  :height="250" :width="250" />
				<ayQrcode v-if="platform=='ios' && user_color==1" style="display:inline-block;margin-top:15rpx;margin-left:-50rpx;" ref="qrcode" qrcode_id="qrcode_id" :modal="modal_qr" :url="rurl" @hideQrcode="hideQrcode" themeColor="#ffeb00" :is_themeImg="true"
				themeImg="../../static/school.png" :h_w_img="40"  :height="250" :width="250" />
				<ayQrcode v-if="platform=='android' && user_color==1" style="display:inline-block;margin-top:15rpx;" ref="qrcode" qrcode_id="qrcode_id" :modal="modal_qr" :url="rurl" @hideQrcode="hideQrcode" themeColor="#ffeb00" :is_themeImg="true"
				themeImg="../../static/school.png" :h_w_img="40"  :height="250" :width="250" />
				<ayQrcode v-if="platform=='ios' && user_color==2" style="display:inline-block;margin-top:15rpx;margin-left:-50rpx;" ref="qrcode" qrcode_id="qrcode_id" :modal="modal_qr" :url="rurl" @hideQrcode="hideQrcode" themeColor="#f2003c" :is_themeImg="true"
				themeImg="../../static/school.png" :h_w_img="40"  :height="250" :width="250" />
				<ayQrcode v-if="platform=='android' && user_color==2" style="display:inline-block;margin-top:15rpx;" ref="qrcode" qrcode_id="qrcode_id" :modal="modal_qr" :url="rurl" @hideQrcode="hideQrcode" themeColor="#f2003c" :is_themeImg="true"
				themeImg="../../static/school.png" :h_w_img="40"  :height="250" :width="250" />
			</view>
		</view>
		<view style="display:block;padding-top:40rpx;"></view>
		<swiper :indicator-dots="false" :current="1"  class="swiper" style="background-color:#EDEDED;height:750rpx;">
			<swiper-item>
				<view style="display:block;padding-top:20rpx;">
					<view style="width:90%;margin-left:5%;text-align:left;background-color:white;border-radius:5px;white-space:pre-wrap;">
						<view style="width:95%;margin-left:2.5%;">
							<view class="card" v-if="natdata[0]!=null"><!--view>目前没有判断是否核酸信息为空，后续如果需要可以补</view-->
								<text style="color:gray;">采样点：</text><text style="position:sticky;left:30%;">{{natdata[0].nat_pointname}}\n</text>
								<text style="color:gray;">检测时间：</text><text style="position:sticky;left:28%;">{{natdata[0].nat_time | cut}}\n</text>
								<text style="color:gray;">检测结果：</text>
									<text v-if="natdata[0].nat_result==='阴性'" style="position:sticky;left:28%;color:limegreen;font-weight:600;">{{natdata[0].nat_result}}\n</text>
									<text v-if="natdata[0].nat_result==='阳性'" style="position:sticky;left:28%;color:orange;font-weight:600;">{{natdata[0].nat_result}}\n</text>
							</view>
							<view class="card" v-if="natdata[0]==null"><!--view>目前没有判断是否核酸信息为空，后续如果需要可以补</view-->
								<text style="color:gray;">采样点：</text><text style="position:sticky;left:29%;">暂无\n</text>
								<text style="color:gray;">检测时间：</text><text style="position:sticky;left:28%;">暂无\n</text>
								<text style="color:gray;">检测结果：</text><text style="position:sticky;left:28%;font-weight:600;">暂无\n</text>
							</view>
							<view style="padding-top:10rpx;padding-bottom:15rpx;padding-left:2%;">
								<text style="font-size:12px;color:gray;">数据来源：江苏省卫生健康委员会，反映近30天最近一次核酸检测情况，数据在不断汇聚和完善中。</text>
							</view>
						</view>
					</view>
					<view style="height:100rpx;line-height:100rpx;width:90%;margin-left:5%;text-align:left;background-color:white;border-radius:5px;white-space:pre-wrap;margin-top:-20rpx;">
						<view style="width:95%;margin-left:2.5%;margin-top:50rpx;" @click="gotocheck">
							<view style="display:flex;justify-content:center;align-items:center;">
								<view style="margin-top:5rpx;"><u-icon name="file-text" color="#2979ff" size="30"></u-icon></view>
								<text style="font-size:20px;font-weight:600;white-space:pre-wrap;">核酸检测所有信息</text>
							</view>
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item>
				<view style="display:block;padding-top:20rpx;">
					<view v-if="this.natdata[0]==null" class="dblock" style="float:left;margin-left:5%;text-align:center;white-space:pre-wrap;">
						<view style="padding-top:30rpx;">
							<text style="color:limegreen;font-weight:600;font-size:18px;">核酸(省内)\n</text>
						</view>
						<view style="padding-top:20rpx;">
							<text style="color:limegreen;font-weight:600;font-size:35px;">暂无\n</text>
						</view>
						<view style="padding-top:35rpx;padding-left:23%;"><u-icon name="arrow-right-double" color="gray" size="14" label="右滑查看"></u-icon></view>
					</view>
					<view v-if="this.isgreen==1 && this.natdata[0]!=null" class="dblock" style="float:left;margin-left:5%;text-align:center;white-space:pre-wrap;">
						<view style="padding-top:30rpx;">
							<text style="color:limegreen;font-weight:600;font-size:18px;">核酸(省内)\n</text>
						</view>
						<view style="padding-top:20rpx;">
							<text v-if="this.expire==0" style="color:limegreen;font-weight:600;font-size:35px;">阴性\n</text>
							<text v-if="this.expire==1" style="padding-left:80rpx;color:limegreen;font-weight:600;font-size:35px;display:table-cell;">48</text>
							<text v-if="this.expire==1" style="padding-left:10rpx;color:limegreen;font-weight:500;font-size:13px;display:table-cell;vertical-align:top;padding-top:15rpx;">小时\n阴性</text>
						</view>
						<view style="padding-top:35rpx;padding-left:23%;"><u-icon name="arrow-right-double" color="gray" size="14" label="右滑查看"></u-icon></view>
					</view>
					<view v-if="this.isgreen==0 && this.natdata[0]!=null" class="nonedblock" style="float:left;margin-left:5%;text-align:center;white-space:pre-wrap;">
						<view style="padding-top:30rpx;">
							<text style="color:orange;font-weight:600;font-size:18px;">核酸(省内)\n</text>
						</view>
						<view style="padding-top:20rpx;">
							<text style="color:orange;font-weight:600;font-size:35px;">阳性\n</text>
						</view>
						<view style="padding-top:35rpx;padding-left:23%;"><u-icon name="arrow-right-double" color="gray" size="14" label="右滑查看"></u-icon></view>
					</view>
					<view class="dblock" style="float:right;margin-right:5%;text-align:center;">
						<view style="padding-top:30rpx;">
							<text style="color:limegreen;font-weight:600;font-size:18px;">新冠疫苗\n</text>
						</view>
						<view style="padding-top:30rpx;line-height:36px;">
							<text v-if="this.vaccine==1" style="color:limegreen;font-weight:600;font-size:30px;">已接种\n</text>
							<text v-if="this.vaccine==0" style="color:limegreen;font-weight:600;font-size:30px;">未接种\n</text>
							<text v-if="this.vaccine==2" style="color:limegreen;font-weight:600;font-size:23px;line-height:40px;">已加强接种\n</text>
						</view>
						<view style="padding-top:35rpx;padding-left:23%;"><u-icon name="arrow-left-double" color="gray" size="14" label="左滑查看"></u-icon></view>
					</view>
					<view style="display:block;text-align:center;margin:350rpx 20px 0 20px;font-size:14px;color:#3c9cff;">数据来源：全国一体化政务服务平台、个人申报信息和江苏省公共管理机构。</view>
					<u-divider text=""></u-divider>
					<view style="text-align:center;color:gray;font-size:14px;">--- 服务热线：12345 ---</view>
				</view>
				<view style="display:block;padding-top:40rpx;"></view>
			</swiper-item>
			<swiper-item>
				<view style="display:block;padding-top:20rpx;">
					<view style="width:90%;margin-left:5%;text-align:left;background-color:white;border-radius:5px;white-space:pre-wrap;">
						<view style="width:95%;margin-left:2.5%;">
							<view v-if="vaccinedata[0]!=null" v-for="(item,index) in vaccinedata" :key="index">
								<view class="card">
									<text style="color:gray;">疫苗名称：</text><text>{{item.vac_name}}\n</text>
									<text style="color:gray;">接种日期：</text><text>{{item.vac_time | cut}}\n</text>
									<text style="color:gray;">接种单位：</text><text>{{item.vac_pointname}}\n</text>
								</view>
							</view>
							<view v-if="vaccinedata[0]==null">
								<view class="card">
									<text style="color:gray;">疫苗名称：</text><text>暂无\n</text>
									<text style="color:gray;">接种日期：</text><text>暂无\n</text>
									<text style="color:gray;">接种单位：</text><text>暂无\n</text>
								</view>
							</view>
							<view style="padding-top:10rpx;padding-bottom:15rpx;padding-left:2%;">
								<text style="font-size:12px;color:gray;">数据来源：江苏省预防接种综合服务管理信息系统，仅可查询江苏省内的新冠疫苗接种信息。</text>
							</view>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	const sha256 = require("js-sha256").sha256;
	import ayQrcode from "@/components/ay-qrcode/ay-qrcode.vue";
	import moment from 'moment';
	export default {
		components: {
			ayQrcode,
		},
		onLoad() {
			let that = this;
			that.getTime();
			setInterval(() => {that.getTime()},1000)
			that.showQrcode();//一加载生成二维码
			that.platform=uni.getSystemInfoSync().platform;
			switch(that.user_color){
				case 0:{
					that.color='绿';
					break;
				}
				case 1:{
					that.color='黄';
					break;
				}
				case 2:{
					that.color='红';
					break;
				}
			};
			//获取疫苗
			uni.request({
				url:this.$BASE_URL.BASE_URL+'/getVacResultbyid',
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
						that.vaccinedata=JSON.parse(JSON.stringify(res.data.data));
						if(that.vaccinedata.length==3) that.vaccine=2;
						else that.vaccine=1;
					} else if(res.data.code==201){
						let that = this;
						that.vaccine=0;
					} else{
						uni.showToast({
							icon:"none",
							title:"error"
						})
					}
				}
			});
			//获取核酸
			uni.request({
				url:this.$BASE_URL.BASE_URL+'/getNatResultbyid',
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
						that.natdata=JSON.parse(JSON.stringify(res.data.data));
						that.$user.memberObj.user_nat=JSON.parse(JSON.stringify(res.data.data));
						if(that.natdata[0].nat_result=='阴性') that.isgreen=1;
						else if (that.natdata[0].nat_result=='阳性') that.isgreen=0;
						//检查核酸是否48小时阴性
						const date1 = moment(that.natdata[0].nat_time);
						const date2 = moment(that.now);
						const date3 = date2.diff(date1,'hours');
						if(date3<48) that.expire=1;
						else that.expire=0;
					} else if(res.data.code==201){
						that.natdata[0]=null;
					} else{
						uni.showToast({
							icon:"none",
							title:"error"
						})
					}
				}
			});
		},
		data() {
			return {
				platform:'',
				notice:'若您有近7天中高风险区旅居史(含境外)，请及时进行信息更新和风险报备。',
				modal_qr: true,
				rurl: sha256(this.$user.memberObj.user_identity), //要生成的二维码值
				user_name:this.$user.memberObj.user_name,
				user_color:this.$user.memberObj.user_codecolor,
				color:'',
				user_phone:this.$user.memberObj.user_phone,
				user_identity:this.$user.memberObj.user_identity,
				timer:'',//不带年份
				expire: '', //核酸是否是48小时有效阴性
				isgreen: '', //核酸是否是阴性
				vaccine: '', //0未接种，1已接种，2为接种3针加强接种
				vaccinedata:[],
				natdata:[],
				date:'',//带年份
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
				let today = month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
				let now = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
				this.timer=today;
				this.date=now;
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
			gotocheck(){
				uni.navigateTo({
					url:"../../pages/INFO/checknuclein"
				})
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
			},
			cut(value){
				var temp = value.substring(0,value.lastIndexOf('.'))
				return temp.replace(/T/g,' ');
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
	.nonedblock{
		border-radius: 5px;
		height:300rpx;
		width:41%;
		background-color:white;
		box-shadow: 0 0 5px orange;
		border:4px solid orange;
	}
	.card{
		border-bottom:1px solid lightgray;
		line-height:60rpx;
		padding-left:2%;
		padding-top:5rpx;
		padding-bottom:5rpx;
		font-size:15px;
	}
</style>

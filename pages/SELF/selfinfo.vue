<template>
	<view style="background-color:#EDEDED;position:absolute;width:100%;height:100%;">
		<view class="bg">
			<image class="image" style="z-index:1;" :src="pic" @click="alterHeade"></image>
		</view>
		<view style="margin-top:20rpx;">
			<uni-list-item>
				<view slot="body">
					<text class="title">手机号</text>
				</view>
				<view slot="footer" class="information">
					<text>{{this.$user.memberObj.user_phone}}</text>
				</view>
			</uni-list-item>
			<uni-list-item showArrow :to="'./rebindphone'">
				<view slot="body">
					<text class="title">换绑手机号</text>
				</view>
			</uni-list-item>
		</view>
		<view style="margin-top:20rpx;">
			<uni-list-item>
				<view slot="body">
					<text class="title">姓名</text>
				</view>
				<view slot="footer" class="information">
					<text>{{this.$user.memberObj.user_name}}</text>
				</view>
			</uni-list-item>
			<uni-list-item>
				<view slot="body">
					<text class="title">身份证号</text>
				</view>
				<view slot="footer" class="information">
					<text>{{this.$user.memberObj.user_identity | hide}}</text>
				</view>
			</uni-list-item>
			<uni-list-item showArrow v-if="isnone==0">
				<view slot="body">
					<text class="title">亲友信息</text>
				</view>
			</uni-list-item>
			<uni-list-item v-if="isnone==1">
				<view slot="body">
					<text class="title">暂无亲友信息</text>
				</view>
			</uni-list-item>
			<u-swipe-action style="touch-action:none;">
				<u-swipe-action-item @click="delrela(item)" v-for="(item,index) in this.options" :key="index" :options="item.option">
					<view class="swipe-action u-border-top" :class="[index === options.length - 1 && 'u-border-bottom']">
						<view class="swipe-action__content">
							<text class="swipe-action__content__text">{{item.name}}</text>
							<text class="swipe-action__content__text" style="color:gray">{{item.identity}}</text>
						</view>
					</view>
				</u-swipe-action-item>
			</u-swipe-action>
		</view>
		<view style="margin-top:20rpx;">
			<uni-list-item showArrow :to="'../LOGIN/forget'">
				<view slot="body">
					<text class="title">修改密码</text>
				</view>
			</uni-list-item>
			<uni-list-item showArrow link @click="getoff">
				<view slot="body">
					<text class="title">退出登录</text>
				</view>
			</uni-list-item>
		</view>
		<u-gap v-if="platform=='ios'" height="50" bgColor="#ededed"></u-gap>
		<u-gap height="10" bgColor="#ededed"></u-gap>
	</view>
</template>

<script>
	let that = null
	export default{
		onLoad() {
			this.platform = uni.getSystemInfoSync().platform;
		},
		onShow() {
			that = this;
			this.getrela();
		},
		data(){
			return {
				platform:'',
				isnone:0,
				relativedata:[],
				options:[],
				pic:this.$user.memberObj.user_pic,
			}
		},
		methods:{
			alterHeade() {//上传返回图片
				let baseurl = this.$BASE_URL.BASE_URL;
				let userid = this.$user.memberObj.user_id;
			    uni.chooseImage({
					count: 1,
					sourceType: ['album'],
					success(res) {
						if (res.tempFilePaths.length > 0) {
							let filePath = res.tempFilePaths[0];
							uniCloud.uploadFile({
								filePath: filePath,
								cloudPath: 'a.jpg',
								success: (res) => {
									let image = res.fileID;
									uni.request({
										url:baseurl+"/uploadPicture",
										method:"POST",
										header:{
											'Content-Type': 'application/json',
										},
										data:{
											'user_id': userid,
											'picture_url': image,
										},
										success: (res) => {
											that.$user.memberObj.user_pic=image;
											uni.showToast({
												icon:"none",
												title:"更换成功！"
											})
											uni.reLaunch({
												url:"./selfinfo",
											});
											//是否要继续请求存疑
										},
									});
								}
							})
						}
					}
				})
			},
			delrela(item){
				//删除亲友
				uni.request({
					url:this.$BASE_URL.BASE_URL+'/deleteRelative',
					method:'POST',
					header:{
						'Content-Type': 'application/json',
					},
					data:{
						'user_id':this.$user.memberObj.user_id,
						'relative_id':item.id,
					},
					success: (res) => {
						if(res.data.code==200){
							uni.showToast({
								icon:"none",
								title:"删除成功"
							})
							uni.reLaunch({
								url:"./selfinfo",
							});
						} else{
							uni.showToast({
								icon:"none",
								title:"删除失败，请重试"
							})
						}
					},
				});
			},
			getoff(){
				this.$user.memberObj.user_id='';
				this.$user.memberObj.user_phone='';
				this.$user.memberObj.user_identity='';
				this.$user.memberObj.user_name='';
				this.$user.memberObj.user_codecolor='';
				this.$user.memberObj.user_timeleft='';
				this.$user.memberObj.user_pic='';
				this.$user.memberObj.user_nat=[];
				uni.reLaunch({
					url:"/pages/LOGIN/login"
				})
			},
			getrela(){
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
							that.options=[];
							that.relativedata=JSON.parse(JSON.stringify(res.data.data));
							for(let i=0;i<that.relativedata.length;i++){
								let struct={
									name:'',
									identity:'',
									phone:'',
									id:'',
									option:[{
										text:'删除',
										style: {
											backgroundColor: '#3c9cff'
										},
									}]}
								struct.name=that.relativedata[i].user_name;
								struct.identity=that.relativedata[i].user_identify;
								struct.id=that.relativedata[i].user_id;
								struct.phone=that.relativedata[i].phone;
								that.options.push(struct);
							}
						} else if(res.data.code==201){
							let that = this;
							that.isnone=1;
						} else{
							uni.showToast({
								icon:"none",
								title:"获取亲友失败"
							})
						}
					},
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

<style lang="scss">
	.bg{
		text-align:center;
		vertical-align:center;
		height: 500rpx;
		width: 100%;
		z-index: -999;
		background-image: url("../../static/infobg.jpg");
		background-size: 100% 100%;
	}
	.image{
		width:200rpx;
		height:200rpx;
		z-index: 10;
		margin-top: 150rpx;
		border-radius:50%;
	}
	.title{
		font-size: 14px;
	}
	.information{
		position: absolute;
		top: 30rpx;
		font-size: 14px;
		right: 40rpx;
		color: gray;
	}
	.u-page {
	    padding: 0;
	}
	
	.u-demo-block__title {
	    padding: 10px 0 2px 15px;
	}
	
	.swipe-action {
	    &__content {
	         padding: 25rpx 0;
	
	        &__text {
	             font-size: 15px;
	             color: $u-main-color;
	             padding-left: 30rpx;
	         }
	    }
	}
</style>
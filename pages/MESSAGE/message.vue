<template>
	<view>
		<view style="text-align: center;width: 100%;">			
			<text style="color: dimgray;line-height: 800rpx;" v-if="isnone==1">暂时还没有消息</text>
		</view>
		<view v-for="(item,index) in messagedata" :key="index" v-if="isnone==0">
			<uni-card :title="item.message_type" :extra="item.message_time">
				<view style="line-height: 60rpx;">
					<text class="uni-body">{{item.message_detail}}</text>
					<text class="uni-body" style="color:#6A55A2;">\n——疫情反复，感谢您的配合——</text>					
				</view>
			</uni-card>
		</view>
		<u-gap height="5" bgColor="white"></u-gap>
	</view>
</template>

<script>
import { watch } from "vue";
	export default{
		mounted() {
			this.timer=setInterval(()=>{
				this.getmess();
			},1000);
		},
		onShow() {
			this.getmess();
			uni.hideTabBarRedDot({
				index:1,
			})
		},
		data(){
			return {
				isnone:0,
				messagedata:[],
				length:null,
				timer:null,
			}
		},
		watch:{
			length(newValue,oldValue){
				if(oldValue!=null){
					uni.showTabBarRedDot({
						index:1,
					})
				}
			}
		},
		methods:{
			getmess(){
				uni.request({
					url:this.$BASE_URL.BASE_URL+"/getAllMessage",
					method:"POST",
					header:{
						'Content-Type': 'application/json',
					},
					data:{
						'user_id': this.$user.memberObj.user_id,
					},
					success: (res) => {
						if(res.data.code==200){
							let that = this;
							that.messagedata=JSON.parse(JSON.stringify(res.data.data));
							//console.log(this.hoteldata[0].hotel_id);
							that.length=that.messagedata.length;
						}
						else if(res.data.code==201){
							let that = this;
							that.isnone = 1;
						}
						else{
							uni.showToast({
								icon:"none",
								title:"error"
							})
						}
					}
				})
			}
		}
	}
</script>

<style>
</style>
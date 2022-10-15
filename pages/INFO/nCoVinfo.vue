<template>
	<view>
		<div>
			<u-grid :border="false" col="4"  >
				<u-grid-item v-for="(listItem,listIndex) in list" :key="listIndex" bgColor="#3c9cff" @click="typechange">
					<u-icon
						:customStyle="{paddingTop:20+'rpx',height:80+'rpx'}"
						:name="listItem.name"
						:size="25"
						color="white"
					></u-icon>
			        <text class="grid-text">{{listItem.title}}</text>
			    </u-grid-item>
			</u-grid>
		</div>
		<div style="background-color:#3c9cff;">
			<u-subsection :list="infolist" :current="curNow" bgColor="#3c9cff" fontSize="14px" inactiveColor="white" @change="sectionChange"></u-subsection>
		</div>
		<view v-if="curNow===0" style="background-color:aqua;">
			0
		</view>
		<view v-if="curNow===1">
			1
		</view>
		<view v-if="curNow===2">
			2
		</view>
		<view v-if="curNow===3">
			3
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				infolist: ['国内疫情', '国外疫情', '核酸检测点','防疫政策'],
				curNow: 0,
				list: [{
					name: 'scan',
					title: '扫一扫'
					},
					{
						name: 'grid',
						title: '身份码'
					},
					{
						name: 'star',
						title: '健康码'
					},
					{
						name: 'hourglass',
						title: '行程卡'
					},
				],
			}
		},
		methods: {
			sectionChange(index) {
				this.curNow = index;
			},
			typechange(name){
				switch (name){
					case 0:{
						console.log("扫一扫");
						uni.scanCode({ success: function (res) {  
							console.log('条码类型：' + res.scanType);
							console.log('条码内容：' + res.result); }});
						break;
					}case 1:{
						console.log("身份码");
						uni.navigateTo({
							url:"../../pages/INFO/identitycard"
						})
						break;
					}case 2:{
						console.log("健康码");
						break;
					}case 3:{
						console.log("行程卡");
						break;
					}
				}
			}
		}
	}
</script>

<style>
	.grid-text {
		font-size: 14px;
		color: white;
		padding: 0rpx 0 40rpx 0rpx;
		/* #ifndef APP-PLUS */
		box-sizing: border-box;
		/* #endif */
	}
</style>
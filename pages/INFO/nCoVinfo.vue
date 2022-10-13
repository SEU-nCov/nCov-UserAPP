<template>
	<view>
		<div>
			<u-grid :border="false" col="4">
				<u-grid-item v-for="(listItem,listIndex) in list" :key="listIndex" @click="typechange">
					<u-icon
						:customStyle="{paddingTop:20+'rpx'}"
						:name="listItem.name"
						:size="25"
					></u-icon>
			        <text class="grid-text">{{listItem.title}}</text>
			    </u-grid-item>
			</u-grid>
		</div>
		<div>
			<u-subsection :list="infolist" :current="curNow" @change="sectionChange"></u-subsection>
		</div>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				infolist: ['国内疫情', '国外疫情', '核酸检测点','防疫政策'],
				curNow: 1,
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
				console.log("1234");
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
						console.log("扫一扫2");
						break;
					}case 3:{
						console.log("扫一扫3");
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
		color: #909399;
		padding: 10rpx 0 20rpx 0rpx;
		/* #ifndef APP-PLUS */
		box-sizing: border-box;
		/* #endif */
	}
</style>
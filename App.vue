<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
</style>
<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	.daytimetopzx {
	    color: #181818 !important;
	    border-bottom: 1rpx solid #e8e8e8 !important;
	}
	.nightimetopzx {
	    color: #ADADAD !important;
	    border-bottom: 1rpx solid #1c1c1c !important;
	}
	
	
	
	.nightime {
	    background-color: #0E0E0E !important;
	    color: #ADADAD !important;
	}
	.nightime16 {
	    background-color: #131313 !important;
	    color: #ADADAD !important;
	    // border-bottom: 1rpx solid #1c1c1c !important;
	}
	.nightimeborde {
	    border: 2rpx solid #1c1c1c !important;;
	}
	.listnightbp{
	    border-top: 1rpx solid #1c1c1c !important;
	    border-bottom: 1rpx solid #1c1c1c !important;
	}
	.nightimebot16 {
	    background-color: #131313 !important;
	    color: #ADADAD !important;
	    border-bottom: 1rpx solid #1c1c1c !important;
	}
	.nightimetop16 {
	    background-color: #131313 !important;
	    color: #ADADAD !important;
	    border-top: 1rpx solid #1c1c1c !important;
	}
	
	.nightimetxt {
	    color: #999 !important;
	}
	.daytimetxt {
	    color: #333 !important;
	}
	.nightimetext {
	    color: #fff !important;
	}
	.daytimetext {
	    color: #222 !important;
	}
	
	.daytimeborde {
	    border: 2rpx solid #e8e8e8 !important;;
	}
	.nightimebg {
	    background-color: #222 !important;
	    color: #999 !important;
	}
	.daytimebg {
	    background-color: #F8F8F8 !important;
	    color: #333 !important;
	}
	.daytime {
	    background-color: #EDEEED !important;
	    color: #181818 !important;
	}
	.daytime16 {
	    background-color: #fff !important;
	    color: #181818 !important;
	    // border-bottom: 1rpx solid #e8e8e8 !important;
	}
	.listdaybp{
	    border-top: 1rpx solid #e8e8e8 !important;
	    border-bottom: 1rpx solid #e8e8e8 !important;
	}
	.daytimebot16 {
	    background-color: #fff !important;
	    color: #181818 !important;
	    border-bottom: 1rpx solid #e8e8e8 !important;
	}
	.daytimetop16 {
	    background-color: #fff !important;
	    color: #181818 !important;
	    border-top: 1rpx solid #e8e8e8 !important;
	}
</style>

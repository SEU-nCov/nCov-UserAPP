<template>
	<view>
		<div>
			<u-grid :border="false" col="4"  >
				<u-grid-item v-for="(listItem,listIndex) in titlelist" :key="listIndex" bgColor="#3490FD" @click="typechange">
					<u-icon
						:customStyle="{paddingTop:20+'rpx',height:80+'rpx'}"
						:name="listItem.name"
						:size="25"
						color="white"
					></u-icon>
			        <text class="grid-text">{{listItem.title}}</text>
			    </u-grid-item>
			</u-grid>
		<view class="top-box" style="border-top:1px solid white;">
			<view class="top-box-bg"></view>
			<view class="top-box-title">
				新型冠状病毒肺炎
			</view>
			<view class="top-box-but">
				疫情实时追踪
			</view>
			<view class="top-box-bot">
				数据来源：国家及各地卫健委每日信息发布<image @click="gocortxt" src="../../static/yiwen.png" mode=""></image>
			</view>
		</view>
		</div>
		<div style="background-color:#2A88FA;">
			<u-tabs :list="infolist" :current="curNow" lineColor="white" :scrollable="false" :activeStyle="{color:'white',fontSize:'14px'}" :inactiveStyle="{color:'white',fontSize:'14px'}" :lineWidth="50" @change="sectionChange"></u-tabs>
		</div>
		<view v-if="curNow==0">
			<view class="content" :class="daytime?'daytime':'nightime'">
			    <view class="t_item-top" :class="daytime?'daytime16':'nightime16'">
			        <view class="t_item-box" v-if="mydata.chinaAdd!=null && mydata.chinaTotal!=null">
			            <view class="t_item-box-title">
			                统计截止<text :class="daytime?'daytimetext':'nightimetext'">{{mydata.lastUpdateTime}}</text> ；更新于<text v-if="time.days >0" :class="daytime?'daytimetext':'nightimetext'">{{time.days}}天</text><text v-if="time.hours>0" :class="daytime?'daytimetext':'nightimetext'">{{time.hours}}小时</text>  <text :class="daytime?'daytimetext':'nightimetext'">{{time.minutes}}分钟</text>前
			            </view>
			            <view class="t_item" style="background-color: #fffaf7;">
			                <view class="t_item-addnum">较昨日：<text style="color: #e57631;"><text
			                            v-if="mydata.chinaAdd.localConfirmH5 > 0">+</text>
			                        {{mydata.chinaAdd.localConfirmH5}}</text></view>
			                <view class="t_item-nownum" style="color: #e57631;">{{mydata.chinaTotal.localConfirm}}</view>
			                <view class="t_item-nowtxt">本土现有确诊</view>
			            </view>
			            <view class="t_item" style="background-color: #fff8f8;">
			                <view class="t_item-addnum">较昨日：<text style="color: #e61c1d;"> <text
			                            v-if="mydata.chinaAdd.nowConfirm > 0">+</text>{{mydata.chinaAdd.nowConfirm}}</text>
			                </view>
			                <view class="t_item-nownum" style="color: #e61c1d;">{{mydata.chinaTotal.nowConfirm}}</view>
			                <view class="t_item-nowtxt">现有确诊</view>
			            </view>
			            <view class="t_item" style="background-color: #fff8f8;">
			                <view class="t_item-addnum">较昨日：<text style="color: #be2121;"><text
			                            v-if="mydata.chinaAdd.confirm > 0">+</text>{{mydata.chinaAdd.confirm}}</text></view>
			                <view class="t_item-nownum" style="color: #be2121;">{{mydata.chinaTotal.confirm}}</view>
			                <view class="t_item-nowtxt">累计确诊</view>
			            </view>
			            <view class="t_item" style="background-color: #fef7ff;">
			                <view class="t_item-addnum">较昨日：<text style="color: #ae3ac6;"><text
			                            v-if="mydata.chinaAdd.noInfect > 0">+</text>{{mydata.chinaAdd.noInfect}}</text></view>
			                <view class="t_item-nownum" style="color: #ae3ac6;">{{mydata.chinaTotal.noInfect}}</view>
			                <view class="t_item-nowtxt">无症状感染者</view>
			            </view>
			            <view class="t_item" style="background-color: #f8faff;">
			                <view class="t_item-addnum">较昨日：<text style="color: #000000;"><text
			                            v-if="mydata.chinaAdd.nowSevere > 0">+</text>{{mydata.chinaAdd.nowSevere}}</text></view>
			                <view class="t_item-nownum" style="color: #000000;">{{mydata.chinaTotal.nowSevere}}</view>
			                <view class="t_item-nowtxt">现有重症</view>
			            </view>
			            <view class="t_item" style="background-color: #f1f5ff;">
			                <view class="t_item-addnum">较昨日：<text style="color: #4e8be6;"><text
			                            v-if="mydata.chinaAdd.importedCase > 0">+</text>{{mydata.chinaAdd.importedCase}}</text>
			                </view>
			                <view class="t_item-nownum" style="color: #4e8be6;">{{mydata.chinaTotal.importedCase}}</view>
			                <view class="t_item-nowtxt">境外输入</view>
			            </view>
			            <view class="t_item" style="background-color: #f3f6f8;">
			                <view class="t_item-addnum">较昨日：<text style="color: #4e5a65;"><text
			                            v-if="mydata.chinaAdd.dead > 0">+</text>{{mydata.chinaAdd.dead}}</text></view>
			                <view class="t_item-nownum" style="color: #4e5a65;">{{mydata.chinaTotal.dead}}</view>
			                <view class="t_item-nowtxt">累计死亡</view>
			            </view>
			            <view class="t_item" style="background-color: #EBF4FA;">
			                <view class="t_item-addnum">较昨日：<text style="color: #10aeb5;"><text
			                            v-if="mydata.chinaAdd.heal > 0">+</text>{{mydata.chinaAdd.heal}}</text></view>
			                <view class="t_item-nownum" style="color: #10aeb5;">{{mydata.chinaTotal.heal}}</view>
			                <view class="t_item-nowtxt">累计治愈</view>
			            </view>
			            <view class="t_item" style="background-color: #fffafa;">
			                <view class="t_item-addnum">较昨日：<text style="color: #fd8137;"><text
			                            v-if="mydata.chinaAdd.suspect > 0">+</text>{{mydata.chinaAdd.suspect}}</text></view>
			                <view class="t_item-nownum" style="color: #fd8137;">{{mydata.chinaTotal.suspect}}</view>
			                <view class="t_item-nowtxt">现有疑似</view>
			            </view>
			        </view>
			    </view>
			    <view class="citylist" :class="daytime?'daytimetop16':'nightimetop16'">
			        <view class="citylist-name">
			            <view class="citylist-name-left">
			                <view class="title" style="padding-left:15rpx;" :class="daytime?'daytimetext':'nightimetext'">
			                    中国疫情（包括港澳台）
			                </view>
			                <view class="txt" style="padding-left:15rpx;">
			                    7:00-10:00为更新高峰，数据如有滞后请谅解。
			                </view>
			            </view>
			            <view class="citylist-name-right" @click="openCommon">
			                风险地区
			            </view>
			        </view>
			        <view class="citylist-title">
			            <text class="item" style="background-color: #f5f5f5; color: #222222;">地区</text>
			            <text class="item" style="background-color: #fcf2e8; color: #ff5d00;">现有</text>
			            <text class="item" style="background-color: #fdeeee; color: #f55253;">累计</text>
			            <text class="item" style="background-color: #e9f7ec; color: #178b05;">治愈</text>
			            <text class="item" style="background-color: #f3f6f8; color: #4e5a65;">死亡</text>
			            <text class="item" style="background-color: #f5f5f5; color: #222222;">详情</text>
			        </view>
			        <view class="citylist-box" v-if="mydata.areaTree!=null">
			            <block v-for="(item, index) in mydata.areaTree[0].children" :key="index">
			                <view class="citylist-box-item" :class="daytime?'daytimebot16':' nightimebot16'">
			                    <view class="item" @click="advSearch(index,item, 2)">
			                        {{item.name}}
			                    </view>
			                    <view class="item" @click="advSearch(index,item, 2)">
			                        {{item.total.nowConfirm}}
			                    </view>
			                    <view class="item" @click="advSearch(index,item, 2)" v-if="item.today.confirm>=1000" style="margin-top:-5rpx;">
			                        {{item.total.confirm}}
			                        <view class="item-confirm" style="white-space:pre-wrap;text-align:center;">
			                            <view style="margin-top:-5rpx;"><text>较昨日：\n+{{item.today.confirm}}</text></view>
			                        </view>
			                    </view>
								<view class="item" @click="advSearch(index,item, 2)" v-else-if="item.today.confirm>0" style="margin-top:5rpx;">
								    {{item.total.confirm}}
								    <view class="item-confirm">
										<view><text>较昨日：+</text>{{item.today.confirm}}</view>
								    </view>
								</view>
								<view class="item" @click="advSearch(index,item, 2)" v-else-if="item.today.confirm==0" style="line-height:80rpx;">
								    {{item.total.confirm}}
								</view>
			                    <view class="item" @click="advSearch(index,item, 2)">
			                        {{item.total.heal}}
			                    </view>
			                    <view class="item" @click="advSearch(index,item, 2)">
			                        {{item.total.dead}}
			                    </view>
			                    <view class="item" style="color: #03A9F4;" @click="gocopay(item)">
			                        详情
			                    </view>
			                </view>
			                
			                <view class="product-box-left-item-sub" v-if="flag[index]">
			                    <block v-for="(items, indexs) in item.children" :key="indexs" >
			                        <view class="product-box-left-item" :class="daytime?'daytimebot16':' nightimebot16'">
			                            <view class="product-box-left-item-item">
			                                {{items.name}}
			                            </view>
			                            <view class="product-box-left-item-item">
			                                {{items.total.nowConfirm}}
			                            </view>
			                            <view class="product-box-left-item-item">
			                                {{items.total.confirm}}
			                            </view>
			                            <view class="product-box-left-item-item">
			                                {{items.total.heal}}
			                            </view>
			                            <view class="product-box-left-item-item">
			                                {{items.total.dead}}
			                            </view>
			                        </view>
			                    </block>
			                </view>    
			            </block>
			        </view>
			        <view class="zqw" :class="daytime?'daytimetop16':'nightimetop16'" @click="popzqw">
			            愿疫情早日散去，山河无恙，天下太平。
			        </view>
			    </view>
			    <uni-popup ref="popup" type="center" class="popup-center">
			        <view class="popup-box">
			            <image class="pop-coles" src="../../static/pop-coles.png" mode="" @click="closeCommon"></image>
			            <view class="popup-box-top">
			                全国疫情中高风险地区数量
			            </view>
			            <scroll-view :class="daytime?'daytime16':'nightime16'" scroll-y="true" class="popup-box-box">
			                <view class="zqw-box">
			                    <view style="float: left; width: 100%; height: 100rpx;"></view>
			                    <view class="height-title" v-if="heightlist">高风险地区 {{heightlist.length}}个</view>
			                </view>
			                <view class="zqw-box">
			                    <view class="middle-title" v-if="middlelist">中风险地区 {{middlelist.length}}个</view>
			                </view>
			                <view v-if="mydata.chinaTotal">
			                    更新时间：{{mydata.chinaTotal.mRiskTime}}
			                </view>
			            </scroll-view>
			        </view>
			    </uni-popup>
			</view>
		</view>
		<view v-if="curNow==1">
			<view class="t_content-f">
				<view class="t_item-top-f" :class="daytime?'daytime16':'nightime16'">
					<view class="t_item-box-f">
						<view class="t_item-box-title-f" style="margin-left:3%;">
							统计截止<text :class="daytime?'daytimetext':'nightimetext'">{{this.overseaLastUpdateTime}}</text>；更新于<text v-if="ftime.days >0" :class="daytime?'daytimetext':'nightimetext'">{{ftime.days}}天</text><text v-if="ftime.hours>0" :class="daytime?'daytimetext':'nightimetext'">{{ftime.hours}}小时</text>  <text :class="daytime?'daytimetext':'nightimetext'">{{ftime.minutes}}分钟</text>前
						</view>
						<view class="t_item-f" style="background-color: #fffaf7;">
							<view class="t_item-addnum-f">较昨日：<text style="color: #e57631;"><text v-if="overseadata[0].compare>0">+</text>{{overseadata[0].compare}}</text></view>
							<view class="t_item-nownum-f" style="color: #e57631;">{{overseadata[0].num}}</view>
							<view class="t_item-nowtxt-f">累计确诊</view>
						</view>
						
						<view class="t_item-f" style="background-color: #fef7ff;">
							<view class="t_item-addnum-f">较昨日：<text style="color: #ae3ac6;"><text v-if="overseadata[1].compare>0">+</text>{{overseadata[1].compare}}</text></view>
							<view class="t_item-nownum-f" style="color: #ae3ac6;">{{overseadata[1].num}}</view>
							<view class="t_item-nowtxt-f">现有确诊</view>
						</view>
					</view>
				</view>
				<view class="t_item-top-f" style="padding-bottom: 20px;" :class="daytime?'daytime16':'nightime16'">
					<view class="t_item-box-f">
						<view class="t_item-f" style="background-color: #fff8f8;">
							<view class="t_item-addnum-f">较昨日：<text style="color: #be2121;"><text v-if="overseadata[2].compare>0">+</text>{{overseadata[2].compare}}</text></view>
							<view class="t_item-nownum-f" style="color: #be2121;">{{overseadata[2].num}}</view>
							<view class="t_item-nowtxt-f">累计治愈</view>
						</view>
						<view class="t_item-f" style="background-color: #f3f6f8;">
							<view class="t_item-addnum-f">较昨日：<text style="color: #4e5a65;"><text v-if="overseadata[3].compare>0">+</text>{{overseadata[3].compare}}</text></view>
							<view class="t_item-nownum-f" style="color: #4e5a65;">{{overseadata[3].num}}</view>
							<view class="t_item-nowtxt-f">累计死亡</view>
						</view>
					</view>
				</view>
			</view>
			<view class="citylist-f" :class="daytime?'daytimetop16':'nightimetop16'">
			    <view class="citylist-name">
			        <view class="citylist-name-left">
			            <view class="title" style="padding-left:15rpx;" :class="daytime?'daytimetext':'nightimetext'">
			                全球疫情
			            </view>
			            <view class="txt" style="padding-left:15rpx;">
			                7:00-10:00为更新高峰，数据如有滞后请谅解。
			            </view>
			        </view>
			    </view>
				<view class="citylist-title-f">
					<text class="item-f" style="background-color: #f5f5f5; color: #222222;">地区</text>
					<text class="item-f" style="background-color: #fcf2e8; color: #ff5d00;">新增</text>
					<text class="item-f" style="background-color: #fdeeee; color: #f55253;">累计</text>
					<text class="item-f" style="background-color: #e9f7ec; color: #178b05;">治愈</text>
					<text class="item-f" style="background-color: #f3f6f8; color: #4e5a65;">死亡</text>
				</view>
				<view class="citylist-box-f">
					<block v-for="(item, index) in foreigndata" :key="index">
						<view class="citylist-box-item-f" :class="daytime?'daytimebot16':' nightimebot16'">
							<view class="item-f" v-if="item.children[0]!=null" @click="advSearch(index,item, 2)">
								{{item.name}}
							</view>
							<view class="item-f" v-if="item.children[0]==null" style="color:black;" @click="advSearch(index,item, 2)">
								{{item.name}}
							</view>
							<view class="item-f" @click="advSearch(index,item, 2)" v-if="item.today.confirm!=null">
								{{item.today.confirm}}
							</view>
							<view class="item-f" @click="advSearch(index,item, 2)" v-if="item.today.confirm==null">
								0
							</view>
							<view class="item-f" @click="advSearch(index,item, 2)">
								{{item.total.confirm}}
							</view>
							<view class="item-f" @click="advSearch(index,item, 2)">
								{{item.total.heal}}
							</view>
							<view class="item-f" @click="advSearch(index,item, 2)">
								{{item.total.dead}}
							</view>
						</view>
						
						<view class="product-box-left-item-sub-f" v-if="flag[index]">
							<block v-for="(items, indexs) in item.children" :key="indexs" >
								<view class="product-box-left-item-f" :class="daytime?'daytimebot16':' nightimebot16'">
									<view class="product-box-left-item-item-f">
										{{items.name}}
									</view>
									<view class="product-box-left-item-item-f">
										{{items.today.confirm}}
									</view>
									<view class="product-box-left-item-item-f">
										{{items.total.confirm}}
									</view>
									<view class="product-box-left-item-item-f">
										{{items.total.heal}}
									</view>
									<view class="product-box-left-item-item-f">
										{{items.total.dead}}
									</view>
								</view>
							</block>
						</view>    
					</block>
				</view>
				<view class="zqw" :class="daytime?'daytimetop16':'nightimetop16'" @click="popzqw">
				        愿疫情早日散去，山河无恙，天下太平。
				</view>
			</view>
		</view>
		<view v-if="curNow==2">
			<view class="shadow">
				<view style="width:90%;margin-left:5%;padding-top:50rpx;">
					<u-subsection :list="list" :current="current" mode="button" @change="queryChange"></u-subsection>
					<u-gap height="20" bgColor="white"></u-gap>
					<uni-data-picker  style="white-space:pre-wrap;height:100rpx;" placeholder="      请选择地址      " popup-title="请 选 择 城 市" collection="opendb-city-china"
						field="code as value, name as text" orderby="value asc" :step-searh="true" self-field="code"
						parent-field="parent_code" @change="onchange">
					</uni-data-picker>
					<u-collapse :border="false">
						<u-collapse-item v-if="current==0" v-for="(item,index) in natdata" :key="index" :title="item.nat_pointname">
							<view style="width:100%;">
								<view style="float:left;display:inline;line-height:50rpx;">
									<text>{{item.nat_pointname}}</text>
								</view>
								<view style="float:right;display:inline;">
									<u-icon name="map" color="#2979ff" size="25" @click="callmap(item)"></u-icon>
								</view>
							</view>
						</u-collapse-item>
						<u-collapse-item v-if="current==1" v-for="(item,indexs) in vaccinedata" :key="indexs" :title="item.vac_pointname">
							<view style="width:100%;">
								<view style="float:left;display:inline;line-height:50rpx;">
									<text>{{item.vac_pointname}}</text>
								</view>
								<view style="float:right;display:inline;">
									<u-icon name="map" color="#2979ff" size="25" @click="callmap(item.vac_pointname,item.longitude,item.latitude)"></u-icon>
								</view>
							</view>
						</u-collapse-item>
					</u-collapse>
					<u-gap height="20" bgColor="white"></u-gap>
				</view>
			</view>
			<u-gap height="20" bgColor="(255,255,255,0)"></u-gap>
		</view>
		<view v-if="curNow==3">
			<view class="shadow">
				<view style="width:90%;margin-left:5%;padding-top:50rpx;">
					<view style="margin-left:3%;">
						<text style="color:#2A88FA;font-weight:600;font-size:20px;">防疫政策查询</text>
					</view>
					<u-gap height="20" bgColor="white"></u-gap>
					<view style="width:100%;height:100rpx;">
						<view style="width:50%;float:left;display:inline;">
							<uni-data-picker  style="white-space:pre-wrap;" placeholder="      请选择出发地" popup-title="请 选 择 城 市" collection="opendb-city-china"
							field="code as value, name as text" orderby="value asc" :step-searh="true" self-field="code"
							parent-field="parent_code" @change="onchanges">
							</uni-data-picker>
						</view>
						<view style="width:50%;float:right;display:inline;">
							<uni-data-picker  style="white-space:pre-wrap;" placeholder="      请选择目的地" popup-title="请 选 择 城 市" collection="opendb-city-china"
							field="code as value, name as text" orderby="value asc" :step-searh="true" self-field="code"
							parent-field="parent_code" @change="onchanged">
							</uni-data-picker>
						</view>
					</view>
					<u-collapse :border="false" ref="policy">
						<u-collapse-item :title="from_city+'出行政策'">
							{{this.policydata.from_policy}}
						</u-collapse-item>
						<u-collapse-item :title="to_city+'出行政策'">
							{{this.policydata.to_policy}}
						</u-collapse-item>
					</u-collapse>
					<u-gap height="20" bgColor="white"></u-gap>
				</view>
			</view>
			<u-gap height="20" bgColor="rgb(255,255,255,0)"></u-gap>
		</view>
	</view>
</template>

<script>
	let it=null;
	function getValue( key, str ) {
		var reg = key + '(.*?)' + ',';
	    var m = str.match(reg);
	    return m[1];
	 }
	export default {
		data() {
			return {
				city:'南京市',
				from_city:'南京市',
				to_city:'杭州市',
				current:0,
				list:['核酸检测点','疫苗接种点'],
				infolist: [{name:'国内疫情'}, {name:'国外疫情'},{name:'核酸检测'},{name:'防疫政策'}],
				curNow: 0,
				titlelist: [{
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
				scrollTop: 0,
				old:{
				    scrollTop:0
				},
				mydata: {},
				time: {},
				ftime: {},
				flag:[],
				daytime:true,
				arealist:[],
				middlelist:[],
				heightlist:[],
				foreigndata: {},
				vaccinedata:[],
				natdata:[],
				policydata:[],
				overseaLastUpdateTime:'',
				overseadata:[{name:'累计确诊',num:'',compare:''},{name:'累计治愈',num:'',compare:''},{name:'累计死亡',num:'',compare:''},{name:'累计治愈',num:'',compare:''}],
			}
		},
		onShow() {
			this.getLocalShop();
			this.getForeignShop();
			this.getaddr();
			this.getpolicy();
			it=this;
		    let that = this;
		    //that.daytime = uni.getStorageSync('daytime');
		    uni.setNavigationBarColor({
		        frontColor: that.daytime?'#000000':'#ffffff',
		        backgroundColor: that.daytime?'#EDEEED':'#0E0E0E',
		        animation: {
		            duration: 1,
		            timingFunc: 'easeIn'
		        }
		    })
		},
		methods: {
			queryChange(index){
				this.current=index;
			},
			onchange(e){
				const val = e.detail.value;
				this.city = val[1].text;
				this.getaddr();
			},
			onchanges(e){
				const val = e.detail.value;
				this.from_city = val[1].text;
				this.getpolicy();
				this.$nextTick(()=>{
					this.$refs.policy.init();
				});
			},
			onchanged(e){
				const val = e.detail.value;
				this.to_city = val[1].text;
				this.getpolicy();
				this.$nextTick(()=>{
					this.$refs.policy.init();
				});
			},
			getpolicy(){
				let that = this;
				uni.request({
				    url: this.$BASE_URL.BASE_URL+'/getTravelPolicy',
				    method: 'POST',
					header:{
						'Content-Type': 'application/json',
					},
					data:{
						'from_city':this.from_city,
						'to_city':this.to_city,
					},
				    success: res => {
				        that.policydata=JSON.parse(JSON.stringify(res.data.data));
				    }
				});
			},
			sectionChange(index) {
				this.curNow = index.index;
			},
			typechange(name){
				switch (name){
					case 0:{
						uni.scanCode({
							success: function (res) {
								var title=getValue("title:",res.result);
								var area_code=getValue("area_code:",res.result);
								var street_id=getValue("street_id:",res.result);
								uni.request({
								    url: it.$BASE_URL.BASE_URL+'/addTravelRecord',
								    method: 'POST',
									header:{
										'Content-Type': 'application/json',
									},
									data:{
										'user_id':it.$user.memberObj.user_id,
										'area_code':area_code,
										'street_id':street_id,
									},
								    success: res => {
								        uni.navigateTo({
								        	url:"../../pages/INFO/healthcard"
								        })
								    }
								});
						}});
						break;
					}case 1:{
						uni.navigateTo({
							url:"../../pages/INFO/identitycard"
						})
						break;
					}case 2:{
						uni.navigateTo({
							url:"../../pages/INFO/healthcard"
						})
						break;
					}case 3:{
						uni.navigateTo({
							url:"../../pages/INFO/travelcard"
						})
						break;
					}
				}
			},
			closeCommon() {
			    this.$refs.popup.close()
			},
			openCommon(){
			    this.$refs.popup.open('center')
			},
			gocortxt(){
			    uni.navigateTo({
			        url:'txt'
			    })
			},
			advSearch(index,item, level) {
			    if(item.children.length >= 1){
			        this.flag[index] = !this.flag[index];
			        this.$forceUpdate();
			    }
			},
			callmap(item){
				let name=item.nat_pointname;
				let long=item.longitude;
				let lati=item.latitude;
				
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						var packageName = 'com.autonavi.minimap';
						var main = plus.android.runtimeMainActivity();
						var packageManager = main.getPackageManager();
						var PackageManager = plus.android.importClass(packageManager)
						var packageInfo = packageManager.getPackageInfo(packageName, PackageManager.GET_ACTIVITIES);
						if (packageInfo) {
							var Uri = plus.android.importClass("android.net.Uri");
							var url = "amapuri://route/plan?sourceApplication=maxuslife" +
								"&sid=A&slat="+ res.latitude +"&slon="+ res.longitude + "&sname=您的位置" +
								"&did=B&dlat="+ lati +"&dlon=" + long +"&dname=" + name + "&dev=0&t=0";
							var Intent = plus.android.importClass('android.content.Intent');
							var intent = new Intent();
							intent.setAction(Intent.ACTION_VIEW);
							intent.addCategory(Intent.CATEGORY_DEFAULT);
							var uri = Uri.parse(url);
							//将功能Scheme以URI的方式传入data  
							intent.setData(uri);
							intent.setPackage("com.autonavi.minimap");
							var main = plus.android.runtimeMainActivity();
							main.startActivity(intent);
						} else {
							// alert('未安装' + packageName + '')
							uni.showModal({
								content:'目前仅支持高德地图导航，请先下载高德地图',
								showCancel: false,
								success:function(res){
									if(res.confirm){
									}
								}
							});
						}
					}
				});
			},
			popzqw() {
			    uni.showToast({
			        title: '愿你我都能守住岁月，待到春光灿烂之时。',
			        icon: 'none',
			        duration: 2500
			    })
			    return;
			},
			gocopay(zqw) {
			    let item = encodeURIComponent(JSON.stringify(zqw))
			    uni.navigateTo({
			        url: 'coronavirus?item=' + item
			    })
			},
			getaddr(){
			    let that = this;
			    uni.request({
			        url: this.$BASE_URL.BASE_URL+'/getNatPointbycity',
			        method: 'POST',
					header:{
						'Content-Type': 'application/json',
					},
					data:{
						'city_name':this.city,
					},
			        success: res => {
			            that.natdata=JSON.parse(JSON.stringify(res.data.data));
			        }
			    });
				uni.request({
				    url: this.$BASE_URL.BASE_URL+'/getVacPointbycity',
				    method: 'POST',
					header:{
						'Content-Type': 'application/json',
					},
					data:{
						'city_name':this.city,
					},
				    success: res => {
				        that.vaccinedata=JSON.parse(JSON.stringify(res.data.data));
				    }
				});
			},
			getLocalShop() {
			    let that = this;
			    uni.request({
			        url: 'https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=statisGradeCityDetail,diseaseh5Shelf',
			        method: 'POST',
			        success: res => {
			            that.mydata = res.data.data.diseaseh5Shelf;
			            that.middlelist.length = that.mydata.chinaTotal.mediumRiskAreaNum;
			            that.heightlist.length = that.mydata.chinaTotal.highRiskAreaNum;
			            let timestamp = ((Date.parse(new Date())) - (new Date(that.mydata.lastUpdateTime))
			                .valueOf()) / 1000;
			            that.time = this.formatSecond(timestamp)
			        },
			        fail() {
			
			        }
			    })
			},
			getForeignShop() {
			    let that = this;
			    uni.request({
			        url: 'https://c.m.163.com/ug/api/wuhan/app/data/list-total',
			        method: 'GET',
			        success: res => {
			            that.foreigndata = res.data.data.areaTree;
						that.overseaLastUpdateTime = res.data.data.overseaLastUpdateTime;
						let num=0;let numadd=0;let dead=0;let deadadd=0;
						let heal=0;let healadd=0;let current=0;let currentadd=0;
						for(let i=0;i<that.foreigndata.length;i++){
							if(that.foreigndata[i].name!='中国'){
								num+=that.foreigndata[i].total.confirm;
								numadd+=that.foreigndata[i].today.confirm;
								dead+=that.foreigndata[i].total.dead;
								deadadd+=that.foreigndata[i].today.dead;
								heal+=that.foreigndata[i].total.heal;
								healadd+=that.foreigndata[i].today.heal;
							}
						}
						current=num-dead-heal;
						currentadd=numadd-deadadd-healadd;
						that.overseadata[0].num=num;
						that.overseadata[1].num=current;
						that.overseadata[2].num=heal;
						that.overseadata[3].num=dead;
						that.overseadata[0].compare=numadd;
						that.overseadata[1].compare=currentadd;
						that.overseadata[2].compare=healadd;
						that.overseadata[3].compare=deadadd;
						let timestamp = ((Date.parse(new Date())) - (new Date(that.overseaLastUpdateTime)).valueOf()) / 1000;
						that.ftime = this.formatSecond(timestamp)
			        },
			        fail() {
			
			        }
			    })
			},
			formatSecond(second) {
			    const days = Math.floor(second / 86400);
			    const hours = Math.floor((second % 86400) / 3600);
			    const minutes = Math.floor(((second % 86400) % 3600) / 60);
			    const seconds = Math.floor(((second % 86400) % 3600) % 60);
			    const forMatDate = {
			        days: days,
			        hours: hours,
			        minutes: minutes,
			        seconds: seconds
			    };
			    return forMatDate;
			},
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
	.content {
	position: relative;
	width: 750rpx;
	height: auto;
	margin: 0;
	padding: 0;
	background-color: #fff;
	
	}
	
	.box {
	width: 100%;
	height: auto;
	/* overflow: hidden; */
	padding: 0 30rpx;
	box-sizing: border-box;
	background-color: #fff;
	}
	
	.t_item-top {
	position: sticky;
	width: 100%;
	left: 0;
	top: 352rpx;
	width: 100%;
	height: auto;
	overflow: hidden;
	background-color: #fff;
	padding-bottom: 30rpx;
	}
	
	.t_item-box-title {
	width: 100%;
	font-size: 28rpx;
	color: #666;
	padding: 25rpx 0rpx;
	}
	
	.t_item-box-title text {
	color: #222;
	}
	
	.t_item-box {
	width: 100%;
	height: auto;
	padding: 0 30rpx;
	box-sizing: border-box;
	}
	
	.t_item {
	float: left;
	width: 32.7%;
	height: 150rpx;
	text-align: center;
	background-color: #fff;
	margin: .3%;
	transform: scale(.97);
	border-radius: 12rpx;
	}
	
	.t_item-addnum {
	padding-top: 3px;
	float: left;
	width: 100%;
	color: #666;
	text-align: center;
	font-size: 28rpx;
	margin: 5rpx auto 0;
	}
	
	.t_item-nownum {
	float: left;
	width: 100%;
	color: #000;
	text-align: center;
	font-size: 40rpx;
	font-weight: 500;
	}
	.t_item-nowtxt {
	float: left;
	width: 100%;
	color: #000;
	text-align: center;
	font-size: 28rpx;
	}
	
	.citylist {
	position: sticky;
	left: 0;
	top: 0;
	float: left;
	width: 100%;
	height: auto;
	background-color: #fff;
	box-sizing: border-box;
	}
	
	.citylist-title {
	position: sticky;
	top: 0;
	width: 100%;
	height: 80rpx;
	line-height: 80rpx;
	}
	
	.citylist-title .item {
	float: left;
	width: 15%;
	height: 80rpx;
	line-height: 80rpx;
	text-align: center;
	background-color: #fff;
	}
	
	.citylist-title .item:nth-child(1) {
	width: 19%;
	}
	.citylist-title .item:nth-child(2) {
	width: 18%;
	}
	.citylist-title .item:nth-child(3) {
	width: 20%;
	}
	.citylist-title .item:nth-child(4) {
	width: 16%;
	}
	.citylist-title .item:nth-child(5) {
	width: 16%;
	}
	.citylist-title .item:last-child {
	width: 11%;
	}
	
	.citylist-box {
	width: 100%;
	box-sizing: border-box;
	}
	
	.citylist-box-item {
	float: left;
	width: 100%;
	height: 125rpx;//29w
	font-size: 28rpx;
	border-bottom: 1rpx solid #f3f3f3;
	box-sizing: border-box;
	overflow: hidden;
	}
	
	.citylist-box-item .item:first-child {
	color: #4180f1;
	font-size: 15px;
	}
	
	.citylist-box-item .item {
	float: left;
	width: 16%;
	text-align: center;
	}

	.citylist-box-item .item:nth-child(1) {
	width: 19%;
	}
	.citylist-box-item .item:nth-child(2) {
	width: 18%;
	}
	.citylist-box-item .item:nth-child(3) {
	width: 20%;
	}
	.citylist-box-item .item:last-child {
	width: 11%;
	}
	
	.citylist-box-item .item:nth-child(1),
	.citylist-box-item .item:nth-child(2),
	.citylist-box-item .item:nth-child(4),
	.citylist-box-item .item:nth-child(5),
	.citylist-box-item .item:nth-child(6) {
	line-height: 120rpx;
	}
	
	.citylist-box-item .item:nth-child(3) {
	padding-top: 20rpx;
	box-sizing: border-box;
	}
	
	/*******************************************/
	.citylist-f {
	position: sticky;
	left: 0;
	top: 0;
	float: left;
	width: 100%;
	height: auto;
	background-color: #fff;
	box-sizing: border-box;
	}
	
	.citylist-title-f {
	position: sticky;
	top: 0;
	width: 100%;
	height: 80rpx;
	line-height: 80rpx;
	}
	
	.citylist-title-f .item-f {
	float: left;
	width: 20%;
	height: 80rpx;
	line-height: 80rpx;
	text-align: center;
	background-color: #fff;
	}
	
	.citylist-title-f .item-f:nth-child(1) {
	width: 20%;
	}
	.citylist-title-f .item-f:nth-child(2) {
	width: 18%;
	}
	.citylist-title-f .item-f:nth-child(3) {
	width: 22%;
	}
	.citylist-title-f .item-f:nth-child(4) {
	width: 22%;
	}
	.citylist-title-f .item-f:last-child {
	width: 18%;
	}
	
	.citylist-box-f {
	width: 100%;
	box-sizing: border-box;
	}
	
	.citylist-box-item-f {
	float: left;
	width: 100%;
	height: 125rpx;//29w
	font-size: 28rpx;
	border-bottom: 1rpx solid #f3f3f3;
	box-sizing: border-box;
	overflow: hidden;
	}
	
	.citylist-box-item-f .item-f:first-child {
	color: #4180f1;
	font-size: 15px;
	}
	
	.citylist-box-item-f .item-f {
	float: left;
	width: 20%;
	text-align: center;
	}
	
	.citylist-box-item-f .item-f:nth-child(2) {
	width: 18%;
	}
	.citylist-box-item-f .item-f:nth-child(3) {
	width: 22%;
	}
	.citylist-box-item-f .item-f:nth-child(4) {
	width: 22%;
	}
	.citylist-box-item-f .item-f:last-child {
	width: 18%;
	}
	
	.citylist-box-item-f .item-f:nth-child(1),
	.citylist-box-item-f .item-f:nth-child(2),
	.citylist-box-item-f .item-f:nth-child(3),
	.citylist-box-item-f .item-f:nth-child(4),
	.citylist-box-item-f .item-f:nth-child(5){
	line-height: 120rpx;
	}
	
	.product-box-left-item-f {
	float: left;
	width: 100%;
	height: 60rpx;
	line-height: 60rpx;
	font-size: 28rpx;
	color: #666;
	overflow:scroll;
	border-bottom: 1rpx solid #f2f7f7;
	}
	.product-box-left-item-item-f {
	float: left;
	width: 18%;
	text-align: center;
	}
	.product-box-left-item-item-f:nth-child(1){
	width: 20%;
	}
	.product-box-left-item-item-f:nth-child(3){
	width: 22%;
	}
	.product-box-left-item-item-f:nth-child(4){
	width: 22%;
	}
	.product-box-left-item-item-f:nth-child(5){
	width: 18%;
	}
	/*******************************************/
	
	.zqw {
	width: 100%;
	height: 120rpx;
	line-height: 120rpx;
	font-size: 28rpx;
	text-align: center;
	color: #666;
	float: left;
	background: #fff;
	margin-bottom: 10rpx;
	}
	
	.item-confirm {
	width: 100%;
	text-align: center;
	color: #737373;
	font-size: 22rpx;
	font-weight: 400;
	margin-top: 8rpx;
	}
	
	.product-box-left-item {
	float: left;
	width: 100%;
	min-height: 60rpx;
	line-height: 60rpx;
	font-size: 28rpx;
	overflow:scroll;
	color: #666;
	border-bottom: 1rpx solid #f2f7f7;
	}
	.product-box-left-item-item {
	float: left;
	width: 18%;
	text-align: center;
	}
	.product-box-left-item-item:nth-child(1){
	width: 19%;
	}
	.product-box-left-item-item:nth-child(3){
	width: 20%;
	}
	.product-box-left-item-item:nth-child(4){
	width: 16%;
	}
	.product-box-left-item-item:nth-child(5){
	width: 16%;
	}
	.top-box {
	position: relative;
	width: 100%;
	height: 350rpx;
	/* overflow: hidden; */
	/* background-size: cover; */
	}
	.top-box-bg {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-image: url(../../static/head_bg.png);
	background-size: 100% 100%;
	}
	.top-box-title {
	position: absolute;
	left: 50%;
	top: 66rpx;
	width: 100%;
	text-align: center;
	transform: translateX(-50%);
	color: #ffe9aa;
	font-size: 56rpx;
	}
	.top-box-but {
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	top: 140rpx;
	width: 100%;
	text-align: center;
	color: #fff;
	font-size: 72rpx;
	font-weight: bold;
	}
	.top-box-bot {
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	bottom: 50rpx;
	width: 100%;
	text-align: center;
	color: #fff;
	font-size: 28rpx;
	}
	.top-box-bot image {
	width: 28rpx;
	height: 28rpx;
	margin-left: 12rpx;
	}
	.citylist-name {
	width: 100%;
	overflow: hidden;
	}
	.citylist-name-left {
	float: left;
	margin: 14rpx 0 32rpx 0;
	}
	.citylist-name-left .title {
	font-size: 30rpx;
	padding-top: 10rpx;
	color: #000;
	} 
	.citylist-name-left .txt {
	font-size: 28rpx;
	color: #666;
	} 
	.citylist-name-right {
	float: right;
	width: 124rpx;
	height: 50rpx;
	line-height: 50rpx;
	text-align: center;
	color: #4180f1;
	border: 2rpx solid #4180f1;
	border-radius: 36rpx;
	font-size: 24rpx;
	margin-top: 35rpx;
	margin-right:15rpx;
	}
	.popup-center {
	
	}
	.popup-box {
	width: 600rpx;
	height: auto;
	position: relative;
	}
	.popup-box-box {
	width: 100%;
	height: 450rpx;
	border-radius: 16rpx;
	background-color: #fff;
	overflow-x: hidden;
	overflow-y: scroll;
	z-index: 29;
	padding: 40rpx;
	box-sizing: border-box;
	}
	.popup-box-box-item {
	float: left;
	width: 100%;
	font-size: 24rpx;
	font-weight: 400;
	margin-bottom: 14rpx;
	}
	.height-title {
	float: left;
	width: 100%;
	font-size: 28rpx;
	color: #e03d41;
	margin-bottom: 14rpx;
	}
	.middle-title {
	float: left;
	width: 100%;
	font-size: 28rpx;
	color: #f80;
	margin-bottom: 14rpx;
	}
	.zqw-box {
	width: 100%;
	overflow: hidden;
	margin-bottom: 60rpx;
	}
	.popup-box-top {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	color: #4180f1;
	font-size: 36rpx;
	height: 100rpx;
	line-height: 100rpx;
	background-color: #fff;
	z-index: 39;
	padding: 0 34rpx;
	box-sizing: border-box;
	border-radius: 16rpx;
	}
	.pop-coles {
	position: absolute;
	top: -92rpx;
	right: 0;
	width: 80rpx;
	height: 80rpx;
	}
	
	/************************************/
	/************************************/
	
	.t_item-top-f {
	    width: 100%;
	    height: 30%;
	    overflow: hidden;
	    background-color: #fff;
	    padding-bottom: 10rpx;
	}
	.t_item-box-title-f {
	    width: 100%;
	    font-size: 28rpx;
	    color: #666;
	    padding: 25rpx 0rpx;
	}
	.t_item-box-title-f text {
	    color: #222;
	}
	.t_item-box-f {
	    width: 100%;
	    height: auto;
	    padding: 0 10rpx;
	    box-sizing: border-box;
	}
	.t_item-f {
		border-radius: 5px;
	    float: left;
	    width: 49%;
	    height: 150rpx;
	    text-align: center;
	    background-color: #fff;
	    margin: .3%;
	    transform: scale(.97);
	}
	.t_item-addnum-f {
	    float: left;
	    width: 100%;
	    color: #666;
	    text-align: center;
	    font-size: 28rpx;
	    margin: 5rpx auto 0;
	}
	.t_item-nownum-f {
	    float: left;
	    width: 100%;
	    color: #000;
	    text-align: center;
	    font-size: 48rpx;
	}
	.t_item-nowtxt-f {
	    float: left;
	    width: 100%;
	    color: #000;
	    text-align: center;
	    font-size: 28rpx;
	}
	.shadow{
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
		width:90%;
		margin-top:50rpx;
		margin-left:5%;
		border-radius:5px;
	}
	.tip{
		width:90%;
		margin-left:5%;
		margin-top:20rpx;
		height:80rpx;
		border-bottom:0.5px solid lightgray;;
	}
</style>
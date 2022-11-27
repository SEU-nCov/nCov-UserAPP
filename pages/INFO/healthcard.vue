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
					<view style="display:block;width:90%;margin-left:5%;height:50rpx;">
						<view style="width:50%;float:left;padding-top:40rpx;">
							<button @click="appeal" style="border-top-right-radius:0;border-bottom-right-radius:0;height:90rpx;">
								<view style="vertical-align:middle;text-align: center;justify-content: center;align-items: center;line-height:20rpx;margin-top:20rpx;margin-left:25rpx;">
									<u-icon name="info-circle" color="skyblue" size="25" label="健康码申诉" labelSize="16" labelColor="black"></u-icon>
								</view>
							</button>
						</view>
						<view style="width:50%;float:right;padding-top:40rpx;">
							<button @click="consult" style="border-top-left-radius:0;border-bottom-left-radius:0;height:90rpx;border-left:#EDEDED 2px solid;">
								<view style="vertical-align:middle;text-align: center;justify-content: center;align-items: center;line-height:20rpx;margin-top:20rpx;margin-left:40rpx;">
									<u-icon name="more-circle" color="forestgreen" size="25" label="健康咨询" labelSize="16" labelColor="black"></u-icon>
								</view>
							</button>
						</view>
					</view>
					<u-gap height="40"></u-gap>
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
		<u-popup :show="show" :overlay="false" :round="10" mode="bottom" @close="closepp" @open="openpp">
			<view style="background-color:skyblue;height:150rpx;border-top-left-radius:10px;border-top-right-radius:10px;">
				<view style="margin-left:5%;margin-top:2%;">
					<text style="color:white;line-height:60rpx;">地点：{{this.text}}</text>
					<text style="color:white;white-space:pre-wrap;line-height:60rpx;">\n时间：{{this.date}}</text>
				</view>
			</view>
		</u-popup>
		<u-modal :show="modshow" title="信息申报" width="700rpx" height="95%" @close="modalclose" @confirm="conf">
			<view class="slot-content" style="width:100%;max-height:1000rpx;">
				<scroll-view scroll-y="true" style="height:950rpx;width:100%;white-space:pre-wrap;line-height:50rpx;">
					<u-gap height="10"></u-gap>
					<text style="color:red;">*</text><text style="text-align:left;">填报人姓名：\n</text>
					<u-gap height="10"></u-gap>
					<u--textarea :placeholder="user_name" disabled autoHeight></u--textarea>
					<u-gap height="10"></u-gap>
					<text style="color:red;">*</text><text style="text-align:left;">证件号：\n</text>
					<u-gap height="10"></u-gap>
					<u--textarea :placeholder="user_identity" disabled autoHeight></u--textarea>
					<u-gap height="20"></u-gap>
					<text style="color:red;">*</text><text style="text-align:left;">1.您是从哪里来江苏的？\n</text>
					<text style="color:red;">(已在江苏居住7天以上请选择现居住地)\n</text>
					<u-gap height="10"></u-gap>
					<uni-data-picker  style="white-space:pre-wrap;" placeholder="请选择地点" popup-title="请 选 择 城 市" collection="opendb-city-china"
					field="code as value, name as text" orderby="value asc" :step-searh="true" self-field="code"
					parent-field="parent_code" v-model="position">
					</uni-data-picker>
					<u-gap height="20"></u-gap>
					<u-line></u-line>
					<u-gap height="10"></u-gap>
					<text style="color:red;">*</text><text style="text-align:left;">2.现居住地址(选择到乡镇/街道)：\n</text>
					<u-gap height="10"></u-gap>
					<view>
						<view style="width:65%;float:left;">
							<uni-data-picker  style="white-space:pre-wrap;" placeholder="请选择城市" popup-title="请 选 择 城 市" collection="jiangsu-city-china"
							field="code as value, name as text" orderby="value asc" :step-searh="true" self-field="code"
							parent-field="parent_code" @change="lookforstreet">
							</uni-data-picker>
						</view>
						<view style="width:35%;float:right;">
							<uni-data-picker  style="white-space:pre-wrap;" placeholder="请选择街道" popup-title="请 选 择 街 道"
							:localdata="streetdata_picker" v-model="now_street">
							</uni-data-picker>
						</view>
					</view>
					<u-gap height="50"></u-gap>
					<u-line></u-line>
					<u-gap height="10"></u-gap>
					<text style="color:red;">*</text><text style="text-align:left;">3.现详细地址(具体到门牌号码)：\n</text>
					<u-gap height="10"></u-gap>
					<u--textarea v-model="detail_location" placeholder="请输入详细地址" autoHeight></u--textarea>
					<u-gap height="15"></u-gap>
					<u-line></u-line>
					<u-gap height="10"></u-gap>
					<text style="color:red;">*</text><text style="text-align:left;">4.7天内是否接触过发热咳嗽人员？\n</text>
					<u-gap height="10"></u-gap>
					<u-radio-group v-model="four" placement="row" style="width:200rpx;">
						<u-radio :customStyle="{marginBottom: '20rpx',width: '200rpx'}" v-for="(item, index) in fourlist" :key="index"
						  :label="item.name" :name="item.name"></u-radio>
					</u-radio-group>
					<u-line></u-line>
					<u-gap height="10"></u-gap>
					<text style="color:red;">*</text><text style="text-align:left;">5.是否有发热、干咳、乏力、鼻塞流涕、咽痛、嗅觉/味觉减退、结膜炎、肌痛、腹泻等症状？\n</text>
					<u-gap height="10"></u-gap>
					<u-radio-group v-model="five" placement="row" style="width:200rpx;">
						<u-radio :customStyle="{marginBottom: '20rpx',width: '200rpx'}" v-for="(item, index) in fivelist" :key="index"
						  :label="item.name" :name="item.name"></u-radio>
					</u-radio-group>
					<u-line></u-line>
					<u-gap height="10"></u-gap>
					<text style="color:red;">*</text><text style="text-align:left;">6.是否同行人员无手机号，如儿童、老人、海外归国人员？\n</text>
					<u-gap height="10"></u-gap>
					<u-radio-group v-model="six" placement="row" style="width:200rpx;">
						<u-radio :customStyle="{marginBottom: '20rpx',width: '200rpx'}" v-for="(item, index) in sixlist" :key="index"
						  :label="item.name" :name="item.name"></u-radio>
					</u-radio-group>
					<u-line></u-line>
					<u-gap height="10"></u-gap>
					<text style="color:red;">*</text><text style="text-align:left;">知情同意：\n</text>
					<u-gap height="10"></u-gap>
					<text style="text-align:left;">根据《中华人民共和国传染病防治法》和《江苏省人民代表大会常务委员会关于依法防控新型冠状病毒感染肺炎疫情切实保障人民群众生命健康安全的决定》等有关法律规定，请您如实填报各项信息。瞒报信息可能造成您的不便，甚至可能承担相关法律责任，敬请配合!“健康码”的申报信息有效期为14天，请您于14天后按提示更新相关信息，否则将影响正常使用!\n本系统实行对你填报信息真实校验，登录本系统即为授权。\n</text>
					<text style="text-align:left;color: #3c9cff;">数据来源：全国一体化政务服务平台、个人申报信息和江苏省公共管理机构。\n</text>
					<u-gap height="10"></u-gap>
					<radio style="transform:scale(0.9)" @click="change" :checked="check">本人知情同意</radio>
				</scroll-view> 
			</view>
		</u-modal>
		<u-modal :show="a_modshow" :closeOnClickOverlay="true" title="健康码申诉" width="700rpx" @close="a_modalclose" @confirm="a_conf">
			<view class="slot-content" style="width:100%;max-height:1000rpx;">
				<view style="white-space:pre-wrap;line-height:50rpx;">
					<u-gap height="10"></u-gap>
					<text style="color:red;">*</text><text style="text-align:left;">申诉人姓名：\n</text>
					<u-gap height="10"></u-gap>
					<u--textarea :placeholder="user_name" disabled autoHeight></u--textarea>
					<u-gap height="10"></u-gap>
					<text style="color:red;">*</text><text style="text-align:left;">证件号：\n</text>
					<u-gap height="10"></u-gap>
					<u--textarea :placeholder="user_identity" disabled autoHeight></u--textarea>
					<u-gap height="10"></u-gap>
					<text style="color:red;">*</text><text style="text-align:left;">手机号：\n</text>
					<u-gap height="10"></u-gap>
					<u--textarea :placeholder="user_phone" disabled autoHeight></u--textarea>
					<u-gap height="20"></u-gap>
					<u-line></u-line>
					<u-gap height="10"></u-gap>
					<text style="color:red;">*</text><text style="text-align:left;">申诉理由：\n</text>
					<u-gap height="10"></u-gap>
					<u--textarea v-model="a_reason" placeholder="请输入详细理由" count></u--textarea>
				</view>
			</view>
		</u-modal>
		<u-modal :show="c_modshow" :closeOnClickOverlay="true" title="健康咨询" width="700rpx" @close="c_modalclose" @confirm="c_conf">
			<view class="slot-content" style="width:100%;max-height:1000rpx;">
				<view style="white-space:pre-wrap;line-height:50rpx;">
					<u-gap height="10"></u-gap>
					<text style="color:red;">*</text><text style="text-align:left;">咨询人姓名：\n</text>
					<u-gap height="10"></u-gap>
					<u--textarea :placeholder="user_name" disabled autoHeight></u--textarea>
					<u-gap height="10"></u-gap>
					<text style="color:red;">*</text><text style="text-align:left;">证件号：\n</text>
					<u-gap height="10"></u-gap>
					<u--textarea :placeholder="user_identity" disabled autoHeight></u--textarea>
					<u-gap height="10"></u-gap>
					<text style="color:red;">*</text><text style="text-align:left;">手机号：\n</text>
					<u-gap height="10"></u-gap>
					<u--textarea :placeholder="user_phone" disabled autoHeight></u--textarea>
					<u-gap height="20"></u-gap>
					<u-line></u-line>
					<u-gap height="10"></u-gap>
					<text style="color:red;">*</text><text style="text-align:left;">咨询问题：\n</text>
					<u-gap height="10"></u-gap>
					<u--textarea v-model="c_question" placeholder="请输入咨询问题" count></u--textarea>
				</view>
			</view>
		</u-modal>
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
		onHide() {
			this.show=false;
		},
		onShow() {
			if(this.$dest.memberObj.dest_if==1){
				this.text=this.$dest.memberObj.dest_name;
				this.openpp();
				this.$dest.memberObj.dest_if=0;
			}
			const dat1 = moment(this.$user.memberObj.user_timeleft);
			const dat2 = moment(this.now);
			const dat3 = dat2.diff(dat1,'days');
			if(dat3>14){
				this.modalopen();
			}
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
				c_question:'',
				c_modshow:false,
				a_reason:'',
				a_modshow:false,
				position:'',
				fourlist:[{name:'是'},{name:'否'}],
				four:'',
				fivelist:[{name:'是'},{name:'否'}],
				five:'',
				sixlist:[{name:'是'},{name:'否'}],
				six:'',
				check:false,
				now_city:'',
				streetdata_picker:[],
				now_street:'',
				detail_location:'',
				modshow:false,
				text:'默认文字',
				show:false,
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
			appeal(){
				if(this.user_color==0){
					uni.showToast({
						icon:"none",
						title:"绿码无需申诉"
					})
				} else {
					this.a_modalopen();
				}
			},
			a_conf(){
				let that = this;
				if(this.a_reason!=''){
					uni.request({
						url:this.$BASE_URL.BASE_URL+"/addUserappeal",
						method:"POST",
						header:{
							'Content-Type': 'application/json',
						},
						data:{
							'user_id':this.$user.memberObj.user_id,
							'appeal_reason':this.a_reason,
						},
						success: (res) => {
							if(res.data.code==200){
								that.a_modalclose();
								uni.showModal({
									title:'提示',
									content:'您的申诉已经提交，我们将在72小时内处理您的申诉',
									showCancel: false,
									success:function(res){
										if(res.confirm){
											that.a_reason='';
										}
									}
								});
							}
							else{
								uni.showToast({
									icon:"none",
									title:"error"
								})
							}
						}
					})
				} else {
					uni.showToast({
						icon:"none",
						title:"必须填写申诉理由"
					})
				}
			},
			consult(){
				this.c_modalopen();
			},
			c_conf(){
				let that = this;
				if(this.c_question!=''){
					uni.request({
						url:this.$BASE_URL.BASE_URL+"/addUserappeal",
						method:"POST",
						header:{
							'Content-Type': 'application/json',
						},
						data:{
							'user_id':this.$user.memberObj.user_id,
							'appeal_reason':this.a_reason,
						},
						success: (res) => {
							if(res.data.code==200){
								that.c_modalclose();
								uni.showModal({
									title:'提示',
									content:'您的健康咨询已经提交，我们将在72小时内给予您反馈',
									showCancel: false,
									success:function(res){
										if(res.confirm){
											that.c_question='';
										}
									}
								});
							}
							else{
								uni.showToast({
									icon:"none",
									title:"error"
								})
							}
						}
					})
				} else {
					uni.showToast({
						icon:"none",
						title:"请输入要咨询的问题"
					})
				}
			},
			c_modalopen(){
				this.c_modshow=true;
			},
			c_modalclose(){
				this.c_modshow=false;
			},
			a_modalopen(){
				this.a_modshow=true;
			},
			a_modalclose(){
				this.a_modshow=false;
			},
			modalopen(){
				this.modshow=true;
			},
			modalclose(){
				this.modshow=false;
			},
			lookforstreet(e){
				const val = e.detail.value;
				this.now_city = val[2].text;
				uni.request({
					url:this.$BASE_URL.BASE_URL+'/getTownbyarea',
					method:'POST',
					header:{
						'Content-Type': 'application/json',
					},
					data:{
						'area_name':this.now_city,
					},
					success: (res) => {
						//console.log(res.data.code);
						if(res.data.code==200){
							let that = this;
							that.streetdata_picker=[];
							let streetdata=JSON.parse(JSON.stringify(res.data.data));
							for(let i=0;i<streetdata.length;i++){
								let struct={value:'',text:''};
								struct.value=streetdata[i].town_name;
								struct.text=streetdata[i].town_name;
								that.streetdata_picker.push(struct);
							}
						}
					}
				});
			},
			conf(){
				let it = this;
				if(this.position!='' || this.four!='' || this.five!='' || this.six!='' || this.detail_location!='' || this.now_street!=''){
					if(this.four=='否' && this.five=='否'){
						uni.request({
							url:this.$BASE_URL.BASE_URL+'/declareHealthCode',
							method:'POST',
							header:{
								'Content-Type': 'application/json',
							},
							data:{
								'user_id':this.$user.memberObj.user_id,
								'area_name':this.now_city,
								'town_name':this.now_street,
								'detail_location':this.detail_location,
							},
							success: (res) => {
								if(res.data.code==200){
									it.$user.memberObj.user_timeleft=it.date;
									this.modalclose();
									uni.showModal({
										title:'提示',
										content:'申报成功',
										showCancel: false,
										success:function(res){
											if(res.confirm){
												uni.redirectTo({
													url:"./healthcard",
												});
											}
										}
									});
								}
							}
						});
					} else {
						//有症状和密接直接黄码
						uni.request({
							url:this.$BASE_URL.BASE_URL+'/admin/setYellowCode',
							method:'POST',
							header:{
								'Content-Type': 'application/json',
							},
							data:{
								'user_id':this.$user.memberObj.user_id,
							},
							success: (res) => {
								if(res.data.code==200){
									it.$user.memberObj.user_timeleft=it.date;
									it.$user.memberObj.user_codecolor=1;
									this.modalclose();
									uni.showModal({
										title:'提示',
										content:'申报成功',
										showCancel: false,
										success:function(res){
											if(res.confirm){
												uni.redirectTo({
													url:"./healthcard",
												});
											}
										}
									});
								}
							}
						});
					}
				} else {
					uni.showToast({
						icon:"none",
						title:"请按要求填写"
					})
				}
			},
			change(){
				if(this.check==true) this.check=false;
				else this.check=true;
			},
			closepp(){
				this.show=false;
			},
			openpp(){
				this.show=true;
			},
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
	button:after{
		border:none;
	}
</style>

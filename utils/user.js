export default {
    memberObj:{
		user_id: '',
		user_phone: '',
        user_identity: '',
		user_name: '',
		user_codecolor:'',
		user_timeleft:'',
		user_nat:[],
    },
    setMemberObj(data){
        this.memberObj = Object.assign({},this.memberObj,data) 
    }
}
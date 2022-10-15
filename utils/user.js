export default {
    memberObj:{
		user_id: '',
		user_phone: '',
        user_identity: '',
		user_name: '',
    },
    setMemberObj(data){
        this.memberObj = Object.assign({},this.memberObj,data) 
    }
}
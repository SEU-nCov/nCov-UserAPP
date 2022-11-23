export default {
    memberObj:{
		dest_name: '',
		dest_if:0,
    },
    setMemberObj(data){
        this.memberObj = Object.assign({},this.memberObj,data) 
    }
}
class LocalStorageServiceUser{

    getUserIdToken(){
        localStorage.getItem("userId")
    }
    getUserSelectedRoleToken(){
        localStorage.getItem("selectedRole")
    }
    removeSelectedRoleToken(){
        localStorage.removeItem("selectedRole")
    }

    setTokenUserOid(oid){
        localStorage.setItem("userId",oid)
    }

    setTokenUserStudentAndRoleAsStudent(){
        localStorage.setItem("selectedRole","Student")
    }

    setTokenUserStudentAndRoleAsTrainer() {
        localStorage.setItem("selectedRole", "Trainer")
    }

}

export default new LocalStorageServiceUser();
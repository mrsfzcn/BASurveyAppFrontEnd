class LocalStorageServiceUser{

    getUserIdToken(){
        return localStorage.getItem("userId")
    }
    getUserSelectedRoleToken(){
        return localStorage.getItem("selectedRole")
    }
    removeSelectedRoleToken(){
        localStorage.removeItem("selectedRole")
    }

    setTokenUserOid(oid){
        localStorage.setItem("userId",oid)
    }

    setSelectedRole(role){
        localStorage.setItem("selectedRole", role)
    }

}

export default new LocalStorageServiceUser();
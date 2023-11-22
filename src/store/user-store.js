class LocalStorageServiceUser {

    getUserId() {
        return localStorage.getItem("userId")
    }
    getUserSelectedRole() {
        return localStorage.getItem("selectedRole")
    }
    removeSelectedRole() {
        localStorage.removeItem("selectedRole")
    }

    setUserOid(oid) {
        localStorage.setItem("userId", oid)
    }

    setSelectedRole(role) {
        localStorage.setItem("selectedRole", role)
    }

}

export default new LocalStorageServiceUser();
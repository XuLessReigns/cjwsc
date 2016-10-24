var regExpManger = {
	//验证用户名的正则表达式
	userNameReg:/^([\u4e00-\u9fa5]|[0-9a-z_-])+$/,
	name:/^[a-zA-Z\u4e00-\u9fa5]+$/,
	wordReg:/[a-zA-Z]+/,
	numReg:/\d+/,
	emaiReg:/^[0-9a-z_]{3,22}@[0-9a-z]{2,8}\.[a-z]{2,3}$/,
	mobileReg:/[1]\d{10}/
}

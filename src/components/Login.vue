<template>
	<div class="login-form">
		<div class="g-form">
			<div class="g-form-line">
				<span class="g-form-label">用户名：</span>
				<div class="g-form-input">
					<input type="text" placeholder="请输入用户名" autocomplete="off" v-model="username" />
				</div>
				<span class="g-form-error">{{validUsername.errorText}}</span>
			</div>
			<div class="g-form-line">
				<span class="g-form-label">密码：</span>
				<div class="g-form-input">
					<input type="password" placeholder="请输入密码" autocomplete="off" v-model="userpwd" />
				</div>
				<span class="g-form-error">{{validPassword.errorText}}</span>
			</div>
			<div class="g-form-line">
				<div class="g-form-btn">
					<a class="button" @click="onLogin">登录</a>
				</div>
			</div>
			<p class="g-form-error">{{errorText}}</p>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'

	export default {
		data() {
			return {
				username: '',
				userpwd: '',
				errorText: ''
			}
		},
		computed: {
			validUsername() {
				let errorText, status

				if(!/@/g.test(this.username)) {
					status = false;
					errorText = "用户名格式不正确"
				} else {
					status = true
					errorText = ''
				}

				if(!this.userFlag) {
					errorText = ''
					this.userFlag = true
				}

				return {
					status,
					errorText
				}
			},
			validPassword() {
				let errorText, status

				if(!/^\w{1,6}$/g.test(this.userpwd)) {
					status = false
					errorText = '密码不是1-6位'
				} else {
					status = true
					errorText = ''
				}

				if(!this.passwordFlag) {
					errorText = ''
					this.passwordFlag = true
				}

				return {
					status,
					errorText
				}
			}
		},
		methods: {
			onLogin() {
				
				if(!this.validUsername.status || !this.validPassword.status) {
					this.errorText = '用户名或密码格式不正确';
					return;
				}
				
				//alert('dologin = ' + this.username + "," + this.userpwd);

				axios.get('static/db.json').then((response) => {
					let userinfo = response.data.userinfo;
					
					if(this.username === userinfo.username 
						&& this.userpwd === userinfo.password) {
						
						localStorage.setItem("username", this.username);
						this.$emit('after-login', this.username);
						
						alert('登录成功');
					} else {
						this.errorText = '用户名或密码不正确'
					}
				}).catch((error) => {
					console.info(error)
				})
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
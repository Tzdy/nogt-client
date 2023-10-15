<template>
    <div class="login-box">
        <!-- <b-form @submit="onLogin">
            <b-form-group id="login-username" label="Username:" label-for="login-username">
                <b-form-input id="login-username" v-model="form.username" type="text" placeholder="your username."
                    required></b-form-input>
            </b-form-group>

            <b-form-group id="login-password" label="Password:" label-for="login-password">
                <b-form-input id="login-password" v-model="form.password" placeholder="your password." required></b-form-input>
            </b-form-group>

            <div class="text-right">
                <b-button class="mr-1" type="submit" variant="primary">Login</b-button>
                <b-button type="reset" variant="danger">Register</b-button>
            </div>
        </b-form> -->

        <el-form :model="form">
            <el-form-item label="用户名">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onLogin">LOGIN IN</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { reactive, ref } from '@vue/composition-api';
import { useUserStore } from '@/store/user'
import router from '../../router/index'
import { Message } from 'element-ui';
export default {
    setup() {
        const userStore = useUserStore()
        const form = reactive({
            username: '',
            password: ''
        })
        const message = ref('')
        function onLogin() {
            userStore.login(form)
                .then((res) => {
                    router.push({ name: 'index' })
                }).catch(err => {
                    Message.error(err.message)
                })
        }

        return {
            form,
            message,
            onLogin,
        }
    }
}
</script>

<style scoped>
.login-box {
    height: 400px;
    width: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -200px;
    margin-left: -150px;
}
</style>
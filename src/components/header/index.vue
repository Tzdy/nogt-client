<template>
    <header class="header border-b">
        <h2 class="ms-2" style="line-height: 48px;">
            <router-link :to="{ name: 'index' }">NoGt</router-link>
        </h2>
        <div v-if="$route.name !== 'login'" class="info">
            <span class="me-2" v-if="user">{{ user.nickname }}</span>
            <span>
                <button v-if="user" @click="onExit">exit</button>
                <button v-if="!user">
                    <router-link :to="{name: 'login'}">SIGN IN</router-link>
                </button>
            </span>
        </div>
    </header>
    <!-- <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">NoGt</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item href="#">Link</b-nav-item>
                <b-nav-item href="#" disabled>Disabled</b-nav-item>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
                <b-nav-form>
                    <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                    <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                </b-nav-form>

                <b-nav-item-dropdown text="Lang" right>
                    <b-dropdown-item href="#">EN</b-dropdown-item>
                    <b-dropdown-item href="#">ES</b-dropdown-item>
                    <b-dropdown-item href="#">RU</b-dropdown-item>
                    <b-dropdown-item href="#">FA</b-dropdown-item>
                </b-nav-item-dropdown>

                <b-nav-item-dropdown v-if="user" right>
                    <template #button-content>
                        <em>{{ user.nickname }}</em>
                    </template>
                    <b-dropdown-item href="#">Repository</b-dropdown-item>
                    <b-dropdown-item @click="onExit">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-navbar-nav v-if="!user" right>
                    <b-nav-item href="#">Login</b-nav-item>
                </b-navbar-nav>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar> -->
</template>

<script>
import { computed } from '@vue/composition-api';
import { useUserStore } from '../../store/user';
export default {
    setup() {
        const userStore = useUserStore()
        const user = computed(() => userStore.user)
        function onExit() {
            userStore.exit()
        }
        return {
            user,
            onExit
        }
    }
}
</script>

<style scoped>
.header {
    width: 100%;
    height: 48px;
    display: flex;
}

.info {
    margin-left: auto;
    margin-right: 18px;
    line-height: 48px;
}
</style>
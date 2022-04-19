import Vue from 'vue'
import { Button } from 'element-ui'
import {Input,Form,FormItem,Message} from 'element-ui'
import {Header,Container,Aside,Main} from 'element-ui'
import{Menu,Submenu,MenuItem,MenuItemGroup,Select} from 'element-ui'
import{Breadcrumb,BreadcrumbItem,Card,Row,Col,Table,TableColumn,Tooltip,Switch,Pagination,Dialog,Option} from 'element-ui'
import{Alert,Tabs,TabPane,Upload} from 'element-ui'
import{Tag} from 'element-ui'
import {MessageBox} from 'element-ui'
import {Tree} from 'element-ui'
import {Cascader} from 'element-ui'
import {Step,Steps,Checkbox,CheckboxGroup} from 'element-ui'
Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Header)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tooltip)
Vue.use(Switch)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Select)
Vue.use(Option)
Vue.use(Cascader)
Vue.use(Alert)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Upload)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
